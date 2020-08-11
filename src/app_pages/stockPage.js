import React from 'react';
import Select from 'react-select';
import {AppFrame, AppFrameAction, AppFrameProvider, AppModal} from "../appframe";
import {Dropdown, Input, Popup} from 'semantic-ui-react';
import {Table as TableBS} from 'react-bootstrap';


import {BIPSAppProvider, BIPSAppContext } from "../AppData";
import FillHeaderTab from "../tabheaderfill";
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import { ContextConnector } from '../appcontext.js';

import ModalAlertN from "./../app_modals/modal_Alert";

import ModalBuy from "./../app_modals/modal_buy";
import ModalSell from "./../app_modals/modal_sell";
import MenuOfContent from "./../menuofcontent";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";

import FormBuy from "./../app_transaction/form_buy";
import FormSell from "../app_transaction/form_sell";
import StockChart from "./stockChart";
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';
import $ from 'jquery';
import {AgGridReact} from "ag-grid-react";
import SweetAlert from "react-bootstrap-sweetalert";


import anychart from 'anychart';
import AnyChart from '../../node_modules/anychart-react/dist/anychart-react.min.js'

import '../../node_modules/anychart/dist/css/anychart-ui.min.css';
import '../../node_modules/anychart/dist/js/anychart-ui.min.js';
import '../../node_modules/anychart/dist/fonts/css/anychart-font.min.css';
import '../../node_modules/anychart/dist/js/anychart-data-adapter.min.js'
import '../../node_modules/anychart/dist/js/anychart-annotations.min.js';

import '../../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js';
import {ResizeResponsive} from "./mainPage";

window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');
require('../bootstrap-3.3.7/bootstrap-datepicker.standalone.min.css');
require('../../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');

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
const summaryOptions = [
    //untuk top active
    { key: 'all', value: 'all', text: 'All' },
    // { key: 'rg', value: 'rg', text: 'RG' },
    { key: 'tn', value: 'tn', text: 'TN' },
    { key: 'ng', value: 'ng', text: 'NG' },
];
const yearOptions = [
    { key: 'satu', value: 'satu', text: '1\'st Qtr ' },
    { key: 'dua', value: 'dua', text: '2\'nd Qtr' },
    { key: 'tiga', value: 'tiga', text: '3\'rd Qtr' },
    { key: 'empat', value: 'empat', text: '4\'th Qtr' },
]

const CustomFrameHeaderStock = (props) => {
    return (
        <div>
            {/* <BIPSAppProvider> */}
            <WSConnectionAction />
            <div className="col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab treeName="/stockPage" linkTitles={
                        {
                            stockInfoPage : 'STOCK INFO',
                            stockFinancialStatement : 'FINANCIAL REPORT',
                            stockWatchlistPage: 'STOCK WATCHLIST',
                            stockHistoryPage: 'STOCK TRADE HISTORY',
                            stockTradeSummaryPage: 'STOCK TRADE SUMMARY'
                        }
                    } />
                </div>
            </div>
            <AppFrame treeName="/stockPage" headerComponent={StockFrameHeader}/>
            {/*<AppModal/>*/}
            {/* </BIPSAppProvider> */}
        </div>
    );
}

const StockFrameHeader = (props) => {
    return (
        <></>
    );
}

class Stocks extends React.PureComponent {

    render () {
        return (
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

const StockInfo = (props) => {
    return(
        <div>
            {/*<BIPSAppProvider>*/}
            <WSConnectionAction />
            <div className="row col-sm-12 px-0 mx-0 pt-1 card-191">
                <div className="col-sm-12 px-0 h-30">
                    <MenuOfContent treeName="/stockPage/stockInfoPage" linkTitles={
                        {
                            stockInfoTable : 'STOCK INFO',
                            profilTable : 'PROFIL',
                            corpActionTable : 'CORP ACTION'
                        }
                    } />
                </div>
                <div className="col-sm-12 px-0 d-border card-161">
                    <AppFrame treeName="/stockPage/stockInfoPage" headerComponent={StockInfoFrameHeader}/>
                </div>
            </div>
            {/*</BIPSAppProvider>*/}
        </div>
    );
}

class TableStockInfo extends React.PureComponent{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <TableBS responsive size="sm" className="text-white my-0 bg-dark-grey card-161-1 ">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Listed</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">IPO</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right">1,550</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Tradeable</td>
                        <td className="py-1 text-primary text-right d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Base</td>
                        <td className="py-1 text-primary text-right d-border-tr-gray">1,230</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Fg Avail</td>
                        <td className="py-1 text-primary text-right d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Board</td>
                        <td className="py-1 text-primary text-left d-border-tr-gray">Main</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Mkt. Capital(M)</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right">24.299T</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Status</td>
                        <td className="py-1 text-primary d-border-tr-gray text-left">Pre-opening</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Corp. Action</td>
                        <td className="py-1 text-primary d-border-tr-gray text-left" colSpan="3">No Corporation Action</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Marginable</td>
                        <td className="py-1 text-primary d-border-tr-gray text-left" colSpan="3">Marginable and Shirt Selling</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding">Sub Sector</td>
                        <td className="py-1 text-primary d-border-tr-gray text-left" colSpan="3">Plantation</td>
                    </tr>
                    </tbody>
                </TableBS>
            </>
        );
    }
}


class TableProfil extends React.PureComponent{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <TableBS responsive size="sm" className="text-white my-2" borderless>
                    <thead></thead>
                    <tbody>
                    <tr className="py-3"><td>Corporate Governance</td></tr>
                    <tr className="py-3">
                        <td>
                            PT Astra Agro Lestari Tbk’s ISS Governance Quality
                            Score as of N/A is N/A. The pillar scores are Audit: N/A; Board: N/A;
                            Shareholder Rights: N/A; Compensation: N/A.
                        </td>
                    </tr>
                    <tr className="py-3">
                        <td>
                            Corporate governance scores courtesy of Institutional Shareholder Services (ISS).
                            Scores indicate decile rank relative to index or region. A decile score of 1 indicates
                            lower governance risk, while a 10 indicates higher governance risk.
                        </td>
                    </tr>
                    </tbody>
                </TableBS>
            </>
        );
    }
}

class TableCorpAction extends React.PureComponent{
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
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <main>
                    <div className="container px-0 mx-0 col-sm-12">
                        <div className="bg-black-inactive card card-161-2">
                            <CorpActionAgGrid size={this.ceksize()}/>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

const StockInfoFrameHeader = (props) => {
    return (
        <></>
    );
}

class StockPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
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

    render () {
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

        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid"
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

        //Add your search logic here.
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
            <div className="bg-black-trading card card-75">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component*/}
                <main>
                    <div className="container-fluid f-12 card-527">
                        <div className="py-0">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40 mt-2">
                                <div className="col-sm-3 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-2 px-0 mx-0">Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-10 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter}
                                            isSearchable={true}
                                            maxMenuHeight={155}
                                            styles={customStyles}
                                            placeholder={<div>Search..</div>}
                                            options={stockOptions}
                                            className="stockPageSelect text-left"
                                            theme={this.selectSelectionTab}
                                        />
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-6 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                    <label className="col-sm-3 f-13 f-xs-14 align-middle align-self-center px-2 text-left">
                                        Last <span className="text-danger">12,650</span>
                                    </label>
                                    <label className="col-sm-3 text-danger f-13 f-xs-14 align-middle align-self-center px-0 text-left">
                                        <i className="oi oi-caret-bottom"></i>
                                        -175 (-1.36%)
                                    </label>
                                </div>
                                <div className="col-sm-3 align-self-center mx-0 px-0">
                                    <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                                    <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                                </div>
                            </div>
                            <div className="px-1 mx-0 col-sm-12 row">
                                <div className="col-md-7 px-1 py-2 card-482">
                                    <div id="stock-chart" className="card card-283 bg-trading-gray">
                                        <StockChart/>
                                    </div>
                                    <StockInfo/>
                                </div>
                                <div className="col-md-5 px-1 py-0 card-482">
                                    <TableInfoTransaction lotshare="stockInfoBuy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

