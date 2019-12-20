import React from 'react';
import { ContextProvider, ContextConnector } from './appcontext.js';
import { WSConnectionAction } from './appnetwork.js';
import { AppFrameAction } from './appframe.js';
import { throwStatement } from '@babel/types';

const SERVER_URL = 'wss://bahana.ihsansolusi.co.id:12000';
const RECONNECT_TIME = 1000;

var BIPSAppVars = {
  loginState: false,
  loginRequestID: 0,
  networkState: false,
  loginErrState: false,
  loginErrReason: '',
  netAction: null,
  frameAction: null,
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
  },

  // warna className
  colorClass:"text-dark",

  // investment Board
  portofolios :[
      {code: 'AALI', avgPrice: '12,650', lastPrice: '12,550', lot: '12', share: '122', stock: '12,650,000', iconPl:'icofont icofont-caret-down', p: ' -60,240', l: '-0.40%'},
      {code: 'ADHI', avgPrice: '1,529', lastPrice: '1,429', lot: '10', share: '100', stock: '1,529,000', iconPl:'icofont icofont-caret-down', p: ' -15,000', l: '-1.50%'},
      {code: 'ANTM', avgPrice: '1,025', lastPrice: '1,025', lot: '2', share: '210', stock: '1,025,000', iconPl:'icofont icofont-caret-down', p: ' -25,000', l: '-2.50%'},
      {code: 'ASII', avgPrice: '7,125', lastPrice: '7,025', lot: '9', share: '930', stock: '7,125,000', iconPl:'icofont icofont-caret-down', p: ' -50,000', l: '-5.78%'},
      {code: 'BBCA', avgPrice: '27,400', lastPrice: '27,800', lot: '4', share: '410', stock: '27,400,000', iconPl:'icofont icofont-caret-up', p: ' +250,660', l: '2.50%'},
  ],

  isGrid:true,
  isManual:true,
  signupState : false,
  thememode : true,
  scaleState : "100",
  chatId : "",
  chartMode : false,
  stateLanding : '',

  //Penambahan untuk mode akun
  // zaky
  GeneralType: true,
    balanceOpt: 'cashBalance',
    balanceVal: '1,950,999,850,000',
    buyLimitVal: '9,000,000,000'
}

var BIPSAppActions = {
  setActionRefs: (vars, {netAction, frameAction}) => ({...vars, netAction, frameAction}),
  networkDisconnected: (vars) => ({...vars, loginState: false, networkState: false}),
  networkConnected: (vars) => ({...vars, loginState: false, networkState: true}),
  doLogin: (vars, {userID, password}) => {
    var text = JSON.stringify({action_type: 'LOGIN', user: userID, password: password});
    vars.netAction.send({text});
  },
  doSetFrameActive: (vars, {isActive}) => {vars.frameAction.setMainFrameActive(isActive);},
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
        vars.netAction.send({text: JSON.stringify(subsData)});
      }
      else if (prevFlag && !flag) {
        subsData = {
          action_type: 'UNSUBSCRIBE',
          sub_type: 'STOCK_SUMMARY',
          session_id: vars.sessionID,
          stock_code: ['TLKM', 'AALI', 'HOME', 'SRIL']
        }
        vars.netAction.send({text: JSON.stringify(subsData)});
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

  // action Landing
  handleView:(vars, {isGrid})=>({...vars, isGrid:!vars.isGrid}),

  // action trade
  handleManual:(vars, {isManual})=>({...vars, isManual:!vars.isManual}),

  // action login
  getLogin:(vars, {loginState})=>({...vars, loginState:!vars.loginState}),

  // state signup
  isSignup:(vars, {signupState})=>({...vars, signupState:!vars.signupState}),

  // state theme
  isNight:(vars, {thememode})=>({...vars, thememode:thememode}),

  // state Scale
  changeScale:(vars, {scaleState})=>({...vars, scaleState:scaleState}),

  // chat bot state
  changeIdChatBot:(vars, {chatId})=>({...vars, chatId:chatId}),

  // chart mode
  changeChartMode:(vars, {chartMode})=>({...vars, chartMode:chartMode}),

  // state for landing
  changeStateLanding:(vars, {stateLanding})=>({...vars, stateLanding:stateLanding}),

  //Penambahan untuk mode akun
  // zaky
  // chat bot state
  changeAccountType: (vars, { GeneralType }) => ({ ...vars, GeneralType: GeneralType }),

  changeBalanceOpt: (vars, { balanceOpt }) => ({ ...vars, balanceOpt: balanceOpt }),

// subscribe
  subscribeMsgSukses:(vars,{mess})=>{
      return({
          ...mess,
          mess:mess
      })
  },

  subscribeStock: (vars, {sessionID}) => {
      var message = JSON.stringify({
          action_type:'SUBSCRIBE',
          sub_type:'STOCK_SUMMARY',
          session_id:sessionID,
          data:['TLKM', 'AALI','HOME', 'BBMR','ANTM' ],});
      vars.networkAPI.send(message);
  },

  handleSubscribe:(vars, {isSubcribe})=>({...vars, isSubcribe:!vars.isSubcribe}),

  // Stock Summary
  updateStock: (vars, {stock_code, data}) => ({
      ...vars,
      stockSummary: {
          ...vars.stockSummary,
          [stock_code]: data
      }
  }),
}

