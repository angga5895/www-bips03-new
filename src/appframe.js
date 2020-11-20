import React from 'react';
import {ContextProvider, ContextConnector} from './appcontext.js';
import { Modal } from 'semantic-ui-react';

var AppFrameContext = React.createContext({});

class pageInstance {
  constructor (instanceName, className, classRegister, title) {
    this.instanceName = instanceName
    this.title = title
    this.className = className
    this.classRegister = classRegister
    this.componentClass = classRegister.componentClass
    this.componentInstance = null
    this.tree = null
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
  useInstanceTree: false, // whether use simple pageInstances or use instanceTree
  instanceTree: null, 
  /* 
    when instanceTree is set, all pageInstances must have been created
    instanceTree is recursive object of:
    - pages: object with instanceName as key
    - activeInstance: page instance object
    - subTrees: object with instance_name as key and contained instanceTree
  */
  instanceTreeIndexes: {}, 

  // events:
  onShow: (instance) => {},
  onClose: (instace) => {},
  onHide: (instance) => {},
};

function _setInstanceTree (vars, treeData, disabledTrees = []) {
  // treeData is array of ((page_instance_name) or object {name: (page_instance_name), pages: treeData}
  // disabledTrees are array of tree names that are to be disabled (frameActive set to false)

  var treeIndex = {}

  function __internalSetInstanceTree(parentTree, treeName, tree, pages) {

    var pageInst
    var elName

    tree.pageInstances = {}
    tree.activeInstance = null
    tree.subTrees = {}
    tree.frameActive = true
    tree.parentTree = parentTree
    tree.treeName = treeName

    for (var i = 0; i < pages.length; ++i) {
      var el = pages[i]
      elName = typeof(el) == 'object' ? el.name : el
      pageInst = vars.pageInstances[elName]
      
      if (pageInst) {
        tree.pageInstances[elName] = pageInst
        pageInst.tree = tree
        if (typeof(el) == 'object' && typeof(el.name) == 'string' && Array.isArray(el.pages)) {
          var subTree = {}
          var subTreeName = treeName + (treeName == '/' ? '' : '/') + el.name
          __internalSetInstanceTree(tree, subTreeName, subTree, el.pages)
          tree.subTrees[el.name] = subTree
          treeIndex[subTreeName] = subTree
        }
      }
    }
    if (Object.keys(tree.pageInstances).length > 0) {
      tree.activeInstance = tree.pageInstances[Object.keys(tree.pageInstances)[0]]
    }
  }

  if (!treeData) {
    return {...vars, useInstanceTree: false, instanceTree: null, instanceTreeIndexes: {}}
  }
  else {
    var tree = {}
    treeIndex['/'] = tree
    __internalSetInstanceTree(null, '/', tree, treeData)
    tree.frameActive = true
    for (var i = 0; i < disabledTrees.length; ++i) {
      var disabledTree = treeIndex[disabledTrees[i]]
      if (disabledTree)
        disabledTree.frameActive = false
    }
    var newVars = {...vars, useInstanceTree: true, instanceTree: tree, instanceTreeIndexes: treeIndex}
    window.setTimeout(() => {
      _triggerTreeEvents(newVars.instanceTree, newVars, 'show')
    }, 0)    
    return newVars
  }  
}

function _treeCheckVisibility (tree) {
  while (tree && tree.frameActive)
    tree = tree.parentTree
  return tree ? tree.frameActive : true
}

function _triggerTreeEvents (startTree, vars, eventType) {
  var eventF = eventType == 'show' ? vars.onShow : (eventType == 'hide' ? vars.onHide : undefined)
  if (typeof(eventF) == 'function') {
    var tree = startTree
    while (tree && tree.frameActive && tree.activeInstance) {
      eventF(tree.activeInstance)
      tree = tree.subTrees[tree.activeInstance.instanceName]
    }
  }
}

function _treeSwitchPage (vars, treeName, instanceName) {
  var tree = vars.instanceTreeIndexes[treeName]
  var subTree

  if (tree) {
    var prevActiveInstance = tree.activeInstance
    var newActiveInstance = tree.pageInstances[instanceName]

    if (newActiveInstance) {
      if (_treeCheckVisibility(tree) && newActiveInstance != prevActiveInstance) {
        if (prevActiveInstance && vars.onHide) {
          vars.onHide(prevActiveInstance)
          // if has subtree, recurse hide event 
          subTree = tree.subTrees[prevActiveInstance.instanceName]
          _triggerTreeEvents(subTree, vars, 'hide')
        }
        if (vars.onShow) {
          vars.onShow(newActiveInstance)
          // if has subtree, traverse show event
          subTree = tree.subTrees[newActiveInstance.instanceName]
          _triggerTreeEvents(subTree, vars, 'show')
        }
      }
      tree.activeInstance = newActiveInstance;
      return {
        ...vars,
      }
    }
  }
}

function _treeActiveFrame (vars, treeName, isActive) {
  var tree = vars.instanceTreeIndexes[treeName]
  var subTree

  if (tree) {
    isActive = (isActive == null) ? !tree.frameActive : isActive
    if (tree.frameActive && !isActive) { // switch off
      if (_treeCheckVisibility(tree.parentTree))
        _triggerTreeEvents(tree, vars, 'hide')
      tree.frameActive = false
      return {...vars}
    }
    else
    if (!tree.frameActive && isActive) { // switch on
      tree.frameActive = true
      if (_treeCheckVisibility(tree.parentTree))
        _triggerTreeEvents(tree, vars, 'show')
      return {...vars}
    }
  }
}

function _triggerFirstShowEvent (vars) {
  if (!vars.useInstanceTree && vars.frameActive && vars.activeInstance && vars.onShow) {
    vars.onShow(vars.activeInstance)
  }
  else if (vars.useInstanceTree && vars.instanceTree.frameActive && vars.instanceTree.activeInstance && vars.onShow) {
    _triggerTreeEvents(vars.instanceTree, vars, 'show')
  }
}

var appFrameActions = {
  addPageClass: (vars, {className, componentClass, onShow, onHide, onClose}) => {
    var pageClass = new pageClassRegister(componentClass, {onShow, onHide, onClose})
    return {
      ...vars,
      pageClasses: {...vars.pageClasses, [className]: pageClass},
    }
  },
  setEventHandlers: (vars, {onShow, onClose, onHide}) => ({...vars, onShow, onClose, onHide}),
  createPageInstance: (vars, {treeName, className, isUnique, instanceName, title, suspendEvents}) => {
    var $ = vars.$;
    var useTree = Boolean(treeName);
    var subTree;
    var pageClass = vars.pageClasses[className];
    if (!pageClass)
      throw new Error(`Unknown class register "${className}" `);

    var tree = useTree ? vars.instanceTreeIndexes(treeName) : null
    if (useTree && !tree)
      return

    var frameVisible = (!useTree && vars.frameActive) || (useTree && _treeCheckVisibility(tree))

    var prevActiveInstance = useTree ? tree.activeInstance : vars.activeInstance

    var prevInstance = $.instancesByClass[className];
    if (isUnique && prevInstance) {
      if (useTree && prevInstance.tree != tree)
        return       
      if (!suspendEvents && frameVisible && prevActiveInstance && prevInstance != prevActiveInstance) {
        // show / hide events here
        if (!useTree) {
          if (prevActiveInstance && vars.onHide) {
            vars.onHide(prevActiveInstance)
          }
          if (prevInstance && vars.onShow) {
            vars.onShow(prevInstance)
          }
        }
        else {
          if (prevActiveInstance && vars.onHide) {
            vars.onHide(prevActiveInstance)
            // if has subtree, recurse hide event 
            subTree = tree.subTrees[prevActiveInstance.instanceName]
            _triggerTreeEvents(subTree, vars, 'hide')
          }
          if (vars.onShow) {
            vars.onShow(prevInstance)
            // if has subtree, traverse show event
            subTree = tree.subTrees[prevInstance.instanceName]
            _triggerTreeEvents(subTree, vars, 'show')
          }
        }
      }

      if (useTree) {
        tree.activeInstance = prevInstance
        return {...vars}
      }
      else {
        return {
          ...vars,
          activeInstance: prevInstance
        }
      }
    }
    if (!instanceName) {
      var cnt = $.instanceCounter[className] || 1;
      instanceName = 'frame_' + className + cnt.toString();
      $.instanceCounter[className] = cnt + 1;
    }

    var instance = new pageInstance(instanceName, className, pageClass, title);
    instance.tree = tree
    $.instancesByClass[className] = instance;

    if (!suspendEvents && frameVisible && prevActiveInstance != instance) {
      // show / hide events here
      if (!useTree) {
        if (prevActiveInstance && vars.onHide) {
          vars.onHide(prevActiveInstance)
        }
        if (instance && vars.onShow) {
          vars.onShow(instance)
        }
      }
      else {
        if (prevActiveInstance && vars.onHide) {
          vars.onHide(prevActiveInstance)
          // if has subtree, recurse hide event 
          subTree = tree.subTrees[prevActiveInstance.instanceName]
          _triggerTreeEvents(subTree, vars, 'hide')
        }
        if (vars.onShow) {
          vars.onShow(instance)
          // if has subtree, traverse show event
          // commented --> assuming new page always 'flat' not containing subtrees
          // subTree = tree.subTrees[instance.instanceName]
          // _triggerTreeEvents(subTree, vars, 'show')
        }
      }
    }
    if (useTree) {
      tree.activeInstance = instance
      tree.pageInstances = {...tree.pageInstances, [instanceName]: instance}
      return {...vars}
    }
    else {
      return {
        ...vars,
        pageInstances: {...vars.pageInstances, [instanceName]: instance},
        activeInstance: instance
      }
    }
  }, 

  deletePageInstance: (vars, {treeName, instanceName}) => {
    var useTree = Boolean(treeName)
    var tree = useTree ? vars.instanceTreeIndexes[treeName] : null
    var subTree

    if (useTree && !tree)
      return

    var pageInstances = useTree ? tree.pageInstances : {...vars.pageInstances}
    var pageInstance = pageInstances[instanceName]
    var frameVisible = useTree && _treeCheckVisibility(tree) || vars.frameActive

    if (pageInstance) {
      if (vars.onClose)
        vars.onClose(pageInstance);
      delete pageInstances[instanceName];
      delete vars.$.instancesByClass[pageInstance.className];
      if (!useTree)
        var newActiveInstance = (vars.activeInstance && vars.activeInstance.instanceName == instanceName) ? 
        ((Object.keys(pageInstances).length > 0) ? pageInstances[Object.keys(pageInstances)[0]] : null) : vars.activeInstance
      else
        var newActiveInstance = (tree.activeInstance && tree.activeInstance.instanceName == instanceName) ? 
        ((Object.keys(pageInstances).length > 0) ? pageInstances[Object.keys(pageInstances)[0]] : null) : tree.activeInstance

      if (frameVisible && vars.onShow)
        vars.onShow(newActiveInstance);

      if (!useTree) {
        return {...vars, pageInstances: pageInstances, activeInstance: newActiveInstance};
      }
      else {
        var subTree = tree.subTrees[newActiveInstance.instanceName]
        _triggerTreeEvents(subTree, vars, 'show')
        tree.pageInstances = pageInstances
        tree.activeInstance = newActiveInstance
        return {...vars}
      }
    }
    else
      return undefined;
  }, // todo: use treeName

  switchPage: (vars, {treeName, instanceName}) => {
    
    if (vars.useInstanceTree) {
      return _treeSwitchPage(vars, treeName, instanceName)
    }
    else {
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
    }
  },

  setFrameActive: (vars, {treeName, isActive}) => {

    if (vars.useInstanceTree) {
      return _treeActiveFrame(vars, treeName, isActive)
    }
    else {
      if (vars.frameActive && !isActive && vars.onHide && vars.activeInstance) {
        vars.onHide(vars.activeInstance);
      } else if (!vars.frameActive && isActive && vars.onShow && vars.activeInstance) {
        vars.onShow(vars.activeInstance);
      }
      return {...vars, frameActive: isActive}
    }
  },

  toggleFrameActive: (vars, {treeName}) => {
    if (!vars.useInstanceTree) {
      if (vars.frameActive && vars.onHide && vars.activeInstance) {
        vars.onHide(vars.activeInstance);
      } else if (vars.activeInstance) {
        vars.onShow(vars.activeInstance);
      }
      return {...vars, frameActive: !vars.frameActive}
    }
    else
      return _treeActiveFrame(vars, treeName, null)
  },

  setInstanceTree: (vars, {treeData}) => _setInstanceTree(vars, treeData),

  triggerFirstShowEvent: (vars) => _triggerFirstShowEvent(vars),

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
        frameVars = appFrameActions.createPageInstance(frameVars, {className, instanceName, title, isUnique: false, suspendEvents: true});
      }
      if (initFrames.length > 0 && !this.props.treeData)
        frameVars.activeInstance = frameVars.pageInstances[Object.keys(frameVars.pageInstances)[0]];
      if (Array.isArray(this.props.treeData)) {
        frameVars = appFrameActions.setInstanceTree(frameVars, {treeData: this.props.treeData})
      }
      // launch first event
      _triggerFirstShowEvent(frameVars)
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

function _connectFrameTree(vars, actions, ownProps) {
  var tree = vars.instanceTreeIndexes[ownProps.treeName]
  if (!tree) {
    return {
      frameActive: false,
      pageInstances: {},
      activeInstance: null,
      actions: actions
    }
  } else {
    return {
      frameActive: tree.frameActive,
      pageInstances: tree.pageInstances,
      activeInstance: tree.activeInstance,
      actions: actions
    }
  }
}

const AppFrame = ContextConnector(AppFrameContext, 
  (vars, actions, ownProps) => (
    vars.useInstanceTree ? _connectFrameTree(vars, actions, ownProps) : {
        frameActive: vars.frameActive,
        pageInstances: vars.pageInstances,
        activeInstance: vars.activeInstance,
        actions: actions,
      }
  )
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
    createPage: (className, instanceName, title, isUnique, treeName) => actions.sendAction('createPageInstance', {className, isUnique, instanceName, title, treeName}),
    deletePage: (instanceName) => actions.sendAction('deletePageInstance', {instanceName}),

      // switchPage: (instanceName) => actions.sendAction('switchPage', {instanceName}),
      switchPage: (instanceName, treeName,) => actions.sendAction('switchPage', {instanceName, treeName}),
      showModal: (params) => actions.sendAction('showModal', params),
    /* 
      available params:  
      headerClass, contentClass*, descClass, onClose, size, dimmer, closeIcon,
      headerProps, contentProps
      * = mandatory
    */
    closeModal: (result) => actions.sendAction('closeModal', {result}),
    setEventHandlers: ({onShow, onHide, onClose}) => actions.sendAction('setEventHandlers', {onShow, onHide, onClose}),
    triggerFirstShowEvent: () => actions.sendAction('triggerFirstShowEvent'),
    setMainFrameActive: (isActive) => actions.sendAction('setFrameActive', {treeName: '/', isActive}),
    setFrameActive: (treeName, isActive) => actions.sendAction('setFrameActive', {treeName, isActive}),
  }), ['addClass', 'createPage', 'deletePage', 'switchPage', 'showModal', 'closeModal', 
  'setEventHandlers', 'triggerFirstShowEvent', 'setMainFrameActive', 'setFrameActive']
)(AppFrameAction_Base);

class AppFrameAction extends React.Component {

  notifyActionFrame(actualObj) {
    var methodNames = ['addClass', 'createPage', 'deletePage', 'switchPage', 'showModal', 'closeModal', 
      'setEventHandlers', 'triggerFirstShowEvent', 'setMainFrameActive', 'setFrameActive'];
    for (var i = 0; i < methodNames.length; ++i)
      this[methodNames[i]] = actualObj.props[methodNames[i]];
  }

  render() {
    return <AppFrameActionF actionFrame={this} />
  }
}

export {AppFrame, AppModal, AppFrameProvider, AppFrameAction, AppFrameContext, PageFrame};