class StockFinancialStatement_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: 1,
        }
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
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

    render () {
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

        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid"
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

        //Add your search logic here.
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
            <div className="bg-black-trading card card-75">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component*/}
                <main>
                    <div className="container-fluid f-12 card-527">
                        <div className="py-0">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40 mt-2">
                                <div className="col-sm-3 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-2 px-0 mx-0">Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-10 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter}
                                            isSearchable={true}
                                            maxMenuHeight={155}
                                            styles={customStyles}
                                            placeholder={<div>Search..</div>}
                                            options={stockOptions}
                                            className="stockPageSelect text-left"
                                            theme={this.selectSelectionTab}
                                        />
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-6 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                    <label className="col-sm-3 f-13 f-xs-14 align-middle align-self-center px-2 text-left">
                                        Last <span className="text-danger">12,650</span>
                                    </label>
                                    <label className="col-sm-3 text-danger f-13 f-xs-14 align-middle align-self-center px-0 text-left">
                                        <i className="oi oi-caret-bottom"></i>
                                        -175 (-1.36%)
                                    </label>
                                </div>
                                <div className="col-sm-3 align-self-center mx-0 px-0">
                                    <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                                    <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                                </div>
                            </div>
                            <div className="px-1 mx-0 col-sm-12 row">
                                <div className="col-md-7 pr-1 pl-0 py-2 card-482">
                                        <div className="row pl-4 h-48 f-livetrade">
                                            <div
                                                className={`col-sm-2 px-0 pt-3 text-center f-12
                                                ${this.state.selected == 1?"livetradeMenuActive":"livetradeMenu"}`}
                                                onClick={()=>this.setState({selected:1})}
                                                >
                                                <i className={this.state.selected == 1 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                                &nbsp;&nbsp;&nbsp;
                                                Quarter
                                            </div>
                                            <div
                                                className={`col-sm-2 px-0 pt-3 text-center f-12
                                                ${this.state.selected == 2?"livetradeMenuActive":"livetradeMenu"}`}
                                                onClick={()=>this.setState({selected:2})}
                                                >
                                                <i className={this.state.selected == 2 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                                &nbsp;
                                                Year
                                            </div>
                                            <div className={`col-sm-2 ${this.state.selected == 1?"d-block":"d-none"}`}>
                                                <Dropdown
                                                    placeholder='Choose'
                                                    search selection
                                                    options={yearOptions}
                                                    defaultValue={yearOptions[0].value}
                                                    className="col-sm-12 f-12"/>
                                            </div>
                                            <div className={`col-sm-2 ${this.state.selected == 2?"d-block":"d-none"}`}>
                                                <input type="text" className="form-control f-12"
                                                       value="2020" style={{borderRadius: "0px", height: "32.84px"}}/>
                                            </div>
                                            <div className={"col-sm-5"}></div>
                                            <div className={`col-sm-1 pl-0 pr-0`}>
                                                <Popup content='Refresh' position='top center' trigger={
                                                    <button
                                                        className={`btn btn-primary btn-refresh-2-right`}
                                                        style={{"font-size":"12px","width":"38px"
                                                        }}>
                                                        <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                                    </button>
                                                } />
                                            </div>

                                            <div className={"col-sm-12 pl-0 pt-2 card-444"}>
                                                <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless mb-0 tb-align-center" style={{height: "100%"}}>
                                                    <tbody>
                                                    <tr className="bg-tableheader">
                                                        <td className="d-border-tr-grey-all py-0">Last Statement</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">Book Value</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">EPS</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">PER</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">PBV</td>
                                                    </tr>
                                                    <tr >
                                                        <td className="d-border-tr-gray-all py-0 text-center">1</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">1,754</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">78</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">6,9</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">1,3</td>
                                                    </tr>
                                                    <tr className="bg-tableheader">
                                                        <td className="d-border-tr-gray-all py-0 text-center">Quarter/Year</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">1st Qtr 2020</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">2nd Qtr 2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">3rd Qtr 2018</td>
                                                        <td className="d-border-tr-gray-all py-0 text-center">4th Qtr 2017</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">Sales Profit</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">383,0</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">0</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">0</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">0</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td">Gross Profit</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">EBITDA</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td">NET Income</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">EPS</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    <tr className="bg-tableheader">
                                                        <td colspan="5" className="no-wrap d-border-tr-black py-0">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">Total Asset</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td">Total Liabilities</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">Total Equity</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    <tr className="bg-tableheader">
                                                        <td colspan="5" className="no-wrap d-border-tr-black py-0">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">PER</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td">PBV</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">ROA</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td">ROE</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right even-td">24/6/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="d-border-tr-gray-all py-0 even-td-blue">Book Value</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">22/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">23/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                        <td className="d-border-tr-gray-all py-0 text-right">24/6/2019</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                </div>
                                <div className="col-md-5 px-1 py-0 card-482">
                                    <TableInfoTransaction lotshare="stockInfoBuy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

class StockHistoryPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabNumber: 1,
            startRow: 0,
        }
    }
    ceksize(){
        if(window.innerWidth > 1290 && window.innerWidth <= 1370){
            return "s100";
        }
        else if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
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
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('#datepickerstartSH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
            $('#datepickerendSH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });


        });

        $("#btn-clear-date").click(function () {
            $(".date-clear").datepicker("clearDates");
        })
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
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    render () {
        let p = this.props
        const changeTabNumber = (props) => {
            this.setState({
                tabNumber: props,
            })
        }
        const tabActive = (props) => {
            if (this.state.tabNumber == props) {
                return "col-sm-3 click-pointer d-border-right text-center active";
            } else {
                return "col-sm-3 click-pointer d-border-right text-center"
            }
        }
        const changeActiveGridHistory = () => {
            if(this.state.tabNumber === 1){
                return <HistoryBrokerAgGridThird size={this.ceksize()}/>
            } else if(this.state.tabNumber === 2){
                return <HistoryBrokerAgGrid/>
            }else if(this.state.tabNumber === 3){
                return <HistoryBrokerAgGridSecond/>
            }else{
                return <HistoryBrokerChart/>
            }
        }
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid"
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

        //Add your search logic here.
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
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction" />
                <main>
                    <div className="container-fluid f-12">
                        <div className="py-2">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40">
                                <div className="col-sm-3 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-2 px-0 mx-0">Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-10 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={155} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                                <div className="col-sm-3 row mx-0 px-0 align-self-center">
                                    <div className="col-sm-12 align-self-center mx-0 px-0">
                                        <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                                        <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                                    </div>
                                </div>
                            </div>

                            <div className="px-2 mx-0 mt-3 col-sm-12 mb-3 row h-40">
                                <div className="col-sm-4 px-0 mx-0">

                                    <div className="input-group h-35" style={{"z-index":0}}>
                                        <span className="input-group-addon h-35 bg-tableheader">Start</span>
                                            <input placeholder='dd/mm/yy' id="datepickerstartSH" className="form-control  date-clear col-sm-12 pl-0 pr-0 text-center align-self-center "/>

                                        <span className="input-group-addon h-35 bg-tableheader">
                                            <span className="fa fa-calendar-alt"></span>
                                        </span>
                                        <span className="input-group-addon bg-tableheader">to</span>
                                        <input placeholder='dd/mm/yy' id="datepickerendSH" className="form-control col-sm-12 pl-0 pr-0 text-center date-clear align-self-center "/>
                                        <span className="input-group-addon h-35 bg-tableheader">
                                            <span className="fa fa-calendar-alt"></span>
                                        </span>
                                        <span id="btn-clear-date" className="input-group-addon bg-gold click-pointer hover-gold h-35">
                                            <span className="ion ion-ios-close"></span>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-sm-1 pl-2 pr-0 mx-0">
                                    <Popup content='Refresh' position='top center' trigger={
                                        <button
                                            className={`btn btn-primary`}
                                            style={{"font-size": "14px", "width": "38px", "margin-top": "2px"}}>
                                            <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                        </button>
                                    }/>
                                </div>
                                    <div className="col-sm-7 pl-0 pr-0 mx-0">

                                    <TableBS borderless size="sm" className="bg-black-trading mb-0 h-35">
                                        <thead></thead>
                                        <tbody className="d-border-top d-border-bottom">
                                        <tr>
                                            <td>
                                                Last <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                Change(%) &nbsp;
                                                <span className="text-danger">
                                                    <i className="icofont icofont-caret-down"></i> 3,870
                                                </span>
                                            </td>
                                            <td>
                                                High <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                Low <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                T.Vol <span className="text-danger"> 156</span>
                                            </td>
                                            <td>
                                                Value <span className="text-danger"> 156,000</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </TableBS>
                                </div>
                            </div>

                            <div className="px-1 mx-0 col-sm-12 row">
                                <div className="col-sm-8 px-1 py-2">
                                    {/*Zaky*/}
                                    {/*Add menu tab*/}
                                    <div className="cssmenu d-border-bottom d-border-top d-border-left mb-2 small h-30">
                                        <ul class="ul-menu h-27">
                                            <li name="stockDaily"
                                                className={tabActive(1)} onClick={()=>changeTabNumber(1)}>
                                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">DAILY</span></a></li>
                                            <li name="stockPage"
                                                className={tabActive(2)} onClick={()=>changeTabNumber(2)}>
                                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12" >BROKER SUMMARY</span></a></li>
                                            <li name="stockBrokerChart"
                                                className={tabActive(4)} onClick={()=>changeTabNumber(4)}>
                                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12" >BROKER CHART</span></a></li>
                                            <li name="stockWatchlistPage"
                                                className={tabActive(3)} onClick={()=>changeTabNumber(3)}>
                                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">FOREIGN NET</span></a></li>

                                        </ul>
                                    </div>
                                    <div className="bg-trading-gray">
                                        {/*Zaky*/}
                                        {/*switch grid by state*/}
                                        {changeActiveGridHistory()}
                                    </div>
                                </div>

                                <div className="col-sm-4 px-1 pt-2 pb-0">
                                    <div className="bg-trading-gray" style={{marginBottom : "10px"}}>
                                        <HistoryPriceAgGrid changethis={(this.state.tabNumber == "4") ? "active" : "none"} size={this.ceksize()} type="tradeHistory"/>
                                    </div>
                                    <div
                                        className="bg-trading-gray mb-3"
                                        style={{"display": (this.state.tabNumber == "4")?"none":"block"}}
                                    >
                                        <HistoryBuyerAgGrid size={this.ceksize()}/>
                                    </div>
                                    <div
                                        className="bg-trading-gray"
                                        style={{"display": (this.state.tabNumber == "4")?"none":"block"}}
                                    >
                                        <HistorySellerAgGrid size={this.ceksize()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


        );
    }
}

class StockTradeSummaryPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabNumber: 1,
            startRow: 0,
        }
    }
    ceksize(){
        if(window.innerWidth > 1290 && window.innerWidth <= 1370){
            return "s100";
        }
        else if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
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
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });
        });

        $("#btn-clear-date").click(function () {
            $(".date-clear").datepicker("clearDates");
        })
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
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    render () {

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
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid",
                color : "white!important"
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                color : "white!important"
            })
        };

        //Add your search logic here.
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
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction" />
                <main>
                    {/*outer*/}
                    {/*<div className="container-fluid f-12 card-520">*/}
                    <div className="container-fluid f-12">
                        {/*card 520*/}
                        <div className="py-2 pb-0">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40">
                                <div className="col-sm-3 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-2 px-0 mx-0">Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-10 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={155} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                                <div className="col-sm-3 row mx-0 px-0 align-self-center">
                                    <div className="col-sm-12 align-self-center mx-0 px-0">
                                        <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                                        <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40">
                                <div className="col-sm-12 row mx-0 px-0 align-self-center">
                                    <TableBS borderless size="sm" className="bg-black-trading mb-0 h-35">
                                        <thead></thead>
                                        <tbody className="d-border-top d-border-bottom">
                                        <tr>
                                            <td>
                                                Last <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                Change(%) &nbsp;
                                                <span className="text-danger">
                                                    <i className="icofont icofont-caret-down"></i> 3,870
                                                </span>
                                            </td>
                                            <td>
                                                High <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                Low <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                T.Vol <span className="text-danger"> 156</span>
                                            </td>
                                            <td>
                                                Value <span className="text-danger"> 156,000</span>
                                            </td>
                                            <td>
                                                Avg <span className="text-danger"> 156,000</span>
                                            </td>
                                            <td>
                                                F. Net <span className="text-danger"> 156,000</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </TableBS>
                                </div>
                            </div>
                            {/*475*/}
                            <div className="px-1 mx-0 col-sm-12 row">

                                <div className="col-sm-8 px-1 pt-1 pb-0">
                                    <div className="col-sm-12 pl-0 pr-0 mb-3">
                                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center row bg-tableheader">
                                            <div className={"col-sm-6 bg-tableheader"}></div>
                                            <div className="col-sm-2 px-0 mx-0 text-left pt-3 pb-2 h-30 f-12 bg-tableheader">
                                                STOCK TICK
                                            </div>
                                            <div className={"col-sm-2 bg-tableheader"}></div>
                                            <div className="col-sm-2 px-0 mx-0 bg-tableheader">
                                                <Dropdown
                                                    placeholder='Choose'
                                                    search selection
                                                    options={summaryOptions}
                                                    defaultValue={summaryOptions[0].value}
                                                    className="col-sm-12 f-11"/>
                                            </div>
                                        </div>

                                        <StockTickAgGrid size={this.ceksize()}/>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-sm-6 pr-1"}>
                                            <SummaryBuyerAgGrid size={this.ceksize()}/>
                                        </div>
                                        <div className={"col-sm-6 pl-1"}>
                                            <SummarySellerAgGrid size={this.ceksize()}/>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-sm-4 pl-1 pr-0 pt-1 pb-0">
                                    <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                                        <div className="col-sm-12 px-0 mx-0 text-center pt-3 pb-2 h-30 f-12 bg-tableheader">
                                           RG TRADE SUMMARY
                                            <Popup content='Refresh' position='top center' trigger={
                                                <button
                                                    className={`btn btn-primary btn-10 pull-right`}
                                                    style={{"width": "36px", "margin-top": "-9px"}}>
                                                    <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                                </button>
                                            }/>
                                        </div>

                                    </div>

                                    <TradeSummaryAgGrid size={this.ceksize()}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


        );
    }
}

class StockTickAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?160:s=="s50"?130:s=="s67"?115:s=="s75"?110:s=="s80"?100:s=="s90"?80:s=="s100"?75:70,
                    minWidth: 70,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?170:s=="s50"?140:s=="s67"?130:s=="s75"?120:s=="s80"?115:s=="s90"?110:s=="s100"?100:100,
                    minWidth:100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "updown", headerName: "", resizable: true,
                    width: 40, minWidth: 40,
                    cellClass : function (params) {
                        var pl = params.data.change;
                        return pl.includes('-') === true ? 'grid-table d-border-aggrid-right text-right f-12 text-danger' :
                            'grid-table d-border-aggrid-right text-right f-12 text-success'
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.change;
                        return pl.includes('-') === true ?
                            '&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>&nbsp;&nbsp;':
                            '&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>&nbsp;&nbsp;';
                    },},
                { field: "change", headerName: "Change", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?190:s=="s50"?160:s=="s67"?135:s=="s75"?130:s=="s80"?120:s=="s90"?105:s=="s100"?100:90,
                    minWidth:90,
                    cellClass : function (params) {
                        var pl = params.data.change;
                        return pl.includes('-') === true ? 'grid-table d-border-aggrid-right text-right f-12 text-danger' :
                            'grid-table d-border-aggrid-right text-right f-12 text-success'
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.change;
                        return pl.includes('-') === true ?
                            '<i class="text-danger"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+pl:
                            '<i class="text-success"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+pl;
                    } },
                { field: "persen", headerName: "%", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?125:s=="s75"?120:s=="s80"?110:s=="s90"?100:90, minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table text-right d-border-aggrid-right text-right f-12";
                    },
                },{ field: "vol", headerName: "Volume(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s67"?150:s=="s75"?140:s=="s80"?130:s=="s90"?110:s=="s100"?110:115, minWidth: 115,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "buyer", headerName: "Buyer", sortable: true, resizable: true,
                    width: s=="s49"?250:s=="s50"?240:s=="s67"?205:s=="s75"?190:s=="s80"?135:s=="s90"?120:s=="s100"?110:90,comparator: stringComparator,
                    minWidth: 90,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var buyer = params.data.buyer;
                        var sbuyer = buyer.split('-');

                        return sbuyer[0].includes('F') === true ? '<span class="text-success">'+sbuyer[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sbuyer[1] :
                            '<span class="text-warning">'+sbuyer[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sbuyer[1];
                    }},
                { field: "seller", headerName: "Seller", sortable: true, resizable: true,
                    width: s=="s49"?250:s=="s50"?240:s=="s67"?205:s=="s75"?190:s=="s80"?135:s=="s90"?120:s=="s100"?110:90,comparator: stringComparator,
                    minWidth: 90,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var seller = params.data.seller;
                        var sSeller = seller.split('-');

                        return sSeller[0].includes('F') === true ? '<span class="text-success">'+sSeller[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sSeller[1] :
                            '<span class="text-warning">'+sSeller[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sSeller[1];
                    }},
                { field: "board", headerName: "Board", sortable: true, filter: "agTextColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?180:s=="s50"?150:s=="s67"?130:s=="s75"?125:s=="s80"?120:s=="s90"?80:80,
                    minWidth: 110,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    time : "08:02:12"+s,
                    persen : "13.000",
                    price: 12222,
                    change: "-60,240",
                    vol :"2",
                    buyer :"F-DE",
                    seller :"F-DE",
                },{
                    time : "08:02:12"+s,
                    persen : "13.000",
                    price: 12222,
                    change: "60,240",
                    vol :"3",
                    buyer :"F-DE",
                    seller :"D-DE",
                },{
                    time : "08:02:12"+s,
                    persen : "13.000",
                    price: 34222,
                    change: "-60,240",
                    vol :"10",
                    buyer :"D-DE",
                    seller :"F-DE",
                },
                {
                    time : "08:02:12",
                    persen : "10.000",
                    price: 34222,
                    change: "60,240",
                    vol :"10",
                    buyer :"D-DE",
                    seller :"F-DE",
                },{
                    time : "08:02:12",
                    persen : "9.000",
                    price: 34222,
                    change: "-60,240",
                    vol :"10",
                    buyer :"F-DE",
                    seller :"F-DE",
                },{
                    time : "08:02:12",
                    persen : "2.000",
                    price: 342122,
                    change: "60,240",
                    vol :"10",
                    buyer :"D-DE",
                    seller :"D-DE",
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
                    className={"card-220-a ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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

const StockWatchlist = (props) => {
    return(
        <div>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 card-527 px-2 mx-0 pt-2 pb-0">
                <div className="col-sm-4 px-0 mx-0 card-514">
                    {/*<AppModal/>*/}
                    <TableStockWatchlist/>
                </div>
                <div className="col-sm-8 pl-3 pr-0 mx-0 card-514">
                    <div className="col-sm-12 px-0 pt-0">
                        <BuyPage/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </div>
    );
}

class TradeSummaryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?146:s=="s80"?127:s=="s90"?105:s=="s100"?90:80,
                    minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "value", headerName: "Value(tn)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?146:s=="s80"?127:s=="s90"?110:s=="s100"?110:100,
                    minWidth:100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "volume", headerName: "Volume(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?146:s=="s80"?127:s=="s90"?110:s=="s100"?110:110,
                    minWidth:110,
                    cellClass : function (params) {
                        return " grid-table text-right d-border-aggrid-right text-right f-12";
                    },
                },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?146:s=="s80"?127:s=="s90"?105:s=="s100"?90:90,
                    minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table text-right d-border-aggrid-right text-right f-12";
                    },
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowPinnedData: [
                {
                    price: "Total",
                    value: "",
                    volume: "",
                    freq: "",
                },
            ],
            rowData: [
                {
                    price: s,
                    value: 1234567890,
                    volume: 1234567890,
                    freq: 1234567890,
                },
                {
                    price: 1234567890,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: 0,
                    value: 0,
                    volume: 0,
                    freq: 0,
                },{
                    price: "",
                    value: "",
                    volume: "",
                    freq: "",
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
    setBottomPinned(){
        // alert('hee');
        var rows = this.createData();
        // this.gridApi.setPinnedBottomRowData(rows);
    }
    createData() {
        var result = [];
        result.push({
                price: "",
                value: 1,
                volume: 1,
                freq: 1,
            });
        return result;
    }
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-440-a ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    {/*<span onClick={() => this.onClickYeah()}>Aku</span>*/}
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        getRowHeight={this.state.getRowHeight}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        // pinnedBottomRowData={this.state.rowPinnedData}
                    >
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TableStockWatchlist_Base extends React.Component{
    closeClick = (e) => {
        this.refs.frameAction.closeModalModal(100);
    }

    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-white click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth <= 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth <= 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth <= 2030){
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
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
                <div className="bg-black-trading f-12">
                    <AppFrameAction ref="frameAction" />
                    <div className="px-0 py-0">
                        <StockWatchlistAgGrid size={this.ceksize()}/>
                    </div>
                </div>
            </>
        );
    }
}

class BuyPage extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            activeTab: 1,
        };
    }
    toggle(no){
        this.setState({
            activeTab: no,
        });
    }
    componentDidMount(){
        ResizeResponsive();
    }
    render(){
        const swapContent = () => {
            if(this.state.activeTab === 1){
                return <FormBuy
                    idPrice="stockBuyPrice"
                    part="stockInfo"
                    idVol="stockBuyVol"
                    idValue="stockBuyValue"
                    columnSm="col-sm-12"
                    part="stock"
                />
            }else{
                return <FormSell
                    idPrice="stockSellPrice"
                    part="stockInfo"
                    idVol="stockSellVol"
                    idValue="stockSellValue"
                    columnSm="col-sm-12"
                    part={"stock"}
                />
            }
        }
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col-sm-12 px-0 py-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 f-12">
                    <TableInfoTransaction lotshare="buyPage"/>
                    </div>
                    <div className={this.state.activeTab === 1 ? "col-sm-6 mt-0 bg-buy pt-0 pb-0 px-0 card-514 d-border" : "col-sm-6 mt-0 bg-sell pt-0 pb-0 px-0 card-514 d-border"}>
                        <div className="cssmenumodal bg-dark-grey pb-0 col-sm-12 mx-0 px-0 h-33 mb-1">
                            <ul>
                                <li className={ (this.state.activeTab === 1)  ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' }
                                    onClick={() => { this.toggle(1); }}><a className="pt-4 pb-2"><span className="f-12">
                                    &nbsp; Buy
                                </span></a></li>
                                <li className={ (this.state.activeTab === 2) ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' }
                                    onClick={() => { this.toggle(2); }}><a className="pt-4 pb-2"><span className="f-12">
                                    &nbsp; Sell
                                </span></a></li>
                            </ul>
                        </div>
                        {swapContent()}
                    </div>
                </div>
            </>
        );
    }

}


class BuyModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <ModalBuy/>
            </>
        );
    }
}

class SellModal extends React.Component  {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <ModalSell/>
            </>
        );
    }
}

