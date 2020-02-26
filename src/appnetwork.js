import React from 'react';
import { ContextProvider, ContextConnector } from './appcontext.js';
import Websocket from 'react-websocket';

var NetAppVars = {
  socketFlag: false,
  state: 'disconnected', // possible values of state: disconnected, connected, connecting
  url: 'wss://',
  // url: 'ws://',
  socket: null, // instance of web socket component object
  onMessageArrive: null, // function (message, socketID)
  onNetworkConnection: null, // function (isConnected, url, socketID)
  extSockets: {} /* 
    extension sockets, named by socket ID, where each sockets has the following attributes:
    - socketFlag
    - state
    - url
    - socket
  */
}

function handleCreateAndConnect(vars, url, socketID) {
  return (
    socketID ? {
      ...vars,
      extSockets: {
        ...vars.extSockets,
        [socketID]: {
            url,
            socketFlag: true,
            state: 'connecting',
            socket: null
        }
      }
    } :
    {
      ...vars, 
      url, 
      socketFlag: true, 
      state: 'connecting'
    }
  )
}

function handleDisconnect(vars, socketID) {
  return (
    socketID ? {
      ...vars, 
      extSockets: {
        ...vars.extSockets, 
        [socketID]: {
          ...(vars.extSockets[socketID]), 
          socketFlag: false, 
          state: 'disconnected'
        }
      }
    } : 
    {
      ...vars, 
      socketFlag: false, 
      state: 'disconnected'
    }
  )
}

function handleMessageArriveEvt(vars, message, socketID) {
  if (vars.onMessageArrive)
    vars.onMessageArrive(message, socketID);
}

function handleSend(vars, text, socketID) {
  var socket = socketID ? vars.extSockets[socketID].socket : vars.socket;
  var connState = socketID ? vars.extSockets[socketID].state : vars.state;
  if (socket && connState == 'connected') {
    // //-- perflog
    // if (text.indexOf('{"action_type":"SUBSCRIBE"') == 0) {
    //   console.log('SUBS: ' + text);
    // }
    // else if (text.indexOf('{"action_type":"UNSUBSCRIBE"') == 0) {
    //   console.log('UNSUBS: ' + text);
    // }
    socket.sendMessage(text);
  }
}

function handleConnectionEvent(vars, isConnected, wsObject, socketID) {

  if (vars.onNetworkConnection) 
    vars.onNetworkConnection(isConnected, vars.url, socketID);

  return (
    socketID ?
      {
        ...vars,
        extSockets: {
          ...vars.extSockets,
          [socketID]: {
            ...(vars.extSockets[socketID]),
            state: isConnected ? 'connected' : 'disconnected',
            socket: wsObject,
            socketFlag: isConnected
          }
        }
      } :   
      {
        ...vars, 
        state: isConnected ? 'connected' : 'disconnected', 
        socket: wsObject,
        socketFlag: isConnected
      }
  )
}

function handleGetState(vars, outs, socketID) {

  if (typeof(outs) != 'object' || Array.isArray(outs))
    return

  var dataSrc = (!socketID) ? vars : (socketID in vars.extSockets ? vars.extSockets[socketID] : {})
  outs.state = dataSrc.state || 'disconnected' // set default to 'disconnected'
  outs.url = dataSrc.url || ''
  outs.socket = dataSrc.socket || null
}

var NetAppActions = {
  getState: (vars, {outVars, socketID}) => handleGetState(vars, outVars, socketID),
  createAndConnect: (vars, {url, socketID}) => handleCreateAndConnect(vars, url, socketID),
  disconnect: (vars, {socketID}) => handleDisconnect(vars, socketID),
  send: (vars, {text, socketID}) => handleSend(vars, text, socketID),
  connectionEvt: (vars, {isConnected, wsObject, socketID}) => (handleConnectionEvent(vars, isConnected, wsObject, socketID)),
  messageArriveEvt: (vars, {message, socketID}) => handleMessageArriveEvt(vars, message, socketID),
  setEventHandlers: (vars, {onMessageHandler, onConnectionState}) => (
    {...vars, onMessageArrive: onMessageHandler, onNetworkConnection: onConnectionState}
  ),
}

