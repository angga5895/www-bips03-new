import React, { Component } from 'react';
import { render } from 'react-dom';
import {AppFrame, AppFrameAction, AppFrameProvider, AppModal} from "../appframe";
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import FillHeaderTab from "../tabheaderfill";
import MenuOfContent from "../menuofcontent";
import {AddGroupCodeAgGrid, AmendGroupCodeAgGrid, AmendGroupNameAgGrid, BuyPage, RegisterAmendModal} from "./stockPage";
import { ContextConnector } from '../appcontext.js';
import {BIPSAppContext, BIPSAppProvider} from "../AppData";
import { Dropdown, Input, Popup, Radio, Form, Checkbox} from 'semantic-ui-react';

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
import Select from "react-select";
import 'ag-grid-enterprise';
import CustomTooltip from "./CustomTooltip";
import {VerifyPINPortofolio, PinModal} from "./landingPage";
import {ResizeResponsive} from "./mainPage";
import FormAmend from "../app_transaction/form_amend";

function stringComparator(valueA, valueB){
    if(valueA !== null && valueB !== null){
        if(valueA.length < 2){
            return null;
        }else if(valueB.length < 2){
            return null;
        }else{
            return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        }
    }

}
function integerComparator(valueA, valueB){
    if(valueA == ""){
        return null;
    }else if(valueB == ""){
        return null;
    }else{
        return valueA - valueB;
    }
}

function dateComparator(date1, date2) {
    var date1Number = monthToComparableNumber(date1);
    var date2Number = monthToComparableNumber(date2);
    if (date1Number === null && date2Number === null) {
        return date1;
    }
    if (date1Number === null) {
        return date1;
    }
    if (date2Number === null) {
        return date2;
    }
    return date1Number - date2Number;
}
function monthToComparableNumber(date) {
    if (date === undefined || date === null || date.length !== 10) {
        return null;
    }
    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);
    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    return result;
}


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
                                    tradePagePL : 'TRADE P/L',
                                    tradePageManWatchlist: 'BID/OFFER',
                                    tradePageOrderBookList : 'ORDER BOOKING LIST',
                                    tradePageAdvertisement : 'TRADEADV',
                                }
                            } />
                        </div>
                        <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                            {/*<Popup content='Move to Automatic Order' position='bottom center' trigger={*/}
                            {/*<button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark">{"Manual Order"}</button>*/}
                            <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleManual(props.isManual)}}>{"Manual Order"}</button>
                            {/*} />*/}
                        </div>
                    </div>
                </div>
                <div className={props.isManual? "d-none" : "d-block"}>
                    <div className="col-sm-12 px-0 mx-0 align-self-center row">
                        <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                            <FillHeaderTab tradeMode="auto" treeName="/tradePage" linkTitles={
                                {
                                    AutOrderSetting: 'AUTOMATIC ORDER SETTING',
                                    AutSentOrder : 'SENT ORDER',
                                }
                            } />
                        </div>
                        <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                            <Popup content='Move to Manual Order' position='bottom center' trigger={
                                <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={() => {
                                    props.handleManual(props.isManual)
                                }}>{"Automatic Order"}</button>
                            } />
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
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
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

                    <div className="card-515 col-sm-12 pt-3 pr-2 mr-0 mt-0 row">
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box1 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox1}>
                                <TableInfoTransactionWithButton saham="INDF" sahamName={"Indofood"}/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box2 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox2}>
                                <TableInfoTransactionWithButton saham="INDF" sahamName={"Indofood"}/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className={this.state.box3 === 1 ? "bg-grey pt-1 d-active" : "bg-grey pt-1"} onClick={this.clickBox3}>
                                <TableInfoTransactionWithButton saham="INDF" sahamName={"Indofood"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class OrderSetting extends React.PureComponent {
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <>
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>
                <div className="col-sm-12">
                    <div id={"AutOrderPIN"} className="col-sm-12">
                        <VerifyPINPortofolio pos="AutOrder"/>
                    </div>
                    <div id="ContentAutOrder" className={"d-none"}>
                        <div className="pt-1 row" >
                            <div className="col-sm-4 pr-3 pl-3 f-12">
                                <TableInfoTransactionLayout/>
                            </div>
                            <div className="col-sm-8 pr-3 pl-0 mt-0">
                                <TableInfoTransactionLayout2/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

class SentOrder extends React.PureComponent{
    constructor(props) {
        super(props);

    }
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1520 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1800 && window.innerWidth <= 2030){
            return "s75";
        }else if(window.innerWidth > 2030 && window.innerWidth <= 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth <= 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s100";
        }
    }
    render(){
        return(
            <>
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>
                    <div className="col-sm-12">
                        <div id={"AutSentOrderPIN"} className="col-sm-12">
                        <VerifyPINPortofolio pos="AutSentOrder"/>
                        </div>
                    <div id="ContentSentAutOrder" className={"d-none"}>
                        <div className="col-sm-12 pl-2 mt-2 pr-3">
                            <OrderHistoryAgGrid size={this.ceksize()}/>
                        </div>
                    </div>
                    </div>
            </>
                )
    }

}
class TableInfoTransactionLayout extends React.PureComponent{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <>
                <TableInfoTransaction lotshare="autTradeOrd"/>
            </>
        );
    }
}