class RegisterAmendModal_Base extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            showAlert: false,
        };
    }
    closeClick = (e) => {
        this.setState({show:true});
        // this.refs.frameAction.closeModal(100);
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#565252' : '#999999',
            neutral20: this.props.thememode === true ? '#333332' : '#CDCDCE',
            neutral30: this.props.thememode === true ? '#333332' : '#CDCDCE',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#333332' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#7e7a7a' : '#c5c2c3',
            primary: '#0071BC',
        },
    });
    render() {

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
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid",
                color : "white!important"
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                color : "white!important"
            })
        };

        //Add your search logic here.
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
            <>
                
                <SweetAlert
                    show={this.state.showAlert}
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    style={{'color':'var(--text-white)',}}
                    title={<span className="text-white">Are you sure?</span>}
                    onConfirm={()=>{this.setState({showAlert:false})}}
                    onCancel={()=>{this.setState({showAlert:false})}}
                    customClass={"bg-dark-grey"}
                    confirmBtnCssClass={"btn btn-sm btn-popup btn-danger bg-gray-tradding border-gray-tradding"}
                    focusConfirmBtn
                >
                    <span className={"text-white"}>You will not be able to undo this action!</span>
                </SweetAlert>
                <AppFrameAction ref="frameAction" />
                <ModalAlertN />
                <div>
                    <div className="cssmenumodal bg-grey pb-4 col-sm-12 mx-0 px-0">
                        <ul>
                            <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Amend Group</span></a></li>
                            <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Add Group</span></a></li>
                        </ul>
                    </div>
                    <div className="card-520">
                        <div className={this.state.activeTab === '1' ? 'card card-520 d-border d-block f-12' : 'd-none'}>
                            <div className="card d-border-transparent-grey h-auto">
                                <div className="card card-145 bg-grey">
                                    {/* <AmendGroupNameAgGrid trash={() => this.setState({showAlert:true})}/> */}
                                    <AmendGroupNameAgGrid trash={() => this.props.handleStatusAlert3('noConfirm',this.props.statusAlertN,'Are you sure? dari App/modal_Alert ',)}/>
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-0 py-3 text-white h-63 v-align-items-center">
                                    <div className="col-sm-5">
                                        <label className="col-sm-12">Name</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input defaultValue='Group A' placeholder='Group Name' size='small' className="gray col-sm-12 align-self-center"/>
                                    </div>
                                </div>
                                <div className="card card-145 bg-grey">
                                    <AmendGroupCodeAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-0 py-3 text-white h-67 v-align-items-center">
                                    <div className="form-group col-sm-8 my-1 text-left">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={110} styles={customStyles} placeholder={<div style={{color:"white"}}>Search..</div>} options={stockOptions} className="stockPageSelect text-left" theme={this.selectSelectionTab}/>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>

                            </div>
                            {/*998*/}
                            <div className="form-group row col-sm-12 px-0 mx-0 z-99 text-white my-0 h-100 pt-40">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stocklist</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm btn-grey-gray border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.activeTab === '2' ? 'card card-520 d-border d-block f-12' : 'd-none'}>
                            <div className="card d-border-transparent-grey h-auto">
                                <div className="form-group row col-sm-12 px-0 mx-0 my-0 py-3 text-white h-63 v-align-items-center">
                                    <div className="col-sm-5">
                                        <label className="col-sm-12">Group Name</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input defaultValue='Group A' placeholder='Group Name' size='small' className="gray col-sm-12 align-self-center"/>
                                    </div>
                                </div>
                                <div className="card card-290 bg-grey">
                                    <AddGroupCodeAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-0 py-3 text-white h-67 v-align-items-center">
                                    <div className="form-group col-sm-8 my-1 text-left">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={110} styles={customStyles} placeholder={<div style={{color:"white"}}>Search..</div>} options={stockOptions} className="stockPageSelect text-left" theme={this.selectSelectionTab}/>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row col-sm-12 px-0 mx-0 z-99 text-white my-0 h-100 pt-40">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stock list</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm btn-grey-gray border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class HistoryBrokerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: 'broker', headerName: "Broker", sortable: true, resizable: true, comparator: stringComparator,
                    width: 84, minWidth: 84,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: 'buyvol', headerName: "Buy Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 110, minWidth: 110,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: 'buyval', headerName: "Buy Val (T)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: 'avgbuy', headerName: "Avg. Buy", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 ";
                    }, },
                { field: 'sellvol', headerName: "Sell Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: 'sellval', headerName: "Sell Val (T)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 ";
                    },},
                { field: 'avgsell', headerName: "Avg. Sell", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 ";
                    }, },
                { field: 'netvol', headerName: "Net Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 ";
                    }, },
                { field: 'netval', headerName: "Net Val (T)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 ";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
                },{ broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbuy: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,330",
                    netvol: "3,000",
                    netval: "2,100",
                    avgnet: "500,000",
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
                {/*Zaky*/}
                {/*update ukuran card*/}
                <div
                    className="card card-372 ag-theme-balham-dark yellow-hover ag-header-border-gray ag-striped-odd"
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
class HistoryBrokerChart extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            subTabActive: 1,
            chartTitle: "TOP Buyer",
            heightValue: "335px",

        }

    }
    componentDidMount(){
        $('#container-bar').css('height', '100%');

        var tempTitle = null;

    }
    changeBar = event => {
        document.getElementById("resetBar").value = event;
        document.getElementById("resetBar").click();
    }

    changesize(){
        var newval = $("#heightValue-trigger").val();
        var temp = String(newval+"px");
        console.log(newval);
        this.setState({heightValue: temp});
    }
    render() {

        var chart = anychart.bar();
        var data = anychart.data.set([
            ["John" , 10000, 12000, 9999],
            ["","","","s"],
            ["Peter" , 18000, 16000, 8888],
            ["James" , 11000, 13000, 13213],
            ["Mary" , 9000, 19000, 12333],["Jake2" , 12000, 15000, 8888],
            ["Peter3" , 18000, 16000, 8888],
            ["James4" , 11000, 13000, 13213],
            ["Mary5" , 9000, 19000, 12333],["Jake6" , 12000, 15000, 8888],
            ["Peter7" , 18000, 16000, 8888],
            ["James8" , 11000, 13000, 13213],
            ["Mary9" , 9000, 19000, 12333],
        ]);
        var data1 = data.mapAs({x: 0, value: 1, freq: 2, volume: 3,});

        var series = chart.bar(data1);
        var series2 = chart.bar(data1);

        chart.title(this.state.chartTitle);
        series.name("Series");
    
        chart.tooltip().useHtml(true);


        var tooltip = chart.tooltip();
        tooltip.positionMode("point");
        tooltip.format("Volume: <b>{%volume}</b><br>Value: <b>{%value}</b><br>Freq: <b>{%freq}</b>");

        var credits = chart.credits();
        credits.enabled(false);

        chart.xAxis().title("Broker");
        var labels = chart.xAxis().labels();
        chart.xAxis().staggerMode(true);
        labels.useHtml(false);

        chart.yAxis().title("Volume (Lot)");
        return (
            <>
                <div
                    className="card card-372 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
                    style={{
                        width: 'auto' }}>
                    <div className="cssmenu d-border-bottom d-border-top d-border-left mb-2 small h-30">
                        <input type="hidden" id={"resetBar"}
                               value={this.state.sn}/>
                        <ul className="ul-menu h-27">
                            <li name="stockDaily"
                                className={(this.state.subTabActive == 1) ?
                                    "col-sm-4 click-pointer d-border-right text-center active":
                                    "col-sm-4 click-pointer d-border-right text-center"
                                }
                                onClick={()=>
                                {
                                    this.setState({subTabActive: 1});
                                    this.setState({chartTitle: "Top Buyer"});

                                    this.changeBar(1)}
                                }>
                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">TOP BUYER</span></a></li>
                            <li name="stockPage"
                                className={(this.state.subTabActive == 2) ?
                                    "col-sm-4 click-pointer d-border-right text-center active":
                                    "col-sm-4 click-pointer d-border-right text-center"
                                }
                                onClick={()=>
                                {
                                    this.setState({subTabActive: 2});
                                    this.setState({chartTitle: "Top Seller"});
                                    this.changeBar(2)}
                                }>
                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">TOP SELLER</span></a></li>
                            <li name="stockBrokerChart"
                                className={(this.state.subTabActive == 3) ?
                                    "col-sm-4 click-pointer d-border-right text-center active":
                                    "col-sm-4 click-pointer d-border-right text-center"
                                }
                                onClick={()=>
                                {
                                    this.setState({subTabActive: 3});
                                    this.setState({chartTitle: "Top Net"});

                                    this.changeBar(3)}
                                }>
                                <a className="linkCustomStockTab h-27">
                                                    <span
                                                        className="f-12">TOP NET</span></a></li>

                        </ul>
                    </div>
                        <AnyChart
                            type="bar"
                            // title="TOP 10 BUYER"
                            height={this.state.heightValue}
                            legend="true"
                            instance={chart}
                        />
                    <input type="hidden" id={"heightValue-trigger"} onClick={()=>this.changesize()}/>
                    {/*<div id={"container-bar"}></div>*/}
                </div>
            </>
        );
    }
}