const BIPSAppContext = React.createContext({});

class BIPSAppProvider extends React.Component {

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
        console.log("ini sess", msgData.session_id)
        this.appProvider.sendAction('loginSuccessful', {sessionID: msgData.sessionID});
        this.frameAction.setMainFrameActive(true);
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
      this.frameAction.setMainFrameActive(false);
      window.setTimeout(() => this.netAction.createAndConnect({url: SERVER_URL}), RECONNECT_TIME);
    }
    else {
      this.appProvider.sendAction('networkConnected');
    }
    // use this.appProvider.sendAction, 
    // to access vars of this provider
  }

  frameShow = (instance) => {
    // console.log(`Frame shown. Instance name ${instance.instanceName}, class name ${instance.className}`);
    if (instance.instanceName == 'stockSummaryPage')
      this.appProvider.sendAction('doSetSubscription', {subscriptionID: 'stockSummary', flag: true});
  }

  frameClose = (instance) => {
    // console.log(`Frame closed. Instance name ${instance.instanceName}, class name ${instance.className}`);
    if (instance.instanceName == 'stockSummaryPage')
      this.appProvider.sendAction('doSetSubscription', {subscriptionID: 'stockSummary', flag: false});
  }

  frameHide = (instance) => {
    // console.log(`Frame hidden. Instance name ${instance.instanceName}, class name ${instance.className}`);
    if (instance.instanceName == 'stockSummaryPage')
      this.appProvider.sendAction('doSetSubscription', {subscriptionID: 'stockSummary', flag: false});
  }

  componentDidMount () {

    /* make link frame and net API */    
    this.appProvider.sendAction('setActionRefs', {netAction: this.netAction, frameAction: this.frameAction})

    /* set frame event handlers here */
    // console.log(this.frameAction);
    this.frameAction.setEventHandlers({onShow: this.frameShow, onHide: this.frameHide, onClose: this.frameClose});

    /* set network event handlers here */
    this.netAction.setEventHandlers({
      onMessageHandler: this.messageHandler, 
      onConnectionState: this.connectionState
    });

    /* init connection to host */
    this.netAction.createAndConnect({url: SERVER_URL}); 

    /* set frameActive status to false */
    this.frameAction.setMainFrameActive(false);
  }

  render () {
    console.log('BIPSAppProvider rendered');
    return (
      <ContextProvider ref={(value) => {this.appProvider = value;}} context={BIPSAppContext} vars={BIPSAppVars} actions={BIPSAppActions}>
        <AppFrameAction ref={(value) => {this.frameAction = value;}} />
        <WSConnectionAction ref={(value) => {this.netAction = value;}} />        
        {this.props.children}
      </ContextProvider>
    );
  };
} 

export { BIPSAppProvider, BIPSAppContext };
