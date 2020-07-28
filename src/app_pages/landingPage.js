import React from 'react';
import ReactDOM from 'react-dom';

import {Input, Popup, Dropdown} from 'semantic-ui-react';
import { AppFrameAction } from '../appframe.js';

import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
import FillHeaderTab from "../tabheaderfill";
import ModalBuy from './../app_modals/modal_buy';
import ModalSell from "./../app_modals/modal_sell";
import ModalAmend from "./../app_modals/modal_amend";
import VerifyPIN, {tanggal} from "./verifyPin";
import ModalOrderDetail from "./../app_modals/modal_order_detail";
import {AgGridReact} from "ag-grid-react";
import anychart from 'anychart';
import $ from "jquery";
import user_avatar from "../img/man.png";
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';
import PinInput from "react-pin-input";
import {Table} from "react-bootstrap";

const stateOptionsLp = [
    { key: 'lastprice', value: 'lastprice', text: 'Last Price' },
    { key: 'bestofferprice', value: 'bestofferprice', text: 'Best Offer Price' },
    { key: 'bestbidprice', value: 'bestbidprice', text: 'Best Bid Price' },
];

const stateOptionsOperator = [
    { key: 'lebihkecil', value: 'lebihkecil', text: '< =' },
    { key: 'lebihbesar', value: 'lebihbesar', text: '> =' },
];

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
const CustomFrameHeaderLanding = (props) =>{
    return (
        <div>
            <div className="row col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab treeName="/landingPage" linkTitles={
                        {
                            landingPageInvboard: 'INVESTMENT BOARD',
                            stockCashPageInvboard: 'STOCK & CASH',
                            tradeListHistoryPageInvboard: 'HISTORICAL',
                            fundTransferPageInvboard: 'FUND TRANSFER',
                            inquryAccountPageInvboard: 'ACCOUNT INFO',
                            // InvboardTcAndSoa: 'TC & SOA',
                        }
                    }/>
                </div>
            </div>
            <AppFrame treeName="/landingPage" headerComponent={LandingFrameHeader}/>
            {/*<AppModal/>*/}
        </div>
    );
}

const LandingFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

class Landing extends React.PureComponent {
    componentDidMount(){
        $(".pincode-input-text").on('keypress',function(e) {
            if(e.which == 13) {
                $("#pin-click-verify").click();
            }
        });
    }
    render () {
        return (
            //hanya memanggil headernya saja
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

class LandingPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var input = document.getElementById("press_login");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("click_login").click();
            }
        });
        var props = this.props;
        $('#pieChart').css('height', '100%');
        // create data
        var data = [
            // {
            //     x: "Portfolio Equity", value: 207166
            // },
            {
                x: "Equity Portfolio", value: 190173,
                normal:  {
                    fill: "#88C800",
                },
                hovered: {
                    outline: {
                        enabled: true,
                    }
                },
                selected: {
                    outline: {
                        enabled: true,
                    }
                }
            },
            {
                x: "Cash", value: 40173,
                normal:  {
                    fill: "#F8A32F",
                },
                hovered: {
                    outline: {
                        enabled: true,
                    }
                },
                selected: {
                    outline: {
                        enabled: true,
                    }
                }
            },
        ];


        anychart.onDocumentReady(function () {
            // createpie();
            var chart = anychart.pie3d(data);
            var credits = chart.credits();
            credits.enabled(false);
            // set the container id
            // create a chart and set the data
            // set the position of the legend
            chart.legend().position("bottom");

            // set the alignment of the legend
            chart.legend().align("center");

            // set the layout of the legend
            chart.legend().itemsLayout("horizontal-expandable");

            var legends = chart.legend();

            legends.padding(10);

            legends.fontColor("white");
            var backgrounds = legends.background();

            backgrounds.fill("#8597B0");
            backgrounds.enabled(true);
            // backgrounds.stroke("#96a6a6");
            backgrounds.cornerType("round");
            backgrounds.corners(10);

            chart.normal().outline().enabled(true);
            chart.normal().outline().width("5%");
            chart.hovered().outline().width("10%");
            chart.selected().outline().width("3");
            chart.selected().outline().fill("#455a64");
            chart.selected().outline().stroke(null);
            chart.selected().outline().offset(2);

            // configure connectors
            chart.connectorStroke({color: "#888888", thickness: 2, dash:"2 2"});

            // explode the fourth and fifth slices
            /*chart.select(2);*/

            // set the position of labels
            chart.labels().position("outside");

            // set the chart title
            chart.title("Investment Board");

            chart.listen("pointsSelect", function(e) {
                var points = e.point.index;
                if (points === 0){
                    props.changeStateLanding('0');
                    if (e.point.selected()) {
                        chart.unselect([1]);
                    } else {
                        chart.unselect([1]);
                        chart.select(0);
                    }
                } else if (points === 1){
                    props.changeStateLanding('1');
                    if (e.point.selected()) {
                        chart.unselect([0]);
                    } else {
                        chart.unselect([0]);
                        chart.select(1);
                    }
                }
            });

            chart.legend().listen("legendItemClick", function(e) {
                var legend = e.itemIndex;
                // Set disturber.
                /*chart.select([5]);*/
                chart.select([2]);
                if (legend === 0){
                    props.changeStateLanding('0');
                    chart.unselect([1]);
                } else if (legend === 1){
                    props.changeStateLanding('1');
                    chart.unselect([0]);
                }

            });
            chart.container("pieChart2");

            // initiate drawing the chart
            chart.draw();
        });
    }

    closeClick = (e) => {
        this.refs.frameActions.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameActions.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameActions.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
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
    render() {
        const pl = (getpl,persen) => {
            let temp = [];
            if(getpl.includes("-")){
                temp.push(<span className={"text-danger"}>
                    <i className="icofont icofont-caret-down"></i>&nbsp;{getpl}&nbsp;({persen}%)
                </span>);
            }else{
                temp.push(<span className={"text-success"}>
                    <i className="icofont icofont-caret-up"></i>&nbsp;{getpl}&nbsp;({persen}%)
                </span>);
            }
            return temp;
        }
        return (
            <div className="container-fluid px-0 bg-black-trading">
                <div className="card-527 col-sm-12 px-0 mx-0 row">
                    <div id="pieChart2" className="col-sm-4 px-0"></div>
                    <div className="col-sm-8 px-0 d-border-left">
                        <AppFrameAction ref="frameActions"></AppFrameAction>
                        <main>

                            <div className="container-fluid px-0">
                                <div className="container px-0 mx-0 col-sm-12 bg-grey" style={{display : this.props.stateLanding === '' ? 'block' : 'none'}}>
                                    <div className="card-body card-527 align-self-center text-center bg-grey f-14 py-3">
                                        <div className="py-5 my-5">
                                            <div className="py-5 my-5">
                                                <i className="icon-icon-portofolio f-25"></i>
                                                <div>Please choose one menu in chart pie to show</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '0' ? 'block' : 'none'}}>
                                    <div id="pinPortofolio" className="d-block text-center align-self-center">
                                        <VerifyPINPortofolio pos="portofolio"/>
                                    </div>
                                    <div id="detailPortofolio" className="d-none">
                                        <div className="card-header card-header-investment bg-grey h-40">
                                            <div className="row col-sm-12 px-0 mx-0 py-1">
                                                <div className="col-sm-3 px-4 mx-0 f-14">
                                                    <b>Equity Portfolio</b>
                                                </div>
                                                <div className="col-sm-4 px-4 mx-0 f-14">
                                                    Stock Val : <span className="text-primary">15,234,000</span>
                                                </div>
                                                <div className="col-sm-4 px-4 mx-0 f-14">
                                                    P/L : <span className="text-success">{pl('1,222,222','7.5')}</span>
                                                </div>
                                                <div className={"col-sm-1 px-4 mx-0 f-14"}>
                                                    <button
                                                        className="pull-right btn btn-primary"
                                                        style={{"font-size":"12px","margin-top":"-7px","width":"38px"}}>
                                                        <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <PortofolioAgGrid size={this.ceksize()} gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '1' ? 'block' : 'none'}}>
                                    <div className="card-header header-pegadaian bg-grey">
                                        <div className="row col-sm-12 px-0 mx-0 py-3">
                                            <div className="col-sm-10 px-0 mx-0 f-14 align-self-center"></div>
                                            <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                <i className="f-18 ion ion-md-sync click-pointer"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body align-self-center text-center f-16 py-5">
                                        <div className="py-5">
                                            <div className="py-5">
                                                <i className="icofont icofont-warning-alt f-18"></i>
                                                <p>Not Available</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '1' ? 'block' : 'none'}}>
                                    <div className="card-header card-header-investment bg-grey h-40">
                                        <div className="row col-sm-12 px-0 mx-0 py-1">
                                            <div className="col-sm-5 px-4 mx-0 f-14">
                                                Total Nominal : <span className="text-primary">46,000,000</span>
                                            </div>
                                            <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <FixedIncomeAgGrid size={this.ceksize()} gridView="tab" classView="f-12"/>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '2' ? 'block' : 'none'}}>
                                    <div className="card-header card-header-investment bg-grey h-40">
                                        <div className="row col-sm-12 px-0 mx-0 py-1">
                                            <div className="col-sm-4 px-4 mx-0 f-14">
                                                Invested : <span className="text-primary">4,088,802</span>
                                            </div>
                                            <div className="col-sm-4 px-4 mx-0 f-14">
                                                P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <MutualFundAgGrid size={this.ceksize()} gridView="tab" classView="f-12" />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

