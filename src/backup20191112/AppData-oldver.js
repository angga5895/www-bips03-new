import React from 'react';
import { ContextProvider, ContextConnector } from './appcontext.js';
import { NetAppContext, WSConnectionAction } from './appnetwork.js';
import { AppFrameContext, AppFrameAction } from './appframe.js';
import { throwStatement } from '@babel/types';

const SERVER_URL = 'ws://bahana.ihsansolusi.co.id:5050';
const RECONNECT_TIME = 1000;

var BIPSAppVars = {
  loginState: false,
  loginRequestID: 0,
  networkState: false,
  loginErrState: false,
  loginErrReason: '',
  networkAPI: {
    send: (msg) => {},
    disconnect: () => {},
  },
  frameAPI: {
    setFrameActive: (isActive) => {}
  },
  userID: '',
  sessionID: '',
  subscriptionFlags: {
    stockSummary: false,
    portfolio: false,
    runningTrace: false,
  },
  stockSummary: {
    'AALI': {
      prev_price: 0,
      last_price: 0,
      open_price: 0,
      low_price: 0,
      high_price: 0,
      traded_volume: 0,
      traded_frequency: 0,
      change: 0
    }
  }
}

var BIPSAppActions = {
  setNetworkAPI: (vars, {send, disconnect}) => ({...vars, networkAPI: {send, disconnect}}),
  setFrameAPI: (vars, {setFrameActive}) => ({...vars, frameAPI: {setFrameActive}}),
  networkDisconnected: (vars) => ({...vars, loginState: false, networkState: false}),
  networkConnected: (vars) => ({...vars, loginState: false, networkState: true}),
  doLogin: (vars, {userID, password}) => {
    var message = JSON.stringify({action_type: 'LOGIN', user: userID, password: password});
    vars.networkAPI.send(message);
  },
  doSetFrameActive: (vars, {isActive}) => {vars.frameAPI.setFrameActive(isActive);},
  doSetSubscription: (vars, {subscriptionID, flag}) => {
    var prevFlag = vars.subscriptionFlags[subscriptionID];
    var subsData;

    if (prevFlag == undefined)
      return;
    if (subscriptionID == 'stockSummary') {
      if (!prevFlag && flag) { // switch on
        subsData = {
          action_type: 'SUBSCRIBE',
          sub_type: 'STOCK_SUMMARY',
          session_id: vars.sessionID,
          stock_code: ['TLKM', 'AALI', 'HOME', 'SRIL']
        }
        vars.networkAPI.send(JSON.stringify(subsData));
      }
      else if (prevFlag && !flag) {
        subsData = {
          action_type: 'UNSUBSCRIBE',
          sub_type: 'STOCK_SUMMARY',
          session_id: vars.sessionID,
          stock_code: ['TLKM', 'AALI', 'HOME', 'SRIL']
        }
        vars.networkAPI.send(JSON.stringify(subsData));
      }
    }
    if (prevFlag != flag)  
      return {...vars, subscriptionFlags: {...vars.subscriptionFlags, [subscriptionID]: flag}}
  },
  loginSuccessful: (vars, {sessionID}) => ({...vars, sessionID: sessionID, loginState: true, loginErrState: false, loginErrReason: ''}),
  loginFail: (vars, {reason}) => ({...vars, loginState: false, loginErrState: true, loginErrReason: reason}),
  getLoginRequestID: (vars, {cbRequestID}) => {
    var cid = vars.loginRequestID;
    cbRequestID(cid);
    return {...vars, loginRequestID: cid + 1}
  },
  updateStock: (vars, {stock_code, data}) => ({
    ...vars,
    stockSummary: {
      ...vars.stockSummary,
      [stock_code]: data
    }
  }),
}

const BIPSAppContext = React.createContext({});

class BIPSAppProvider_Base extends React.Component {

  constructor (props) {
    super(props);
    this.appProvider = null; // will be set when ContextProvider is rendered
    this.netAction = null;
    this.frameAction = null;
  }

  messageHandler = (msg) => {
    console.log('BISAppProvider.messageHandler(). Message = ', msg);
    var msgData;
    try {
      msgData = JSON.parse(msg);
    }
    catch {
      console.log('Invalid JSON: ', msg);
      return;
    }

    if (msgData.action_type == 'UPDATE') {
      if (msgData.sub_type == 'STOCK_SUMMARY') 
        this.appProvider.sendAction('updateStock', {stock_code: msgData.stock_code, data: msgData.data || {}});
    }
    else if (msgData.action_type == 'LOGIN-RESPONSE') {
      if (msgData.status == 'OK') {
        this.appProvider.sendAction('loginSuccessful', {sessionID: msgData.sessionID});
        this.props.setFrameActive(true);
      }
      else
        this.appProvider.sendAction('loginFail', {reason: msgData.reason});
    }

    // use this.appProvider.sendAction, 
    // to access vars of this provider
  }

