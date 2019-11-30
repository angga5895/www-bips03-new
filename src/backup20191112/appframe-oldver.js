import React from 'react';
import './App.css';
import {ContextProvider, ContextConnector} from './appcontext.js';
import { Modal } from 'semantic-ui-react';


var AppFrameContext = React.createContext({});

class pageInstance {
  constructor (instanceName, className, classRegister, title) {
    this.instanceName = instanceName;
    this.title = title;
    this.className = className;
    this.classRegister = classRegister;
    this.componentClass = classRegister.componentClass;
    this.componentInstance = null;
  }
}

class pageClassRegister {
  constructor (componentClass, {onShow, onHide, onClose}) {
    this.componentClass = componentClass;
    this.onShow = onShow;
    this.onHide = onHide;
    this.onClose = onClose;
  }
}

class PageFrame extends React.Component {

  constructor (props) {
    super(props);
    // console.log('PageFrame created - ' + props.instanceName);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.visible && !this.props.visible) || (!nextProps.visible && this.props.visible)
  }

  render() {
    // console.log('PageFrame rendered - ' + this.props.instanceName);
    return (
      <div style={{display: this.props.visible ? "block" : "none"}}>
        {this.props.children}
      </div>
    )
  }
}

var appFrameVars = {
  frameActive: true,
  pageClasses: {},
  pageInstances: {}, // associated by instanceName
  modalStack: [], // stack of modal frames
  $: {
    instanceCounter: {}, // indexed by className
    instancesByClass: {}, // indexed by className
  },
  activeInstance: null,

  // events:
  onShow: (instance) => {},
  onClose: (instace) => {},
  onHide: (instance) => {},
};

var appFrameActions = {
  addPageClass: (vars, {className, componentClass, onShow, onHide, onClose}) => {
    var pageClass = new pageClassRegister(componentClass, {onShow, onHide, onClose})
    return {
      ...vars,
      pageClasses: {...vars.pageClasses, [className]: pageClass},
    }
  },
  setEventHandlers: (vars, {onShow, onClose, onHide}) => ({...vars, onShow, onClose, onHide}),
  createPageInstance: (vars, {className, isUnique, instanceName, title}) => {
    var $ = vars.$;
    var pageClass = vars.pageClasses[className];
    if (!pageClass)
      throw new Error(`Unknown class register "${className}" `);

    var prevActiveInstance = vars.activeInstance;

    var prevInstance = $.instancesByClass[className];
    if (isUnique && prevInstance) {
      if (vars.frameActive && prevActiveInstance != prevInstance) {
        // show / hide events here
        if (prevActiveInstance && vars.onHide) {
          vars.onHide(prevActiveInstance)
        }
        if (prevInstance && vars.onShow) {
          vars.onShow(prevInstance)
        }
      }
      return {
        ...vars,
        activeInstance: prevInstance
      }
    }     
    if (!instanceName) {
      var cnt = $.instanceCounter[className] || 1;
      instanceName = 'frame_' + className + cnt.toString();
      $.instanceCounter[className] = cnt + 1;
    }

    var instance = new pageInstance(instanceName, className, pageClass, title);
    $.instancesByClass[className] = instance;

    if (vars.frameActive && prevActiveInstance != instance) {
      // show / hide events here
      if (prevActiveInstance && vars.onHide) {
        vars.onHide(prevActiveInstance)
      }
      if (instance && vars.onShow) {
        vars.onShow(instance)
      }
    }
    return {
      ...vars,
      pageInstances: {...vars.pageInstances, [instanceName]: instance},
      activeInstance: instance
    }
  },

  deletePageInstance: (vars, {instanceName}) => {
    var pageInstances = {...vars.pageInstances};
    var pageInstance = pageInstances[instanceName];
    if (pageInstance) {
      if (vars.onClose)
        vars.onClose(pageInstance);
      delete pageInstances[instanceName];
      delete vars.$.instancesByClass[pageInstance.className];
      var newActiveInstance = (vars.activeInstance && vars.activeInstance.instanceName == instanceName) ? 
        ((Object.keys(pageInstances).length > 0) ? pageInstances[Object.keys(pageInstances)[0]] : null) : vars.activeInstance;
      if (vars.frameActive && vars.onShow)
        vars.onShow(newActiveInstance);
      return {...vars, pageInstances: pageInstances, activeInstance: newActiveInstance};
    }
    else
      return undefined;
  },

  switchPage: (vars, {instanceName}) => {
    var newActiveInstance = vars.pageInstances[instanceName];
    var prevActiveInstance = vars.activeInstance;

    if (newActiveInstance) {
      if (vars.frameActive && newActiveInstance != prevActiveInstance) {
        if (prevActiveInstance && vars.onHide)
          vars.onHide(prevActiveInstance);
        if (vars.onShow)
          vars.onShow(newActiveInstance);
      }
      return {
        ...vars,
        activeInstance: newActiveInstance
      }
    }
    else
      return undefined;
  },

  setFrameActive: (vars, {isActive}) => {

    if (vars.frameActive && !isActive && vars.onHide && vars.activeInstance) {
      vars.onHide(vars.activeInstance);
    } else if (!vars.frameActive && isActive && vars.onShow && vars.activeInstance) {
      vars.onShow(vars.activeInstance);
    }
    return {...vars, frameActive: isActive}
  },

  toggleFrameActive: (vars) => {
    if (vars.frameActive && vars.onHide && vars.activeInstance) {
      vars.onHide(vars.activeInstance);
    } else if (vars.activeInstance) {
      vars.onShow(vars.activeInstance);
    }
    return {...vars, frameActive: !vars.frameActive}
  },

  showModal: (vars, 
      {
        headerClass, contentClass, descClass, onOpen, onClose, size, dimmer, closeIcon,
        headerProps, contentProps
      }
    ) => (
    // size can be "mini", "tiny", "small", "large", "fullscreen"
    // default is "small"
    {
      ...vars, 
      modalStack: vars.modalStack.concat({
        headerClass: headerClass || ((props) => (<></>)), // default to empty JSX component
        contentClass, 
        descClass,
        onOpen,
        onClose, 
        closeIcon,
        size: size || "small", 
        dimmer: dimmer || true,
        headerProps: headerProps || {},
        contentProps: contentProps || {}
      })
    }
  ),

  closeModal: (vars, {result}) => {
    var topIndex = vars.modalStack.length - 1;
    var topStack = vars.modalStack[topIndex];
    if (typeof(topStack.onClose) == 'function')
      topStack.onClose(result)
    return {
      ...vars, 
      modalStack: vars.modalStack.slice(0, topIndex).concat(vars.modalStack.slice(topIndex + 1, )),
      // we define new modalStack by removing element at topIndex, without taking assumption
      // that topIndex is the last index. It is possible during onClose the modalStack array changes
    };
  }
}