class StockCash_Base extends React.Component{
    constructor(props) {
        super(props);
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
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '10px'
        };

        const paddingParagraph = {
            padding: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
        }


        return (
            <>
                <AppFrameAction ref="frameAction" />

                <div className="card-527 col-sm-12 px-0 mx-0 row d-block" id="verifyPinStockCash">
                    <VerifyPINPortofolio pos="stock"/>
                </div>

                <div className="container-fluid px-0 bg-black-trading f-12 d-none" id="contentPinStockCash">
                    <div className="card-527 col-sm-12 px-0 mx-0 row">
                        <div className="col-sm-2 px-1">
                            <div className="stockcash-header h-77" style={imgUser}>
                                <div className="col-sm-12 h-77" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                            <div className="col-sm-12 px-0">
                                <ul className="list-group card-448 f-14 mb-0">
                                    <li className="list-group-item-portofolio">Cash and Balance <br/><span className="text-primary pull-right">5,911,198</span></li>
                                    <li className="list-group-item-portofolio">P/L <br/><span className="text-success pull-right">1,496,198</span></li>
                                    <li className="list-group-item-portofolio">P/L Ratio <br/><span className="text-success pull-right">+7.50%</span></li>
                                    <li className="list-group-item-portofolio">Cash Balance T+2 <br/><span className="text-primary pull-right">4,500,000</span></li>
                                    <li className="list-group-item-portofolio">Buy Limit <br/><span className="pull-right">15,980,000</span></li>
                                    <li className="list-group-item-portofolio">Additional Buy Limit <br/><span className="pull-right">15,980,000</span></li>
                                    <li className="list-group-item-portofolio">Stock Value <br/><span className="pull-right">15,234,000</span></li>
                                    {/*<li className="list-group-item-portofolio">Unsettled Amt <br/><span className="pull-right">?</span></li>*/}
                                    <li className="list-group-item-portofolio">Mkt. Value <br/><span className="pull-right">4,400,000</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-10 px-0">
                            <div className="col-sm-12 px-0">
                                <StockCashAgGrid size={this.ceksize()}/>
                            </div>
                            <div className="col-sm-12 card-221 px-0">
                                <p className="text-center mt-3 mb-0 h-17 bg-tableheader">Settlement</p>
                                <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless mb-0 card-194">
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Date</td>
                                        <td className="d-border-tr-gray-all py-1">22/6/2019</td>
                                        <td className="d-border-tr-gray-all py-1">23/6/2019</td>
                                        <td className="d-border-tr-gray-all py-1">24/6/2019</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Receiveable</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Payable</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">1,411,168</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Tax + Fee</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">-30</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Penalty</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Settlement Amount</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">- 1,411,168</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Cash Balance</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">- 1,411,168</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Fund Transfer</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                        <td className="d-border-tr-gray-all text-right py-1">- 1,411,168</td>
                                        <td className="d-border-tr-gray-all text-right py-1">0</td>
                                    </tr>
                                    <tr className="d-border-footer">
                                        <td className="no-wrap bg-gray-tradding d-border-tr-gray py-1">Total</td>
                                        <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                        <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                        <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class ModalHistorical extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('#datepickerstartH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
            $('#datepickerendH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
        });
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
    render() {
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid pl-0 pr-0 f-12">
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={{paddingBottom: '10px'}}>
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 pl-0 f-12 text-center align-self-center black ver-center">

                                <table>
                                    <tr>
                                        <td className={"px-0"}>
                                            <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>Periode</span>
                                        </td>
                                        <td className={"px-0"}>
                                        <div className="ui input pl-0" style={{paddingRight:'37px',marginLeft:'-1px'}}>
                                            <Input placeholder='dd/mm/yy' id="datepickerstartH" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                            </div>
                                        </td>
                                        <td className={"px-0"}>
                                            <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>To</span>
                                        </td>
                                        <td className={"px-0"}>

                                        <div className="ui input" style={{paddingRight:'40px',marginLeft:'-1px'}}>
                                            <Input placeholder='dd/mm/yy' id="datepickerendH" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                            <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" style={{height:'30px !important'}} className="btn btn-md btn-block btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0 pt-0" >
                        <TradeListAgGrid size={this.ceksize()}/>
                    </div>

                </div>
            </>
        );
    }
}
class ModalOrderHistory extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('#datepickerstartOH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
            $('#datepickerendOH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });


        });
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
    render() {
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }
        const marketOptions = [
            //untuk top active
            { key: 'all', value: 'all', text: 'All' },
            { key: 'rg', value: 'rg', text: 'RG' },
            { key: 'tn', value: 'tn', text: 'TN' },
            { key: 'ng', value: 'ng', text: 'NG' },
        ];
        const  statusOptions = [
            //untuk top active
            { key: 'all', value: 'all', text: 'All' },
            { key: 'open', value: 'open', text: 'Open' },
            { key: 'amend', value: 'amend', text: 'Amend' },
            { key: 'withdraw', value: 'withdraw', text: 'Withdraw' },
            { key: 'partial', value: 'partial', text: 'Partial' },
            { key: 'donePartial', value: 'donePartial', text: 'Done - Partial' },
            { key: 'reject', value: 'reject', text: 'Reject' },
            { key: 'send', value: 'send', text: 'Send' },
        ];
        const buySellOptions = [
            //untuk top active
            { key: 'all', value: 'ALL', text: 'All' },
            { key: 'buy', value: 'BUY', text: 'Buy' },
            { key: 'sell', value: 'SELL', text: 'Sell' },
        ];
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid pl-0 pr-0 f-12" >
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 pl-0 f-12 text-center align-self-center black ver-center">
                                <table>
                                    <tr>
                                        <td className={"px-0"}>
                                            <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>Periode</span>
                                        </td>
                                        <td className={"px-0"}>
                                            <div className="ui input pl-0" style={{paddingRight:'37px',marginLeft:'-1px'}}>
                                                <Input placeholder='dd/mm/yy' id="datepickerstartOH" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                            </div>
                                        </td>
                                        <td className={"px-0"}>
                                            <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>To</span>
                                        </td>
                                        <td className={"px-0"}>

                                            <div className="ui input" style={{paddingRight:'40px',marginLeft:'-1px'}}>
                                                <Input placeholder='dd/mm/yy' id="datepickerendOH" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" style={{height:'30px !important'}} className="btn btn-md btn-block btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0 pt-0" >
                        <TransactionOrderHistoryAgGrid size={this.ceksize()}/>
                    </div>
                </div>
            </>
        );
    }
}

class ModalTransactionHistory extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('#datepickerstartTH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
            $('#datepickerendTH').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });


        });
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
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }
        const marketOptions = [
            //untuk top active
            { key: 'all', value: 'all', text: 'All' },
            { key: 'rg', value: 'rg', text: 'RG' },
            { key: 'tn', value: 'tn', text: 'TN' },
            { key: 'ng', value: 'ng', text: 'NG' },
        ];
        const  statusOptions = [
            //untuk top active
            { key: 'all', value: 'all', text: 'All' },
            { key: 'open', value: 'open', text: 'Open' },
            { key: 'amend', value: 'amend', text: 'Amend' },
            { key: 'withdraw', value: 'withdraw', text: 'Withdraw' },
            { key: 'partial', value: 'partial', text: 'Partial' },
            { key: 'donePartial', value: 'donePartial', text: 'Done - Partial' },
            { key: 'reject', value: 'reject', text: 'Reject' },
            { key: 'send', value: 'send', text: 'Send' },
        ];
        const buySellOptions = [
            //untuk top active
            { key: 'all', value: 'ALL', text: 'All' },
            { key: 'buy', value: 'BUY', text: 'Buy' },
            { key: 'sell', value: 'SELL', text: 'Sell' },
        ];
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className={"row"}>
                    <div className="col-sm-12 row px-0 mx-0">
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 pl-4 f-12 text-center align-self-center black ver-center">
                                <table>
                                    <tr>
                                        <td className={"px-0"}>
                                            <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>Periode</span>
                                        </td>
                                        <td className={"px-0"}>
                                            <div className="ui input pl-0" style={{paddingRight:'37px',marginLeft:'-1px'}}>
                                                <Input placeholder='dd/mm/yy' id="datepickerstartTH" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                            </div>
                                        </td>
                                        <td className={"px-0"}>
                                            <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>To</span>
                                        </td>
                                        <td className={"px-0"}>

                                            <div className="ui input" style={{paddingRight:'40px',marginLeft:'-1px'}}>
                                                <Input placeholder='dd/mm/yy' id="datepickerendTH" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" style={{height:'30px !important'}} className="btn btn-md btn-block btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                    </div>

                    <div className={"col-sm-6 pr-2"}>
                        <div className="bg-tableheader text-center py-3 h-30"><span>STOCK TRANSACTION</span>
                        </div>
                        <StockTransactionHistoryAgGrid size={this.ceksize()}/>
                    </div>

                    <div className={"col-sm-6 pl-2"}>
                        <div className="bg-tableheader text-center py-3 h-30"><span>CASH TRANSACTION</span>
                        </div>
                        <CashTransactionHistoryAgGrid size={this.ceksize()}/>
                    </div>
                </div>

            </>
        );
    }
}