  connectionState = (isConnected, url) => {
    console.log('BISAppProvider.connectionState invoked ', isConnected ? 'Connected' : 'Disconnected');
    // if fall to disconnected state then retry connection
    if (!isConnected) {
      this.appProvider.sendAction('networkDisconnected');
      console.log(`Reconnecting in ${RECONNECT_TIME / 1000} seconds...`);
      //-- temporarily disabled //this.props.setFrameActive(false);
      //-- temporarily disabled //window.setTimeout(() => this.props.netConnect(), RECONNECT_TIME);
    }
    else {
      this.appProvider.sendAction('networkConnected');
    }
    // use this.appProvider.sendAction, 
    // to access vars of this provider
  }

  frameShow = (instance) => {
    console.log(`Frame shown. Instance name ${instance.instanceName}, class name ${instance.className}`);
    if (instance.instanceName == 'stockSummaryPage')
      this.appProvider.sendAction('doSetSubscription', {subscriptionID: 'stockSummary', flag: true});
  }

  frameClose = (instance) => {
    console.log(`Frame closed. Instance name ${instance.instanceName}, class name ${instance.className}`);
    if (instance.instanceName == 'stockSummaryPage')
      this.appProvider.sendAction('doSetSubscription', {subscriptionID: 'stockSummary', flag: false});
  }

  frameHide = (instance) => {
    console.log(`Frame hidden. Instance name ${instance.instanceName}, class name ${instance.className}`);
    if (instance.instanceName == 'stockSummaryPage')
      this.appProvider.sendAction('doSetSubscription', {subscriptionID: 'stockSummary', flag: false});
  }

  componentDidMount () {

    /* make link to certain frame APIs */
    this.appProvider.sendAction('setFrameAPI', {setFrameActive: this.props.setFrameActive})

    /* set frame event handlers here */
    this.props.setFrameEventHandlers({onShow: this.frameShow, onHide: this.frameHide, onClose: this.frameClose});

    /* make link to certain net APIs */
    this.appProvider.sendAction('setNetworkAPI', {send: this.props.netSend, disconnect: this.props.netDisconnect})

    /* set network event handlers here */
    this.props.netSetEventHandlers({
      onMessageHandler: this.messageHandler, 
      onConnectionState: this.connectionState
    });

    /* init connection to host */
    this.props.netConnect(); 

    /* set frameActive status to false */
    //-- temporarily disabled //this.props.setFrameActive(false);
    /* init frame show event */
    this.frameAction.triggerFirstShowEvent();
  }

  render () {
    console.log('BIPSAppProvider rendered');
    return (
      <ContextProvider ref={(value) => {this.appProvider = value;}} context={BIPSAppContext} vars={BIPSAppVars} actions={BIPSAppActions}>
        <WSConnectionAction ref={(value) => {this.netAction = value;}} />
        <AppFrameAction ref={(value) => {this.frameAction = value;}} />
        {this.props.children}
      </ContextProvider>
    );
  };
} 

const BIPSAppProvider = ContextConnector(AppFrameContext, 
  (vars, actions, props) => ({
    frameActive: vars.frameActive, 
    setFrameActive: (isActive) => {actions.sendAction('setFrameActive', {treeName: '/', isActive})},
    setFrameEventHandlers: ({onShow, onHide, onClose}) => {actions.sendAction('setEventHandlers', {onShow, onHide, onClose})}
  }),
  [
    'setFrameActive', 'setFrameEventHandlers'
  ]
)
(ContextConnector(NetAppContext, 
  (vars, actions, props) => ({
    netConnect: () => {actions.sendAction('createAndConnect', {url: SERVER_URL})},
    netSend: (msg) => {actions.sendAction('send', {text: msg}) },
    netDisconnect: () => {actions.sendAction('disconnect', {}) },
    netSetEventHandlers: ({onMessageHandler, onConnectionState}) => {
      actions.sendAction('setEventHandlers', {onMessageHandler, onConnectionState})
    }
  }), 
  ['netConnect', 'netSend', 'netDisconnect', 'netSetEventHandlers']
)(BIPSAppProvider_Base));


export { BIPSAppProvider, BIPSAppContext };
