import React from 'react';
import {AppFrame, AppFrameAction, AppFrameProvider, AppModal} from "../appframe";
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import FillHeaderTab from "../tabheaderfill";
import MenuOfContent from "../menuofcontent";
import {AddGroupCodeAgGrid, AmendGroupCodeAgGrid, AmendGroupNameAgGrid, RegisterAmendModal} from "./stockPage";
import { ContextConnector } from '../appcontext.js';
import {BIPSAppContext, BIPSAppProvider} from "../AppData";
import { Dropdown, Input, Popup, Radio, Form} from 'semantic-ui-react';

import {AgGridReact} from "ag-grid-react";
import {TableInfoTransactionWithButton} from './../app_transaction/tableInfoTransaction';
import TableInfoTransaction from "../app_transaction/tableInfoTransaction";
import FormBuy from "../app_transaction/form_buy";
import FormSell from "../app_transaction/form_sell";
import SettingOrder from "../app_transaction/settingOrder";
import ModalAmend from "../app_modals/modal_amend";
import VerifyPIN from "./verifyPin";
import ModalOrderDetail from "../app_modals/modal_order_detail";
import {Table} from "react-bootstrap";
import NumberInput from "../numberinput";
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';
import $ from "jquery";

class RadioButt extends React.PureComponent {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Form>
                <Form.Field>
                    <Radio
                        label='Choose this'
                        name='radioGroup'
                        value='this'
                        checked={this.state.value === 'this'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Or that'
                        name='radioGroup'
                        value='that'
                        checked={this.state.value === 'that'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>
        )
    }
}
const CustomFrameHeaderTrade_Base = (props) => {
    return(
        <>
            {/* <BIPSAppProvider> */}
            <div>
                <WSConnectionAction />

                <div className={props.isManual ? "d-block" : "d-none"}>
                    <div className="col-sm-12 px-0 mx-0 align-self-center row">
                        <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                            <FillHeaderTab tradeMode="manual" treeName="/tradePage" linkTitles={
                                {
                                    tradePageManOrderbook : 'ORDERLIST',
                                    tradePageManWatchlist: 'ORDERBOOK',
                                    tradePageManWatchList2 : 'WATCHLIST',
                                }
                            } />
                        </div>
                        <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                            <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleManual(props.isManual)}}>{"Manual Order"}</button>
                        </div>
                    </div>
                </div>
                <div className={props.isManual? "d-none" : "d-block"}>
                    <div className="col-sm-12 px-0 mx-0 align-self-center row">
                        <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                            <FillHeaderTab tradeMode="auto" treeName="/tradePage" linkTitles={
                                {
                                    AutOrderSetting: 'ORDER SETTING',
                                    AutSentOrder : 'SEND ORDER',
                                }
                            } />
                        </div>
                        <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                            <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleManual(props.isManual)}}>{"Automatic Order"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <AppFrame treeName="/tradePage" headerComponent={TradeFrameHeader}/>
            {/*<AppModal/>*/}
            {/* </BIPSAppProvider> */}
        </>
    );
}

const TradeFrameHeader = (props) => {
    return (
        <></>
    );
}

class Trade extends React.PureComponent {
    //hanya memanggil headernya saja
    render () {
        return (
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}
//odlistt
class OrderbookPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        box1 : 0,
        box2 : 0,
        box3 : 0
    }

    clickBox1 = (e) => {
        this.setState({
            box1: 1,
            box2: 0,
            box3: 0
        })
    }

    clickBox2 = (e) => {
        this.setState({
            box2: 1,
            box1: 0,
            box3: 0
        })
    }

    clickBox3 = (e) => {
        this.setState({
            box3: 1,
            box2: 0,
            box1: 0
        })
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                   onClick={this.closeClick}></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="col-sm-12 px-2 mx-0 pt-1">
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
                <div className="bg-black-trading f-12 mt-1">
                    <AppFrameAction ref="frameAction" />
                    {/*<div className="d-border-bottom">
                        <div className="col-sm-4 px-0 row">
                            <div className="col-sm-6 px-5 mx-0 text-left pt-3 pb-3">
                                <button className="btn btn-sm btn-grey" onClick={this.buttonClickAmendRegister}>Modify Watchlist</button>
                            </div>
                            <div className="col-sm-6 px-0 mx-0 text-right pt-3 pb-1"></div>
                        </div>
                    </div>*/}
                    <div className="card-515 col-sm-12 pt-3 pr-2 mr-0 mt-3 row">
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box1 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox1}>
                                <TableInfoTransactionWithButton saham="AALI"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box2 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox2}>
                                <TableInfoTransactionWithButton saham="TLKM"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box3 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox3}>
                                <TableInfoTransactionWithButton saham="BMRI"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WatchList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        box1 : 0,
        box2 : 0,
        box3 : 0
    }

    clickBox1 = (e) => {
        this.setState({
            box1: 1,
            box2: 0,
            box3: 0
        })
    }

    clickBox2 = (e) => {
        this.setState({
            box2: 1,
            box1: 0,
            box3: 0
        })
    }

    clickBox3 = (e) => {
        this.setState({
            box3: 1,
            box2: 0,
            box1: 0
        })
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="col-sm-12 px-2 mx-0 pt-1">
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
                <div className="bg-black-trading f-12">
                    <AppFrameAction ref="frameAction" />
                    {/*<div className="d-border-bottom">
                        <div className="col-sm-4 px-0 row">
                            <div className="col-sm-6 px-5 mx-0 text-left pt-3 pb-3">
                                <button className="btn btn-sm btn-grey" onClick={this.buttonClickAmendRegister}>Modify Watchlist</button>
                            </div>
                            <div className="col-sm-6 px-0 mx-0 text-right pt-3 pb-1"></div>
                        </div>
                    </div>*/}
                    <div className="card-515 col-sm-12 pt-3 pr-2 mr-0 row">
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box1 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox1}>
                                <TableInfoTransactionWithButton saham="AALI"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box2 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox2}>
                                <TableInfoTransactionWithButton saham="TLKM"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box3 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox3}>
                                <TableInfoTransactionWithButton saham="BMRI"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const TradeWatchlistFrameHeader = (props) => {
    return (
        <></>
    );
}
class OrderSetting extends React.PureComponent {
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <AppFrameProvider>
                <div className="col-sm-12">