class TableInfoTransactionLayout2 extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            value: "1",
            statusOrder: "0",
        };
    }
    handleChange = (e, { value }) => this.setState({ statusOrder: value })

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickEdit = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center pb-5">
                                    <i className="icofont icofont-close text-icofont-close text-white click-pointer pull-right"
                                       onClick={this.closeClick}>
                                    </i>
                                    <h1 className="text-center">Edit Automatic Order</h1>
                                </div>,
            size: 'large',
            contentClass: EditPage,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

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
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1520 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1800 && window.innerWidth <= 2030){
            return "s75";
        }else if(window.innerWidth > 2030 && window.innerWidth <= 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth <= 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s100";
        }
    }
    changeOrderPrice = (e,{value}) => {
           this.setState({ value: value })
    }

    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            ed.setDate(ed.getDate() + 30);

            var isRtl = $('html').attr('dir') === 'rtl';

            // Zaky Update
            $('#datepickerAut').datepicker({
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
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>

                <div className="bg-dark-grey d-border card-520">
                    <div className="row">
                        <div className="col-sm-6 f-12 pt-3">
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
                                <div className="col-sm-12">
                                <label htmlFor="">Expired Date (max day 30)</label>
                                </div>
                                <div className="col-sm-12 ui input mb-3" style={{paddingRight:'53px'}}>
                                <Input placeholder='dd/mm/yy' id="datepickerAut" className="col-sm-12 pl-0 pr-0 text-center align-self-center"/>
                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}><span
                                className="fa fa-calendar-alt"></span></span>
                                </div>
                                <div className="col-sm-12">
                                    <Form>
                                        <Form.Field>
                                            <Radio
                                            label='Disable'
                                            name='statusOrder'
                                            value='0'
                                            checked={this.state.statusOrder === "0"}
                                            onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='Enable'
                                                name='statusOrder'
                                                value='1'
                                                checked={this.state.statusOrder === "1"}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form>
                                    {/*<Checkbox label='Order Price'/>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 f-12 pt-3">
                            <div className="col-sm-12">
                                <label>Set Condition</label>
                            </div>
                            <div className="col-sm-6">
                                <Dropdown placeholder='Buy'
                                          defaultValue={"Buy"}
                                          search selection options={[{key:'Buy',value:'Buy',text: 'Buy'},{key:'Sell',value:'Sell',text: 'Sell'}]}
                                          className={"f-12 text-center align-self-center col-sm-12"}
                                />
                            </div>
                            <div className="col-sm-12 row pt-3 pr-0">
                                <div className="col-sm-12">
                                    <label htmlFor="">Order Vol</label>
                                </div>
                                <div className="col-sm-5 mb-3">
                                    <NumberInput idclassname="tradeAtOrderVol" defaultValue={"0"} />
                                </div>
                                <div className="col-sm-2 f-16 pt-3">
                                    Lot
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <label>Order Price</label>
                            </div>
                            <div className="col-sm-12 mb-2">
                                <Dropdown placeholder='Offer + 5 ticks'
                                          defaultValue={"Offer5"}
                                          search
                                          selection
                                          onChange={this.changeOrderPrice}
                                          options={
                                              [
                                                  {key:'14',value:'Manual',text: 'Manual Input'},
                                                  {key:'1',value:'Offer5',text: 'Offer + 5 ticks'},
                                                  {key:'2',value:'Offer4',text: 'Offer + 4 ticks'},
                                                  {key:'3',value:'Offer3',text: 'Offer + 3 ticks'},
                                                  {key:'4',value:'Offer2',text: 'Offer + 2 ticks'},
                                                  {key:'5',value:'Offer1',text: 'Offer + 1 tick'},
                                                  {key:'6',value:'BestOffer',text: 'Best Offer Price'},
                                                  {key:'7',value:'LastPrice',text: 'Last Price'},
                                                  {key:'8',value:'BestBid',text: 'Best Bid Price'},
                                                  {key:'9',value:'Bid1',text: 'Bid - 1 tick'},
                                                  {key:'10',value:'Bid2',text: 'Bid - 2 ticks'},
                                                  {key:'11',value:'Bid3',text: 'Bid - 3 ticks'},
                                                  {key:'12',value:'Bid4',text: 'Bid - 4 ticks'},
                                                  {key:'13',value:'Bid5',text: 'Bid - 5 ticks'},
                                              ]
                                          }
                                          className={"f-12 text-center align-self-center col-sm-12"}
                                />

                            </div>
                            <div className="col-sm-12 row mb-3 pr-0">
                                <div className="col-sm-2 f-16 pt-3">
                                    IDR
                                </div>
                                <div className="col-sm-10 pr-0">
                                    <NumberInput
                                        status={this.state.value == "Manual" ? false:true}
                                        idclassname="tradeAtIdr" defaultValue="0"/>
                                </div>
                            </div>
                            <div className="col-sm-12 mb-3 text-right">
                                <button className="btn btn-primary">Save Settings</button>
                            </div>
                        </div>
                    </div>
                    <OrderSettingListAgGrid
                        clickedit={this.buttonClickEdit}
                        size={this.ceksize()}/>
                </div>
            </>
        );
    }
}

class EditPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "1",
            statusOrder: "0",
        };
    }
    handleChange = (e, { value }) => this.setState({ statusOrder: value })

    changeOrderPrice = (e,{value}) => {
        this.setState({ value: value })
    }

    render(){
        return(
            <div className="bg-dark-grey d-border">
                <div className="row">
                    <div className="col-sm-6 f-12 pt-3">
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
                            <div className="col-sm-12">
                                <label htmlFor="">Expired Date (max day 30)</label>
                            </div>
                            <div className="col-sm-12 ui input mb-3" style={{paddingRight:'53px'}}>
                                <Input placeholder='dd/mm/yy' id="datepickerTest2" className="col-sm-12 pl-0 pr-0 text-center align-self-center"/>
                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}><span
                                    className="fa fa-calendar-alt"></span></span>
                            </div>
                            <div className="col-sm-12">
                                <Form>
                                    <Form.Field>
                                        <Radio
                                            label='Disable'
                                            name='statusOrder'
                                            value='0'
                                            checked={this.state.statusOrder === "0"}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio
                                            label='Enable'
                                            name='statusOrder'
                                            value='1'
                                            checked={this.state.statusOrder === "1"}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form>
                                {/*<Checkbox label='Order Price'/>*/}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 f-12 pt-3">
                        <div className="col-sm-12">
                            <label>Set Condition</label>
                        </div>
                        <div className="col-sm-6">
                            <Dropdown placeholder='Buy'

                                      disabled
                                      defaultValue={"Buy"}
                                      search selection options={[{key:'Buy',value:'Buy',text: 'Buy'},{key:'Sell',value:'Sell',text: 'Sell'}]}
                                      className={"f-12 text-center align-self-center col-sm-12"}
                            />
                        </div>
                        <div className="col-sm-12 row pt-3 pr-0">
                            <div className="col-sm-12">
                                <label htmlFor="">Order Vol</label>
                            </div>
                            <div className="col-sm-5 mb-3">
                                <NumberInput idclassname="tradeAtOrderVol" defaultValue={"0"} />
                            </div>
                            <div className="col-sm-2 f-16 pt-3">
                                Lot
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <label>Order Price</label>
                        </div>
                        <div className="col-sm-12 mb-2">
                            <Dropdown placeholder='Offer + 5 ticks'
                                      defaultValue={"Offer5"}
                                      search
                                      selection
                                      onChange={this.changeOrderPrice}
                                      options={
                                          [
                                              {key:'14',value:'Manual',text: 'Manual Input'},
                                              {key:'1',value:'Offer5',text: 'Offer + 5 ticks'},
                                              {key:'2',value:'Offer4',text: 'Offer + 4 ticks'},
                                              {key:'3',value:'Offer3',text: 'Offer + 3 ticks'},
                                              {key:'4',value:'Offer2',text: 'Offer + 2 ticks'},
                                              {key:'5',value:'Offer1',text: 'Offer + 1 tick'},
                                              {key:'6',value:'BestOffer',text: 'Best Offer Price'},
                                              {key:'7',value:'LastPrice',text: 'Last Price'},
                                              {key:'8',value:'BestBid',text: 'Best Bid Price'},
                                              {key:'9',value:'Bid1',text: 'Bid - 1 tick'},
                                              {key:'10',value:'Bid2',text: 'Bid - 2 ticks'},
                                              {key:'11',value:'Bid3',text: 'Bid - 3 ticks'},
                                              {key:'12',value:'Bid4',text: 'Bid - 4 ticks'},
                                              {key:'13',value:'Bid5',text: 'Bid - 5 ticks'},
                                          ]
                                      }
                                      className={"f-12 text-center align-self-center col-sm-12"}
                            />

                        </div>
                        <div className="col-sm-12 row mb-3 pr-0">
                            <div className="col-sm-2 f-16 pt-3">
                                IDR
                            </div>
                            <div className="col-sm-10 pr-0">
                                <NumberInput
                                    status={this.state.value == "Manual" ? false:true}
                                    idclassname="tradeAtIdr" defaultValue="0"/>
                            </div>
                        </div>
                        <div className="col-sm-12 mb-3 text-right">
                            <button className="btn btn-primary">Save Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class OrderSettingListAgGrid extends React.PureComponent{
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            list: [42, 33, 68],
            columnDefs: [

                { field: "on", headerName: "#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:s=="s67"?130:s=="s75"?110:80, lockPosition:true, lockVisible:true,
                    comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    },
                    cellRendererFramework: function(params) {
                        var cmd = params.data.on;
                        var ruleID = params.data.ruleID;
                        if(cmd){
                            return <button className="btn-cellOn btn btn-sm btn-primary mx-1 f-9" onClick={() => self.onUpdateItem(ruleID) }> Enable </button>
                        }else{
                            return <button className="btn-cellOn btn btn-sm btn-dark mx-1 f-9" onClick={() => self.onUpdateItem(ruleID) }> Disable </button>
                        }
                    },
                    suppressSizeToFit: true,
                },
                { field: "ruleID", headerName: "#Rule.ID", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?175:s=="s50"?160:s=="s67"?140:s=="s75"?120:100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "code", headerName: "Code", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?175:s=="s50"?160:s=="s67"?140:s=="s75"?120:100,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "cmd", headerName: "Cmd.", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?160:s=="s50"?150:s=="s67"?130:s=="s75"?120:100,
                    cellClass : function (params) {
                        return params.data.cmd == "Buy" ? "text-center text-danger grid-table d-border-aggrid-right f-12 locked-col locked-visible"
                            : "text-center text-success grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "condition", headerName: "Condition", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?200:180, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?230:s=="s50"?200:s=="s67"?175:s=="s75"?170:s=="s80"?150:80, comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?280:s=="s50"?250:s=="s67"?195:s=="s75"?190:s=="s80"?160:120, comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "exp", headerName: "Expired Date", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?250:s=="s50"?220:s=="s67"?190:s=="s75"?185:s=="s80"?165:s=="s90"?155:135, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    } },
               { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", width:105, pinned: "right", lockPosition: true, lockVisible: true, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellwithdraw btn btn-sm btn-primary mx-1 f-9">Edit</button>'+
                            '<button class="btn-cellamend btn btn-sm btn-danger mx-1 f-9">Cancel</button>' +
                            '</span>';
                        var cButton = eDiv.querySelectorAll('.btn-cellamend')[0];
                        var eButton = eDiv.querySelectorAll('.btn-cellwithdraw')[0];

                        eButton.addEventListener('click', self.props.clickedit);
                        // cButton.addEventListener('click', self.props.clickedit);

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
                    ruleID: "1",
                    on: true,
                    price: "3,870",
                    code: "AALI",
                    cmd: "Sell"+s,
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "10 Lot",
                },
                {
                    ruleID: "2",
                    on: true,
                    price: "3,870",
                    cmd: "Buy",
                    code: "AALI",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "3 Lot",
                },
                {
                    ruleID: "3",
                    on: false,
                    price: "3,870",
                    cmd: "Buy",
                    code: "AALI",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "1 Lot",
                },
                {
                    ruleID: "4",
                    on: true,
                    price: "3,870",
                    cmd: "Sell",
                    code: "AALI",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "4 Lot",
                },
                {
                    ruleID: "5",
                    on: false,
                    price: "3,870",
                    code: "AALI",
                    cmd: "Buy",
                    condition: "Last price <= 12,750",
                    exp: "4/7/2019",
                    vol: "7 Lot",
                },
                {
                    ruleID: "6",
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
        this.setState(state => {
            const rowData = state.rowData.map((item, j) => {
                if (item.ruleID === i) {
                    console.log('ketemu');
                    var baru = {
                        'ruleID': item.ruleID,
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
                    <div className="bg-tableheader col-sm-12 px-0 mx-0 text-center py-3 f-16">ORDER SETTINGS LIST</div>
                </div>
                <div
                    className="card-Aut-Order ag-theme-balham-dark ag-header-border d-border ag-striped-odd"
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
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
                   onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendPage,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
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
                    <i className="icofont icofont-close text-icofont-close text-white click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth < 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth < 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth < 2030){
            return "s75";
        }else if(window.innerWidth > 2045 && window.innerWidth < 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth < 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s100";
        }
    }
    render() {
        return (
            <div className="container-fluid px-2 mx-0 pb-0 pt-1 card-527">
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>
                <div id={"orderListPin"}>
                    <VerifyPINPortofolio pos="orderList"/>
                </div>
                    <div className="row f-12 contentOrderList d-none">
                        <div className={"col-md-2 pl-5 text-left align-self-center"}>
                            <span>10</span> Order(s) Selected
                        </div>
                        <div className={"col-md-3 pl-5 text-left align-self-center"}>
                            Total Match Volume(Lot): <span>250</span>
                        </div>
                        <div className={"col-md-3 pl-5 text-left align-self-center"}>
                            Total Match Amnt: <span>2,500,000,000</span>
                        </div>
                        <div className={"col-md-3 pl-5 text-left align-self-center"}>
                            Total Volume: 250,000
                        </div>
                        <div className={"col-md-1 pb-2 text-right"}>
                            <Popup content='Refresh' position='top center' trigger={
                                <button
                                    className={`btn btn-primary`}
                                    style={{"font-size": "14px", "width": "38px", "margin-top": "2px"}}>
                                    <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                </button>
                            }/>
                        </div>
                    </div>
                    <div className="col-sm-12 px-0 card-310-odlist contentOrderList d-none">
                        <OrderListAgGrid
                            size={this.ceksize()}
                            clickorderdetail={this.buttonClickOrderDetail}
                            clickamend={this.buttonClickAmend}
                            clickwithdraw={this.buttonClickWithdraw}/>
                    </div>
                    <div className="col-sm-12 row px-0 ml-0 mt-0 pt-1 contentOrderList d-none" style={{'width':'100%'}}>
                        <div className="col-sm-6 pl-0 pr-2">
                            <div className="col-sm-12 pl-0 pr-0">
                                <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                                    <div className="col-sm-12 px-0 mx-0 text-center pt-3 pb-2 h-30 f-12 bg-tableheader">TRADE LIST</div>
                                </div>
                                <TradeListOrderListAgGrid size={this.ceksize()}/>
                            </div>
                        </div>
                        <div className="col-sm-6 pl-2 pr-0">
                            <div className="cssmenu d-border-bottom d-border-top d-border-left small h-30">
                                <ul className="ul-menu h-30">
                                    <li name="stockDaily"
                                        className={`col-sm-6 click-pointer d-border-right text-center${(this.state.activeTab == 1) ? ' active' : ''}`} onClick={() => this.setState({activeTab: 1})}>
                                        <a className="linkCustomStockTab h-30">
                                                    <span
                                                        className="f-12">ORDER SUMMARY</span></a></li>
                                    <li name="stockPage"
                                        className={`col-sm-6 click-pointer d-border-right text-center${(this.state.activeTab == 2) ? ' active' : ''}`} onClick={() => this.setState({activeTab: 2})}>
                                        <a className="linkCustomStockTab h-30">
                                                    <span
                                                        className="f-12">TRADE SUMMARY</span></a></li>
                                </ul>
                                <div style={{display: this.state.activeTab == 1 ? "block" : "none"}}>
                                    <TradeOrderSummaryAgGrid size={this.ceksize()}/>

                                </div>
                                <div style={{display: this.state.activeTab == 2 ? "block" : "none"}}>
                                    <TradeTradeSummaryAgGrid size={this.ceksize()}/>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        )
    };
}

class TradePageAdv_Base extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        };

    }

    ceksize(){
        if(window.innerWidth > 1290 && window.innerWidth <= 1370){
            return "s100";
        }else if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1520 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1800 && window.innerWidth <= 2030){
            return "s75";
        }else if(window.innerWidth > 2030 && window.innerWidth <= 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth <= 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s110";
        }
    }
    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#3D3E3F' : '#CDCDCE',
            neutral20: this.props.thememode === true ? '#333332' : '#E9E9E9',
            neutral30: this.props.thememode === true ? '#333332' : '#E9E9E9',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#878787',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#4D4D4E' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#202020' : '#ece9ea',
            primary: '#0071BC',
        },
    });
    render() {
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid",
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0
            })
        };
        const stockOptions = [
            { value:'bmpt', code: 'BMPT', saham: 'Bumi Mega Pertama ' },
            { value:'bnmp-ppt', code: 'BNMP-PPT', saham: 'Bumi Nusa Putra ' },
            { value:'bumi', code: 'BUMI', saham: 'Bumi Resource ' },
            { value:'asii', code: 'ASII', saham: 'Argo Astra Lestari ' },
            { value:'tlkm', code: 'TLKM', saham: 'Telekomunikasi Indonesia ' },
            { value:'wskt', code: 'WSKT', saham: 'Waskita ' },
            { value:'indf', code: 'INDF', saham: 'Indofood ' },
            { value:'bbca', code: 'BBCA', saham: 'Bank BCA ' },
            { value:'smrg', code: 'SMGR', saham: 'Semen Indonesia ' },
            { value:'bbri', code: 'BBRI', saham: 'Bank BRI ' }
        ];
        const customFilter  = (option, searchText) => {
            var code = option.data.code.toLowerCase().includes(searchText.toLowerCase());
            var saham = option.data.saham.toLowerCase().includes(searchText.toLowerCase());

            if(searchText.toLowerCase().includes(' ')){
                if(saham){
                    return true;
                }
            } else {
                if (code) {
                    return true;
                }
            }
        };
        return (
            <div className="container-fluid px-2 mx-0 pb-0 pt-1 card-527">
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>
                <div className="row f-12">
                    <div className={"col-md-4 text-left align-self-center"}>
                            <Select
                                getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                filterOption={customFilter} isSearchable={true}
                                maxMenuHeight={155}
                                styles={{customStyles}}
                                placeholder={<div>Search..</div>}
                                options={stockOptions} className="stockPageSelect text-left"
                                theme={this.selectSelectionTab}
                            />
                    </div>
                    <div className={"col-md-8 text-right"}>
                        <Popup content='Refresh' position='top center' trigger={
                            <button
                                className={`btn btn-primary`}
                                style={{"font-size": "14px", "width": "38px", "margin-top": "2px"}}>
                                <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                            </button>
                        }/>
                    </div>
                </div>
                <div className={"row pl-4 pr-4 mt-2"}>
                    <div className="col-sm-6 pl-0 pr-1 mb-3">
                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center row bg-tableheader">
                            <div className="col-sm-12 px-0 mx-0 text-center pt-3 pb-2 h-30 f-12 bg-tableheader">
                                BID
                            </div>
                        </div>
                        <TradeAdvBidAgGrid size={this.ceksize()}/>
                    </div>

                    <div className="col-sm-6 pl-1 pr-0 mb-3">
                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center row bg-tableheader">
                            <div className="col-sm-12 px-0 mx-0 text-center pt-3 pb-2 h-30 f-12 bg-tableheader">
                                OFFER
                            </div>
                        </div>
                        <TradeAdvOfferAgGrid size={this.ceksize()}/>
                    </div>
                </div>


            </div>
        )
    };
}