class ModalTransaction extends React.Component {

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
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            paddingTop: '10px',
            paddingBottom: '0px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid pl-0 pr-0 f-12" >


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0 pt-0" >
                        <TransactionAgGrid size={this.ceksize()}/>
                    </div>
                </div>
            </>
        );
    }
}

class PINVerify extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'fundtransfer'/>
            </>
        );
    }
}

class FundTransfer_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('#datepickerstartFT').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
            $('#datepickerendFT').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
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
    buttonClickPIN = (e) => {
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-right">
                </div>,
            contentClass: PINVerify,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }
    render () {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            paddingTop: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid px-1 f-12" id="FundPin">
                    <VerifyPINPortofolio pos="fund"/>
                </div>
                <div className="container-fluid px-1 f-12 d-none" id="ContentFund">


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-5 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; FUND TRANSFER</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; F/T LIST</span></a></li>
                                {/*<li className={ this.state.activeTab === '3' ? 'active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; Cancel</span></a></li>*/}
                            </ul>
                        </div>
                        <div className="col-sm-12 px-4 bg-grey bg-black-trading pt-0 d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container mx-0 pt-3">
                                    <div className="row">
                                        <div className="col-md pr-5 pl-0">
                                            <div>Available Cash (T1/T2)</div>
                                            <table className="table text-white d-border-table bg-dark-grey table-sm ">
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black text-center d-border-right">
                                                        dd / mm / yy (T1)
                                                    </td>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black text-center">
                                                        dd / mm / yy (T2)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={"text-right d-border-right"}>0.00</td>
                                                    <td className={"text-right"}>0.00</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md">
                                            <div>Bank Information</div>
                                            <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Account No</td>
                                                    <td className="d-border-tr-gray-all text-right">0640110945186</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Account Name</td>
                                                    <td className="d-border-tr-gray-all text-right">Mr. Mario Surya Saputra</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Bank Name</td>
                                                    <td className="d-border-tr-gray-all text-right"> PT. Bank Niaga Tbk.</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Branch Name</td>
                                                    <td className="d-border-tr-gray-all text-right">Bahana Sekuritas</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="p-2">If the above bank Information is wrong, please contact our call center at 14099 or by website www.directtrading.co.id</div>
                                        <div className="d-border bg-gray-tradding">
                                            <div className="col-md-12 p-3">
                                                <div className="row p-3">
                                                    {/*<div className="col-md-2 mt-3">*/}
                                                        {/*Amount (Not Including Fee)*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-1 mt-3">*/}
                                                        {/*IDR*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-3">*/}
                                                        {/*<Input */}
                                                        {/*readonly defaultValue='1,000,000' */}
                                                        {/*placeholder='Name' */}
                                                        {/*className="col-sm-12 pl-4 pr-0 text-right align-self-center input-right"*/}
                                                        {/**/}
                                                        {/*/>*/}
                                                    {/*</div>*/}
                                                    <div className="col-md-2 mt-3">
                                                        Withdrawal Amount
                                                    </div>
                                                    <div className="col-md-1 mt-3">
                                                        IDR
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='1,000,000' 
                                                        placeholder='Name' 
                                                        className="col-sm-12 pl-4 pr-0 text-right align-self-center input-right"/>
                                                    </div>
                                                    <div className={"col-md-6"}></div>
                                                    <div className={"col-sm-12 f-11 mt-4"}>
                                                        <input className="magic-checkbox" type="checkbox" name="viaRTGS"
                                                               id="viaRTGS" value="option"/>
                                                        <label htmlFor="viaRTGS"
                                                               className="text-white f-12-center pt-1">
                                                            Via RTGS (The above amount is more than IDR 100,000,000)
                                                        </label>
                                                    </div>
                                                </div>
                                                {/*<div className="row p-3">*/}
                                                    {/*<div className="col-md-2 mt-3">*/}
                                                        {/*Transfer Date (T1/T2)*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-1">*/}

                                                    {/*</div>*/}
                                                        {/**/}
                                                    {/*<div className="col-md-3 ui input" style={{paddingRight:'53px'}}>*/}
                                                        {/*<Input placeholder='dd/mm/yy' id="datepickerTest" className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>*/}
                                                        {/*<span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}><span*/}
                                                            {/*className="fa fa-calendar-alt"></span></span>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>

                                        <div className="row mt-4 pr-4">
                                            <div className="col-sm-6 mt-2">
                                                <label htmlFor="">
                                                    <u>Disclaimer</u>
                                                </label>
                                            </div>
                                            <div className={"col-sm-6 text-right mb-0 px-3 h-40"}>
                                                <button onClick={this.buttonClickPIN} className={"btn btn-primary"}><i className={"fa fa-paper-plane"}>&nbsp;Send</i></button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-2">
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom mb-3">
                                        <div className="form-group mb-3 px-0">
                                            <div className="col-sm-9 pl-0 h-62">
                                                <div className="ui small input col-sm-8 pl-0 f-12 text-center align-self-center black ver-center">
                                                    <table>
                                                        <tr>
                                                            <td className={"px-0"}>
                                                                <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>Periode</span>
                                                            </td>
                                                            <td className={"px-0"}>
                                                                <div className="ui input pl-0" style={{paddingRight:'37px',marginLeft:'-1px'}}>
                                                                    <Input placeholder='dd/mm/yy' id="datepickerstartFT" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                                    <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                                    <span
                                                                        className="fa fa-calendar-alt"></span>
                                                                </span>
                                                                </div>
                                                            </td>
                                                            <td className={"px-0"}>
                                                                <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>To</span>
                                                            </td>
                                                            <td className={"px-0"}>
                                                                <div className="ui input" style={{paddingRight:'40px',marginLeft:'-1px'}}>
                                                                    <Input placeholder='dd/mm/yy' id="datepickerendFT" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                                                    <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                                    <span
                                                                        className="fa fa-calendar-alt"></span>
                                                                </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button type="submit" style={{height:'30px !important'}} className="btn btn-md btn-block btn-dark btnDatePick">Go</button>
                                                            </td>
                                                        </tr>
                                                    </table>



                                                </div>
                                            </div>
                                            <FundAgGrid size={this.ceksize()}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className={this.state.activeTab === '3' ? 'd-block f-12' : 'd-none'}>*/}
                                {/*<div className="d-border-transparent-grey">*/}
                                        {/*<div className="form-group px-0 pt-5" style={{marginBottom : "10px"}}>*/}
                                            {/*<CancelGrid size={this.ceksize()}/>*/}
                                            {/*<CancelGrid2 size={this.ceksize()}/>*/}
                                        {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className={"col-sm-12 text-right mb-0 px-3 h-40"}>*/}
                                    {/*<button onClick={this.buttonClickPIN} className={"btn btn-primary"}><i className={"fa fa-paper-plane"}>&nbsp;Send</i></button>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

//Acccc
class InquryAccount_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }



    render () {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            paddingTop: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid px-1 f-12" >
                    <div id="AccountPin" className="col-sm-12 text-center align-self-center">
                        <VerifyPINPortofolio pos="account"/>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0 d-none" style={paddingParagraph} id={"ContentAccount"}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-6 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Account Infromation</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Contact Information</span></a></li>
                           </ul>
                        </div>
                        <div className="col-sm-12 px-4 pb-0 bg-grey bg-black-trading pt-0 d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0" style={{ paddingTop : "10px" }}>
                                    <div className="row">
                                        <div className={"col-sm-6 pl-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-290"}>
                                                <tr>
                                                    <td className={"d-border"}>Account Name</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>KSEI A/C No</td>
                                                    <td width="50%" className={"d-border hover-tables"}>928237217312</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Alt Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>KSEI SID</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>A/C Status</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>

                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID No</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID Expire Date</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Dividend Tax</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Comission Rate</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-sm-6 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-290"}>

                                                <tr>
                                                    <td width="50%" className={"d-border"} >Managing Branch</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Country</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Job</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Opening Date</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Opening Branch</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr className={"bg-tableheader"}>
                                                    <td className={""}>&nbsp;</td>
                                                    <td className={""}>&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Bank</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Branch</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Account No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Account Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-md-4 px-0 pt-4"}>
                                            <table width="100%"
                                                   className={"table table-bordered table-responsive mb-0"}>
                                                <tr className={"bg-tableheader"}>
                                                    <td colSpan="2" className={"text-center"}>Bank Account 1</td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" className={"d-border"}>Bank Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Account No</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Account Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-md-4 px-0 pt-4"}>
                                            <table width="100%"
                                                   className={"table table-bordered table-responsive mb-0"}>
                                                <tr className={"bg-tableheader"}>
                                                    <td colSpan="2" className={"text-center"}>Bank Account 2</td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" className={"d-border"}>Bank Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Account No</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Account Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-md-4 px-0 pt-4"}>
                                            <table width="100%"
                                                   className={"table table-bordered table-responsive mb-0"}>
                                                <tr className={"bg-tableheader"}>
                                                    <td colSpan="2" className={"text-center"}>Bank Account 3</td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" className={"d-border"}>Bank Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Account No</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Account Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0" style={{ paddingTop : "30px" }}>
                                    <div className="row">
                                        <div className={"col-sm-6 px-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-169"}>
                                                <tr>
                                                    <td className={"d-border"}>Date of Birth</td>
                                                    <td width="50%" className={"d-border hover-tables"}>928237217312</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Place of Birth</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Position</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Company Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Company Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-sm-6 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive card-169"}>

                                                <tr>
                                                    <td width="50%" className={"d-border"} >Unknown Addr/Phone</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>

                                                <tr>
                                                    <td className={"d-border"}>Email</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Mobile1</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Mobile2</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div className={"col-sm-12 px-0"}>
                                            <table className={"table table-borderder table-responsive card-113"}>
                                                <tr>
                                                    <td className={"d-border text-center td-bluelight"}>Item</td>
                                                    <td className={"d-border text-center td-bluelight"}>Post No.</td>
                                                    <td className={"d-border text-center td-bluelight"}>Address</td>
                                                    <td className={"d-border text-center td-bluelight"} width="50%">Address</td>
                                                </tr>
                                                <tr className={"hover-tables even-td"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"even-td hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
class TradeListHistory_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
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

    render () {
        const paddingParagraph = {
            paddingTop: '10px'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />

                <div className="container-fluid px-1 f-12" >


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}
                    <div id="HistoricalPin" className="col-sm-12 text-center align-self-center">
                        <VerifyPINPortofolio pos="historical"/>
                    </div>
                    <div className="col-sm-12 px-0 d-none" id={"ContentHistorical"} style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-8 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Trade List History</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Order History</span></a></li>
                                <li className={ this.state.activeTab === '3' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; Transaction History</span></a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 px-0 py-0 mx-0 my-0 bg-grey bg-black-trading d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <ModalHistorical/>

                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <ModalOrderHistory/>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '3' ? 'block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <ModalTransactionHistory/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class tcAndSoa extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }



    render () {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            paddingTop: '10px'
        }
        const paddingParagraphBottom = {
            paddingBottom: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: 'var(--warna-bg-trading-gray)',
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="container-fluid px-1 f-12" >


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-6 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li 
                                className={ this.state.activeTab === '1' ? 
                                                'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' 
                                                : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } 
                                            onClick={() => { this.toggle('1'); }}><a><span className="f-11">
                                                &nbsp; Trade Confirm</span>
                                                </a>
                                                </li>
                                <li className={ 
                                    this.state.activeTab === '2' 
                                    ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' 
                                    : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } 
                                    onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Settlement of Account</span></a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 px-0 py-0 mx-0 my-0 bg-grey bg-black-trading d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <TradeConfirmPage/>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <SoaPage/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class SoaPage extends React.PureComponent{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div className="d-border-transparent-grey">
                <div className="d-border-bottom">
                    <div className="form-group px-0">
                        <div className="col-sm-9 pl-0 h-62">
                            <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                {/* Update Zaky */}
                                <table>
                                    <tr>
                                        <td>
                                            <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                <span className="input-group-addon h-35 bg-tableheader">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35 bg-tableheader">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                <span className="input-group-addon h-35 bg-tableheader">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35 bg-tableheader">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Export Pdf</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                        {/*<div className="d-border-top">*/}
                        {/*/!*<TradeConfirmPageAgGrid />*!/*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }

}
class TradeConfirmPage extends React.PureComponent{
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
            <div className="d-border-transparent-grey">
                <div className="d-border-bottom">
                    <div className="form-group px-0">
                        <div className="col-sm-9 pl-0 h-62">
                            <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">
                                {/* <Input type="text" /> */}
                                {/* Update Zaky */}
                                <table>
                                    <tr>
                                        <td>
                                            <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                <span className="input-group-addon h-35 bg-tableheader">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35 bg-tableheader">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                <span className="input-group-addon h-35 bg-tableheader">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35 bg-tableheader">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Export Pdf</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                        <div className="d-border-top">
                            <TradeConfirmPageAgGrid size={this.ceksize()}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class TradeConfirmPageAgGrid extends React.PureComponent{
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "order", headerName: "Order Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?230:s=="s50"?200:150, minWidth: 150, comparator: dateComparator,
                    cellClass : function (params) {
                        return " grid-table text-left f-12 d-border-aggrid-right";
                    },
                },
                { field: "settle", headerName: "Settlement Date", sortable: true, filter: "agTextColumnFilter",
                    comparator: dateComparator, resizable: true,
                    width: s=="s49"?400:s=="s50"?360:s=="s67"?320:s=="s75"?310:s=="s80"?288:s=="s90"?240:220, minWidth: 220,
                    cellClass : function (params) {
                        return " text-left grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "stockBuy", headerName: "Stock Buy", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?420:s=="s50"?380:s=="s67"?340:s=="s75"?335:s=="s80"?290:s=="s90"?245:210, minWidth: 220,
                    cellClass : function (params) {
                        return " text-left grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "stockSell", headerName: "Stock Sell", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?450:s=="s50"?410:s=="s67"?360:s=="s75"?335:s=="s80"?290:s=="s90"?245:210, minWidth: 210,
                    cellClass : function (params) {
                        return " text-left grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "amountBuy", headerName: "Amount Buy", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    comparator: integerComparator,
                    width: s=="s49"?450:s=="s50"?400:s=="s67"?375:s=="s75"?325:s=="s80"?290:s=="s90"?270:240, minWidth:240,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "amountSell", headerName: "Amount Sell", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, comparator: integerComparator,
                    width: s=="s49"?450:s=="s50"?400:s=="s67"?370:s=="s75"?340:s=="s80"?290:s=="s90"?270:240,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },

            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    order: "06/03/2015",
                    settle: "06/03/2015",
                    stockBuy: "PPRO",
                    stockSell: "-",
                    amountBuy: "7,400,000",
                    amountSell: "-",
                },{
                    order: "06/03/2015",
                    settle: "06/03/2015",
                    stockBuy: "ADRO, JSMR",
                    stockSell: "-",
                    amountBuy: "4,400,000",
                    amountSell: "-",
                },{
                    order: "08/03/2015",
                    settle: "09/03/2015",
                    stockBuy: "UNVR",
                    stockSell: "BBNI",
                    amountBuy: "6,350,000",
                    amountSell: "12,500",
                },{
                    order: "",
                    settle: "",
                    stockBuy: "",
                    stockSell: "",
                    amountBuy: "",
                    amountSell: "",
                },{
                    order: "",
                    settle: "",
                    stockBuy: "",
                    stockSell: "",
                    amountBuy: "",
                    amountSell: "",
                },{
                    order: "",
                    settle: "",
                    stockBuy: "",
                    stockSell: "",
                    amountBuy: "",
                    amountSell: "",
                },{
                    order: "",
                    settle: "",
                    stockBuy: "",
                    stockSell: "",
                    amountBuy: "",
                    amountSell: "",
                },{
                    order: "",
                    settle: "",
                    stockBuy: "",
                    stockSell: "",
                    amountBuy: "",
                    amountSell: "",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-392 ag-theme-balham-dark ag-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
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
                <ModalBuy/>
            </>
        );
    }
}

class SellModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalSell/>
            </>
        );
    }
}

class PinModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'pinLanding'/>
            </>
        );
    }
}
function rupiahFormatter(params, decimalCount = 0, decimal = ".", thousands = ","){
       try {
           var amount = params.value;
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
}

class PortofolioAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        const self = this;
        const s = this.props.size;
        this.state = {
            activePage: 1,
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, resizable: true, comparator: stringComparator,
                    width: 80,
                    minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table text-left f-12 d-border-aggrid-right";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    valueFormatter: rupiahFormatter, comparator: integerComparator,
                    width: s=="s49"?165:s=="s50"?153:s=="s67"?150:s=="s75"?135:110, minWidth: 110,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?240:s=="s50"?225:s=="s67"?220:s=="s75"?154:110, minWidth: 110,comparator: integerComparator,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "lot", headerName: "Lot", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?125:s=="s50"?95:s=="s67"?80:s=="s75"?75:70, minWidth: 70,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "shares", headerName: "Shares", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?140:s=="s67"?130:100, minWidth: 100, comparator: integerComparator,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "stockval", headerName: "Stock Val", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?250:s=="s50"?225:s=="s67"?220:s=="s75"?190:s=="80"? 190:120, comparator: integerComparator,
                    minWidth: 120,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "pl", headerName: "P/L %", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?290:s=="s50"?260:s=="s67"?252:s=="s75"?220:s=="s80"?219:150, comparator: integerComparator,
                    minWidth: 150,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>';
                    }
                },
                { field: "remark", headerName: "Remark", sortable: false, resizable: true,
                    width: 100, minWidth: 100, comparator: stringComparator,
                    tooltip: (params) => {
                        var code = params.data.code;

                        if (code.includes('AALI') === true){
                            var toltp = 'Not yet submit annual financial report';
                        } else{
                            var toltp = 'Not Issue';
                        }

                        return toltp;
                    },
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var eDiv = document.createElement('div');

                        if (code.includes('AALI') === true){
                            eDiv.innerHTML = '<span>' +
                                '<i class="tolTipRemaks fa fa-info-circle text-danger" id="ptooltip1" data-tip="true" data-for="errorTooltip"></i>' +
                                '</span>';
                        } else {
                            eDiv.innerHTML = '<span>' +
                                '<i class="tolTipRemaks fa fa-info-circle text-info" id="ptooltip1" data-tip="true" data-for="infoTooltip"></i>' +
                                '</span>';
                        }

                        /*var bTooltip = eDiv.querySelectorAll('.tolTipRemaks')[0];
                        bTooltip.addEventListener('mouseover', function () {
                            return '<span></span>';
                        });*/

                        return eDiv;
                    }
                },
                { field: "action", headerName: "Action", sortable: false,
                    width: s=="s49"?180:s=="s50"?160:150, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table locked-col locked-visible d-border-aggrid-right text-center";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button>' +
                            '<button class="btn-cellsell btn btn-sm btn-success mx-1 f-9 w-50">Sell</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellsell')[0];

                        bButton.addEventListener('click', self.props.clickbuy);
                        sButton.addEventListener('click', self.props.clicksell);

                        return eDiv;
                    }, suppressSizeToFit: true
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { code: "AALI"+s,
                    avgprice: 125000,
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: 12650000,
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: 1529,
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: 152000,
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: "",
                    action:""   },
                { code: "ANTM",
                    avgprice: 1025,
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: 7125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: 12650,
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: 7125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: 12650,
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: 1526,
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: 1028,
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: 7125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },{ code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: "",
                    action:""   },
                { code: "ADHI",
                    avgprice: 1529,
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: 1027,
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: "",
                    action: ""},
                { code: "ASII",
                    avgprice: 7125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: 7125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: 7125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: 8125,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: 27400,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },{
                    code: "",
                    avgprice: "",
                    lastprice: "",
                    lot: "",
                    shares: "",
                    stockval: "",
                    pl: "",
                    remark: ""   ,
                    action:""
                },{
                    code: "",
                    avgprice: "",
                    lastprice: "",
                    lot: "",
                    shares: "",
                    stockval: "",
                    pl: "",
                    remark: ""   ,
                    action:""
                },{
                    code: "",
                    avgprice: "",
                    lastprice: "",
                    lot: "",
                    shares: "",
                    stockval: "",
                    pl: "",
                    remark: ""   ,
                    action:""
                },{
                    code: "",
                    avgprice: "",
                    lastprice: "",
                    lot: "",
                    shares: "",
                    stockval: "",
                    pl: "",
                    remark: ""   ,
                    action:""
                },{
                    code: "",
                    avgprice: "",
                    lastprice: "",
                    lot: "",
                    shares: "",
                    stockval: "",
                    pl: "",
                    remark: ""   ,
                    action:""
                }
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
                paginationtext.push(<button
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-487-pe ag-theme-balham-dark ag-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        rowHeight={32}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
                <div className={"text-center mt-0"}>
                    {pagination()}
                </div>
            </div>
        );
    }
}

class FixedIncomeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?100:s=="s50"?85:s=="s75"?80:56, minWidth: 56, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    }},
                { field: "serial", headerName: "Serial", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?185:s=="s50"?175:s=="s75"?170:130, minWidth: 130, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    },suppressSizeToFit: true},
                { field: "nominal", headerName: "Nominal (IDR)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?215:s=="s50"?185:s=="s67"?180:s=="s75"?160:150, minWidth: 150, comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table text-right f-12 d-border-aggrid-right";
                    }},
                { field: "coupon", headerName: "Coupon", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?205:s=="s50"?170:s=="s67"?164:s=="s75"?134:s=="s80"?123:90, comparator: stringComparator,
                    minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table text-right f-12 d-border-aggrid-right";
                    } },
                { field: "couponpdate", headerName: "Coupon Payment Date", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?225:s=="s50"?200:170, minWidth: 170, comparator: dateComparator,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    } },
                { field: "duedate", headerName: "Due Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?285:s=="s50"?255:s=="s67"?230:s=="s75"?170:s=="s80"?140:120, comparator: dateComparator,
                    minWidth: 120,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    } },
                { field: "detail", headerName: "Detail", resizable: true,
                    width: s=="s49"?190:s=="s50"?175:s=="s67"?170:s=="s75"?130:s=="s80"?100:80, minWidth: 80, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    },
                    cellRenderer : function (params) {
                        return '<i class="fa fa-search click-pointer text-danger"></i>'
                    } },
                { field: "action", headerName: "Action", width: 200, minWidth: 200,
                    pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center locked-col locked-visible d-border-aggrid-right";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Subscribe</button>' +
                            '<button class="btn-cellredemption btn btn-sm btn-primary mx-1 f-9 w-50">Redeem</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellredemption')[0];

                        /*bButton.addEventListener('click', function () {});
                        sButton.addEventListener('click', function () {});*/

                        return eDiv;
                    },suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { no: "1",
                    serial: "SUNMP15042019"+s,
                    nominal: "7,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 20 every month",
                    duedate: "02 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "2",
                    serial: "SUNMP16042019",
                    nominal: "5,000,000",
                    coupon: "7,0%",
                    couponpdate: "date 21 every month",
                    duedate: "03 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "3",
                    serial: "SUNMP17042019",
                    nominal: "2,000,000",
                    coupon: "5,0%",
                    couponpdate: "date 22 every month",
                    duedate: "04 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "4",
                    serial: "SUNMP18042019",
                    nominal: "6,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 23 every month",
                    duedate: "05 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "5",
                    serial: "SUNMP19042019",
                    nominal: "4,000,000",
                    coupon: "9,0%",
                    couponpdate: "date 24 every month",
                    duedate: "06 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "6",
                    serial: "SUNMP20042019",
                    nominal: "12,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 25 every month",
                    duedate: "07 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "7",
                    serial: "SUNMP21042019",
                    nominal: "10,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 26 every month",
                    duedate: "08 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "",
                    serial: "",
                    nominal: "",
                    coupon: "",
                    couponpdate: "",
                    duedate: "",
                    detail: "",
                    action: ""},
                { no: "",
                    serial: "",
                    nominal: "",
                    coupon: "",
                    couponpdate: "",
                    duedate: "",
                    detail: "",
                    action: ""},
                { no: "",
                    serial: "",
                    nominal: "",
                    coupon: "",
                    couponpdate: "",
                    duedate: "",
                    detail: "",
                    action: ""},
                { no: "",
                    serial: "",
                    nominal: "",
                    coupon: "",
                    couponpdate: "",
                    duedate: "",
                    detail: "",
                    action: ""},
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-487 ag-theme-balham-dark ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        rowHeight={32}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class MutualFundAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?330:s=="s50"?285:s=="s67"?270:s=="s75"?200:s=="s80"?140:120,
                    minWidth: 120,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var scode = code.split("-");

                        return '<span className="font-weight-bold">'+scode[0]+'</span>' +
                            '<br /><span>'+scode[1]+'</span>';
                    }, suppressSizeToFit: true },
                { field: "nav", headerName: "NAV", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    comparator: stringComparator, width: s=="s49"?200:s=="s50"?165:s=="s75"?158:130, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "navdate", headerName: "NAV Date", sortable: true, filter: "agTextColumnFilter",
                    comparator: dateComparator, resizable: true,
                    width: s=="s49"?195:s=="s50"?175:s=="s75"?155:140, minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "currency", headerName: "Currency", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, comparator: stringComparator,
                    width: s=="s49"?335:s=="s50"?300:s=="s67"?280:s=="s75"?260:s=="s90"? 200:s=="s80"?235:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }  },
                { field: "potentialpl", headerName: "Potential P/L", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, comparator: integerComparator,
                    width: s=="s49"?360:s=="s50"?330:s=="s67"?313:s=="s75"?285:s=="s80"? 250:s=="s90" ? 210:165,
                    minWidth: 165,
                    cellClass : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? 'grid-table d-border-aggrid-right text-right f-12 text-danger' :
                            'grid-table d-border-aggrid-right text-right f-12 text-success'
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            pl +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>';
                    } },
                { field: "action", headerName: "Action", sortable: false,
                    width: s=="s49"?200:s=="s50"?178:150, minWidth: 150,
                    pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right text-center f-12 locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Subscribe</button>' +
                            '<button class="btn-cellredemption btn btn-sm btn-primary mx-1 f-9 w-50">Redeem</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellredemption')[0];

                        /*bButton.addEventListener('click', function(){});
                        sButton.addEventListener('click', function(){});*/

                        return eDiv;
                    }, suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight: function (params) {
                return 40;
            },
            rowData: [
                { code: "000D7Q-RDPT BUMN Fund..."+s,
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "1,025",
                    navdate: "06/03/2019",
                    currency: "1,025,000",
                    potentialpl: "+250,660"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "7,125",
                    navdate: "06/03/2019",
                    currency: "7,125,000",
                    potentialpl: "+175"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+1,75%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
                { code: "",
                    nav: "",
                    navdate: "",
                    currency: "",
                    potentialpl: "",
                    action:""},
                { code: "",
                    nav: "",
                    navdate: "",
                    currency: "",
                    potentialpl: "",
                    action:""},
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-487 ag-theme-balham-dark ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class StockCashAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "codeTop", headerName: "", sortable: true, comparator: stringComparator,
                    filter: "agTextColumnFilter", resizable: true,
                    width: 85, minWidth: 85,
                    lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                    }, suppressSizeToFit: true, children: [{
                        field: "codeR", headerName: "Code", sortable: true, comparator: stringComparator,
                        resizable: true,
                        width: 85, minWidth: 85,
                        lockPosition: true, lockVisible: true,
                        cellClass : function (params) {
                            return " grid-table text-left f-12 locked-visible locked-col d-border-aggrid-right";
                        }, suppressSizeToFit: true
                    },]},
                { field: "avgpriceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 120, minWidth: 120, comparator: integerComparator,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "avgpriceR", headerName: "Avg. Price", comparator: integerComparator, sortable: true, filter: "agNumberColumnFilter", resizable: true,
                            width: s=="s49"?320:s=="s50"?315:s=="s67"?290:s=="s75"?220:s=="s80"?160:s=="s90"?130:120,
                            minWidth: 95,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "lastpriceTop", headerName: "", comparator: integerComparator, sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 100, minWidth: 100,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "lastpriceR", headerName: "Last Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                        width: s=="s49"?160:s=="s50"?150:s=="s75"?120:100, minWidth: 100,
                        cellClass : function (params) {
                            var pl = params.data.plR;
                            return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },
                    ],
                },
                { field: "port", headerName: "Portfolio", comparator: stringComparator, sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 160, minWidth: 160,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                    ,
                    children: [
                        { field: "plot", headerName: "Lot", comparator: stringComparator, sortable: true, filter: "agNumberColumnFilter", resizable: true,
                            width: 80, minWidth: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "pshares", headerName: "Shares", comparator: stringComparator, sortable: true, filter: "agNumberColumnFilter", resizable: true,
                            width: 80, minWidth: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },

                { field: "mktvalueTop", headerName: "", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 100, minWidth: 100, comparator: integerComparator,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    },children:[{ field: "mktvalueR", headerName: "Mkt. Val", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                        width: s=="s49"?270:s=="s50"?180:s=="s67"?150:s=="s75"?120:100, minWidth: 100,
                        cellClass : function (params) {
                            return " text-right grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },
                { field: "plTop", headerName: "", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 207, minWidth: 207, comparator: integerComparator,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "plR", headerName: "P/L", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                        width: s=="s49"?190:s=="s50"?180:s=="s67"?140:s=="s75"?130:s=="s80"?120:s=="s90"?110:100,
                        minWidth: 60, comparator: integerComparator,
                        cellClass : function (params) {
                            var pl = params.data.plR;
                            return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },
                { field: "persTop", headerName: "", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 207, minWidth: 207, comparator: integerComparator,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "persenR", headerName: "%", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                        width: s=="s49"?170:s=="s50"?140:s=="s67"?125:s=="s75"?155:s=="s80"?80:s=="s90"?70:60,
                        minWidth: 60, comparator: integerComparator,
                        cellClass : function (params) {
                            var pr = params.data.persenR;
                            return pr.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },


                { field: "sellable", headerName: "Sellable Balance", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 164, minWidth: 164, comparator: integerComparator,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 ";
                    }
                    ,
                    children: [
                        { field: "slot", headerName: "Lot", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                            width: 82, minWidth: 82, comparator: integerComparator,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "sshares", headerName: "Shares", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                            width: 82, minWidth: 82, comparator: integerComparator,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },
                { field: "lqValTop", headerName: "", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 98, minWidth: 98, comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },children:[{ field: "lqValR", headerName: "Lq. Val", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                        width: s=="s49"?220:s=="s50"?205:s=="s67"?190:s=="s75"?186:s=="s80"?160:s=="s90"?130:98,
                        minWidth: 98, comparator: integerComparator,
                        cellClass : function (params) {
                            return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },

                { field: "stockValTop", headerName: "", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 130, minWidth: 130, comparator: integerComparator,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },children:[ { field: "stockValR", headerName: "Stock Val (Avg.)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                        width: s=="s49"?260:s=="s50"?220:s=="s67"?195:s=="s75"?160:s=="s80"?180:130,
                        minWidth: 130,
                        cellClass : function (params) {
                            var pl = params.data.pl;
                            return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    }]
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { codeR: "AALI"+s,
                    avgpriceR: "12,650,000",
                    lastpriceR: "12,650,000",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240,999.00",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122"+s,
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "ADHI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "ANTM",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BBCA",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BBRI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BUMI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BBNI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "WSKT",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "UNIF",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "PPTP",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "SMRG",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "BNGA",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "UNIV",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
                    persenR: "-0,40",
                    slot: "12",
                    sshares: "122",
                    lqValR: "12,650"   ,
                    stockValR:"12,650,000"   },
                { codeR: "",
                    avgpriceR: "",
                    lastpriceR: "",
                    plot: "",
                    pshares: "",
                    mktvalueR: "",
                    plR: "",
                    persenR: "",
                    slot: "",
                    sshares: "",
                    lqValR: ""   ,
                    stockValR:""   },
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-305 ag-theme-balham-dark ag-bordered ag-header-gray table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TradeListAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?330:s=="s50"?300:s=="s67"?270:s=="s75"?260:s=="s80"?190:s=="s90"?145:s=="s100"?120:110, comparator: dateComparator,
                    minWidth: 114,
                    cellClass : function (params) {
                        return " grid-table text-left f-12 d-border-aggrid-right";
                    }, suppressSizeToFit: true
                },
                { field: "trade", headerName: "Trade#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?330:s=="s50"?300:s=="s67"?270:s=="s75"?260:s=="s80"?200:s=="s90"?150:s=="s100"?140:100,  comparator: stringComparator,
                    minWidth: 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?330:s=="s50"?310:s=="s67"?280:s=="s75"?270:s=="s80"?220:s=="s90"?160:s=="s100"?130:110, comparator: stringComparator,
                    minWidth: 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, resizable: true,
                    width: s=="s49"?270:s=="s50"?210:120, minWidth: 100, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-left grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?300:s=="s50"?285:s=="s67"?280:s=="s75"?270:s=="s80"?230:s=="s90"?160:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "mkt", headerName: "Mkt", sortable: true, resizable: true, comparator: stringComparator,
                    width: s=="s49"?160:s=="s50"?120:107, minWidth: 107,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?120:107, minWidth: 107,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: 150, minWidth: 150,  comparator: integerComparator,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?150:s=="s67"?140:120, minWidth: 120,  comparator: integerComparator,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?180:120, minWidth: 120,  comparator: stringComparator,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   date: "22/06/2019"+s,
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "AMEND",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "WITHDRAW",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },

                {   date: "22/06/2019",
                    trade: "0000002027",
                    order: "00162",
                    code: "AALI",
                    cmd: "BUY",
                    type: "day",
                    mkt: "RG",
                    vol: "1"   ,
                    price:"12650"  ,
                    amount:"1265000",
                    time:"11:22:17"
                },
                {   date: "",
                    trade: "",
                    order: "",
                    code: "",
                    cmd: "",
                    type: "",
                    mkt: "",
                    vol: ""   ,
                    price:""  ,
                    amount:"",
                    time:""
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-392 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class StockTransactionHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, comparator: dateComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?160:s=="s75"?150:s=="s80"?130:s=="s90"?100:s=="s100"?90:90,
                    minWidth: 100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                }, { field: "code", headerName: "Code", sortable: true, resizable: true,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?160:s=="s75"?150:s=="s80"?125:s=="s90"?105:s=="s100"?100:90,
                    minWidth: 90, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                },
                { field: "buySell", headerName: "Buy / Sell", sortable: true, resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?160:s=="s75"?145:s=="s80"?125:s=="s90"?115:s=="s100"?110:100,
                    minWidth: 90, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }, suppressSizeToFit: true
                },{ field: "inOut", headerName: "In/Out Qty", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?155:s=="s75"?145:s=="s80"?130:s=="s90"?115:s=="s100"?110:105,
                    minWidth: 105, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?160:s=="s75"?150:s=="s80"?130:s=="s90"?120:s=="s100"?120:110,
                    minWidth: 140, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "trx", headerName: "Trx Type", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?190:s=="s50"?180:s=="s67"?150:s=="s75"?140:s=="s80"?130:s=="s90"?110:s=="s100"?100:90,
                    minWidth: 90, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    date: "22/06/2019",
                    code: 'AALI'+s,
                    buySell: 'Buy',
                    inOut: '10',
                    trx: '-',
                }, {
                    date: "20/06/2019",
                    code: 'ABBA',
                    buySell: 'Sell',
                    inOut: '10',
                    trx: '-',
                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',
                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',
                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',
                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

                }, {
                    date: "",
                    code: '',
                    buySell: '',
                    inOut: '',
                    trx: '-',

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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-392-historical ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}
class CashTransactionHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?170:s=="s75"?160:s=="s80"?130:s=="s90"?110:s=="s100"?110:100,
                    minWidth: 100,
                    comparator: dateComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                }, { field: "debitCredit", headerName: "Debit / Credit", sortable: true, resizable: true,
                    width: s=="s49"?240:s=="s50"?225:s=="s67"?200:s=="s75"?190:s=="s80"?170:s=="s90"?145:s=="s100"?140:130,
                    minWidth: 130, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                },
                { field: "desc", headerName: "Description", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?280:s=="s50"?240:s=="s67"?210:s=="s75"?205:s=="s80"?180:s=="s90"?150:s=="s100"?140:130,
                    minWidth: 130, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }, suppressSizeToFit: true
                },{ field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?250:s=="s50"?225:s=="s67"?195:s=="s75"?190:s=="s80"?170:s=="s90"?145:s=="s100"?140:140,
                    minWidth: 140, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "trx", headerName: "Trx Type", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?160:s=="s75"?140:s=="s80"?120:s=="s90"?110:s=="s100"?100:90,
                    minWidth: 90, comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }
                }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    date: "22/06/2019",
                    debitCredit: "Debit",
                    desc: "",
                    amount: "34,500",
                    trx: "-",
                },{
                    date: "21/06/2019",
                    debitCredit: "Debit",
                    desc: "",
                    amount: "14,500",
                    trx: "-",
                },
                {
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
                },{
                    date: "",
                    debitCredit: "",
                    desc: "",
                    amount: "",
                    trx: "-",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-392-historical ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TransactionAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100,  comparator: dateComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                }, { field: "detail", headerName: "Detail", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100,  comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100,  comparator: integerComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }, suppressSizeToFit: true
                },{ field: "code", headerName: "Code", sortable: true,resizable: true,  comparator: stringComparator,
                    width: s=="s49"?130:s=="s50"?120:100,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "inOut", headerName: "In/Out Qty", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?140:s=="s50"?120:130,  comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "balA", headerName: "Bal. Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "balQ", headerName: "Bal. Qty", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "fee", headerName: "Fee", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "paidAmt", headerName: "Paid Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "penalty", headerName: "Penalty", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?180:s=="s50"?160:s=="s67"?155:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "add", headerName: "Add Outstanding", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?210:s=="s50"?190:s=="s67"?170:160,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "tradeAmt", headerName: "Trade Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?155:s=="s67"?135:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "wht", headerName: "WHT", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?155:s=="s67"?135:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "incomeTax", headerName: "Income Tax", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?140:130,  comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    date: "22/06/2019",
                    detail: "Buy TS",
                    amount: "34,500",
                    code: 'AALI',
                    inOut: '100',
                    balA: '82,232',
                    balQ: '200',
                    fee: '50',
                    paidAmt: '0',
                    penalty: '0',
                    add: '0',
                    tradeAmt: '23,111',
                    wht: '10',
                    incomeTax: '0',
                    price: '100',
                },{
                    date: "22/06/2019",
                    detail: "Sell TS",
                    amount: "34,500",
                    code: 'AALI',
                    inOut: '130',
                    balA: '88,232',
                    balQ: '10',
                    fee: '100',
                    paidAmt: '0',
                    penalty: '0',
                    add: '0',
                    tradeAmt: '21,111',
                    wht: '15',
                    incomeTax: '0',
                    price: '200',
                },{
                    date: "",
                    detail: "",
                    amount: "",
                    code: "",
                    inOut: "",
                    balA: "",
                    balQ: "",
                    fee: "",
                    paidAmt: "",
                    penalty: "",
                    add: "",
                    tradeAmt: "",
                    wht: "",
                    incomeTax: "",
                    price: "",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-392 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TransactionOrderHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100, minWidth: 100, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                }, { field: "marketNoC", headerName: "Market No", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100, minWidth: 100,comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }, suppressSizeToFit: true
                },
                { field: "code", headerName: "Code", sortable: true, resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100, minWidth:100,comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                },{ field: "cmd", headerName: "Cmd", sortable: true, resizable: true,
                    width: s=="s49"?130:s=="s50"?120:100, minWidth:100,comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "type", headerName: "Type", sortable: true, resizable: true,
                    width: s=="s49"?140:s=="s50"?120:130, minWidth:130,comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "mkt", headerName: "Mkt", sortable: true, resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130, minWidth: 130,comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130, minWidth:130,comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130, minWidth:130,comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "mvol", headerName: "M Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130, minWidth: 130,comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "mprice", headerName: "M Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?150:130, minWidth: 130,comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "leaveVolC", headerName: "Leave Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?180:s=="s50"?160:s=="s67"?155:130, minWidth:130,comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "status", headerName: "Status", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?210:s=="s50"?190:s=="s67"?170:160, minWidth:160,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?155:s=="s67"?135:130, minWidth:130,comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    },},
                { field: "rejectreason", headerName: "Reject Reason", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?155:s=="s67"?135:130, minWidth:130,comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    },},
                { field: "userOrderC", headerName: "User Order", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?140:130, minWidth:130,comparator: stringComparator,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    order: "0001",
                    marketNoC: "011",
                    code: 'AALI',
                    cmd: 'Buy',
                    type: 'Day',
                    mkt: 'RG',
                    vol: 100,
                    price: 12.000,
                    mvol: 100,
                    mprice: 1000,
                    leavelVolC: 0,
                    status: "Done",
                    time: '09:03:10',
                    rejectreason: '-',
                    userOrderC: '',
                },{
                    order: "0001",
                    marketNoC: "011",
                    code: 'AALI',
                    cmd: 'Buy',
                    type: 'Day',
                    mkt: 'RG',
                    vol: 120,
                    price: 12.000,
                    mvol: 100,
                    mprice: 1000,
                    leavelVolC: 0,
                    status: "Done",
                    time: '10:03:10',
                    rejectreason: '-',
                    userOrderC: '',
                },
                {
                    order: "",
                    marketNoC: "",
                    code: "",
                    cmd: "",
                    type: "",
                    mkt: "",
                    vol: "",
                    price: "",
                    mvol: "",
                    mprice: "",
                    leavelVolC: "",
                    status: "",
                    time: "",
                    rejectreason: "",
                    userOrderC: "",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-392 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class FundAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?230:s=="s50"?180:s=="s75"?100:90, minWidth: 90, comparator: dateComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                },{ field: "no", headerName: "No", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?250:s=="s50"?190:s=="s67"?170:s=="s75"?130:s=="s80"?120:60, comparator: integerComparator,
                    minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "amount", headerName: "Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?290:s=="s50"?210:s=="s67"?205:s=="s75"?195:s=="s80"?170:130, comparator: integerComparator,
                    minWidth: 115,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "fee", headerName: "Fee", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?325:s=="s50"?310:s=="s67"?300:s=="s75"?235:s=="s80"?195:s=="s90"?130:130, comparator: integerComparator,
                    minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "bank", headerName: "Bank", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?315:s=="s50"?310:s=="s67"?310:s=="s75"?260:s=="s80"?220:s=="s90"?185:180, comparator: stringComparator,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "bankAcNo", headerName: "Bank Ac No", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?315:s=="s50"?310:s=="s67"?300:s=="s75"?290:s=="s80"?230:s=="s90"?155:150, comparator: integerComparator,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "reqData", headerName: "Req Data", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s90"?195:s=="s75"?140:120, minWidth: 110, comparator: dateComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "reqTime", headerName: "Req Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s75"?140:120, minWidth: 110, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "status", headerName: "Status", sortable: true, resizable: true,
                    width: s=="s49"?210:s=="s50"?200:s=="s75"?170:160, minWidth: 160, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", width:100,
                    pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        var option = ""
                        if(params.status == "N"){
                            option = "disabled";
                        }
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="'+option+' btn-cellamend btn btn-sm btn-primary mx-1 f-9">Cancel</button>'+
                            '</span>';
                        var aButton = eDiv.querySelectorAll('.btn-cellamend')[0];

                        // kalo mau nambah action
                        // aButton.addEventListener('click', self.props.clickdetail);

                        return eDiv;
                    }, suppressSizeToFit: true
                },

            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function (params) {
                return 32;
            },
            rowData: [
                {
                    date: "22/06/2019"+s,
                    no: "12",
                    amount: '15,223',
                    fee: "0",
                    bank: "PT. BANK NIAGA Tbk.",
                    bankAcNo: "0236521346",
                    reqData: "01/07/2019",
                    reqTime: "09:30:21",
                    status:"Completing The Process",
                },{
                    date: "23/06/2019",
                    no: "13",
                    amount: '25,223',
                    fee: "19",
                    bank: "PT. BANK NIAGA Tbk.",
                    bankAcNo: "0236541346",
                    reqData: "03/07/2019",
                    reqTime: "19:30:21",
                    status:"Completing The Process",
                },{
                    date: "",
                    no: "",
                    amount: "",
                    fee: "",
                    bank: "",
                    bankAcNo: "",
                    reqData: "",
                    reqTime: "",
                    status:"N",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-381 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
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

class CancelGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const size = this.props.size;
        this.state = {
            columnDefs: [
                { field: "cw", headerName: "Cw#", sortable: true, filter: "agTextColumnFilter", resizable:
                        true, width: size=="s75"?190:84, minWidth: 84, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: size=='s90'?734:size == 's80'?836:size=='s75'?870:size=='s67'?846:size=='s50'?1397:644,
                    minWidth: 644,  comparator: integerComparator,
                    cellClass : function (params) {
                        return " text-right grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "fee", headerName: "Fee", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: size=='s90'?570:size == 's80'?644:size=='s75'?690:size=='s67'?956:size=='s50'?1041:515,
                    minWidth: 515, comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right  grid-table d-border-aggrid-right f-12";
                    }
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "Cwxx",
                    amount: "1,223,222",
                    fee: "0",
                }, {   cw: "",
                    amount: "",
                    fee: "",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-155 ag-theme-balham-dark ag-bordered table-bordered h-100 ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class CancelGrid2 extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const size = this.props.size;
        this.state = {
            columnDefs: [
                { field: "cw", headerName: "Cw #", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s75"?230:100, minWidth:100, comparator: stringComparator,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "requestdate", headerName: "Request Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s90"?319:size=="s80"?363:size=="s75"?375:size=="s67"?442:size=="s50"?603:283,
                    minWidth: 283,  comparator: dateComparator,
                    cellClass : function (params) {
                        return " text-left grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "transferdate", headerName: "Transfer Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s90"?321:size=="s80"?366:size=="s75"?380:size=="s67"?447:size=="s50"?610:285,
                    minWidth: 285,  comparator: dateComparator,
                    cellClass : function (params) {
                        return "text-left  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: size=="s90"?321:size=="s80"?366:size=="s75"?380:size=="s67"?447:size=="s50"?610:304,
                    minWidth: 304, comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right  grid-table d-border-aggrid-right f-12";
                    }
                },

                { field: "fee", headerName: "Fee", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: size=="s90"?326:size=="s80"?370:size=="s75"?380:size=="s67"?448:size=="s50"?599:269,
                    comparator: integerComparator,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {   cw: "CWxx",
                    requestdate: "1/12/2018",
                    transferdate: "10/12/2018",
                    amount: "1,223,333",
                    fee:"0",
                }, {   cw: "CWxx",
                    requestdate: "1/12/2018",
                    transferdate: "10/12/2018",
                    amount: "1,223,333",
                    fee:"0",
                }, {   cw: "CWxx",
                    requestdate: "1/12/2018",
                    transferdate: "10/12/2018",
                    amount: "1,223,333",
                    fee:"0",
                }, {   cw: "",
                    requestdate: "",
                    transferdate: "",
                    amount: "",
                    fee:"",
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={"card-220 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                        marginTop: "30px"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class VerifyPINPortofolio extends React.PureComponent{
    constructor(props){
        super(props);
    }

    state = {
        value: "",
        visible:false
    }

    onChange = value =>{
        this.setState({ value });
    };


    onClickSubmit = (e) => {
        if(this.state.value.length >= '6'){
            if(this.state.value === '123456') {
                $("#pinPortofolio").removeClass("d-block");
                $("#pinPortofolio").addClass("d-none");
                $("#detailPortofolio").addClass("d-block");
                $("#detailPortofolio").removeClass("d-none");

                $("#contentPinStockCash").removeClass("d-none");
                $("#contentPinStockCash").addClass("d-block");

                $("#verifyPinStockCash").removeClass("d-block");
                $("#verifyPinStockCash").addClass("d-none");

                $("#FundPin").addClass("d-none");
                $("#ContentFund").removeClass("d-none");
                $("#ContentFund").addClass("d-block");


            } else{
                var visible = true;
                this.setState({ visible });
            }
        }
    };

    onClickCloseAlert = (e) => {
        var visible = false;
        var value = "";
        this.setState({ visible });
        this.pin.clear();
        this.setState({ value });
    };

    forgotPIN = (e) =>{
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">DX TRADE</h1></div>,
            contentClass: ForgotPINPModal,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    componentDidMount(){
        //this.pin.clear();
        $(".pincode-input-text").on('keypress',function(e) {
            if(e.which == 13) {
                $("#pin-click").click();
            }
        });
    }
    buttonClickPin = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                {/*<i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i>*/}</div>,
            size: 'mini',
            contentClass: PinModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    render(){
        const {value} = this.state;
        return(
            <>
                <AppFrameAction ref="frameAction" />

                <div className={`text-white f-12 ${(this.props.pos == "portofolio") ? 'p-pinportofolio' : 'p-pinlanding' }`} style={{ paddingTop: "60px"}}>
                    <div className="card-334 pt-5 mt-5">
                        <div className="text-center align-self-center align-middle mb-3">
                            <div className="d-border-bold img-round-icon">
                                <i className="icofont icofont-lock icofont-4x"></i>
                            </div>
                        </div>

                        <div className="form-group text-center pt-2 mb-3">
                            <label className="col-sm-12 px-5 py-1 col-form-label f-16 font-weight-bold mb-2">PLEASE INPUT PIN</label>
                            <label className="col-sm-12 px-5 py-1 col-form-label">
                                &nbsp;
                            </label>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={() => this.buttonClickPin()}
                                id="pin-click" type="submit" className={'btn btn-danger form-control py-0 col-md-3'}>
                                INPUT PIN
                            </button>
                        </div>
                    </div>

                    <div className={this.state.visible ? "col-sm-12 text-center bg-danger fade-in" : "col-sm-12 text-center bg-danger fade-out"}>
                        <div className={/*{cssmode == 'night'? */"px-2 pt-2 text-right text-white" /*: "px-2 pt-2 text-right text-black"*/}><i className="click-pointer icofont icofont-close" onClick={this.onClickCloseAlert}></i></div>
                        <div className={/*cssmode == 'night'? */"px-2 py-4 text-white" /*: "px-2 py-4 text-black"*/}>
                            PIN is wrong!
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class ForgotPINPModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="f-12">
                <AppFrameAction ref="frameAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding">Forgot PIN</label>
                <div className="text-white">
                    <div className="form-group">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                            send link to reset your PIN
                        </label>
                    </div>
                    <div className="form-group mb-0">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Email</label>
                        <div className="col-sm-12 px-5 py-0">
                            <input type="email" className="text-white input-login col-sm-12"/>
                        </div>
                    </div>

                    <div className="form-group py-3">
                        <div className="justify-content-center align-items-center d-flex py-0 px-5">
                            <button type="submit" className="btn btn-primary form-control py-0">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="form-group text-center">
                        <label className="col-sm-12 px-5 py-2 col-form-label">
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Verify PIN</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

const LandingPage = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
        stateLanding:vars.stateLanding,
        changeStateLanding : (stateLanding) => {actions.sendAction('changeStateLanding', {stateLanding})}
    })
)(LandingPage_Base);

const StockCash = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(StockCash_Base);

const TradeListHistory = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(TradeListHistory_Base);

const FundTransfer = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
        sizeType: vars.sizeType,
    })
)(FundTransfer_Base);

const InquryAccount = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(InquryAccount_Base);

export default Landing;
export { CustomFrameHeaderLanding, LandingPage,
    StockCash,
    TradeListHistory,
    FundTransfer,
    InquryAccount,
    tcAndSoa,
    VerifyPINPortofolio,
};