                    <div className="row">
                        <div className="col-sm-4 pr-3 pl-3 f-12">
                            <TableInfoTransactionLayout/>
                        </div>
                        <div className="col-sm-8 pr-3 mt-2">
                            <TableInfoTransactionLayout2/>
                        </div>
                    </div>
                </div>
            </AppFrameProvider>
        )
    }

}

class SentOrder extends React.PureComponent{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <AppFrameProvider>
                <div className="col-sm-12 pl-2 mt-2">
                    <OrderHistoryAgGrid/>
                </div>
            </AppFrameProvider>
        )
    }

}
class AutomaticOrderPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
        };

    }

    render() {
        return (
            <AppFrameProvider>
                {/* <BIPSAppProvider> */}
                <div className="row col-sm-12 pl-2 mx-0 pt-1">
                    <div className="col-sm-8 px-0 mx-0">
                        <div className="cssmenu d-border-bottom d-border-top d-border-left small h-30">
                            <ul className="ul-menu h-27">
                                <li name="stockDaily"
                                    className={`col-sm-6 click-pointer d-border-right text-center${(this.state.activeTab == 1) ? ' active' : ''}`}
                                    onClick={() => this.setState({activeTab: 1})}>
                                    <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">ORDER SETTINGS</span></a></li>
                                <li name="stockPage"
                                    className={`col-sm-6 click-pointer d-border-right text-center${(this.state.activeTab == 2) ? ' active' : ''}`}
                                    onClick={() => this.setState({activeTab: 2})}>
                                    <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">SENT ORDER</span></a></li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="container-fluid pl-2">
                    <div style={{display: this.state.activeTab == 1 ? "block" : "none"}} className="col-sm-12 pl-2">
                        {/*laggggi kerjain ini*/}
                        {/*<TradeOrderSummaryAgGrid/>*/}
                        <div className="row">
                            <div className="col-sm-4 pr-3 pl-3 f-12">
                                <TableInfoTransactionLayout/>
                            </div>
                            <div className="col-sm-8 pr-0 mt-2">
                                <TableInfoTransactionLayout2/>
                            </div>
                        </div>
                    </div>
                    <div style={{display: this.state.activeTab == 2 ? "block" : "none"}} className="col-sm-12 pl-0 pr-0">
                        <OrderHistoryAgGrid/>
                    </div>
                </div>
                {/* </BIPSAppProvider> */}
            </AppFrameProvider>
        );
    }
}
class TableInfoTransactionLayout extends React.PureComponent{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <>
                <div className="col-sm-12 row px-0 mx-0 h-30 my-2 mt-3">
                    <div className="col-sm-3-6 px-0 mx-0">
                        <Input label={{ color: 'bg-gold', content: '90%' }} defaultValue='AALI'
                               labelPosition='right' placeholder='Code' size='mini' style={{width:'50%'}}/>
                    </div>

                    <div className="col-sm-3-6 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-primary text-center">
                            7,000,545,000,000
                            <br/><span className="text-white f-9">Investment In AALI</span>
                        </label>
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-danger text-center">
                            -1,18%
                            <br/><span className="text-white f-9">%Change</span>
                        </label>
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <Popup content='600 Share' position='top center' trigger={
                            <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-primary text-center" id={this.props.lotshare}>
                                <span id="lotShare">6</span>
                                <br/><span className="text-white f-9">Lot</span>
                            </label>
                        } />
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-danger text-center">
                            -90,240
                            <br/><span className="text-white f-9">P/L</span>
                        </label>
                    </div>
                </div>

