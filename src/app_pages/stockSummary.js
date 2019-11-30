import React from 'react';
import { Container, Button, Form, TextArea } from 'semantic-ui-react';

import { ContextConnector } from '../appcontext.js';
import { AppFrameAction } from '../appframe.js';
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import { BIPSAppContext } from '../AppData.js';

class StockSummaryPage extends React.PureComponent {

  testMethodName = () => {console.log('hello')}
  
  render () {
    return (<>
      <AppFrameAction ref="frameAction" /> {/* UI manager component */}
      <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
      <ConnectionPanel />
    </>);
  }
}

class ConnectionPanel_Base extends React.Component {

  connectButtonClick = () => {
    var wsa = this.refs.wsAction;
    if (wsa.connectionState == 'disconnected') {
      var url = this.refs.url.value;
      this.refs.wsAction.createAndConnect(url);
    }
    else if (wsa.connectionState == 'connected')
      this.refs.wsAction.disconnect();
  }

  sendButtonClick = () => {
    var msg = this.refs.msgToSend.value;
    this.refs.wsAction.send(msg);
  }

  componentDidMount () {
    // this.refs.url.value = "ws://bahana.ihsansolusi.co.id:5050";
    // 
    if (this.refs.url)
      this.refs.url.value = "ws://bahana.ihsansolusi.co.id:5050";
      //this.refs.url.value = "wss://echo.websocket.org";
  }

  render () {
    var props = this.props;
    return (<>
      <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
      <br />
      <br />
      <Container>
        <Form>
          <Form.Field 
            disabled={props.connectionState == 'connecting'} 
            style={{display: props.connectionState == 'disconnected' ? "block" : "none"}}
          >
            <label>Enter Websocket URL &nbsp;&nbsp;</label>
            <input ref="url" style={{width: "200px"}}/>
          </Form.Field>   
          
          <div style={{display: props.connectionState == 'connecting' ? "block" : "none"}}>
            Connecting to {props.url} ...<br />
          </div>
          <div style={{display: props.connectionState == 'connected' ? "block" : "none"}}>
            Connected to {props.url}<br />
          </div>
          <Button 
            onClick={this.connectButtonClick}
            disabled={props.connectionState == 'connecting'}
          >
            {
              props.connectionState == 'connected' ?
                'Disconnect' : (props.connectionState == 'disconnected' ? 'Connect' : 'Connecting...')
            }
          </Button>
          <br />
        </Form>       
        <br />
        <Form>
          <div style={{display: (props.connectionState == 'connected') ? "block" : "none"}}>
            <Form.Field>
              <label>Message</label>
              <textarea ref="msgToSend" style={{width: "400px"}} />
              <br />
            </Form.Field>
            <Button onClick={this.sendButtonClick}>Send message</Button>
            <br />
            <br />
            <StockWatchTable />
          </div>
        </Form>
      </Container>
    </>);
  }
}

const ConnectionPanel = ContextConnector(NetAppContext, (vars, act, props) => ({
  connectionState: vars.state,
  url: vars.url
}))(ConnectionPanel_Base);

class StockWatchTable_Base extends React.Component {

  render() {
    var props = this.props;
    var stockCodes = Object.keys(props.stockSummary);

    return (
      <table>
        <thead>
          <tr>
            <td>STOCK CODE</td>
            <td>PREVIOUS PRICE</td>
            <td>HIGHEST PRICE</td>
            <td>LOWEST PRICE</td>
            <td>LAST PRICE</td>
            <td>CHANGE</td>
          </tr>          
        </thead>
        <tbody>
          {
            stockCodes.map((scode) => {
                var stockData = props.stockSummary[scode];
                return <tr key={scode}>
                  <td>{scode}</td>
                  <td>{stockData.prev_price}</td>
                  <td>{stockData.high_price}</td>
                  <td>{stockData.low_price}</td>
                  <td>{stockData.last_price}</td>
                  <td>{stockData.change}</td>
                </tr>
              }
            )
          }
        </tbody>
      </table>
    );
  }
}

const StockWatchTable = ContextConnector(BIPSAppContext, 
  (vars, actions, props) => ({
    stockSummary: vars.stockSummary
  }),
  []
)(StockWatchTable_Base);

export default StockSummaryPage;
