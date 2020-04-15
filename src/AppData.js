import React from 'react';
import { ContextProvider, ContextConnector } from './appcontext.js';
import { WSConnectionAction } from './appnetwork.js';
import { AppFrameAction } from './appframe.js';
import { throwStatement } from '@babel/types';

const SERVER_URL = 'wss://bahana.ihsansolusi.co.id:12000';
var SERVER_URL2 = 'wss://bahana.ihsansolusi.co.id:5050';

const RECONNECT_TIME = 1000;

var BIPSAppVars = {
  loginState: false,
  loginRequestID: 0,
  networkState: false,
  loginErrState: false,
  loginErrReason: '',
  netAction: null,
  frameAction: null,
  netActionAux: null,
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
  buyLimitVal: '9,000,000,000',

  // Stream Chart
  codeSearchMarketIndex:'',
  timeChart:'',
  streamChart:'',
  streamStatus:false, 
  firstDataStream:'',

  //multichart
  addressMultiVal: 0,

  // range data 
  rangeStockTradeHistory:{start:"26/12/2020",to:"26/3/2020"},

  // Modal Alert
  msgAlert3:'',
  statusAlertC:false,
  statusAlertN:false,

}

var BIPSAppActions = {
  setActionRefs: (vars, {netAction, frameAction, netActionAux,}) => ({...vars, netAction, frameAction, netActionAux,}),
  networkDisconnected: (vars) => ({...vars, loginState: false, networkState: false}),
  networkConnected: (vars) => ({...vars, loginState: false, networkState: true}),
  doLogin: (vars, {userID, password}) => {
      var text = JSON.stringify({action_type: 'LOGIN', user: userID, password: password, terminal:"web"});
    vars.netAction.send({text});
    return{...vars, userName:userID}
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
  loginSuccessful: (vars, {sessionID}) => {
    vars.netActionAux.send({text:JSON.stringify({"user":vars.userName,"session_id":sessionID, "stringify":"true"})})
    return {...vars, sessionID: sessionID, loginState: true, loginErrState: false, loginErrReason: ''}},
  loginFail: (vars, {reason}) => ({...vars, loginState: false, loginErrState: true, loginErrReason: reason}),
  getLoginRequestID: (vars, {cbRequestID}) => {
    var cid = vars.loginRequestID;
    cbRequestID(cid);
    return {...vars, loginRequestID: cid + 1}
  },

  // action Landing
    handleView:(vars, {isGrid})=>({...vars, isGrid:!vars.isGrid}),

    // action change chart
    handleMultiChart:(vars, {addressMultiVal})=>({...vars, addressMultiVal: addressMultiVal}),

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
  // handle Stream Chart
  // handle onclick Stream Chart
  handleStreamChart:(vars,{streamStatus})=>{
    if(!streamStatus){
      console.log("ini handle stream yang baru", streamStatus,vars.codeSearchMarketIndex)
      vars.netActionAux.send({text:JSON.stringify({"action_type": "SUBSCRIBE","sub_type": "INDEXPERIODIC", "code": vars.codeSearchMarketIndex})})           
    } else{
      vars.netActionAux.send({text:JSON.stringify({"action_type": "UNSUBSCRIBE","sub_type": "INDEXPERIODIC", "code": vars.codeSearchMarketIndex})})
    }
    return {
      ...vars, streamStatus:!vars.streamStatus
    }
  },

  handleSearchCode:(vars,{newCode})=>{
    return{...vars, codeSearchMarketIndex:newCode.toUpperCase()}
  },

  //Response data Stream 
  updateSubscribeStringReplay : (vars, {data})=>{
    let arrData = data.split("#")
    if(arrData[1] === 'INDEXPERIODIC'){
      return{...vars, streamChart:arrData[3], timeChart:arrData[2]}
    }
  },

  // Modal Alert
  handleStatusAlert3:(vars, {type, statusAlert,msg, data})=>{
    if(type === 'noConfirm'){      
      return{...vars, statusAlertN:!vars.statusAlertN, msgAlert3:msg}
    }else{
      if(msg === 'noSave'){
        vars.frameAction.closeModal(100)
      }
      return{...vars, statusAlertC:!vars.statusAlertC, msgAlert3:msg, ieudata:data}
    }
  },
}

const BIPSAppContext = React.createContext({});

class BIPSAppProvider extends React.Component {

  constructor (props) {
    super(props);
    this.appProvider = null; // will be set when ContextProvider is rendered
    this.netAction = null;
    this.frameAction = null;
    this.netActionAux = null;
  }

  messageHandler = (msg, socketID) => {
    // console.log('BIPSAppProvider.messageHandler(). socketID',socketID,' Message = ', msg);    
    if (socketID === undefined) {
      let msgData;
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
          console.log("LOGIN Ke 12000 Berhasil")
          this.appProvider.sendAction('loginSuccessful', {sessionID: msgData.session_id});
          this.frameAction.setMainFrameActive(true);
        }
        else if(msgData.status === "AUTH-FAIL"){
          console.log("LOGIN Ke 12000 Gagal")  
          this.appProvider.sendAction('loginFail', {reason: msgData.reason});
        }
      }
    }
    else{
      if(!msg.includes("action_type")){
        this.appProvider.sendAction('updateSubscribeStringReplay', {data: msg});
      }else{
        let msgData = JSON.parse(msg);
        //============= call action LOGIN =============  
        if (msgData.action_type === 'DF-RESPONSE') {
          if (msgData.status == 'OK') {                  
            console.log("LOGIN Ke 5050 Berhasil")             
          }else{
            console.log("LOGIN Ke 5050 Gagal")
          }
        }
      }
    }

    // use this.appProvider.sendAction, 
    // to access vars of this provider
  }

  connectionState = (isConnected, url, socketID) => {
    console.log('BISAppProvider.connectionState invoked ', isConnected ? 'Connected' : 'Disconnected', "socketID",socketID);
    // if fall to disconnected state then retry connection
    if(socketID ==undefined){
      if (!isConnected) {
        this.appProvider.sendAction('networkDisconnected');
        console.log(`Koneksi ke 1200 putus => Reconnecting in ${RECONNECT_TIME / 1000} seconds...`);
        this.frameAction.setMainFrameActive(false);
        // window.location.reload(); 
        window.setTimeout(() => this.netAction.createAndConnect({url: SERVER_URL}), RECONNECT_TIME);
      }
      else {  
        if (!isConnected) {  
          console.log(`Koneksi ke 1200 putus`) 
        }else{   
          this.appProvider.sendAction('networkConnected');
        }
      }
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
    this.appProvider.sendAction('setActionRefs', {netAction: this.netAction, frameAction: this.frameAction, netActionAux: this.netActionAux, })

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
    this.netActionAux.createAndConnect({url: SERVER_URL2}); 

    /* set frameActive status to false */
    this.frameAction.setMainFrameActive(false);
  }

  render () {
    console.log('BIPSAppProvider rendered');
    return (
      <ContextProvider ref={(value) => {this.appProvider = value;}} context={BIPSAppContext} vars={BIPSAppVars} actions={BIPSAppActions}>
        <AppFrameAction ref={(value) => {this.frameAction = value;}} />
        <WSConnectionAction ref={(value) => {this.netAction = value;}} />        
         {/*for ws 2  */}
          <WSConnectionAction ref={(value) => {this.netActionAux = value;}} socketID="aux" />  
        {this.props.children}
      </ContextProvider>
    );
  };
} 

export { BIPSAppProvider, BIPSAppContext };