                <Table responsive borderless size="sm" className="text-white d-border-table bg-dark-grey card-111 mb-2">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Last</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Previous</td>
                        <td className="no-wrap text-warning d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Freq</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">779</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Change</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1"><i className="icofont icofont-caret-down"></i> -50</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Open</td>
                        <td className="no-wrap text-success d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Vol</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">2 K</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">%</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">-0.40%</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">High</td>
                        <td className="no-wrap text-success d-border-tr-gray text-right py-1">12,800</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Val</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">2.6 B</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Lower AR</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">12,400</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Low</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">12,350</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">F. Buy</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">1.1 B</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding py-1">Upper AR</td>
                        <td className="no-wrap text-right py-1">13,000</td>
                        <td className="no-wrap bg-gray-tradding py-1">Avg.</td>
                        <td className="no-wrap text-danger text-right py-1">12,639.92</td>
                        <td className="no-wrap bg-gray-tradding py-1">F. Sell</td>
                        <td className="no-wrap text-right py-1">825.5 M</td>
                    </tr>
                    </tbody>
                </Table>

                {/*<div className="my-3"></div>*/}

                <div className="bg-dark-grey">
                    <div className="col-sm-12 row mx-0 px-0 d-border-gray">
                        <div className="col-sm-6 mx-0 px-0 d-border-right-half">
                            <div className="container-fluid px-0 mx-0">
                                <Table responsive bordered size="sm" className="text-white bg-dark-grey px-0 mx-0 card-324 mb-0 table-hover table-striped-trans">
                                    <thead className="d-border-top d-border-bottom bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">
                                            <Popup content='Number Of Buy' position='top center' trigger={
                                                <span>NoB</span>
                                            } />
                                        </th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Bid Vol</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Bid</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">4</td>
                                        <td className="no-wrap py-1 text-right">17</td>
                                        <td className="no-wrap py-1 text-right text-warning">12,600</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">7</td>
                                        <td className="no-wrap py-1 text-right">19</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,575</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">3</td>
                                        <td className="no-wrap py-1 text-right">85</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,550</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">8</td>
                                        <td className="no-wrap py-1 text-right">14</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,525</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">4</td>
                                        <td className="no-wrap py-1 text-right">274</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,500</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">3</td>
                                        <td className="no-wrap py-1 text-right">14</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,475</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">2</td>
                                        <td className="no-wrap py-1 text-right">178</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,450</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">5</td>
                                        <td className="no-wrap py-1 text-right">20</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,425</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">1</td>
                                        <td className="no-wrap py-1 text-right">739</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,400</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">2</td>
                                        <td className="no-wrap py-1 text-right">22</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,350</td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="d-border-top bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">34</th>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">1,436</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Total</th>
                                    </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </div>
                        <div className="col-sm-6 mx-0 px-0 d-border-left-half">
                            <div className="container-fluid px-0 mx-0">
                                <Table responsive bordered size="sm" className="text-white bg-dark-grey px-0 mx-0 card-324 mb-0 table-hover table-striped-trans">
                                    <thead className="d-border-top d-border-bottom bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Offer</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Offer Vol</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">
                                            <Popup content='Number Of Sell' position='top center' trigger={
                                                <span>NoS</span>
                                            } />
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,625</td>
                                        <td className="no-wrap py-1 text-right">35</td>
                                        <td className="no-wrap py-1 text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,650</td>
                                        <td className="no-wrap py-1 text-right">15</td>
                                        <td className="no-wrap py-1 text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,675</td>
                                        <td className="no-wrap py-1 text-right">681</td>
                                        <td className="no-wrap py-1 text-right">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,700</td>
                                        <td className="no-wrap py-1 text-right">25</td>
                                        <td className="no-wrap py-1 text-right">7</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,725</td>
                                        <td className="no-wrap py-1 text-right">121</td>
                                        <td className="no-wrap py-1 text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,750</td>
                                        <td className="no-wrap py-1 text-right">316</td>
                                        <td className="no-wrap py-1 text-right">3</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,775</td>
                                        <td className="no-wrap py-1 text-right">228</td>
                                        <td className="no-wrap py-1 text-right">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,800</td>
                                        <td className="no-wrap py-1 text-right">224</td>
                                        <td className="no-wrap py-1 text-right">5</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,825</td>
                                        <td className="no-wrap py-1 text-right">10</td>
                                        <td className="no-wrap py-1 text-right">1</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,850</td>
                                        <td className="no-wrap py-1 text-right">158</td>
                                        <td className="no-wrap py-1 text-right">2</td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="d-border-top bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Total</th>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">1,813</th>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">39</th>
                                    </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class TableInfoTransactionLayout2 extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            value: "1",
        };
    }
    handleChange = (e, { value }) => this.setState({ value: value })

    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            ed.setDate(ed.getDate() + 30);

            var isRtl = $('html').attr('dir') === 'rtl';

            // Zaky Update
            $('#datepickerTest2').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: sd,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
        });
    }
    render(){
        return(
            <>
                <div className="bg-dark-grey d-border">
                    <div className="row">
                        <div className="col-sm-6 f-12 pt-3">
                            <div className="col-sm-4 mb-5">
                                <Dropdown placeholder='Buy'
                                          defaultValue={"Buy"}
                                          search selection options={[{key:'Buy',value:'Buy',text: 'Buy'},{key:'Sell',value:'Sell',text: 'Sell'}]}
                                          className={"f-12 text-center align-self-center col-sm-12"}
                                />
                            </div>
                            <div className="col-sm-8"></div>
                            <div className="col-sm-12 row mb-2 pr-0">
                                <div className="col-sm-12">
                                    <label>Set Condition</label>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <Dropdown placeholder='Last Price'
                                              search selection
                                              defaultValue={"Last Price"}
                                              options={
                                                  [
                                                      {key:'1',value:'Last Price',text: 'Last Price'},
                                                      {key:'2',value:'Best Offer Price',text: 'Best Offer Price'},
                                                      {key:'3',value:'Best Bid',text: 'Best Bid Price'},
                                                  ]
                                              }
                                              className={"f-12 text-center align-self-center col-sm-12"}
                                    />
                                </div>
                                <div className="col-sm-2 pr-0 pl-0">
                                    <Dropdown placeholder='Type'
                                              defaultValue={"<="}
                                              search selection options={
                                        [
                                            {key:'1',value:'<=',text: '<='},
                                            {key:'2',value:'>=',text: '>='},
                                        ]
                                    }
                                              className={"f-12 text-center align-self-center col-sm-12"}
                                    />
                                </div>
                                <div className="col-sm-4 pr-0">
                                    <NumberInput idclassname="tradeAtSetCondition" defaultValue={"0"}/>
                                </div>
                                <div className="col-sm-12 row pt-3 pr-0">
                                    <div className="col-sm-12 mb-2">
                                        <label htmlFor="">Order Val</label>
                                    </div>
                                    <div className="col-sm-10 mb-3">
                                        <NumberInput idclassname="tradeAtOrderVal" defaultValue={"0"} />
                                    </div>
                                    <div className="col-sm-2 f-16 pt-3">
                                        Lot
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 f-12">
                            <div className="col-sm-12">
                                {/*disini*/}
                                <Form>
                                    <Form.Field>
                                        <Radio
                                            label='Order Price'
                                            name='radioGroup'
                                            value='1'
                                            checked={this.state.value === "1"}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form>
                                {/*<Checkbox label='Order Price'/>*/}
                            </div>
                            <div className="col-sm-12 mb-2">
                                <Dropdown placeholder='Offer + 4 tick'
                                          defaultValue={"Offer4"}
                                          search
                                          selection
                                          disabled={(this.state.value === "2")}
                                          options={
                                              [
                                                  {key:'1',value:'Offer4',text: 'Offer + 4 tick'},
                                                  {key:'2',value:'Offer3',text: 'Offer + 3 tick'},
                                                  {key:'3',value:'Offer2',text: 'Offer + 2 tick'},
                                                  {key:'4',value:'Offer1',text: 'Offer + 1 tick'},
                                                  {key:'5',value:'BestOffer',text: 'Best Offer Price'},
                                                  {key:'6',value:'LastPrice',text: 'Last Price'},
                                                  {key:'7',value:'BestBid',text: 'Best Bid Price'},
                                                  {key:'8',value:'Bid1',text: 'Bid - 1 tick'},
                                                  {key:'9',value:'Bid2',text: 'Bid - 2 tick'},
                                                  {key:'10',value:'Bid3',text: 'Bid - 3 tick'},
                                                  {key:'11',value:'Bid4',text: 'Bid - 4 tick'},
                                              ]
                                          }
                                          className={"f-12 text-center align-self-center col-sm-12"}
                                />

                            </div>
                            <div className="col-sm-12">
                                <Form>
                                    <Form.Field>
                                        <Radio
                                            label='Manual Input'
                                            name='radioGroup'
                                            value='2'
                                            checked={this.state.value === "2"}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form>
                            </div>
                            <div className="col-sm-12 row mb-3 pr-0">
                                <div className="col-sm-2 f-16 pt-3">
                                    IDR
                                </div>
                                <div className="col-sm-10 pr-0">
                                    <NumberInput disabled={this.state.value == "1"} idclassname="tradeAtIdr" defaultValue="0"/>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <label htmlFor="">Expired Date</label>
                            </div>
                            <div className="col-sm-12 ui input mb-3" style={{paddingRight:'53px'}}>
                                <Input placeholder='dd/mm/yy' size='small' id="datepickerTest2" className="col-sm-12 pl-0 pr-0 text-center align-self-center"/>
                                <span className="input-group-addon h-35 no-border-radius" style={{width: '100%'}}><span
                                    className="fa fa-calendar-alt"></span></span>
                            </div>
                            <div className="col-sm-12 mb-3 text-right">
                                <button className="btn btn-primary">Save Settings</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 d-border mt-2 px-0">
                    <OrderSettingListAgGrid/>
                </div>

            </>
        );
    }
}