/* 
  AppFrameProvider is a provider component to supply all subcomponents with state from appFrameVars
  This component is usually mounted in render() of main App object
*/

class AppFrameProvider extends React.Component {
  render() {
    var initClasses = this.props.initialClasses;
    var actualInitClasses = {};

    if (typeof(initClasses) == 'object') {
      var initClassNames = Object.keys(initClasses);

      for (var i = 0; i < initClassNames.length; ++i) {
        var initClassName = initClassNames[i];
        var initClassInfo = initClasses[initClassName];
        if (typeof(initClassInfo) == 'object') {
          var pageClass = new pageClassRegister(initClassInfo.class, {
            onShow: initClassInfo.onShow, 
            onHide: initClassInfo.onHide, 
            onClose: initClassInfo.onClose
          });
        }
        else {
          var pageClass = new pageClassRegister(initClassInfo, {});
        }
        actualInitClasses[initClassName] = pageClass;
      } // for
    } // if

    var frameVars =  {...appFrameVars, pageClasses: actualInitClasses};
    if (Array.isArray(this.props.initialFrames)) {
      var initFrames = this.props.initialFrames;
      for (var i = 0; i < initFrames.length; ++i) {
        var {className, instanceName, title} = initFrames[i];
        frameVars = appFrameActions.createPageInstance(frameVars, {className, instanceName, title, isUnique: false});
      }
      if (initFrames.length > 0)
        frameVars.activeInstance = frameVars.pageInstances[Object.keys(frameVars.pageInstances)[0]];
    }
    return (
      <ContextProvider context={AppFrameContext} vars={frameVars} actions={appFrameActions}
        initActions={this.props.initActions}
      >
        {this.props.children}
      </ContextProvider>
    );
  }
}

/* 
  BasicHeaderComponent is default header component used by AppFrameBase, in case the headerComponent property
  is not defined in AppFrameBase 
*/
const BasicHeaderComponent = (props) => {
  return (
    <table>
      <tbody><tr>
        <td><h2><span style={props.headerStyle}>{props.title}</span></h2></td>
        <td>
          <span style={{display: !props.showCloseButton ? "none" : "block" }}>
            <button onClick={() => {props.closeHook()}}>Close</button>
          </span>
        </td>
      </tr></tbody>
    </table>
  );
}

/* 
  AppFrame_Base (and the connected to AppFrameContext - AppFrame) are components for displaying
  frame objects. Only one frame (activeInstance) is visible every time
  This component is usually mounted in render() of main App object
*/

class AppFrame_Base extends React.Component {

  constructor (props) {
    super(props);
  }