class TradePL extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
        };
    }
    ceksize(){
        if(window.innerWidth > 1290 && window.innerWidth <= 1370){
            return "s100";
        }else if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1520 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1800 && window.innerWidth <= 2030){
            return "s75";
        }else if(window.innerWidth > 2030 && window.innerWidth <= 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth <= 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s110";
        }
    }
    render() {
        return (
            <div className="container-fluid px-2 mx-0 pb-0 pt-1 card-527">
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>
                <div className="row f-12">
                                    <div className="col-md-12">
                                            <div className="col-md-12 p-3">
                                                <div className="row p-3">
                                                    <div className="col-md-3 mt-3 mb-5">
                                                        Sell Amount
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='0,00.' placeholder='SellAmount' 
                                                        className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        Sales PL
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='0,00.' placeholder='SellAmount' 
                                                        className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        Buy Amount
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='0,00.' placeholder='SellAmount' 
                                                        className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        Sales PL(%)
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='0,00.' placeholder='SellAmount' 
                                                        className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                </div> 
                                        
                                            </div>
                                        </div>
                                        </div>
                                
                <div className="col-sm-12 px-0">
                    <TradePLAgGrid
                        size={this.ceksize()}/>
                </div>
            </div>
        )
    };
}

class TradeOrderBookList extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        };

    }
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }
    clickdetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
                   onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: DetailTradeOrderBook,
        })
    }
    ceksize(){
        if(window.innerWidth > 1290 && window.innerWidth <= 1370){
            return "s100";
        }else if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1520 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1800 && window.innerWidth <= 2030){
            return "s75";
        }else if(window.innerWidth > 2030 && window.innerWidth <= 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth <= 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s110";
        }
    }
    render() {
        return (
            <div className="container-fluid px-2 mx-0 pb-0 pt-1 card-527">
                <WSConnectionAction ref="wsAction"/> {/* websocket connection component */}
                <AppFrameAction ref="frameAction"/>
                <div id={"orderListPinHist"}>
                    <VerifyPINPortofolio pos="orderList"/>
                </div>
                <div className="col-sm-12 px-0 card-310 contentOrderList d-none">
                    <TradeOrderBookListAgGrid
                        clickdetail={this.clickdetail}
                        size={this.ceksize()}/>
                </div>
            </div>
        )
    };
}