class OrderSettingListAgGrid extends React.PureComponent{
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            list: [42, 33, 68],
            columnDefs: [

                { field: "on", headerName: "#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    },
                    cellRendererFramework: function(params) {
                        var cmd = params.data.on;
                        var idorder = params.data.orderId;
                        if(cmd){
                            return <button className="btn-cellOn btn btn-sm btn-success mx-1 f-9" onClick={() => self.onUpdateItem(idorder) }> On </button>
                        }else{
                            return <button className="btn-cellOn btn btn-sm btn-danger mx-1 f-9" onClick={() => self.onUpdateItem(idorder) }> Off </button>
                        }
                    },
                    suppressSizeToFit: true,
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "cmd", headerName: "Cmd.", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        return params.data.cmd == "Buy" ? "text-center text-danger grid-table d-border-aggrid-right f-12 locked-col locked-visible"
                            : "text-center text-success grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "condition", headerName: "Condition", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 180,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 120,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "exp", headerName: "Expired Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", width:105, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellwithdraw btn btn-sm btn-primary mx-1 f-9">Edit</button>'+
                            '<button class="btn-cellamend btn btn-sm btn-danger mx-1 f-9">Delete</button>' +
                            '</span>';
                        var aButton = eDiv.querySelectorAll('.btn-cellamend')[0];
                        var wButton = eDiv.querySelectorAll('.btn-cellwithdraw')[0];

                        aButton.addEventListener('click', self.props.clickamend);
                        wButton.addEventListener('click', self.props.clickwithdraw);

                        return eDiv;
                    }, suppressSizeToFit: true
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 32;
            },
            rowData: [
                {
                    orderId: "12344112",
                    on: true,
                    price: "3,870",
                    code: "AALI",
                    cmd: "Sell",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "10 Lot",
                },
                {
                    orderId: "12344113",
                    on: true,
                    price: "3,870",
                    cmd: "Buy",
                    code: "AALI",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "3 Lot",
                },
                {
                    orderId: "12344114",
                    on: false,
                    price: "3,870",
                    cmd: "Buy",
                    code: "AALI",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "1 Lot",
                },
                {
                    orderId: "12344115",
                    on: true,
                    price: "3,870",
                    cmd: "Sell",
                    code: "AALI",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "4 Lot",
                },
                {
                    orderId: "12344116",
                    on: false,
                    price: "3,870",
                    code: "AALI",
                    cmd: "Buy",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "7 Lot",
                },
                {
                    orderId: "12344117",
                    on: true,
                    price: "3,870",
                    code: "AALI",
                    cmd: "Buy",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "6 Lot",
                },

            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    updateStateOn = params => {
        this.setState(state => {
            const rowData = state.rowData.map((item, j) => {
                if(item.orderId == params){
                    return item.on = !item.on;
                }else{
                    return item;
                }
            });
            return  { rowData, };
        })
    };

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }
    onUpdateItem = i => {
        console.log('kepencet '+i);
        this.setState(state => {
            const rowData = state.rowData.map((item, j) => {
                if (item.orderId === i) {
                    console.log('ketemu');
                    var baru = {
                        'orderId': item.orderId,
                        'on': !item.on,
                        'price': item.price,
                        'code': item.code,
                        'cmd': item.cmd,
                        'condition': item.condition,
                        'exp': item.exp,
                        'vol': item.vol,
                    };
                    return baru;
                } else {
                    console.log('engga');
                    return item;
                }
            });
            return {
                rowData,
            };
        });
    };
    render() {
        return (
            <>
                <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                    <div className="bg-grey-tradding col-sm-12 px-0 mx-0 text-center py-3 f-16">ORDER SETTINGS LIST</div>
                </div>
                <div
                    className="card-194 ag-theme-balham-dark ag-header-border d-border ag-striped-odd"
                    style={{
                        width: 'auto' }}>

                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class TradeWatchlist extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        };

    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                   onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render() {
        return (
            <div className="row col-sm-12 px-2 mx-0 py-0">
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>

                <OrderListAgGrid
                    clickorderdetail={this.buttonClickOrderDetail}
                    clickamend={this.buttonClickAmend}
                    clickwithdraw={this.buttonClickWithdraw}/>
                <div className="container-fluid row px-0 ml-0 mt-2" style={{'width':'100%'}}>
                    <div className="col-sm-6 pl-0 pr-2">
                        <div className="col-sm-12 pl-0 pr-0">
                            <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                                <div className="col-sm-12 px-0 mx-0 text-center pt-3 pb-2 f-12" style={{backgroundColor: '#333f50'}}>TRADE LIST</div>
                            </div>
                            <TradeListOrderListAgGrid/>
                        </div>
                    </div>
                    <div className="col-sm-6 pl-2 pr-0">
                        <div className="cssmenu d-border-bottom d-border-top d-border-left small h-30">
                            <ul className="ul-menu h-27">
                                <li name="stockDaily"
                                    className={`col-sm-6 click-pointer d-border-right text-center${(this.state.activeTab == 1) ? ' active' : ''}`} onClick={() => this.setState({activeTab: 1})}>
                                    <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">ORDER SUMMARY</span></a></li>
                                <li name="stockPage"
                                    className={`col-sm-6 click-pointer d-border-right text-center${(this.state.activeTab == 2) ? ' active' : ''}`} onClick={() => this.setState({activeTab: 2})}>
                                    <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">TRADE SUMMARY</span></a></li>
                            </ul>
                            <div style={{display: this.state.activeTab == 1 ? "block" : "none"}}>
                                <TradeOrderSummaryAgGrid/>

                            </div>
                            <div style={{display: this.state.activeTab == 2 ? "block" : "none"}}>
                                <TradeTradeSummaryAgGrid/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

class SettingInWatchlist extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="row">
                    <div className="col-md-4 pt-2 pr-2">
                        <TradeWatchlistAgGrid/>
                    </div>
                    <div className="col-md-8 pl-1">
                        <SettingOrder
                            type="full"
                            lpSetting="setWatchlist"
                            volSetting="volsetWatchlist"
                            opSetting="opsetWatchlist"
                            slpSetting="ssetWatchlist" svolSetting="svolsetWatchlist" sopSetting="sopsetWatchlist"/>
                    </div>
                </div>

            </>
        );
    }

}

class SettingInWatchlist2 extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="row">
                    <div className="col-md-12 pl-3">
                        <SettingOrder
                            type="full"
                            lpSetting="setWatchlist"
                            volSetting="volsetWatchlist"
                            opSetting="opsetWatchlist"
                            slpSetting="ssetWatchlist" svolSetting="svolsetWatchlist" sopSetting="sopsetWatchlist"/>
                    </div>
                </div>