  render() { 
    var pages = this.props.pageInstances;
    var HeaderComponent = this.props.headerComponent || BasicHeaderComponent;
    var activePage = this.props.activeInstance;
    var headerComponentProps = HeaderComponent == BasicHeaderComponent ? 
      {headerStyle: this.props.headerStyle, showCloseButton: this.props.headerShowCloseButton} : {};

    var elements = Object.keys(pages).map(
        (instName) => {
          var page = pages[instName];
          var ContainedComponentClass = page.componentClass;
          const closeHook = () => {this.props.actions.sendAction('deletePageInstance', {instanceName: instName})};
          return (
            <PageFrame 
              title={page.title} 
              visible={page == activePage}
              key={page.instanceName}
              instanceName={page.instanceName}
            >
              <HeaderComponent title={page.title} closeHook={closeHook} {...headerComponentProps} />
              <ContainedComponentClass ref={(v) => {page.componentInstance = v;}} />
            </PageFrame>
          )
        }
      ) // map
    return (
      <div style={{display: this.props.frameActive ? "block" : "none"}}>
        {elements}
      </div>
    ) // return
  } // render
}

const AppFrame = ContextConnector(AppFrameContext, 
  (vars, actions, ownProps) => ({
    frameActive: vars.frameActive,
    pageInstances: vars.pageInstances,
    activeInstance: vars.activeInstance,
    actions: actions,
  })
)(AppFrame_Base);

/* 
  AppModal_Base (and the connected to AppFrameContext - AppModal) are components for displaying
  modal objects. Modals are stacked and only the top of the stack is accessible to user
  This component is usually mounted in render() of main App object
*/

class AppModal_Base extends React.Component {
  constructor (props) {
    super(props);
    // props:
    // stack: array
    // showModal: similar to showModal action
    // closeModal: similar to closeModal action
  }

  onModalDefaultClose = () => { 
    // this event is occured when a modal is closed by standard UI action like pressing Esc or click close button
    // the closeHandler of the top stack will be called with result == null
    this.props.closeModal(null);
  }

  render() {

    var i;

    //var hooks = {closeModal: this.props.closeModal, showModal: this.props.showModal};
    var modalStack = this.props.stack;
    var result = [];
    for (i = 0; i < modalStack.length; ++i) {
      var md = modalStack[i];
      result.push(
        <Modal 
          key={"modal" + i.toString()} 
          size={md.size} open={true} dimmer={md.dimmer}
          closeIcon={md.closeIcon} onClose={this.onModalDefaultClose}
          onOpen={md.onOpen}
        >
          <Modal.Header><md.headerClass {...md.headerProps} /></Modal.Header>
          <Modal.Content><md.contentClass {...md.contentProps} /></Modal.Content>
        </Modal>
      );
    }
    return result;
  }
}

const AppModal = ContextConnector(AppFrameContext, 
  (vars, actions, ownProps) => ({
    stack: vars.modalStack,
    showModal: (params) => actions.sendAction('showModal', params),
    closeModal: (result) => actions.sendAction('closeModal', {result})
  })
)(AppModal_Base);

/* 
  AppFrameAction_Base (and the connected to AppFrameContext - AppFrameAction) are dummy non-visual components 
  that gives access to AppFrame' user interface commands.
  This component can be mounted in render() part of any frame / user-interface part and then given the ref property
  to make access to AppFrame' UI commands easier
*/

class AppFrameAction_Base extends React.Component {
  constructor (props) {
    super(props);
    props.actionFrame.notifyActionFrame(this);
  }
  render() {return <></>}
}

const AppFrameActionF = ContextConnector(AppFrameContext, 
  (vars, actions, ownProps) => ({
    addClass: (className, componentClass, events = {}) => 
      actions.sendAction('addPageClass', {
        className, componentClass, 
        onShow: events.onShow, onHide: events.onHide, onClose: events.onShow
      }),
    createPage: (className, instanceName, title, isUnique) => actions.sendAction('createPageInstance', {className, isUnique, instanceName, title}),
    deletePage: (instanceName) => actions.sendAction('deletePageInstance', {instanceName}),
    switchPage: (instanceName) => actions.sendAction('switchPage', {instanceName}),
    showModal: (params) => actions.sendAction('showModal', params),
    /* 
      available params:  
      headerClass, contentClass*, descClass, onClose, size, dimmer, closeIcon,
      headerProps, contentProps
      * = mandatory
    */
    closeModal: (result) => actions.sendAction('closeModal', {result}),
    setEventHandlers: ({onShow, onHide, onClose}) => actions.sendAction('setEventHandlers', {onShow, onHide, onClose})
  })
)(AppFrameAction_Base);

class AppFrameAction extends React.Component {

  notifyActionFrame(actualObj) {
    var methodNames = ['addClass', 'createPage', 'deletePage', 'switchPage', 'showModal', 'closeModal', 'setEventHandlers'];
    for (var i = 0; i < methodNames.length; ++i)
      this[methodNames[i]] = actualObj.props[methodNames[i]];
  }

  render() {
    return <AppFrameActionF actionFrame={this} />
  }
}

export {AppFrame, AppModal, AppFrameProvider, AppFrameAction, AppFrameContext, PageFrame};