class HistoryBrokerAgGridSecond extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: 'date', headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: 95, minWidth: 95,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: 'fBuyVal', headerName: "Foreign Buy Val", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 95, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: 'fBuyVol', headerName: "Foreign Buy Vol(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 120, minWidth: 150,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: 'fSellVal', headerName: "Foreign Sell Val", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 95, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: 'fSellVol', headerName: "Foreign Sell Vol(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 140, minWidth: 140,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: 'fNetVal', headerName: "Foreign Net Val", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: 95, minWidth: 120,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                {
                    date: "2019-02-01",
                    fBuyVal: 100,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-02",
                    fBuyVal: 200,
                    fBuyVol: 300,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-03",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 500,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-02",
                    fBuyVal: 200,
                    fBuyVol: 300,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-03",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 500,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-03",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 500,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-02",
                    fBuyVal: 200,
                    fBuyVol: 300,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-03",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 500,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-03",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 500,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-02",
                    fBuyVal: 200,
                    fBuyVol: 300,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-03",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 500,
                    fSellVol: 150,
                    fNetVal: 100,
                },{
                    date: "2019-02-04",
                    fBuyVal: 200,
                    fBuyVol: 100,
                    fSellVal: 100,
                    fSellVol: 150,
                    fNetVal: 100,
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
                    className="card card-372 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
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

class HistoryBrokerAgGridThird extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: 'date', headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?130:s=="s50"?110:s=="s67"?105:s=="s75"?100:s=="s80"?90:s=="s90"?80:s=="s100"?75:75,
                    minWidth: 100,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: 'open', headerName: "Open", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?130:s=="s50"?110:s=="s67"?105:s=="s75"?100:s=="s80"?90:s=="s90"?80:s=="s100"?75:75,
                    minWidth: 100,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: 'high', headerName: "High", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?130:s=="s50"?110:s=="s67"?105:s=="s75"?100:s=="s80"?90:s=="s90"?80:s=="s100"?75:75,
                    minWidth: 100,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: 'low', headerName: "Low", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?130:s=="s50"?110:s=="s67"?105:s=="s75"?100:s=="s80"?90:s=="s90"?80:s=="s100"?75:75,
                    minWidth: 100,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: 'close', headerName: "Close", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?130:s=="s50"?110:s=="s67"?105:s=="s75"?100:s=="s80"?90:s=="s90"?80:s=="s100"?75:75,
                    minWidth: 100,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-position locked-visible";
                    },},
                { field: "updown", headerName: "", resizable: true,
                    width: 35, minWidth: 35,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    },   cellRenderer : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        var lasts = "";
                        return last < prev ? lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            last > prev ? lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>' :
                                lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-minus text-warning"></i>';
                    }},
                { field: "change", headerName: "Change", resizable: true, comparator: integerComparator,
                    width: s=="s49"?120:s=="s50"?95:s=="s67"?90:85, minWidth: 85, filter: "agNumberColumnFilter",
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "percent", headerName: "%", resizable: true, comparator: stringComparator,
                    width: s=="s49"?80:s=="s50"?70:s=="s67"?65:60, minWidth: 60, filter: "agNumberColumnFilter",
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: 'volume', headerName: "Volume", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?180:s=="s50"?180:s=="s67"?165:s=="s75"?160:s=="s80"?130:s=="s90"?100:s=="s100"?90:90,
                    minWidth: 90,
                    cellClass : function (params) {
                        var changee = params.data.change;
                        return changee.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }},
                { field: 'value', headerName: "Value", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?240:s=="s50"?230:s=="s67"?200:s=="s75"?185:s=="s80"?150:s=="s90"?110:s=="s100"?109:109,
                    minWidth: 109,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: 'freq', headerName: "Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?250:s=="s50"?230:s=="s67"?160:s=="s75"?140:s=="s80"?110:s=="s90"?80:s=="s100"?70:70,
                    minWidth: 70,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                {
                    date: "2019-02-01",
                    change: "15,000 ",
                    open: "28,075",
                    high: "29,125",
                    low: "27,400",
                    close: "23,370",
                    percent: "1,50%",
                    prev: '3,221',
                    last: '3,850',
                    volume: '150.000'+s,
                    value: '150.000.000',
                    freq: "146",
                },
                {
                    date: "2019-02-01",
                    change: "15,000 ",
                    open: "28,075",
                    high: "29,125",
                    low: "27,400",
                    close: "23,370",
                    percent: "0,50%",
                    prev: '4,000',
                    last: '3,850',
                    volume: '150.000',
                    value: '150.000.000',
                    freq: "146",
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
                    className="card card-372 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
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


class StockWatchlistAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            activePage: 1,
            columnDefs: [
                { field: "code", headerName: "Code",sortable: false, resizable: true,
                    width: 85, minWidth: 85, lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }},
                { field: "price", headerName: "Price",sortable: false, resizable: true, filter: "agNumberColumnFilter",
                    width: 93, minWidth: 93,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change",sortable: false, resizable: true,  filter: "agTextColumnFilter",
                    width: 90, minWidth: 90,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "persen", headerName: "(%)",sortable: false, resizable: true, filter: "agNumberColumnFilter",
                    width: 60, minWidth: 50,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "tvol", headerName: "T. Vol", sortable: false, resizable: true, filter: "agNumberColumnFilter",
                    width: 85, minWidth: 85,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "tval", headerName: "T. Val", sortable: false, resizable: true, filter: "agNumberColumnFilter",
                    width: 85, minWidth: 85,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "AvgPrice", headerName: "Avg. Price", sortable: false, resizable: true, filter: "agNumberColumnFilter",
                    width: 180, minWidth: 100,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right locked-col locked-visible f-12";
                    },
                },
                { field: "AccForVol", headerName: "Accumulate Foreign Vol", sortable: false, resizable: true,
                    width: 180, minWidth: 180, filter: "agNumberColumnFilter",
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "AccForVal", headerName: "Accumulate Foreign Val", sortable: false, resizable: true,
                    width: 180, minWidth: 180, filter: "agNumberColumnFilter",
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    },
                },

            ],
            defaultColDef: {
                sortable: false,
                filter: false,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { code: "AALI "+s,
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450",
                    AccForVol: "12,000",
                    AccForVal: "13,000",
                    AvgPrice: "9,000",
                },
                { code: "ANTM 2",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "3,000",
                    AvgPrice: "1,000",},
                { code: "BBCA 3",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 4",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA5",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 6",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 7",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 8",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 9",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 10",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 15" ,
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 16",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 17",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 18",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 19",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 20",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 22",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 23",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 26",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 30",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
                },{ code: "BBCA 33",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450",
                    AccForVol: "9,000",
                    AccForVal: "1,000",
                    AvgPrice: "3,000",
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
            listData: [
                {code: "AALI"},
                {code: "TLKM"},
                {code: "INDF"},
                {code: "WSKT"},
                {code: "BMPT"},
                {code: "ASII"},
                {code: "BUMI"},
                {code: "BBCA"},
                {code: "SMGR"},
                {code: "BBRI"},
            ],
            pages: 1,
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
    changeActive(i){
        this.setState({activePage: i});
        var i = 0;
        let currentPos = (i-1) * 3;
        let perPage = 3;    
        let s = this.state.rowData.slice();
        s[0].code = this.state.listData[6].code;
        this.setState({rowData: s});
        // for (let index = currentPos; index < currentPos+perPage; index++) {
        //     if(typeof this.state.listData[index] !== "undefined"){
        //         console.log('fire');
        //    }
        // }
        // this.setState({rowData: s,})
    }
    changePrev(){
        if(this.state.activePage > 1){
            this.setState({activePage: (this.state.activePage - 1)});
        }
    }
    changeNext(){
        if(this.state.activePage < this.state.pages){
            this.setState({activePage: (this.state.activePage + 1)});
        }
    }
    render() {
    
    const pagination = () => {
        let perPage = 3;
        var pages = Math.ceil(this.state.listData.length/perPage);
        this.setState({pages: pages});
        let paginationtext = [];
        paginationtext.push(<button
            className={`btn btn-sm py-1 px-1 mr-1 btn-page ${(this.state.activePage == 1)?"disabled":""}`}
            onClick={
                () => this.changePrev()}
        >   &nbsp;&nbsp;
            <i className={"glyphicon glyphicon-chevron-left"}></i>
            &nbsp;&nbsp;
        </button>);
       for (let i = 1; i < pages+1; i++) {
            paginationtext.push(<button key={i}
                className={`btn btn-sm py-1 px-1 mr-1 btn-page ${(this.state.activePage == i)?"active":""}`}
                onClick={
                    () => this.changeActive(i)}
                >
                &nbsp;&nbsp;
                    {i}
                &nbsp;&nbsp;
            </button>);
        }
        paginationtext.push(<button
            className={`btn btn-sm py-1 px-1 mr-1 btn-page ${(this.state.activePage == this.state.pages)?"disabled":""}`}
            onClick={
                () => this.changeNext()}
        >   &nbsp;&nbsp;
            <i className={"glyphicon glyphicon-chevron-right"}></i>
            &nbsp;&nbsp;

        </button>);
        return paginationtext;
    }  
        return (
            <>
                <div
                    className="card-watchlistcust ag-theme-balham-dark ag-header-border d-border ag-striped-odd"
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

                <div className={"text-center mt-2"}>
                    {pagination()}
                </div>
                {/* {pagination()} */}

            </>
        );
    }
}



class AmendGroupNameAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            rowData: [
                {
                    groupname: "Group A",
                    totalmember: "5",
                    action: ""
                },
                {
                    groupname: "Group B",
                    totalmember: "15",
                    action: ""
                },
                {
                    groupname: "Group C",
                    totalmember: "27",
                    action: ""
                },
                {
                    groupname: "Group D",
                    totalmember: "18",
                    action: ""
                },
                {
                    groupname: "Group E",
                    totalmember: "45",
                    action: ""
                },],
        }
    }
    render() {
        return (
            <>
                <div
                    className="card-145 ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto'}}>
                    <table className="table table-fixed table-hovered">
                        <thead>
                        <tr>
                            <th className="col-xs-7 v50-align-center">Group</th>
                            <th className="col-xs-2 v50-align-center">Member</th>
                            <th className="col-xs-3 v50-align-center">#</th>
                        </tr>
                        </thead>
                        <tbody className="tbodyGroup">
                        {this.state.rowData.map((charx, index) => {
                            return (
                                <tr className="trTableFix">
                                    <td className={`col-xs-7 groupName text-center text-primary ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>{charx.groupname}</td>
                                    <td className={`col-xs-2 totalMember text-right ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>{charx.totalmember}</td>
                                    <td className={`col-xs-3 buttonTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                        <button type="button" className="btn btn-info btn-sm">
                                            <i className="icofont-pencil"></i>
                                        </button>
                                        <button type="button" onClick={this.props.trash} className="btn btn-danger btn-sm">
                                        <i className="icofont-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

class AmendGroupCodeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            rowData: [
                {
                    code: "AALI-Astra Argo Lestari Tbk.",
                    price: "12,650",
                    indicator: "",
                    change: "+175(+1.36%)",
                    action: ""
                },
                {
                    code: "TLKM-Telekomunikasi Indonesia Tbk.",
                    price: "15,600",
                    indicator: "",
                    change: "-175(-1.36%)",
                    action: ""
                },
                {
                    code: "INDF-Indofood Tbk.",
                    price: "13,700",
                    indicator: "",
                    change: "-175(-1.36%)",
                    action: ""
                },
                {
                    code: "WSKT-Waskita Tbk.",
                    price: "11,400",
                    indicator: "",
                    change: "-175(-1.36%)",
                    action: ""
                },
            ],
        }
    }

    render() {
        const splitcode = (props) => {
            var splited = props.split('-');
            return <span>{splited[0]}</span>
        }
        const splitname = (props) => {
            let splited = props.split("-");
            return <span>{splited[1]}</span>
        }
        return (
            <>
                <div
                    className="card-145 ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto'}}>
                    <table className="table table-fixed table-hovered">
                        <thead>
                        <tr>
                            <th className="col-xs-10 v50-align-center">Code</th>
                            <th className="col-xs-2 v50-align-center">#</th>
                        </tr>
                        </thead>
                        <tbody className="tbodyGroup">
                        {this.state.rowData.map((charx, index) => {
                            return (
                                <tr className="trTableFix">
                                    <td className={`col-xs-10 codeTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}><kbd>{splitcode(charx.code)}</kbd> {splitname(charx.code)}</td>
                                    <td className={`col-xs-2 buttonTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                        <button type="button"
                                                className="btn btn-danger btn-sm"><i className="icofont-trash"></i></button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

class TradeSummaryTableScroll extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            rowData: [
                {
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },{
                    price: 0,
                    value: 0,
                    freq: 0,
                    volume: 0,
                },
            ],
        }
    }

    render() {
        const splitcode = (props) => {
            var splited = props.split('-');
            return <span>{splited[0]}</span>
        }
        const splitname = (props) => {
            let splited = props.split("-");
            return <span>{splited[1]}</span>
        }
        return (
            <>
                <div
                    className="card-stock-trade-sum-tb ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto'}}>
                    <table className="table table-fixed table-hovered d-border-bottom-grey">
                        <thead>
                        <tr>
                            <th className="col-xs-3 v15-align-center">Price</th>
                            <th className="col-xs-3 v15-align-center ">Value</th>
                            <th className="col-xs-3 v15-align-center ">Volume(Lot)</th>
                            <th className="col-xs-3 v15-align-center ">Freq</th>
                        </tr>
                        </thead>
                        <tbody className={"body-trade-sum-tb"}>
                        {this.state.rowData.map((charx, index) => {
                            return (
                                <tr className="trTableFix">
                                    <td className={`col-xs-3 text-right d-border-right codeTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                        {charx.price}</td>
                                    <td className={`col-xs-3 text-right d-border-right codeTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                        {charx.value}</td>
                                    <td className={`col-xs-3 text-right d-border-right codeTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                        {charx.volume}</td>
                                    <td className={`col-xs-3 text-right d-border-right buttonTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                        {charx.freq}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        {/*<thead>*/}
                        {/*<tr>*/}
                            {/*<th className="col-xs-10 v50-align-center"></th>*/}
                            {/*<th className="col-xs-2 v50-align-center">Total Val: </th>*/}
                            {/*<th className="col-xs-2 v50-align-center">Total Vol: </th>*/}
                            {/*<th className="col-xs-2 v50-align-center">Freq: </th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                    </table>
                    <table className="table table-fixed table-hovered d-border-bottom-grey">
                    <thead>
                        <tr>
                            <th className="col-xs-3 ">&nbsp;</th>
                            <th className="col-xs-3 " style={{"textAlign":"left !important"}}>Val: </th>
                            <th className="col-xs-3 " style={{"textAlign":"left !important"}}>Vol: </th>
                            <th className="col-xs-3 " style={{"textAlign":"left !important"}}>Freq: </th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </>
        );
    }
}

class AddGroupCodeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            rowData: [
                {
                    code: "AALI-Astra Argo Lestari Tbk.1",
                    price: "12,650",
                    indicator: "",
                    change: "+175(+1.36%)"
                },
                {
                    code: "TLKM-Telekomunikasi Indonesia Tbk.",
                    price: "15,600",
                    indicator: "",
                    change: "-175(-1.36%)"
                },
                {
                    code: "TLKM-Telekomunikasi Indonesia Tbk.",
                    price: "15,600",
                    indicator: "",
                    change: "-175(-1.36%)"
                },
                {
                    code: "TLKM-Telekomunikasi Indonesia Tbk.",
                    price: "15,600",
                    indicator: "",
                    change: "-175(-1.36%)"
                },
                {
                    code: "",
                    price: "",
                    indicator: "",
                    change: ""
                },
                {
                    code: "",
                    price: "",
                    indicator: "",
                    change: ""
                },
            ],
        };
    }

    render() {
        const splitcode = (props) => {
            var splited = props.split('-');
            return <span>{splited[0]}</span>
        }
        const splitname = (props) => {
            let splited = props.split("-");
            return <span>{splited[1]}</span>
        }
        return (
            <>
                <div
                    className="card-290 ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto','overflow-y':'hidden'}}>
                    <table className="table table-fixed table-hovered">
                        <thead>
                        <tr>
                            <th className="col-xs-10 v50-align-center">Code</th>
                            <th className="col-xs-2 v50-align-center">#</th>
                        </tr>
                        </thead>
                        <tbody className="tbodyGroupAdd">
                        {this.state.rowData.map((charx, index) => {
                            if(charx.code == ""){
                                return (
                                    <tr className="trTableFix">
                                        <td className={`col-xs-10 codeTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}></td>
                                         <td className={`col-xs-2 buttonTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                     </td>
                                    </tr>
                                )
                            }else{
                                return (
                                    <tr className="trTableFix">
                                        <td className={`col-xs-10 codeTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}><kbd>{splitcode(charx.code)}</kbd> {splitname(charx.code)}</td>
                                         <td className={`col-xs-2 buttonTd ${((index+1) % 2 == 0) ? 'td-even' : ''}`}>
                                            <button type="button"
                                                className="btn btn-danger btn-sm"><i className="icofont-trash"></i></button></td>
                                    </tr>
                                    )
                                }
                        })}
                        </tbody>
                    </table>



                </div>
            </>
        );
    }
}

class HistoryPriceAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [

                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105: 95, minWidth: 95,
                    suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success locked-visible locked-col";
                    },},
                { field: "freq", headerName: "Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?150:s=="s75"?140:s=="s80"?130:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "value", headerName: "Value", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?150:s=="s75"?140:s=="s80"?135:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { price: "10,870",
                    freq: "9",
                    vol: "20",
                    value: "156"},
                { price: "10,860",
                    freq: "8",
                    vol: "21",
                    value: "156"},
                { price: "10,850",
                    freq: "7",
                    vol: "22",
                    value: "156"},
                { price: "10,840",
                    freq: "6",
                    vol: "23",
                    value: "156"},
                { price: "10,830",
                    freq: "5",
                    vol: "24",
                    value: "156"},
                { price: "10,820",
                    freq: "4",
                    vol: "25",
                    value: "156"},
                { price: "10,810",
                    freq: "3",
                    vol: "26",
                    value: "156"},
                { price: "10,800",
                    freq: "2",
                    vol: "27",
                    value: "156"},
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
                    className={
                        this.props.type === "tradeHistory" ?
                                (this.props.changethis == "active") ?
                                    "card card-406 ag-theme-balham-dark ag-header-border-gray ag-striped-odd" :
                                    "card card-129 ag-theme-balham-dark ag-header-border-gray ag-striped-odd" :
                        "card card-215 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"}
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
class SummaryBuyerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "buyer", headerName: "Top Buyer", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?210:s=="s75"?195:s=="s80"?170:s=="s90"?140:s=="s100"?140:130,
                    minWidth: 130,
                    suppressSizeToFit:true, lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true,  comparator: integerComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?205:s=="s75"?190:s=="s80"?170:s=="s90"?140:s=="s100"?130:120,
                    minWidth: 120, cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg. Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?250:s=="s50"?230:s=="s67"?200:s=="s75"?190:s=="s80"?160:s=="s90"?135:s=="s100"?130:120,
                    minWidth: 120, cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { buyer: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { buyer: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { buyer: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { buyer: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { buyer: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { buyer: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { buyer: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { buyer: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
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
                    className="card card-220-b ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
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


class HistoryBuyerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "buyer", headerName: "Buyer", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105: 95, minWidth: 95,
                    suppressSizeToFit:true, lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?150:s=="s75"?140:s=="s80"?130:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?150:s=="s75"?140:s=="s80"?135:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { buyer: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { buyer: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { buyer: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { buyer: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { buyer: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { buyer: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { buyer: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { buyer: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
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
                    className="card card-129 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
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

class SummarySellerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "seller", headerName: "Top Seller", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?210:s=="s75"?195:s=="s80"?170:s=="s90"?140:s=="s100"?140:130,
                    minWidth: 130,
                    suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?205:s=="s75"?190:s=="s80"?170:s=="s90"?140:s=="s100"?130:120,
                    minWidth: 120, cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },

                { field: "avg", headerName: "Avg. Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?250:s=="s50"?230:s=="s67"?200:s=="s75"?190:s=="s80"?160:s=="s90"?135:s=="s100"?130:120,
                    minWidth: 120, cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { seller: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { seller: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { seller: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { seller: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { seller: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { seller: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { seller: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { seller: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
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
                    className="card card-220-b ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
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

class HistorySellerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "seller", headerName: "Seller", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105: 95, minWidth: 95,
                    suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?150:s=="s75"?140:s=="s80"?130:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?150:s=="s75"?140:s=="s80"?135:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { seller: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { seller: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { seller: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { seller: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { seller: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { seller: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { seller: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { seller: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
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
                    className="card card-129 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"
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

class CorpActionAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "type", headerName: "Type", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?275:s=="s50"?240:s=="s67"?220:s=="s75"?200:s=="s80"?190:s=="s90"?155:140,
                    minWidth: 140,
                    suppressSizeToFit:true, lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    },},
                { field: "cumdate", headerName: "Cum Date", sortable: true, filter: "agTextColumnFilter", resizable: true,comparator: stringComparator,
                    width: s=="s49"?275:s=="s50"?250:s=="s67"?220:s=="s75"?200:s=="s80"?190:s=="s90"?155:140,
                    minWidth: 140,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    },},
                { field: "distdate", headerName: "Dist. Date", sortable: true, filter: "agTextColumnFilter", resizable: true,comparator: stringComparator,
                    width: s=="s49"?275:s=="s50"?250:s=="s67"?220:s=="s75"?210:s=="s80"?180:s=="s90"?160:140,
                    minWidth: 140,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    },},
                { field: "ratio", headerName: "Ratio", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: stringComparator,
                    width: s=="s49"?275:s=="s50"?250:s=="s67"?220:s=="s75"?210:s=="s70"?180:s=="s80"?168:s=="s90"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "exprice", headerName: "Ex. Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?275:s=="s50"?250:s=="s67"?220:s=="s75"?210:s=="s70"?170:s=="s80"?168:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { type: "CASH DIVIDEND"+s,
                    cumdate: "2018-04-17",
                    distdate: "2018-05-09",
                    ratio: "1.00 : 322.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-20",
                    distdate: "2018-05-12",
                    ratio: "1.00 : 322.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-19",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 370.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-21",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 370.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-22",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 472.00",
                    exprice: "0.00" },
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
                    className="card card-161-2 ag-theme-balham-dark ag-striped-odd ag-header-border"
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


const RegisterAmendModal = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        chartMode: vars.chartMode,
        statusAlertN:vars.statusAlertN,
        handleStatusAlert3:(type,statusAlert,msg, data)=>actions.sendAction('handleStatusAlert3',{type,statusAlert,msg, data}),
    }),
    ["handleStatusAlert3"]
)(RegisterAmendModal_Base);
const StockFinancialStatement = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(StockFinancialStatement_Base);

const StockPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(StockPage_Base);

const StockHistoryPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        rangeStockTradeHistory:vars.rangeStockTradeHistory,
    }),
)(StockHistoryPage_Base);

const StockTradeSummaryPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(StockTradeSummaryPage_Base);

const TableStockWatchlist = ContextConnector(BIPSAppContext,
    (vars, actions, props)=>({
        subscribeMsg: vars.subscribeMsg,
        stockSummary:vars.stockSummary,
        sessionID:vars.sessionID,
        subscribeStock:(sessionID) => {actions.sendAction('subscribeStock', {sessionID})}
    })
)(TableStockWatchlist_Base);

export default Stocks;
export { CustomFrameHeaderStock, BuyPage , AmendGroupNameAgGrid, AmendGroupCodeAgGrid, AddGroupCodeAgGrid, BuyModal, SellModal, RegisterAmendModal };
export {
    StockWatchlist, StockHistoryPage, StockPage,
    TableStockInfo,
    TableProfil,
    StockFinancialStatement,
    TableCorpAction,
    StockTradeSummaryPage,
};