            </>
        );
    }

}

class SettingInTick extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <SettingOrder lpSetting="setTick" volSetting="volsetTick" opSetting="opsetTick" slpSetting="ssetTick" svolSetting="svolsetTick" sopSetting="sopsetTick"/>
            </>
        );
    }

}

class SettingInDaily extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <SettingOrder lpSetting="setDaily" volSetting="volsetDaily" opSetting="opsetDaily" slpSetting="ssetDaily" svolSetting="svolsetDaily" sopSetting="sopsetDaily"/>
            </>
        );
    }

}

/*const TableTradeWatchlist = ContextConnector(BIPSAppContext,
    (vars, actions, props)=>({
        subscribeMsg: vars.subscribeMsg,
        stockSummary:vars.stockSummary,
        sessionID:vars.sessionID,
        subscribeStock:(sessionID) => {actions.sendAction('subscribeStock', {sessionID})}
    })
)(TableTradeWatchlist_Base)*/

// TableTradeWatchlist_Base
class TableTradeWatchlist extends React.Component{
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render(){
        return(<>
            <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
            <div className="bg-black-trading f-12">
                <AppFrameAction ref="frameAction" />
                <div className="px-4 pt-2">
                    <TradeWatchlistAgGrid />
                </div>
            </div>
        </>);
    }
}

