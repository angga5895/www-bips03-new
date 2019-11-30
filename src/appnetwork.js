import React from 'react';
import { ContextProvider, ContextConnector } from './appcontext.js';
import Websocket from 'react-websocket';

var NetAppVars = {
  socketFlag: false,
  state: 'disconnected', // possible values of state: disconnected, connected, connecting
  url: 'wss://',
  socket: null,
  onMessageArrive: null, // function (message)
  onNetworkConnection: null, // function (isConnected)
}

function handleMessageArriveEvt(vars, message) {
  if (vars.onMessageArrive)
    vars.onMessageArrive(message);
}

function handleSend(vars, text) {
  var socket = vars.socket;
  if (socket && vars.state == 'connected')
    socket.sendMessage(text);
}

function handleConnectionEvent(vars, isConnected, wsObject) {

  if (vars.onNetworkConnection) 
    vars.onNetworkConnection(isConnected, vars.url);

  return {
    ...vars, 
    state: isConnected ? 'connected' : 'disconnected', 
    socket: wsObject,
    socketFlag: isConnected
  }
}

var NetAppActions = {
  createAndConnect: (vars, {url}) => {
    return(
      {...vars, url, socketFlag: true, state: 'connecting'}
    )
  },
  disconnect: (vars, {}) => ({...vars, socketFlag: false, state: 'disconnected'}),
  send: (vars, {text}) => handleSend(vars, text),
  connectionEvt: (vars, {isConnected, wsObject}) => (handleConnectionEvent(vars, isConnected, wsObject)),
  messageArriveEvt: (vars, {message}) => handleMessageArriveEvt(vars, message),
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
// event:
// - connectionEvt(isConnected, wsobject)
// - setConnected(connected: true/false)
// - messageArriveEvt(message)

class WSConnection_Base extends React.Component {
  constructor (props) {
    super(props);
  }

  onOpen = (e) => {
    this.props.connectionEvt(true, this.refs.wsObject);
  }

  onClose = (e) => {
    this.props.connectionEvt(false, null);
  }

  onMessage = (message) => {
    // console.log('Data received from websocket: ', message);
    this.props.messageArriveEvt(message);
  }

  render() {
    console.log('WSConnection component: ', (this.props.socketFlag ? 'Flag = TRUE' : 'Flag = FALSE'));
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
  socketFlag: vars.socketFlag,
  url: vars.url,
  connectionEvt: (isConnected, wsObject) => act.sendAction('connectionEvt', {isConnected, wsObject}),
  messageArriveEvt: (message) => act.sendAction('messageArriveEvt', {message}),
}), ['connectionEvt', 'messageArriveEvt'])(WSConnection_Base);

const WSConnectionActionF = ContextConnector(NetAppContext, 
  (vars, actions, ownProps) => ({
    connectionState: vars.state,
    createAndConnect: ({url}) => actions.sendAction('createAndConnect', {url}),
    disconnect: () => actions.sendAction('disconnect', {}),
    send: ({text}) => actions.sendAction('send', {text}),
    setEventHandlers: ({onMessageHandler, onConnectionState}) => {
      actions.sendAction('setEventHandlers', {onMessageHandler, onConnectionState})
    }
  }),
  ['createAndConnect', 'disconnect', 'send', 'setEventHandlers']
)(
  (props) => {
    props.actionWS.notifyActionWS(props);
    return <></>;
  }
);

class WSConnectionAction extends React.Component {

  notifyActionWS(passedProps) {
    var propNames = ['createAndConnect', 'disconnect', 'send', 'setEventHandlers', 'connectionState'];
    for (var i = 0; i < propNames.length; ++i)
      this[propNames[i]] = passedProps[propNames[i]];
  }

  render() {
    return <WSConnectionActionF actionWS={this} />
  } 
}

export { NetAppProvider, NetAppContext, WSConnection, WSConnectionAction };







