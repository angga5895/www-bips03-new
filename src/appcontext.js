// This source contains global application states to be shared across applications
import React from 'react';

const stateTemplate = {
  vars: {},
};

// this actionTemplate will be copied to state as property 'actions'
// make sure to use ... (spread) notation to clone actionTemplate object, unless it will interfere for each
// Provider !

const actionTemplate = {
  init: function(circProvider, circState, actionDefs) {
    this.provider = circProvider;
    this.state = circState;
    this.actionDefs = {...actionDefs};
    // console.log('actionDefs init');
    // console.log(actionDefs);
  },

  __updateStateVars: function(newVars) {
    var newState = {vars: newVars};
    newState.actions = this;
    this.state = newState;
    // console.log('newState: ');
    // console.log(newState);
    this.provider.setState(newState);
  },

  sendAction: function(actionName, parameter, internUpdateOnly = false) {
    var action = this.actionDefs[actionName];
    // console.log('sendAction executed');
    // console.log('actionDefs');
    // console.log(this.actionDefs);
    if (typeof(action) != 'function')
      throw new Error(`Action "${actionName}" is not defined`);
    if (this.state.vars.__DEBUGACTION__) {
      if (typeof(this.actionDefs.debug) == 'function') {
        this.actionDefs.debug(actionName, parameter);
      }
    }
    
    var newVars = action.call(null, this.state.vars, parameter);
    // console.log('sendAction. newVars: ' + Object.keys(newVars).toString());
    if (newVars != undefined && newVars != null && newVars != this.state.vars) {
      if (!internUpdateOnly)
        this.__updateStateVars(newVars);
      else {
        this.state.vars = newVars;
      }
    }
  },

  updateVar: function(keyName, newValue) {
    if (this.state.vars[keyName] !== newValue) {
      var newVars = {...this.state.vars, [keyName]: newValue};
      this.__updateStateVars(newVars);
    }
  },

  updateVars: function(varSets) {
    var newVars = {...this.state.vars, ...varSets};
    this.__updateStateVars(newVars);
  }
}

const AppContext = React.createContext({});

class ContextProvider extends React.Component {
  constructor (props) {
    var initVars;

    super(props);
    this.dataContext = props.context;
    if (props.initActions && Array.isArray(props.initActions)) {
      initVars = props.vars;
      for (var i = 0; i < props.initActions.length; ++i) {
        var initAction = props.initActions[i];
        if (!Array.isArray(initAction) || initAction.length == 0)
          throw new Error('each member of initActions must be array');
        var actionName = initAction[0];
        var action = props.actions[actionName];
        if (typeof(action) != 'function')
          throw new Error(`initActions: Action "${actionName}" is not defined`);
        var nextVars = action.call(null, initVars, initAction[1]);
        initVars = nextVars || initVars; 
      }
    }
    else
      initVars = props.vars;
    this.state = {...stateTemplate, vars: initVars, provider: this, actions: {...actionTemplate}};
    var actionDefs = props.actions;
    this.state.actions.init(this, this.state, actionDefs);
  }

  sendAction(actionName, parameter, internUpdateOnly = false) {
    this.state.actions.sendAction(actionName, parameter, internUpdateOnly);
  }

  updateVar(keyName, newValue) {
    this.state.actions.updateVar(keyName, newValue);
  }

  updateVars(varSets) {
    this.state.actions.updateVars(varSets);
  }

  render() {
    var ThisProvider = this.dataContext.Provider;
    return (
      <ThisProvider value={this.state}>
        {this.props.children}
      </ThisProvider>
    );
  }
}

function areEqualShallow(a, b, excludedA = [], excludedB = []) {
  // copied from stackoverflow@Paul Draper
  // https://stackoverflow.com/questions/22266826/how-can-i-do-a-shallow-comparison-of-the-properties-of-two-objects-with-javascri/47532787
  var key;
  for(key in a) {
      if((excludedA.indexOf(key) < 0) && (!(key in b) || a[key] !== b[key])) {
          return false;
      }
  }
  for(key in b) {
      if((excludedB.indexOf(key) < 0) && (!(key in a) || a[key] !== b[key])) {
          return false;
      }
  }
  return true;
}

class ContextConsumerFilter extends React.Component {

  /*
    props documentation:
    mapper: function(vars, actions, ownProps) {return undefined || newVars}
    contentClass: instanceof(React.Component) || function(props)
    excludedProps: [] // of update-check-excluded property names
    ownProps: {} 
  */

  constructor (props) {
    super(props);
    this.mapper = typeof(props.mapper) == 'function' ? props.mapper : ((vars, actions, ownProps) => undefined);
    this.contentProps = this.mapper(props.vars, props.actions, props.ownProps);
    this.contentClass = props.contentClass;
    this.excludedProps = props.excludedProps || [];
    this.ownProps = props.ownProps;
  }

  shouldComponentUpdate(nextProps, nextState) {
    var newContentProps = this.mapper(nextProps.vars, nextProps.actions, this.props.ownProps);
    
    // console.log('ContextConsumerFilter.shouldComponentUpdate started');    
    // console.log('newContentProps');
    // console.log(newContentProps);
    // console.log('this.contentProps');
    // console.log(this.contentProps);

    var result = !areEqualShallow(newContentProps, this.contentProps, this.excludedProps, this.excludedProps);
    // console.log('ContextConsumerFilter.shouldComponentUpdate result: ' + (result ? 'yes' : 'no'));
    if (result) {
      this.contentProps = newContentProps;
    }
    return result;
  }

  render() {
    var ContentClass = this.contentClass;
    // console.log('ContextConsumerFilter.render() called');
    // console.log(this.props.contentChildren);
    return (
      <>
        <ContentClass {...this.contentProps} {...this.ownProps}>
          {this.props.contentChildren}
        </ContentClass>   
      </>
    )
  }
}

function ContextConnector(Context, mapF, excludedProps = []) {
  return (
    (ContentClass) => (props) => (
      <Context.Consumer>
          {
            (state) => (
              <ContextConsumerFilter 
                vars={state.vars}
                mapper={mapF}
                excludedProps={excludedProps}
                actions={state.actions}
                contentClass={ContentClass}
                contentChildren={props.children}
                ownProps={props}
              />
            )
          }
      </Context.Consumer>
    )
  );
}

class AppContextProvider extends ContextProvider {
  constructor (props) {
    super(props);
    this.dataContext = AppContext;
  }
}

const AppContextConnector = (mapF) => ContextConnector(AppContext, mapF);

export {ContextProvider, ContextConnector, AppContextProvider, AppContextConnector};