const NetAppContext = React.createContext({});

const NetAppProvider = (props) => (
  <ContextProvider context={NetAppContext} vars={NetAppVars} actions={NetAppActions}>
    {props.children}
  </ContextProvider>
);

// expected props:
// in:
// - socketFlag
// - url
// - socketID (optional)
// event:
// - connectionEvt(isConnected, wsobject, socketID)
// - setConnected(connected: true/false, socketID)
// - messageArriveEvt(message, socketID)

class WSConnection_Base extends React.Component {
  constructor (props) {
    super(props);
  }

  onOpen = (e) => {
    this.props.connectionEvt(true, this.refs.wsObject, this.props.socketID);
  }

  onClose = (e) => {
    this.props.connectionEvt(false, null, this.props.socketID);
  }

  onMessage = (message) => {
    this.props.messageArriveEvt(message, this.props.socketID);
  }

  render() {
    //console.log(`WSConnection component. SocketID [${this.props.socketID}]: `, (this.props.socketFlag ? 'Flag = TRUE' : 'Flag = FALSE'));
    return (
      this.props.socketFlag ?
        (
          <Websocket 
            ref="wsObject"
            url={this.props.url}
            reconnect={false}
            onMessage={this.onMessage}
            onOpen={this.onOpen}
            onClose={this.onClose}
          />
        ) 
        : 
        <></>
    )
  }
}

const WSConnection = ContextConnector(NetAppContext, (vars, act, props) => ({
  socketID: props.socketID,
  socketFlag: (!props.socketID) ? vars.socketFlag : 
    (props.socketID in vars.extSockets && vars.extSockets[props.socketID].socketFlag),
  url: (!props.socketID) ? vars.url : (
    props.socketID in vars.extSockets ? vars.extSockets[props.socketID].url : ''
  ), 
  connectionEvt: (isConnected, wsObject, socketID) => act.sendAction('connectionEvt', {isConnected, wsObject, socketID}),
  messageArriveEvt: (message, socketID) => act.sendAction('messageArriveEvt', {message, socketID}),
}), ['connectionEvt', 'messageArriveEvt'])(WSConnection_Base);

const WSConnectionActionF = ContextConnector(NetAppContext, 
  (vars, actions, ownProps) => ({
    connectionState: vars.state,
    getState: (socketID) => {
      var outs = {}
      actions.sendAction('getState', {outVars: outs, socketID: ownProps.socketID ? ownProps.socketID : socketID})
      return outs
    },     
    createAndConnect: ({url, socketID}) => {
      actions.sendAction('createAndConnect', {url, socketID: ownProps.socketID ? ownProps.socketID : socketID})
    },
    disconnect: (socketID) => 
      actions.sendAction('disconnect', {socketID: ownProps.socketID ? ownProps.socketID : socketID}),
    send: ({text, socketID}) => actions.sendAction('send', {text, socketID: ownProps.socketID ? ownProps.socketID : socketID}),
    setEventHandlers: ({onMessageHandler, onConnectionState}) => {
      actions.sendAction('setEventHandlers', {onMessageHandler, onConnectionState})
    }
  }),
  ['getState', 'createAndConnect', 'disconnect', 'send', 'setEventHandlers']
)(
  (props) => {
    props.actionWS.notifyActionWS(props);
    return <></>;
  }
);

class WSConnectionAction extends React.Component {

  notifyActionWS(passedProps) {
    var propNames = ['getState', 'createAndConnect', 'disconnect', 'send', 'setEventHandlers', 'connectionState'];
    for (var i = 0; i < propNames.length; ++i)
      this[propNames[i]] = passedProps[propNames[i]];
  }

  render() {
    return <WSConnectionActionF actionWS={this} socketID={this.props.socketID} />
  } 
}

export { NetAppProvider, NetAppContext, WSConnection, WSConnectionAction };