const CustomFrameHeaderTrade = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isManual:vars.isManual,
        handleManual:(isManual)=>{actions.sendAction('handleManual',{isManual})}
    })
)(CustomFrameHeaderTrade_Base);

class TradeWatchlistAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 80, minWidth: 80, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 80, minWidth: 80,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 90, minWidth: 90,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "persen", headerName: "(%)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 70, minWidth: 70,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "tvol", headerName: "T. Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 100, minWidth: 100,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "accumulated", headerName: "Accumulated Foreign Vol.", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: 200, minWidth: 200,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { code: "AALI",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "ANTM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "TLKM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BBRI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "ASII",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BBMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "WSKT",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "AGII",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "ADHI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SMGR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "EMTK",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "MREI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "PTSP",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "TCPI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BRAM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "INDF",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "JECC",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "RDTX",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "DUTI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "FASW",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "IBST",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SMMA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "TKIM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "JSMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SONA",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "AMFG",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SCCO",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BYAN",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "UNTR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "GGRM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "UNVR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card-515 ag-theme-balham-dark ag-header-border d-border ml-2 ag-striped-odd"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class BuyPage extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 mt-4 f-12">
                        <TableInfoTransaction lotshare="buyPage" />
                    </div>
                    <div className="col-sm-6 mt-4 d-border-active bg-dark-grey pb-3">
                        <FormBuy idPrice="tradeBuyPrice" idVol="tradeBuyVol" idValue="tradeBuyValue" columnSm="col-sm-12"/>
                    </div>
                </div>
            </>
        );
    }

}

class SellPage extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 mt-4 f-12">
                        <TableInfoTransaction lotshare="sellPage" />
                    </div>
                    <div className="col-sm-6 mt-4 d-border-active bg-dark-grey pb-3">
                        <FormSell idPrice="tradeSellPrice" idVol="tradeSellVol" idValue="tradeSellValue" columnSm="col-sm-12"/>
                    </div>
                </div>
            </>
        );
    }

}