class DetailTradeOrderBook extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        $(document).keypress(function(e) {
            if(e.which == 13) {
                $("#enter-ok").click();
            }
        });
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-12 text-white px-0 mx-0 f-12">
                    <div className="col-sm-12 mx-0 px-0">
                        <Table size="sm" responsive borderless className="text-white">
                            <thead className="d-border-table">
                            <tr>
                                <th
                                    className="text-center bg-brown text-white" colSpan="3">ORDER BOOKING DETAIL</th>
                            </tr>
                            </thead>
                            <tbody className="no-wrap d-border-table">
                            <tr>
                                <td>Booking No</td>
                                <td>:</td>
                                <td className={"text-right"}>001</td>
                            </tr>
                            <tr>
                                <td>Code</td>
                                <td>:</td>
                                <td>TLKM</td>
                            </tr>
                            <tr>
                                <td>Market</td>
                                <td>:</td>
                                <td>RG</td>
                            </tr>
                            <tr>
                                <td>Booking Date</td>
                                <td>:</td>
                                <td>22/02/2020</td>
                            </tr>

                            </tbody>
                            </Table>
                    </div>
                </div><br/>
                <div className="col-sm-12 text-center mx-0 px-0 f-12">Do you want to cancel the order ?</div><br/>
                <div className="col-sm-12 row mx-0 px-0">
                    <div className="col-sm-12 text-center">
                        <button className="btn btn-danger col-sm-6" id="enter-ok" onClick={
                            () => {
                                alert('Order canceled!');
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>Cancel Order</button>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button className="btn btn-trans col-sm-6" onClick={
                            () => {
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>Cancel</button>
                    </div>
                </div>
            </>
        );
    }
}


class SettingInWatchlist extends React.Component{
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1520 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1800 && window.innerWidth <= 2030){
            return "s75";
        }else if(window.innerWidth > 2030 && window.innerWidth <= 2303){
            return "s67";
        }else if(window.innerWidth > 2303 && window.innerWidth <= 2559){
            return "s50";
        }else if(window.innerWidth > 2559){
            return "s49";
        }else{
            return "s100";
        }
    }
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="row col-sm-12 card-527 px-2 mx-0 pt-2 pb-0">
                    <div className="col-sm-4 px-0 mx-0 card-514">
                        <TradeWatchlistAgGrid size={this.ceksize()}/>
                    </div>
                    <div className="col-sm-8 pl-3 pr-0 mx-0 card-514">
                        <div className="col-sm-12 px-0 pt-0">
                            <BuyPage/>
                        </div>
                    </div>
                    {/*<div className="col-md-8 pl-1">*/}
                        {/*<SettingOrder*/}
                            {/*type="full"*/}
                            {/*lpSetting="setWatchlist"*/}
                            {/*volSetting="volsetWatchlist"*/}
                            {/*opSetting="opsetWatchlist"*/}
                            {/*slpSetting="ssetWatchlist" svolSetting="svolsetWatchlist" sopSetting="sopsetWatchlist"/>*/}
                    {/*</div>*/}
                </div>

            </>
        );
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
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", resizable: true,
                    width: s=="s49"?110:80, minWidth: 80, lockPosition:true, lockVisible:true, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }, suppressSizeToFit: true},
                { field: "price", headerName: "Price", filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?110:80, minWidth: 80,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", resizable: true, filter: "agNumberColumnFilter", comparator: stringComparator,
                    width: 90, minWidth: 90,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "persen", headerName: "(%)",  resizable: true, filter: "agNumberColumnFilter", comparator: integerComparator,
                    width: 70, minWidth: 70,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "tvol", headerName: "T. Vol", resizable: true, filter: "agNumberColumnFilter", comparator: integerComparator,
                    width: 100, minWidth: 100,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "accumulated", headerName: "Accumulated Foreign Vol.", filter: "agNumberColumnFilter", comparator: integerComparator,
                    resizable: true, width: 200, minWidth: 200,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "avgprice", headerName: "Avg. Price", resizable: true, filter: "agNumberColumnFilter", comparator: integerComparator,
                    width: 100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: false,
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
                    className="card-514 ag-theme-balham-dark ag-header-border d-border ag-striped-odd"
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
//Sent Order
class OrderHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?180:90, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "ruleID", headerName: "#Rule.ID", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?250:s=="s50"?200:s=="s67"?155:s=="s75"?150:135,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "code", headerName: "Code", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?250:s=="s50"?200:s=="s67"?100:s=="s75"?80:75,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "cmd", headerName: "Cmd", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?250:s=="s50"?200:s=="s67"?110:s=="s75"?100:80,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "qty", headerName: "Qty", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?150:s=="s50"?120:s=="s67"?110:s=="s75"?100:80,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?160:140,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "mqty", headerName: "M Qty", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?180:s=="s67"?140:s=="s75"?130:110,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "mprice", headerName: "M Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?220:s=="s67"?215:s=="s75"?210:s=="s80"?173:s=="s90"?133:120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "result", headerName: "Result", sortable: true, filter: "agNumberColumnFilter", comparator: stringComparator,
                    resizable: true, width: s=="s49"?260:s=="s50"?240:s=="s67"?230:s=="s75"?220:s=="s80"?200:s=="s90"?160:120,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "setdate", headerName: "Set Date", sortable: true, filter: "agTextColumnFilter", comparator: dateComparator,
                    resizable: true, width: s=="s49"?270:s=="s50"?250:s=="s67"?245:s=="s75"?240:s=="s80"?210:s=="s90"?160:110,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "dateuntil", headerName: "Date Until", sortable: true, filter: "agTextColumnFilter", comparator: dateComparator,
                    resizable: true, width: s=="s50"?360:s=="s50"?340:s=="s67"?250:s=="s75"?240:s=="s80"?210:s=="s90"?160:110,
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
                { date: "28/11/2018"+s+s+s+s+s,
                    time: "08:21:33",
                    ruleID : "001",
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
                    ruleID : "001",
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
                    className="card-520 ag-theme-balham-dark d-border bg-dark-grey ag-bordered ag-striped-odd d-border"
                    >
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
        const s = props.size;
        this.state = {
            columnDefs: [

                { field: "-", headerName: "#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?50:35, comparator: stringComparator,
                    minWidth: 35,
                    headerCheckboxSelectionFilteredOnly: true,
                    checkboxSelection: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center text-primary f-12 click-pointer";
                    },
                    cellRendererFramework: function(params){
                        var orderId = params.data.order;
                        return <text>&nbsp;</text>
                    },
                    suppressSizeToFit: true
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:s=="s49"?135:s=="s50"?115:100, minWidth:100, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left  f-12";
                    },
                },
                { field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?85:85, minWidth: 85,
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
                { field: "marketorder", headerName: "Market Order#", sortable: true,  comparator: stringComparator,
                    resizable: true, width: s=="s49"?130:130, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },
                { field: "code", headerName: "Code", sortable: true, resizable: true,  comparator: stringComparator,
                    width: s=="s49"?100:s=="s50"?100:s=="s67"?100:80, minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left text-primary f-12";
                    },
                },
                { field: "cmd", headerName: "Cmd", sortable: true, resizable: true,  comparator: stringComparator,
                    width: s=="s49"?100:s=="s50"?100:s=="s67"?100:70, minWidth: 70,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "status", headerName: "Status", sortable: true, resizable: true,  comparator: stringComparator,
                    width:s=="s49"?100:s=="s50"?100:s=="s67"?100:85, minWidth: 85,
                    tooltipField: 'status',
                    tooltipComponentParams: { type: 'status' },

                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "remark", headerName: "Remark", sortable: true, resizable: true,  comparator: stringComparator,
                    width:s=="s49"?100:95, minWidth:95,
                    tooltipField: 'remark',
                    tooltipComponentParams: { type: 'remark' },
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var status = params.data.status;
                        if(params.data.status.includes('Sending')){
                            return '<i class="fas fa-hourglass-half text-tosca"></i>&nbsp;&nbsp;'+ params.data.remark;
                        }else{
                            if(params.data.remark == ""){
                                return '';
                            }else{
                                return '<i class="fa fa-check text-success"></i> &nbsp;&nbsp;'+ params.data.remark;
                            }
                        }
                    }
                },
                { field: "type", headerName: "Type", sortable: true, resizable: true,  comparator: stringComparator,
                    width:s=="s49"?90:70, minWidth: 70,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12 text-center";
                    },
                },
                { field: "mkt", headerName: "Mkt", sortable: true, resizable: true,  comparator: stringComparator,
                    width:s=="s49"?90:70, minWidth:70,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right f-12 text-center";
                    },
                },
                { field: "vlot", headerName: "Vol. Lot", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width:s=="s49"?100:100, minWidth: 100, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "vshares", headerName: "Vol. Shares", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width:s=="s49"?120:120, minWidth:120, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?105:s=="67"?100:86, minWidth: 86, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "mlot", headerName: "Match Vol. Lot", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width:s=="s49"?135:130, minWidth:130, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "mshares", headerName: "Match Vol. Shares", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?145:140, minWidth:140, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "avgmatchprice", headerName: "Avg. Match Price", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?145:135, minWidth:135, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?120:s=="s67"?110:100, minWidth:100, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },

                { field: "userId", headerName: "UserID", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:s=="s49"?130:100, minWidth:100, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },
                { field: "method", headerName: "Method", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:s=="s49"?130:100, minWidth:100, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },
                { field: "terminal", headerName: "Terminal", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:s=="s49"?130:100, minWidth:100, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },
                { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter",
                    width:s=="s49"?140:130, minWidth:130,
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
                tooltipComponent: 'customTooltip',
            },
            tooltipShowDelay: 0,
            frameworkComponents: {customTooltip: CustomTooltip},
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
                    remark : "(1128): Security is not currently trading",
                    type :"Day",
                    mkt :"RG",
                    vlot :10,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice : 12650,
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",
                },
                {order : "001699",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :15,
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001698",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :19,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :29500,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Auto",},
                {order : "001697",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :11,
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :12635,
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Desktop",
                    method: "Booking",},
                {order : "001696",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :13,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Auto",},
                {order : "001695",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :18,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Desktop",
                    method: "Direct",},
                {order : "001694",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :22,
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001693",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :3,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :29500,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001692",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :9,
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :12624,
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001691",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :14,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001690",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :21,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001689",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :13,
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001688",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :6,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :29500,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",
                    userId: "A9088",
                    terminal: "Web",
                    method: "Direct",},
                {order : "001687",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :32,
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :12625,
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001686",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :24,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001685",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :27,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001684",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :29,
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001683",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :30,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :29500,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Auto",},
                {order : "001682",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :33,
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :12650,
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001681",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :32,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :13560,
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",
                    userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001680",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :54,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001679",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :10,
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001678",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :10,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :29500,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001677",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :11,
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :12650,
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001676",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :12,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001675",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :13,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:20:17",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001674",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :14,
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:19:17",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001673",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :8,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :29500,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001672",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
                    type :"Day",
                    mkt :"RG",
                    vlot :8,
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :32580,
                    amount :"23,600,000",
                    time :"11:10:12",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001671",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "",
                    type :"Day",
                    mkt :"RG",
                    vlot :9,
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :45000,
                    amount :"12,625,000",
                    time :"11:22:17",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "001670",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
                    type :"Day",
                    mkt :"RG",
                    vlot :12,
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :12650,
                    amount :"12,650,000",
                    time :"11:22:10",
                    action: "",userId: "A9088",
                    terminal: "Mobile",
                    method: "Booking",},
                {order : "",
                    marketorder :"",
                    code : "",
                    cmd : "",
                    status :"",
                    remark : "",
                    type :"",
                    mkt :"",
                    vlot :"",
                    vshares :"",
                    price :"",
                    mlot :"",
                    mshares :"",
                    avgmatchprice :"",
                    amount :"",
                    time :"",
                    action: "",},
                {order : "",
                    marketorder :"",
                    code : "",
                    cmd : "",
                    status :"",
                    remark : "",
                    type :"",
                    mkt :"",
                    vlot :"",
                    vshares :"",
                    price :"",
                    mlot :"",
                    mshares :"",
                    avgmatchprice :"",
                    amount :"",
                    time :"",
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


    render() {

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-310-odlist ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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
                        tooltipShowDelay={this.state.tooltipShowDelay}
                        frameworkComponents={this.state.frameworkComponents}
                        groupSelectsFiltered={true}
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
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?172:s=="s50"?170:s=="s67"?140:s=="s75"?120:s=="s80"?105:s=="s90"?90:80, minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "code", headerName: "Code", sortable: true, resizable: true,
                    width: s=="s49"?205:s=="s50"?200:s=="s67"?140:s=="s75"?120:s=="s80"?105:s=="s90"?90:78, minWidth:78, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?245:s=="s50"?240:s=="s67"?100:s=="s75"?95:s=="s80"?105:s=="s90"?90:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table text-right d-border-aggrid-right f-12";
                    },
                },{ field: "vol", headerName: "Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s67"?190:s=="s75"?90:s=="s80"?105:s=="s90"?70:60, minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "val", headerName: "Val", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?125:s=="s67"?120:s=="s75"?100:s=="s80"?80:s=="s90"?70:60, minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "buyer", headerName: "Buyer", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: stringComparator,
                    width: s=="s49"?105:s=="s67"?100:s=="s75"?100:s=="s80"?95:s=="s90"?90:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "seller", headerName: "Seller", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: stringComparator,
                    width: s=="s49"?102:s=="s67"?100:s=="s75"?100:s=="s80"?90:86, minWidth: 86,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "tradeId", headerName: "TradeID", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: stringComparator,
                    width: s=="s49"?173:s=="s50"?175:s=="s67"?170:s=="s75"?167:s=="s80"?100:90, minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: false,
                filter: true,
            },
            rowData: [
                {
                    time : "08:02:12"+s,
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
                    className={"card-177 ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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
class TradeAdvBidAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "broker", headerName: "Broker", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?295:s=="s50"?263:s=="s67"?235:s=="s75"?215:s=="s80"?190:s=="s90"?160:s=="s100"?155:145,
                    minWidth:145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?295:s=="s50"?265:s=="s67"?235:s=="s75"?225:s=="s80"?190:s=="s90"?165:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vol", headerName: "Vol(SHR)", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?295:s=="s50"?265:s=="s67"?235:s=="s75"?220:s=="s80"?195:s=="s90"?165:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },},
                { field: "value", headerName: "Value", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?295:s=="s50"?265:s=="s67"?235:s=="s75"?220:s=="s80"?195:s=="s90"?165:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    broker: 'A'+s,
                    vol: '1',
                    price: '1',
                },{
                    broker: 'B'+s,
                    vol: '123456789',
                    price: '11234454',
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
                    className={"card-tradeAdv ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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
class TradeAdvOfferAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "broker", headerName: "Broker", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?295:s=="s50"?263:s=="s67"?235:s=="s75"?215:s=="s80"?190:s=="s90"?160:s=="s100"?155:145,
                    minWidth:145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?295:s=="s50"?265:s=="s67"?235:s=="s75"?225:s=="s80"?190:s=="s90"?165:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vol", headerName: "Vol(SHR)", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?295:s=="s50"?265:s=="s67"?235:s=="s75"?220:s=="s80"?195:s=="s90"?165:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "value", headerName: "Value", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?295:s=="s50"?265:s=="s67"?235:s=="s75"?220:s=="s80"?195:s=="s90"?165:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    broker: "AA",
                    price: 123232131,
                    vol: 12,
                    value: 5,
                },{
                    broker: "AA",
                    price: 123232131,
                    vol: 12,
                    value: 5,
                },{
                    broker: "AA",
                    price: 123232131,
                    vol: 12,
                    value: 5,
                },{
                    broker: "AA",
                    price: 123232131,
                    vol: 12,
                    value: 5,
                },{
                    broker: "AA",
                    price: 123232131,
                    vol: 12,
                    value: 5,
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
                    className={"card-tradeAdv ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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

class TradePLAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?210:s=="s50"?195:s=="s67"?180:s=="s75"?160:s=="s80"?135:s=="s90"?110:s=="s100"?105:100,
                    minWidth:140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "buyVol", headerName: "Buy Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?290:s=="s50"?255:s=="s67"?230:s=="s75"?210:s=="s80"?180:s=="s90"?165:s=="s100"?160:150, minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "buyAmount", headerName: "Buy Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?300:s=="s50"?270:s=="s67"?230:s=="s75"?210:s=="s80"?200:s=="s90"?170:s=="s100"?160:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "sellVol", headerName: "Sell Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?210:s=="s50"?195:s=="s67"?170:s=="s75"?160:s=="s80"?140:s=="s90"?115:s=="s100"?110:100,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "sellAmount", headerName: "Sell Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?310:s=="s50"?280:s=="s67"?240:s=="s75"?220:s=="s80"?200:s=="s90"?170:s=="s100"?160:150, minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "feeTax", headerName: "Fee & Tax", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?310:s=="s50"?270:s=="s67"?230:s=="s75"?230:s=="s80"?200:s=="s90"?170:s=="s100"?160:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "avgPrice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?300:s=="s50"?270:s=="s67"?255:s=="s75"?240:s=="s80"?200:s=="s90"?170:s=="s100"?160:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "PL", headerName: "P/L(+/-)", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?290:s=="s50"?260:s=="s67"?220:s=="s75"?220:s=="s80"?185:s=="s90"?160:s=="s100"?150:140,
                    minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "percentage", headerName: "(%)", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?160:s=="s50"?150:s=="s67"?140:s=="s75"?135:s=="s80"?120:s=="s90"?110:s=="s100"?100:95,
                    minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    code :"AALI"+s,
                    vol: 3,
                    buyAmount : "13.000",
                    sellAmount: "14.000",
                    feeTax: "15.000",
                    avgPrice: "222",
                    pl: "123",
                    percentage: "1000",
                },{
                    code :"BUMI"+s,
                    vol: 3,
                    buyAmount : "13.000",
                    sellAmount: "14.000",
                    feeTax: "15.000",
                    avgPrice: "222",
                    pl: "123",
                    percentage: "1000",
                },{
                    code :"BUDI"+s,
                    vol: 3,
                    buyAmount : "13.000",
                    sellAmount: "14.000",
                    feeTax: "15.000",
                    avgPrice: "222",
                    pl: "123",
                    percentage: "1000",
                },{
                    code :"SMGR"+s,
                    vol: 3,
                    buyAmount : "13.000",
                    sellAmount: "14.000",
                    feeTax: "15.000",
                    avgPrice: "222",
                    pl: "123",
                    percentage: "1000",
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
                    className={"card-tradePL ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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

class TradeOrderBookListAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?140:s=="s50"?130:s=="s67"?120:s=="s75"?110:s=="s80"?100:s=="s90"?60:s=="s100"?60:60,
                    minWidth:60,comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "bookingNo", headerName: "Booking No", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    comparator: stringComparator,
                    width: s=="s49"?210:s=="s50"?200:s=="s67"?175:s=="s75"?170:s=="s80"?150:s=="s90"?140:s=="s100"?130:120,
                    minWidth:120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "status", headerName: "Status", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    comparator: stringComparator,
                    width: s=="s49"?210:s=="s50"?200:s=="s67"?170:s=="s75"?160:s=="s80"?140:s=="s90"?120:s=="s100"?120:120,
                    minWidth:120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "cmd", headerName: "Cmd", sortable: true, resizable: true,
                    comparator: stringComparator,
                    width: s=="s49"?210:s=="s50"?190:s=="s67"?170:s=="s75"?160:s=="s80"?140:s=="s90"?110:s=="s100"?90:80,
                    minWidth:80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "mkt", headerName: "Mkt", sortable: true, resizable: true,
                    comparator: stringComparator,
                    width: s=="s49"?210:s=="s50"?180:s=="s67"?170:s=="s75"?160:s=="s80"?140:s=="s90"?100:s=="s100"?90:80,
                    minWidth:80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },
                { field: "code", headerName: "Code", sortable: true, resizable: true,
                    comparator: stringComparator,
                    width: s=="s49"?250:s=="s50"?220:s=="s67"?200:s=="s75"?190:s=="s80"?140:s=="s90"?100:s=="s100"?90:80,
                    minWidth:80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    comparator: integerComparator,
                    width: s=="s49"?250:s=="s50"?220:s=="s67"?190:s=="s75"?180:s=="s80"?150:s=="s90"?140:s=="s100"?140:140,
                    minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vol", headerName: "Vol(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    comparator: integerComparator,
                    width: s=="s49"?250:s=="s50"?220:s=="s67"?180:s=="s75"?170:s=="s80"?140:s=="s90"?130:s=="s100"?130:120,
                    minWidth: 120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vollot", headerName: "Vol(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    comparator: integerComparator,
                    width: s=="s49"?240:s=="s50"?220:s=="s67"?180:s=="s75"?160:s=="s80"?150:s=="s90"?130:s=="s100"?120:110,
                    minWidth: 110,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "bookingDate", headerName: "Booking Date", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, comparator: dateComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?210:s=="s75"?190:s=="s80"?170:s=="s90"?160:s=="s100"?150:140,
                    minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                }, { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", width:140,
                    pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellamend btn btn-sm btn-primary mx-1 f-9">Cancel</button>'+
                            '</span>';
                        var aButton = eDiv.querySelectorAll('.btn-cellamend')[0];

                        aButton.addEventListener('click', self.props.clickdetail);

                        return eDiv;
                    }, suppressSizeToFit: true
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    no: '1'+s,
                    bookingNo: '001',
                    status: 'success',
                    cmd: 'Buy',
                    mkt: 'RG',
                    code: 'TLKM',
                    price: '222,222',
                    vol: '1',
                    vollot: '2',
                    bookingDate: '21/02/2020',
                },
                {
                    no: '2',
                    bookingNo: '002',
                    status: 'success',
                    cmd: 'Buy',
                    mkt: 'RG',
                    code: 'TLKM',
                    price: '222,222',
                    vol: '1',
                    vollot: '2',
                    bookingDate: '22/02/2020',
                },
                {
                    no: '',
                    bookingNo: '',
                    status: '',
                    cmd: '',
                    mkt: '',
                    code: '',
                    price: '',
                    vol: '',
                    vollot: '',
                    bookingDate: '',
                },
                {
                    no: '',
                    bookingNo: '',
                    status: '',
                    cmd: '',
                    mkt: '',
                    code: '',
                    price: '',
                    vol: '',
                    vollot: '',
                    bookingDate: '',
                },
                {
                    no: '',
                    bookingNo: '',
                    status: '',
                    cmd: '',
                    mkt: '',
                    code: '',
                    price: '',
                    vol: '',
                    vollot: '',
                    bookingDate: '',
                },
                {
                    no: '',
                    bookingNo: '',
                    status: '',
                    cmd: '',
                    mkt: '',
                    code: '',
                    price: '',
                    vol: '',
                    vollot: '',
                    bookingDate: '',
                },
                {
                    no: '',
                    bookingNo: '',
                    status: '',
                    cmd: '',
                    mkt: '',
                    code: '',
                    price: '',
                    vol: '',
                    vollot: '',
                    bookingDate: '',
                }

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
    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
                   onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendPage,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
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
                    className={"card-520 ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        >
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
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", resizable: true,
                    width:85, minWidth: 85,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "leaveVol", headerName: "Leave Vol", filter: "agNumberColumnFilter", resizable: true,
                    width:s=="s49"?172:s=="s50"?170:130, minWidth: 130, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "tradeVol", headerName: "Trade Vol", filter: "agNumberColumnFilter", comparator: integerComparator,
                    resizable: true, width: s=="s49"?252:s=="s50"?250:s=="s67"?150:120, minWidth: 120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vol", headerName: "Vol(Lot)", filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?152:s=="s50"?150:s=="s67"?90:70, minWidth: 70,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "avgPrice", headerName: "Avg. Price", filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?302:s=="s50"?300:s=="s67"?250:s=="s75"?245:s=="s80"?205:s=="s90"?185:130, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "cmd", headerName: "Cmd", resizable: true, comparator: stringComparator,
                    width: s=="s49"?220:s=="s67"?230:s=="s75"?225:s=="s80"?210:s=="s90"?130:80, minWidth: 80,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: false,
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
                    vol: 1,
                },{
                    code : "AALI",
                    leaveVol :"3",
                    tradeVol : "5",
                    avgPrice : "13,635.00",
                    cmd :"SELL",
                    vol: 12,
                },{
                    code : "AALI",
                    leaveVol :"2",
                    tradeVol : "5",
                    avgPrice : "12,635.00",
                    cmd :"SELL",
                    vol: 5,
                },{
                    code : "AALI",
                    leaveVol :"7",
                    tradeVol : "1",
                    avgPrice : "9,635.00",
                    cmd :"BUY",
                    vol: 8,
                },{
                    code : "AALI",
                    leaveVol :"1",
                    tradeVol : "2",
                    avgPrice : "5,135.00",
                    cmd :"SELL",
                    vol: 21,
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
                    className={"card-176 ag-theme-balham-dark ag-bordered ag-striped-odd d-border d-border"}
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
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", resizable: true, comparator: stringComparator,
                    width: s=="s49"?340:s=="s50"?310:s=="s67"?250:155, minWidth: 155,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "cmd", headerName: "Cmd", resizable: true, comparator: stringComparator,
                    width: s=="s49"?340:s=="s50"?310:s=="s67"?125:150, minWidth: 150,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? " text-center text-danger grid-table d-border-aggrid-right f-12" :
                            " text-center text-success grid-table d-border-aggrid-right f-12";
                    },
                },{ field: "price", headerName: "Price", filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?440:s=="s50"?410:s=="s67"?355:s=="s75"?335:s=="s80"?277:s=="s90"?227:160, minWidth: 160,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vol", headerName: "Vol", filter: "agNumberColumnFilter", comparator: integerComparator,
                    resizable: true, width: s=="s49"?400:s=="s50"?350:s=="s67"?340:s=="s75"?335:s=="s80"?290:s=="s90"?250:160,
                    minWidth: 160,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: false,
                filter: true,
                rowSelection: "multiple",
            },
            rowData: [
                {
                    code : "AALI",
                    price :"15,000",
                    vol : "3",
                    cmd: 'BUY',
                },{
                    code : "AALI",
                    price :"25,000",
                    vol : "4",
                    cmd: 'SELL',
                },{
                    code : "AALI",
                    price :"35,000",
                    vol : "2",
                    cmd: 'BUY',
                },{
                    code : "AALI",
                    price :"5,000",
                    vol : "1",
                    cmd: 'SELL  ',
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
                    className={"card-176 ag-theme-balham-dark ag-striped-odd ag-bordered d-border"}
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
class AmendPage extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row card-520">
                        <div className="col-sm-6 px-2 mt-0 card-520 d-border bg-blackgrey">
                            <TableInfoTransaction lotshare="modalamend" />
                        </div>
                        <div className="col-sm-6 mt-0 d-border-active bg-amend card-520 d-border">
                            <FormAmend idPrice="modalAmendPrice" idVol="modalAmendVol" idValue="modalAmendValue" columnSm="col-sm-11"/>
                        </div>
                    </div>
                </div>
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
const TradePageAdv = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(TradePageAdv_Base);
export {CustomFrameHeaderTrade, Trade,
    OrderbookPage, TradeWatchlist, TradePageAdv, TradeOrderBookList, SettingInWatchlist,
    OrderSetting,SentOrder, TradePL,

};
