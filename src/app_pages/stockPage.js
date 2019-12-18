import React from 'react';
import Select from 'react-select';
import {AppFrame, AppFrameAction, AppFrameProvider, AppModal} from "../appframe";
import {Dropdown, Input} from 'semantic-ui-react';
import {Table as TableBS} from 'react-bootstrap';

import {BIPSAppProvider, BIPSAppContext } from "../AppData";
import FillHeaderTab from "../tabheaderfill";
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import { ContextConnector } from '../appcontext.js';

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
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');
require('../bootstrap-3.3.7/bootstrap-datepicker.standalone.min.css');
require('../../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');

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
                            stockWatchlistPage: 'STOCK WATCHLIST',
                            stockHistoryPage: 'STOCK TRADE HISTORY'
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
            <div className="row col-sm-12 px-0 mx-0 pt-1 card-190">
                <div className="col-sm-12 px-0 h-30">
                    <MenuOfContent treeName="/stockPage/stockInfoPage" linkTitles={
                        {
                            stockInfoTable : 'STOCK INFO',
                            profilTable : 'PROFIL',
                            corpActionTable : 'CORP ACTION'
                        }
                    } />
                </div>
                <div className="col-sm-12 px-0 d-border card-160">
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
                <TableBS responsive size="sm" className="text-white my-0 bg-dark-grey card-158 ">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Listed</td>
                        <td className="py-1 text-primary d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">IPO</td>
                        <td className="py-1 text-primary d-border-tr-gray">1,550</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Tradeable</td>
                        <td className="py-1 text-primary d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Base</td>
                        <td className="py-1 text-primary d-border-tr-gray">1,230</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Fg Avail</td>
                        <td className="py-1 text-primary d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding">Board</td>
                        <td className="py-1 text-primary d-border-tr-gray">Main</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Mkt. Capital(M)</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">24.299T</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Corp. Action</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">No Corporation Action</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Marginable</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">Marginable and Shirt Selling</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding">Sub Sector</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">Plantation</td>
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
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <main>
                    <div className="container px-0 mx-0 col-sm-12">
                        <div className="bg-black-inactive card card-156">
                            <CorpActionAgGrid />
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
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
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
                                            maxMenuHeight={150} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect text-left" theme={this.selectSelectionTab}/>
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
                                <div className="col-md-7 px-1 py-2">
                                    <div id="stock-chart" className="card card-282 bg-trading-gray">
                                        <StockChart/>
                                    </div>
                                    <StockInfo/>
                                </div>
                                <div className="col-md-5 px-1 py-0">
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
        }
    }
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth < 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth < 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth < 2030){
            return "s75";
        }else if(window.innerWidth > 2045 && window.innerWidth < 2700){
            return "s67";
        }else if(window.innerWidth > 2701){
            return "s50";
        }else{
            return "s100";
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

    render () {
        const changeTabNumber = (props) => {
            this.setState({
                tabNumber: props,
            })
        }
        const tabActive = (props) => {
            if (this.state.tabNumber == props) {
                return "col-sm-4 click-pointer d-border-right text-center active";
            } else {
                return "col-sm-4 click-pointer d-border-right text-center"
            }
        }
        const changeActiveGridHistory = () => {
            if(this.state.tabNumber === 1){
                return <HistoryBrokerAgGridThird size={this.ceksize()}/>
            } else if(this.state.tabNumber === 2){
                return <HistoryBrokerAgGrid/>
            }else{
                return <HistoryBrokerAgGridSecond/>
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
                                            maxMenuHeight={150} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                            </div>

                            <div className="px-2 mx-0 mt-3 col-sm-12 mb-3 row h-40">
                                <div className="col-sm-4 px-0 mx-0">
                                    <div className="input-group input-daterange h-35" style={{"z-index":0}}>
                                        <span className="input-group-addon h-35">Start</span>
                                        <input placeholder="dd/mm/yyyy" id="startDate1" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                        <span className="input-group-addon h-35">
                                            <span className="fa fa-calendar-alt"></span>
                                        </span>
                                        <span className="input-group-addon h-35">to</span>
                                        <input placeholder="dd/mm/yyyy" id="endDate1" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                        <span className="input-group-addon h-35">
                                            <span className="fa fa-calendar-alt"></span>
                                        </span>
                                        <span id="btn-clear-date" className="input-group-addon bg-gold click-pointer hover-gold h-35">
                                            <span className="ion ion-ios-close"></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-sm-8 pl-2 pr-0 mx-0 align-self-center">
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
                                                Value(Tn) <span className="text-danger"> 156,000</span>
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
                                        <HistoryPriceAgGrid size={this.ceksize()}/>
                                    </div>
                                    <div className="bg-trading-gray" style={{marginBottom : "10px"}}>
                                        <HistoryBuyerAgGrid size={this.ceksize()}/>
                                    </div>
                                    <div className="bg-trading-gray">
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

const StockWatchlist = (props) => {
    return(
        <div>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 pl-2 mx-0 py-0">
                <div className="col-sm-4 px-0 mx-0">
                    {/*<AppModal/>*/}
                    <TableStockWatchlist/>
                </div>
                <div className="col-sm-8 px-0 mx-0 card-527">
                    <div className="col-sm-12 px-2 pt-2">
                        <BuyPage/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </div>
    );
}

class TableStockWatchlist_Base extends React.Component{
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
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth < 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth < 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth < 2030){
            return "s75";
        }else if(window.innerWidth > 2045 && window.innerWidth < 2700){
            return "s67";
        }else if(window.innerWidth > 2701){
            return "s50";
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
                    <div className="pl-4 pr-2 pt-3">
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
    render(){
        const swapContent = () => {
            if(this.state.activeTab === 1){
                return <FormBuy idPrice="stockBuyPrice" part="stockInfo" idVol="stockBuyVol" idValue="stockBuyValue" columnSm="col-sm-12" />
            }else{
                return <FormSell idPrice="stockSellPrice" part="stockInfo" idVol="stockSellVol" idValue="stockSellValue" columnSm="col-sm-12"/>
            }
        }
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col-sm-12 px-2 pt-1 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 f-12">
                    <TableInfoTransaction lotshare="buyPage"/>
                    </div>
                    <div className="col-sm-6 mt-0 bg-dark-grey pt-0 pb-3 px-3 card-515 d-border">
                        <div className="cssmenumodal bg-dark-grey pb-0 col-sm-12 mx-0 px-0 h-33">
                            <ul>
                                <li className={ (this.state.activeTab === 1)  ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' }
                                    onClick={() => { this.toggle(1); }}><a className="pt-1 pb-2"><span className="f-12">
                                    &nbsp; Buy
                                </span></a></li>
                                <li className={ (this.state.activeTab === 2) ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' }
                                    onClick={() => { this.toggle(2); }}><a className="pt-1 pb-2"><span className="f-12">
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

class SellPage extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 py-4 px-3 mt-0 f-12 bg-dark-grey d-border-active">
                        <TableInfoTransaction lotshare="sellPage" />
                    </div>
                    <div className="col-sm-6 mt-0 d-border-active bg-dark-grey pt-3 pb-3 px-3">
                        <FormSell idPrice="stockSellPrice" idVol="stockSellVol" idValue="stockSellValue" columnSm="col-sm-12"/>
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
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
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
                <AppFrameAction ref="frameAction" />
                <div>
                    <div className="cssmenumodal bg-grey pb-4 col-sm-12 mx-0 px-0">
                        <ul>
                            <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Amend Group</span></a></li>
                            <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Add Group</span></a></li>
                        </ul>
                    </div>
                    <div className="card-475">
                        <div className={this.state.activeTab === '1' ? 'card card-475 d-border d-block f-12' : 'd-none'}>
                            <div className="card card-375 d-border-transparent-grey">
                                <div className="card card-xmini bg-grey">
                                    <AmendGroupNameAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                                    <div className="col-sm-5">
                                        <label className="col-sm-12">Name</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input defaultValue='Group A' placeholder='Group Name' size='small' className="gray col-sm-12 align-self-center"/>
                                    </div>
                                </div>
                                <div className="card card-xs bg-grey">
                                    <AmendGroupCodeAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
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
                            <div className="form-group row col-sm-12 px-0 mx-0 mt-5 pt-5 z-99 text-white">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stock list</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm btn-grey-gray border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.activeTab === '2' ? 'card card-475 d-border d-block f-12' : 'd-none'}>
                            <div className="card card-375 d-border-transparent-grey">
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                                    <div className="col-sm-5">
                                        <label className="col-sm-12">Group Name</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input defaultValue='Group A' placeholder='Group Name' size='small' className="gray col-sm-12 align-self-center"/>
                                    </div>
                                </div>
                                <div className="card card-xs bg-grey">
                                    <AddGroupCodeAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 z-99 text-white">
                                    <div className="form-group col-sm-8 my-1 text-left">
                                        {/*997*/}
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={150} styles={customStyles} placeholder={<div style={{color:"white"}}>Search..</div>} options={stockOptions} className="stockPageSelect text-left" theme={this.selectSelectionTab}/>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row col-sm-12 px-0 mx-0 mt-5 pt-5 text-white">
                                <div className="col-sm-9 align-self-center align-middle z-99">
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
                { field: 'broker', headerName: "Broker", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-warning locked-position locked-visible";
                    },},
                { field: 'buyvol', headerName: "Buy Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: 'buyval', headerName: "Buy Val (Bn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'avgbid', headerName: "Avg. Bid", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'sellvol', headerName: "Sell Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: 'sellval', headerName: "Sell Val (Bn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: 'avgsell', headerName: "Avg. Sell", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'netval', headerName: "Net Val (Bn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
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
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    buyvol: "2,000",
                    buyval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},],
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

class HistoryBrokerAgGridSecond extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: 'date', headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-warning locked-position locked-visible";
                    },},
                { field: 'fBuyVal', headerName: "Foreign Buy Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: 'fBuyVol', headerName: "Foreign Buy Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'fSellVal', headerName: "Foreign Sell Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'fSellVol', headerName: "Foreign Sell Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: 'fNetVal', headerName: "Foreign Net Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
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
                { field: 'date', headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?220:s=="s80"?180:s=="s90"?140:100,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-warning locked-position locked-visible";
                    },},
                { field: 'last', headerName: "Last", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 150,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: 'change', headerName: "Change(%)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'volume', headerName: "Volume", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 220,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: 'value', headerName: "Value", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?305:s=="s80"?290:s=="s90"?250:220,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
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
                    last: '3,850',
                    change: -20,
                    volume: '150.000',
                    value: '150.000.000',
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
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 80, minWidth: 80, lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 90, minWidth: 90,
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
                    width: s=="s75"?140:s=="s80"?125:s=="s90"?95:60, minWidth: 50,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "tvol", headerName: "T. Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?143:s=="s80"?120:s=="s90"?93:80, minWidth: 80,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
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
                    tvol: "156,450"},
                { code: "ANTM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TLKM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "BBRI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "ASII",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "WSKT",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AGII",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ADHI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMGR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "EMTK",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "MREI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "PTSP",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TCPI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BRAM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "INDF",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JECC",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "RDTX",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "DUTI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "FASW",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "IBST",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMMA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TKIM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JSMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SONA",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AMFG",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SCCO",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BYAN",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "UNTR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "GGRM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "UNVR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
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
                    className="card-watchlistAggrid ag-theme-balham-dark ag-header-border d-border ag-striped-odd"
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
                    className="card-xmini ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto'}}>
                    <table className="table table-fixed table-hovered">
                        <thead>
                        <tr>
                            <th className="col-xs-7">Group</th>
                            <th className="col-xs-2">Member</th>
                            <th className="col-xs-3">#</th>
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
                                        </button> <button type="button" className="btn btn-danger btn-sm">
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
                    className="card-xs ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto'}}>
                    <table className="table table-fixed table-hovered">
                        <thead>
                        <tr>
                            <th className="col-xs-10">Code</th>
                            <th className="col-xs-2">#</th>
                        </tr>
                        </thead>
                        <tbody>
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

class AddGroupCodeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            rowData: [
                {
                    code: "AALI-Astra Argo Lestari Tbk.",
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
                    className="card-xs ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto','overflow-y':'hidden'}}>
                    <table className="table table-fixed table-hovered">
                        <thead>
                        <tr>
                            <th className="col-xs-10">Code</th>
                            <th className="col-xs-2">#</th>
                        </tr>
                        </thead>
                        <tbody>
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

class HistoryPriceAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [

                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?130:s=="s80"?120:s=="s90"?110: 95, minWidth: 95,
                    suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success locked-visible locked-col";
                    },},
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?130:s=="s80"?120:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:s=="s80"?130:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "value", headerName: "Value(Tn)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:s=="s80"?135:s=="s90"?115:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
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

class HistoryBuyerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "buyer", headerName: "Buyer", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?130:s=="s80"?120:s=="s90"?110:95, minWidth: 95,
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
                { field: "volume", headerName: "Volume", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?130:s=="s80"?120:s=="s90"?110:100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:s=="s80"?130:s=="s90"?110:100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:s=="s80"?135:s=="s90"?115:100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
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

class HistorySellerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "seller", headerName: "Seller", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 100, minWidth: 100, suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table d-border-aggrid-right f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?130:s=="s80"?120:s=="s90"?110:100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:s=="s80"?130:s=="s90"?110:100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:s=="s80"?135:s=="s90"?115:100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 text-success";
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
        this.state = {
            columnDefs: [
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    suppressSizeToFit:true, lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-col locked-visible";
                    },},
                { field: "cumdate", headerName: "Cum Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "distdate", headerName: "Dist. Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "ratio", headerName: "Ratio", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "exprice", headerName: "Ex. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
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
                { type: "CASH DIVIDEND",
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
                    className="card card-156 ag-theme-balham-dark ag-striped-odd ag-header-border"
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
        chartMode: vars.chartMode
    }),
)(RegisterAmendModal_Base);

const StockPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(StockPage_Base);

const StockHistoryPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(StockHistoryPage_Base);

const TableStockWatchlist = ContextConnector(BIPSAppContext,
    (vars, actions, props)=>({
        subscribeMsg: vars.subscribeMsg,
        stockSummary:vars.stockSummary,
        sessionID:vars.sessionID,
        subscribeStock:(sessionID) => {actions.sendAction('subscribeStock', {sessionID})}
    })
)(TableStockWatchlist_Base);

export default Stocks;
export { CustomFrameHeaderStock, BuyPage, SellPage, AmendGroupNameAgGrid, AmendGroupCodeAgGrid, AddGroupCodeAgGrid, BuyModal, SellModal, RegisterAmendModal };
export {
    StockWatchlist, StockHistoryPage, StockPage,
    TableStockInfo, TableProfil, TableCorpAction
};