//Sent Order
class OrderHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 90, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 75,
                    cellClass : function (params) {
                        return "text-center text-primary grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "qty", headerName: "Qty", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 140,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "mqty", headerName: "M Qty", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 110,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "mprice", headerName: "M Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 120,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "result", headerName: "Result", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 120,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "setdate", headerName: "Set Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 110,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "dateuntil", headerName: "Date Until", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 110,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                //     headerCheckboxSelection: isFirstColumn,
                //     checkboxSelection: isFirstColumn,
            },
            rowSelection: "multiple",
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { date: "28/11/2018",
                    time: "08:21:33",
                    order : "001",
                    code: "AALI",
                    qty: "2",
                    cmd: "BUY",
                    price: "12.000",
                    mqty: "2",
                    mprice: "3.000",
                    result: "Match",
                    setdate: "12/11/2019",
                    dateuntil: "13/11/2019",
                },{ date: "28/11/2018",
                    time: "08:21:33",
                    order : "001",
                    code: "AALI",
                    qty: "2",
                    cmd: "SELL",
                    price: "12.000",
                    mqty: "2",
                    mprice: "3.000",
                    result: "Match",
                    setdate: "12/11/2019",
                    dateuntil: "13/11/2019",
                },
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }

        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                {/*senttttt*/}
                <div
                    className="card-530 ag-theme-balham-dark d-border bg-dark-grey ag-bordered ag-striped-odd d-border"
                    style={{
                        width: 'auto',height: '480px', }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        rowSelection={this.state.rowSelection}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}
//oooooooo
let timer = 0;
let delay = 200;
let prevent = false;



class OrderListAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "-", headerName: "#", sortable: true, filter: "agTextColumnFilter", resizable: true, width:35,
                    minWidth: 35,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center text-primary f-12 click-pointer";
                    },
                    cellRendererFramework: function(params){
                        var orderId = params.data.order;
                        return <text>&nbsp;</text>
                    },
                    suppressSizeToFit: true
                }, { field: "-", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:85, minWidth: 85,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center text-primary f-12 click-pointer";
                    },
                    cellRenderer : function (params) {
                        var order = params.data.order;
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="btn-cellorder px-1">' +order+ '</span>';
                        var aButton = eDiv.querySelectorAll('.btn-cellorder')[0];

                        aButton.addEventListener('dblclick', self.props.clickorderdetail);
                        return eDiv;
                    },
                    suppressSizeToFit: true
                },
                { field: "marketorder", headerName: "Market Order#", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:130, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:80, minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center text-primary f-12";
                    },
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:70, minWidth: 70,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "status", headerName: "Status", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:85, minWidth: 85,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "remark", headerName: "Remark", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:95, minWidth:95,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var status = params.data.status;
                        return status.includes('Sending') === true ? '<i class="fas fa-hourglass-half text-tosca"></i>&nbsp;&nbsp;'+ params.data.remark:
                            '<i class="fa fa-check text-success"></i> &nbsp;&nbsp;'+ params.data.remark;
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:70, minWidth: 70,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "mkt", headerName: "Mkt", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:70, minWidth:70,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "vlot", headerName: "Vol. Lot", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:120, minWidth: 120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "vshares", headerName: "Vol. Shares", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:120, minWidth:120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "mlot", headerName: "Match Vol. Lot", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:130, minWidth:130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "mshares", headerName: "Match Vol. Shares", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:140, minWidth:140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "avgmatchprice", headerName: "Avg. Match Price", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:135, minWidth:135,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:100, minWidth:100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:80, minWidth:80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },
                { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", width:130, minWidth:130,
                    pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellamend btn btn-sm btn-primary mx-1 f-9 w-50">Amend</button>' +
                            '<button class="btn-cellwithdraw btn btn-sm btn-brown mx-1 f-9">Withdraw</button>'+
                            '</span>';
                        var aButton = eDiv.querySelectorAll('.btn-cellamend')[0];
                        var wButton = eDiv.querySelectorAll('.btn-cellwithdraw')[0];

                        aButton.addEventListener('click', self.props.clickamend);
                        wButton.addEventListener('click', self.props.clickwithdraw);

                        return eDiv;
                    }, suppressSizeToFit: true
                },
            ],

            defaultColDef: {
                sortable: true,
                filter: true,
                headerCheckboxSelection: isFirstColumn,
                checkboxSelection: isFirstColumn,
            },
            rowSelection: "multiple",
            getRowHeight : function(params){
                return 28;
            },
            rowData: [
                {order : "001700",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",},
                {order : "001699",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",},
                {order : "001698",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001697",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",},
                {order : "001696",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",},
                {order : "001695",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",},
                {order : "001694",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",},
                {order : "001693",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001692",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",},
                {order : "001691",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",},
                {order : "001690",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",},
                {order : "001689",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",},
                {order : "001688",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001687",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",},
                {order : "001686",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",},
                {order : "001685",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",},
                {order : "001684",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",},
                {order : "001683",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001682",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",},
                {order : "001681",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",},
                {order : "001680",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",},
                {order : "001679",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",},
                {order : "001678",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001677",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",},
                {order : "001676",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",},
                {order : "001675",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",},
                {order : "001674",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",},
                {order : "001673",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001672",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",},
                {order : "001671",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",},
                {order : "001670",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",},
            ],

            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    buttonClickOrderDetailOrderPage = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render() {

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-305 ag-theme-balham-dark mt-2 ag-bordered ag-striped-odd d-border"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        rowSelection={this.state.rowSelection}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}
                    >
                    </AgGridReact>
                </div>
            </div>
        );
    }
}
//duin
class TradeListOrderListAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:80, minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:78, minWidth:78,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table text-right d-border-aggrid-right text-center f-12";
                    },
                },{ field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:140, minWidth: 140,
                    cellClass : function (params) {
                        var pl = params.data.change;
                        return pl.includes('-') === true ? "text-danger text-center grid-table f-12 d-border-aggrid-right":
                            "text-success text-center  grid-table f-12 d-border-aggrid-right";
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.change;
                        return pl.includes('-') === true ? '<i class="icofont icofont-caret-down text-danger"></i> '+pl :
                            '<i class="icofont icofont-caret-up text-success"></i> '+pl;
                    }
                },{ field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:60, minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "val", headerName: "Val", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:60, minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "buyer", headerName: "Buyer", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "seller", headerName: "Seller", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "tradeId", headerName: "TradeID", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:90, minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    time : "08:02:12",
                    code :"AALI",
                    price : "13.000",
                    change: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    vol :"2",
                    val : "3",
                    buyer :"Day",
                    seller :"RG",
                    tradeId: "2991672"
                },{
                    time : "09:01:12",
                    code :"AALI",
                    price : "11.400",
                    change: "10,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"0,30%",
                    vol :"1",
                    val : "3",
                    buyer :"Night",
                    seller :"RG",
                    tradeId: "2991673"
                },{
                    time : "08:02:12",
                    code :"AALI",
                    price : "13.000",
                    change: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    vol :"2",
                    val : "3",
                    buyer :"Day",
                    seller :"RG",
                    tradeId: "2991672"
                },{
                    time : "09:01:12",
                    code :"AALI",
                    price : "11.400",
                    change: "20,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"0,90%",
                    vol :"1",
                    val : "3",
                    buyer :"Night",
                    seller :"RG",
                    tradeId: "2991673"
                },{
                    time : "08:02:12",
                    code :"AALI",
                    price : "13.000",
                    change: "60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"0,40%",
                    vol :"2",
                    val : "3",
                    buyer :"Day",
                    seller :"RG",
                    tradeId: "2991672"
                },{
                    time : "09:01:12",
                    code :"AALI",
                    price : "11.400",
                    change: "-20,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,90%",
                    vol :"1",
                    val : "3",
                    buyer :"Night",
                    seller :"RG",
                    tradeId: "2991673"
                },
            ],
            getRowHeight : function (params) {
                return 32;
            },
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-175 ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        getRowHeight={this.state.getRowHeight}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TradeOrderSummaryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width:90,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "leaveVol", headerName: "Leave Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width:140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "tradeVol", headerName: "Trade Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width:140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "avgPrice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width:150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width:97,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                rowSelection: "multiple",
            },
            rowData: [
                {
                    code : "AALI",
                    leaveVol :"5",
                    tradeVol : "5",
                    avgPrice : "12,635.00",
                    cmd :"BUY",
                },{
                    code : "AALI",
                    leaveVol :"3",
                    tradeVol : "5",
                    avgPrice : "13,635.00",
                    cmd :"SELL",
                },{
                    code : "AALI",
                    leaveVol :"2",
                    tradeVol : "5",
                    avgPrice : "12,635.00",
                    cmd :"SELL",
                },{
                    code : "AALI",
                    leaveVol :"7",
                    tradeVol : "1",
                    avgPrice : "9,635.00",
                    cmd :"BUY",
                },{
                    code : "AALI",
                    leaveVol :"1",
                    tradeVol : "2",
                    avgPrice : "5,135.00",
                    cmd :"SELL",
                },
            ],
            getRowHeight : function (params) {
                return 32;
            },
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-175 ag-theme-balham-dark ag-bordered ag-striped-odd d-border d-border"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        getRowHeight={this.state.getRowHeight}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TradeTradeSummaryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:220,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:207,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:200,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                rowSelection: "multiple",
            },
            rowData: [
                {
                    code : "AALI",
                    price :"15,000",
                    vol : "3",
                },{
                    code : "AALI",
                    price :"25,000",
                    vol : "4",
                },{
                    code : "AALI",
                    price :"35,000",
                    vol : "2",
                },{
                    code : "AALI",
                    price :"5,000",
                    vol : "1",
                },
            ],
            getRowHeight : function (params) {
                return 32;
            },
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-175 ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        getRowHeight={this.state.getRowHeight}
                        rowSelection={this.state.rowSelection}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class AmendModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalAmend/>
            </>
        );
    }
}

class WithdrawModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'withdraw'/>
            </>
        );
    }
}


class OrderDetailModal extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalOrderDetail/>
            </>
        );
    }
}

export {CustomFrameHeaderTrade, Trade,
    OrderbookPage, TradeWatchlist, SettingInWatchlist,
    OrderSetting,SentOrder,

};
