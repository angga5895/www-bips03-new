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

const CustomFrameHeaderLanding = (props) =>{
    return (
        <div>
            <div className="row col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab treeName="/landingPage" linkTitles={
                        {
                            landingPageInvboard: 'INVESTMENT BOARD',
                            stockCashPageInvboard: 'STOCK & CASH',
                            tradeListHistoryPageInvboard: 'HISTORICALS',
                            fundTransferPageInvboard: 'FUND TRANSFER',
                            inquryAccountPageInvboard: 'ACCOUNT INFO',
                            InvboardTcAndSoe: 'TC & SOE',
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

  render () {
    return (
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
        var props = this.props;
        $('#pieChart').css('height', '100%');

        // create data
        var data = [
            {x: "Portfolio Equity", value: 207166 },
            {x: "Pawnshop", value: 78662 },
            {x: "Fixed Income", value: 148662 },
            {x: "Mutual Fund", value: 142163 },
        ];

        var chart = anychart.pie(data);

        anychart.onDocumentReady(function () {
            createpie();
        });


        function createpie() {
            // create a chart and set the data
            // set the position of the legend
            chart.legend().position("bottom");

            // set the alignment of the legend
            chart.legend().align("center");

            // set the layout of the legend
            chart.legend().itemsLayout("vertical-expandable");

            // set the explosion range in different states
            /*chart.selected().explode("3%");
            chart.hovered().explode("3%");*/
            // configure outlines
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
                        chart.unselect([1,2,3]);
                    } else {
                        chart.unselect([1,2,3]);
                        chart.select(0);
                    }
                } else if (points === 1){
                    props.changeStateLanding('1');
                    if (e.point.selected()) {
                        chart.unselect([0,2,3]);
                    } else {
                        chart.unselect([0,2,3]);
                        chart.select(1);
                    }
                } else if (points === 2){
                    props.changeStateLanding('2');
                    if (e.point.selected()) {
                        chart.unselect([0,1,3]);
                    } else {
                        chart.unselect([0,1,3]);
                        chart.select(2);
                    }
                } else if (points === 3){
                    props.changeStateLanding('3');
                    if (e.point.selected()) {
                        chart.unselect([0,1,2]);
                    } else {
                        chart.unselect([0,1,2]);
                        chart.select(3);
                    }
                }
            });

            chart.legend().listen("legendItemClick", function(e) {
                var legend = e.itemIndex;
                // Set disturber.
                chart.select([4]);
                if (legend === 0){
                    props.changeStateLanding('0');
                    chart.unselect([1,2,3]);
                } else if (legend === 1){
                    props.changeStateLanding('1');
                    chart.unselect([0,2,3]);
                } else if (legend === 2){
                    props.changeStateLanding('2');
                    chart.unselect([0,1,3]);
                } else if (legend === 3){
                    props.changeStateLanding('3');
                    chart.unselect([0,1,2]);
                }
            });

            /*chart.unselect([1,2,3]);
            chart.select(0);*/

            // set the container id
            chart.container("pieChart");

            // initiate drawing the chart
            chart.draw();
        }
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

    buttonClickAmend = (e) => {
        this.refs.frameActions.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameActions.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameActions.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
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
        }else if(window.innerWidth > 2045 && window.innerWidth < 2700){
            return "s67";
        }else if(window.innerWidth > 2701){
            return "s50";
        }else{
            return "s100";
        }
    }
    render() {
        return (
            <div className="container-fluid px-0 bg-black-trading">
                <div className="card-527 col-sm-12 px-0 mx-0 row">
                    <div id="pieChart" className="col-sm-4 px-0"></div>
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
                                                <div className="col-sm-4 px-4 mx-0 f-14">
                                                    Stock Val : <span className="text-primary">15,234,000</span>
                                                </div>
                                                <div className="col-sm-4 px-4 mx-0 f-14">
                                                    P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <PortofolioAgGrid size={this.ceksize()} gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '1' ? 'block' : 'none'}}>
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
                                </div>
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '2' ? 'block' : 'none'}}>
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
                                <div className="container px-0 mx-0 col-sm-12" style={{display : this.props.stateLanding === '3' ? 'block' : 'none'}}>
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
                                    <li className="list-group-item-portofolio">Cash Ballance T+2 <br/><span className="text-primary pull-right">4,500,000</span></li>
                                    <li className="list-group-item-portofolio">Buy Limit <br/><span className="pull-right">15,980,000</span></li>
                                    <li className="list-group-item-portofolio">Stock Value <br/><span className="pull-right">15,234,000</span></li>
                                    <li className="list-group-item-portofolio">Unsettled Amt <br/><span className="pull-right">?</span></li>
                                    <li className="list-group-item-portofolio">Mkt. Value <br/><span className="pull-right">4,400,000</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-10 px-0">
                            <div className="col-sm-12 px-0">
                                <StockCashAgGrid size={this.ceksize()}/>
                            </div>
                            <div className="col-sm-12 card-221 px-0">
                                <p className="text-left mt-3 mb-0 h-17">Settlement</p>
                                <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless mb-0 card-194">
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Date</td>
                                        <td className="d-border-tr-gray-all py-2">22/6/2019</td>
                                        <td className="d-border-tr-gray-all py-2">23/6/2019</td>
                                        <td className="d-border-tr-gray-all py-2">24/6/2019</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Receiveable</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Payable</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">1,411,168</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Tax + Fee</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">-30</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Penalty</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Settlement Amount</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                        <td className="d-border-tr-gray-all text-right py-2">- 1,411,168</td>
                                        <td className="d-border-tr-gray-all text-right py-2">0</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-2">Cash Balance</td>
                                        <td className="d-border-tr-gray-all text-right py-2">5,911,198</td>
                                        <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
                                        <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
                                    </tr>
                                    <tr className="d-border-footer">
                                        <td className="no-wrap bg-gray-tradding d-border-tr-gray py-2">Total</td>
                                        <td className="d-border-tr-gray-all text-right py-2">5,911,198</td>
                                        <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
                                        <td className="d-border-tr-gray-all text-right py-2">4,500,000</td>
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
                <div className="container-fluid pl-0 pr-0 f-12">
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        {/*<div className="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>*/}
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">

                                <table>
                                    <tr>
                                        <td>
                                            <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                <span className="input-group-addon h-35">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                                <span className="input-group-addon h-35">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        <TradeListAgGrid size={this.ceksize()}/>
                    </div>

                </div>
            </>
        );
    }
}
//aaa
class ModalTransaction extends React.Component {
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterangeTransaction').datepicker({
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
                    <div className="col-sm-12 row px-0 mx-0 d-border-bottom" style={paddingParagraphBottom}>
                        {/*<div className="col-sm-3">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>*/}
                        <div className="col-sm-12 h-62">
                            <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">

                                <table>
                                    <tr>
                                        <td>
                                            <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                <span className="input-group-addon h-35">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                                <span className="input-group-addon h-35">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                        <span className="fa fa-calendar-alt"></span>
                                                                    </span>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
                                        </td>
                                    </tr>
                                </table>



                            </div>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
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
            $('.input-daterangeTransaction').datepicker({
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

            // Zaky Update
            $('#datepickerTest').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/2000',
                autoclose: true,
                todayBtn: "linked",
            });
        });
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
    buttonClickPIN = (e) => {
        console.log('clicked');
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i
                    className="icofont icofont-close text-icofont-close text-border click-pointer"
                    onClick={this.closeClick}></i></div>,
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
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; FUND TRANSFER</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; F/T LIST</span></a></li>
                                <li className={ this.state.activeTab === '3' ? 'active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; Cancel</span></a></li>
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
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black text-center">//</td>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black text-center">//</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md">
                                            <div>Bank Information</div>
                                            <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Account No</td>
                                                    <td className="d-border-tr-gray-all text-right py-1">0640110945186</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Account Name</td>
                                                    <td className="d-border-tr-gray-all text-right py-1">Mr. Mario Surya Saputra</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Bank Name</td>
                                                    <td className="d-border-tr-gray-all text-right py-1"> PT. Bank Niaga Tbk.</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Branch Name</td>
                                                    <td className="d-border-tr-gray-all text-right py-1">Bahana Sekuritas</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="p-2">If the above bank Information is wrong, please contact our call center at 14099 or by website www.directtrading.co.id</div>
                                        <div className="d-border">
                                            <div className="col-md-12 p-3">
                                                <div className="row p-3">
                                                    <div className="col-md-2">
                                                        Amount (Not Including Fee)
                                                    </div>
                                                    <div className="col-md-1">
                                                        IDR
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                    <div className="col-md-2">
                                                        Withdrawable Amount
                                                    </div>
                                                    <div className="col-md-1">
                                                        IDR
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input readonly defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    </div>
                                                </div> <div className="row p-3">
                                                <div className="col-md-2">
                                                    Transfer Date (T1/T2)
                                                </div>
                                                <div className="col-md-1">

                                                </div>
                                                <div className="col-md-3 ui input" style={{paddingRight:'53px'}}>
                                                    <Input placeholder='dd/mm/yy' size='small' id="datepickerTest" className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>
                                                    <span className="input-group-addon h-35 no-border-radius" style={{width: '100%'}}><span
                                                        className="fa fa-calendar-alt"></span></span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 p-5">
                                                <input className="magic-checkbox" type="checkbox" name="viaRTGS" id="viaRTGS" value="option"/>
                                                <label for="viaRTGS" className="text-white f-12-center">
                                                    Via RTGS (The above amount is more than IDR 100,000,000)
                                                </label>
                                            </div>
                                            <div className={"col-sm-12 text-right mb-0 px-3 h-40"}>
                                                <button onClick={this.buttonClickPIN} className={"btn btn-primary"}><i className={"fa fa-paper-plane"}>&nbsp;Send</i></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom mb-3">
                                        <div className="form-group mb-3 px-0">
                                            <div className="col-sm-9 pl-0 h-62">
                                                <div className="ui small input col-sm-8 f-12 text-center align-self-center black ver-center">
                                                    {/* <Input type="text" /> */}
                                                    {/* Update Zaky */}
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <div className="input-group input-daterange input-daterangestock h-35" style={{"z-index":0}}>
                                                                    <span className="input-group-addon h-35">Periode</span>
                                                                    <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                                    <span className="input-group-addon h-35">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                                    <span className="input-group-addon h-35">to</span>
                                                                    <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                                    <span className="input-group-addon h-35">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button type="submit" className="btn btn-md btn-block btn-default btn-dark btnDatePick">Go</button>
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
                            <div className={this.state.activeTab === '3' ? 'd-block f-12' : 'd-none'}>
                                <div className="col-sm-12 py-0 px-0 mb-0 h-62">
                                    <div className="row stockcash-header" style={imgUser}>
                                        <div className="col-md-12" style={imgdisplay}>
                                            <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-border-transparent-grey">
                                    <div className="d-border-bottom" style={{marginBottom : "10px"}}>
                                        <div className="form-group px-0" style={{marginBottom : "10px"}}>
                                            <CancelGrid size={this.ceksize()}/>
                                            <CancelGrid2 size={this.ceksize()}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-sm-12 text-right mb-0 px-3 h-40"}>
                                    <button onClick={this.buttonClickPIN} className={"btn btn-primary"}><i className={"fa fa-paper-plane"}>&nbsp;Send</i></button>
                                </div>
                            </div>
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


                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="col-sm-12 px-0" style={paddingParagraph}>
                        {/* <PortofolioAgGrid/> */}
                        <div className="cssmenu col-sm-6 mx-0 px-0 h-45">
                            <ul className={"d-border-top d-border-left d-border-right"}>
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Account Infromation</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Contact Information</span></a></li>
                                <li className={ this.state.activeTab === '3' ? 'active click-pointer col-sm-4 px-0 mx-0 f-12 text-center' : 'text-white click-pointer col-sm-4 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('3'); }}><a><span className="f-11">&nbsp; RDI Bank Information</span></a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 px-4 pb-0 bg-grey bg-black-trading pt-0 d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0" style={{ paddingTop : "10px" }}>
                                    <div className="row">
                                        <div className={"col-sm-6 pl-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-448"}>
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
                                                    <td className={"d-border"}>User ID</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>A/C Status Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID Type</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>ID Expire Date</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Customer Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Country</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Mother's Name</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Sub Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Job</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Opening Date</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>A/C Closing Date</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Opening Branch</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-sm-6 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive mb-0 card-448"}>

                                                <tr>
                                                    <td width="50%" className={"d-border"} >Withholding Tax</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>

                                                <tr>
                                                    <td className={"d-border"}>Dividend Tax</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Commission Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Bank Code</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Account No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Account Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Auto Transfer</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Virtual Account No</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Penalty Type</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>No. of PIN Error</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>PIN Code Initialize</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Managing Branch</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Tax Rate</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Initial Deposit Amount</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Order Permit</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
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
                                                    <td className={"d-border"}>Marriage</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Spouse's Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Manager</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Recommender</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                            </table>
                                            <table className={"table table-borderder table-responsive card-113"}>
                                                <tr>
                                                    <td className={"d-border text-center td-bluelight"}>Item</td>
                                                    <td className={"d-border text-center td-bluelight"}>Tel No</td>
                                                    <td className={"d-border text-center td-bluelight"}>Fax No</td>
                                                </tr>
                                                <tr className={"even-td hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                                <tr className={"even-td hover-tables"}>
                                                    <td className={"d-border"}>&nbsp;</td>
                                                    <td className={"d-border"}></td>
                                                    <td className={"d-border"}></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className={"col-sm-6 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive card-281"}>

                                                <tr>
                                                    <td width="50%" className={"d-border"} >Position</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>

                                                <tr>
                                                    <td className={"d-border"}>Company Name</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Company Officer</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Company Type</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Interest Type</td>
                                                    <td width="50%" className={"d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Affiliatied Co</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>Unknown Addr/Phone</td>
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

                                            </table>
                                        </div>
                                        <div className={"col-sm-12 px-0"}>
                                            <table className={"table table-borderder table-responsive card-113"}>
                                                <tr>
                                                    <td className={"d-border text-center td-bluelight"}>Item</td>
                                                    <td className={"d-border text-center td-bluelight"}>Pos No</td>
                                                    <td className={"d-border text-center td-bluelight"}>Address</td>
                                                    <td className={"d-border text-center td-bluelight"} width="50%">Address1</td>
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
                            <div className={this.state.activeTab === '3' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 pt-3">
                                    <div className="row">
                                        <div className={"col-sm-12 pl-0 pr-0"}>
                                            <table width="100%" className={"table table-bordered table-responsive"}>
                                                <tr>
                                                    <td className={"d-border"}>RDI Bank</td>
                                                    <td width="50%" className={"d-border hover-tables"}>928237217312</td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Account Number</td>
                                                    <td width="50%" className={"even-td d-border hover-tables"}></td>
                                                </tr>
                                                <tr>
                                                    <td className={"d-border"}>RDI Account Name</td>
                                                    <td width="50%" className={"d-border hover-tables"} ></td>
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
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Trade List History</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Transaction History</span></a></li>
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
                                    <ModalTransaction/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

//initcandsoe
class tcAndSoe extends React.PureComponent {
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
                                <li className={ this.state.activeTab === '1' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Trade Control</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-right active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-right text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Soe</span></a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 px-0 py-0 mx-0 my-0 bg-grey bg-black-trading d-border card-472">

                            <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <TradeControlPage/>
                                </div>
                            </div>
                            <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                <div className="container-fluid mx-0 px-0 my-0 mx-0 py-0" style={{ paddingTop : "10px" }}>
                                    <SoePage/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class SoePage extends React.PureComponent{
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
                                                <span className="input-group-addon h-35">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                <span className="input-group-addon h-35">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
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
                        {/*/!*<TradeControlPageAgGrid />*!/*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }

}
class TradeControlPage extends React.PureComponent{
    constructor(props) {
        super(props);

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
                                                <span className="input-group-addon h-35">Periode</span>
                                                <input placeholder="dd/mm/yyyy" id="startDateFirst" name="startDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
                                                                    <span className="fa fa-calendar-alt"></span>
                                                                </span>
                                                <span className="input-group-addon h-35">to</span>
                                                <input placeholder="dd/mm/yyyy" id="endDateFirst" name="endDate1" type="text" className="form-control date-clear h-35" readOnly="readonly" />
                                                <span className="input-group-addon h-35">
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
                            <TradeControlPageAgGrid size={this.ceksize()}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class TradeControlPageAgGrid extends React.PureComponent{
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "order", headerName: "Order Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    },
                },
                { field: "settle", headerName: "Settlement Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?288:s=="s90"?240:220,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "stockBuy", headerName: "Stock Buy", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?290:s=="s90"?245:210,
                    cellClass : function (params) {
                        return " text-left grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "stockSell", headerName: "Stock Sell", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?290:s=="s90"?245:210,
                    cellClass : function (params) {
                        return " text-left grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "amountBuy", headerName: "Amount Buy", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?290:s=="s90"?270:240,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "amountSell", headerName: "Amount Sell", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?290:s=="s90"?270:240,
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

class PortofolioAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = this.props.size;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 80,
                    minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 110, minWidth: 110,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 110, minWidth: 110,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "lot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 70, minWidth: 70,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "shares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 100, minWidth: 100,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "stockval", headerName: "Stock Val", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?190:s=="80"? 190:120,
                    minWidth: 120,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },
                },
                { field: "pl", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?220:s=="s80"?219:150,
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
                    width: 100, minWidth: 100,
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
                    width: 150, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table locked-col locked-visible d-border-aggrid-right";
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
                { code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: "",
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
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
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: "",
                    action: ""},
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
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
                    className={"card-487 ag-theme-balham-dark ag-bordered ag-striped-odd"}
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

class FixedIncomeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, filter: "agTextColumnFilter",
                    width: 56,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    }},
                { field: "serial", headerName: "Serial", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 130, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    },suppressSizeToFit: true},
                { field: "nominal", headerName: "Nominal (IDR)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 150, minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table text-right f-12 d-border-aggrid-right";
                    }},
                { field: "coupon", headerName: "Coupon", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?134:s=="s80"?123:90,
                    minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table text-right f-12 d-border-aggrid-right";
                    } },
                { field: "couponpdate", headerName: "Coupon Payment Date", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: 170, minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    } },
                { field: "duedate", headerName: "Due Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?170:s=="s80"?140:120,
                    minWidth: 120,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 d-border-aggrid-right";
                    } },
                { field: "detail", headerName: "Detail", resizable: true,
                    width: s=="s75"?130:s=="s80"?100:80, minWidth: 80,
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
                    serial: "SUNMP15042019",
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
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?183:s=="s80"?158:120,
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
                { field: "nav", headerName: "NAV", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 130, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "navdate", headerName: "NAV Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 140, minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "currency", headerName: "Currency", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?250:s=="s90"? 200:s=="s80"?240:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }  },
                { field: "potentialpl", headerName: "Potential P/L", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?285:s=="s80"? 250:s=="s90" ? 210:165,
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
                    width: 150, minWidth: 150,
                    pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 locked-col locked-visible";
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
                { field: "codeTop", headerName: "", sortable: true,
                    filter: "agTextColumnFilter", resizable: true,
                    width: 85, minWidth: 100,
                    lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                    }, suppressSizeToFit: true, children: [{
                        field: "codeR", headerName: "Code", sortable: true,
                        filter: "agTextColumnFilter", resizable: true,
                        width: 85,
                        lockPosition: true, lockVisible: true,
                        cellClass : function (params) {
                            return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                        }, suppressSizeToFit: true
                    },]},
                { field: "avgpriceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 95,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "avgpriceR", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: s=="s50"?420:s=="s67"?310:s=="s75"?260:s=="s80"?220:s=="s90"?150:95,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "lastpriceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "lastpriceR", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: s=="s50"?310:100,
                        cellClass : function (params) {
                            var pl = params.data.plR;
                            return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right" :
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },
                    ],
                },
                { field: "port", headerName: "Portofolio", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 160,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                    ,
                    children: [
                        { field: "plot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "pshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },

                { field: "mktvalueTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    },children:[{ field: "mktvalueR", headerName: "Mkt. Val", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: s=="s50"?250:s=="s67"?150:100,
                        cellClass : function (params) {
                            return " text-right grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },
                { field: "plTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "plR", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: s=="s50"?152:s=="s67"?125:s=="s75"?105:s=="s80"?80:s=="s90"?70:60,
                        cellClass : function (params) {
                            var pl = params.data.plR;
                            return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },
                { field: "persTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                            "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    }, children: [{ field: "persenR", headerName: "%", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: s=="s50"?152:s=="s67"?125:s=="s75"?105:s=="s80"?80:s=="s90"?70:60,
                        cellClass : function (params) {
                            var pr = params.data.persenR;
                            return pr.includes('-') === true ? "text-danger text-right  grid-table f-12 d-border-aggrid-right":
                                "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },


                { field: "sellable", headerName: "Sellable Balance", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 164,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 ";
                    }
                    ,
                    children: [
                        { field: "slot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 82,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "sshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 82,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },
                { field: "lqValTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 98,
                    cellClass : function (params) {
                        return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },children:[{ field: "lqValR", headerName: "Lq. Val", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: s=="s50"?210:s=="s67"?190:s=="s75"?186:s=="s80"?160:s=="s90"?150:98,
                        cellClass : function (params) {
                            return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                        }
                    },]
                },

                { field: "stockValTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 130,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return "text-success text-right  grid-table f-12 d-border-aggrid-right";
                    },children:[ { field: "stockValR", headerName: "Stock Val (Avg.)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: s=="s50"?230:s=="s67"?195:s=="s75"?160:s=="s80"?180:130,
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
                { codeR: "AALI",
                    avgpriceR: "12,650",
                    lastpriceR: "12,650",
                    plot: "12",
                    pshares: "122",
                    mktvalueR: "12,650,000",
                    plR: "-60,240",
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
                    width: s=="s50"?310:s=="s67"?270:s=="s75"?250:s=="s80"?240:s=="s90"?180:114,
                    cellClass : function (params) {
                        return " grid-table text-left f-12 d-border-aggrid-right";
                    }, suppressSizeToFit: true
                },
                { field: "trade", headerName: "Trade#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?310:s=="s67"?250:s=="s75"?235:s=="s80"?230:s=="s90"?160:100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },{ field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?310:s=="s67"?250:s=="s75"?235:s=="s80"?230:s=="s90"?160:100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?250:100,
                    cellClass : function (params) {
                        return "text-center text-primary grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?330:s=="s67"?270:s=="s75"?255:s=="s80"?250:s=="s90"?150:147,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?235:s=="s67"?150:s=="s75"?143:s=="s80"?140:107,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "mkt", headerName: "Mkt", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?230:107,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?230:107,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 150,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?250:s=="s67"?175:120,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?250:s=="s67"?175:120,
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
                    className={"card-375 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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
                    width: s=="s50"?150:100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                }, { field: "detail", headerName: "Detail", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }, suppressSizeToFit: true
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }, suppressSizeToFit: true
                },{ field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?130:100,
                    cellClass : function (params) {
                        return "text-center text-primary grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "inOut", headerName: "In/Out Qty", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "balA", headerName: "Bal. Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "balQ", headerName: "Bal. Qty", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?100:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "paidAmt", headerName: "Paid Amt", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "penalty", headerName: "Penalty", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "add", headerName: "Add Outstanding", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "tradeAmt", headerName: "Trade Amt", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "wht", headerName: "Wht", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12";
                    },},
                { field: "incomeTax", headerName: "Income Tax", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s50"?150:130,
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
                    className={"card-375 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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
                    width: 150, minWidth: 130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }, suppressSizeToFit: true
                },{ field: "no", headerName: "No", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?150:s=="s80"?110:100,
                    minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?180:s=="s90"?160:130,
                    minWidth: 115,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?230:s=="s90"?190:130,
                    minWidth: 115,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "bank", headerName: "Bank", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?330:s=="s80"?280:s=="s90"?200:150,
                    minWidth: 115,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "bankAcNo", headerName: "Bank Ac No", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s80"?280:s=="s90"?210:170,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "reqData", headerName: "Req Data", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 120, minWidth: 110,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "reqTime", headerName: "Req Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 120, minWidth: 110,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "status", headerName: "Status", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 160, minWidth: 160,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },

            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    date: "22/06/2019",
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
                { field: "cw", headerName: "Cw#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 84, minWidth: 84,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=='s90'?734:size == 's80'?836:size=='s75'?898:size=='s67'?846:size=='s50'?1397:644,
                    cellClass : function (params) {
                        return " text-right grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=='s90'?570:size == 's80'?644:size=='s75'?690:size=='s67'?956:size=='s50'?1041:515,
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
                    width: 100,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "requestdate", headerName: "Request Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s90"?319:size=="s80"?363:size=="s75"?389:size=="s67"?442:size=="s50"?603:283,
                    cellClass : function (params) {
                        return " text-center grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "transferdate", headerName: "Transfer Date", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s90"?321:size=="s80"?366:size=="s75"?393:size=="s67"?447:size=="s50"?610:285,
                    cellClass : function (params) {
                        return "text-center  grid-table d-border-aggrid-right f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s90"?321:size=="s80"?366:size=="s75"?393:size=="s67"?447:size=="s50"?610:304,
                    cellClass : function (params) {
                        return "text-right  grid-table d-border-aggrid-right f-12";
                    }
                },

                { field: "fee", headerName: "Fee", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: size=="s90"?326:size=="s80"?370:size=="s75"?398:size=="s67"?448:size=="s50"?599:269,
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
                    className={"card-155 ag-theme-balham-dark ag-bordered table-bordered ag-striped-odd"}
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
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">BIPS</h1></div>,
            contentClass: ForgotPINPModal,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    componentDidMount(){
        this.pin.clear();
        $(".pincode-input-text").on('keypress',function(e) {
            if(e.which == 13) {
                $("#pin-click").click();
            }
        });
    }

    render(){
        const {value} = this.state;
        return(
            <>
                <AppFrameAction ref="frameAction" />

                <div className={`text-white f-12 ${(this.props.pos == "portofolio") ? 'p-pinportofolio' : 'p-pinlanding' }`} style={{ paddingTop: "60px"}}>

                    <Table borderless className="card-334 mb-0">
                        <tbody>
                        <tr>
                            <td className="py-0">

                                <div className="text-center align-self-center align-middle">
                                    <div className="d-border-bold img-round-icon">
                                        <i className="icofont icofont-lock icofont-4x"></i>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td className="py-0">

                                <div className="form-group text-center pt-2 mb-0">
                                    <label className="col-sm-12 px-5 py-2 col-form-label f-14 font-weight-bold">Please enter security PIN</label>
                                    <label className="col-sm-12 px-5 py-2 col-form-label">Please fullfill with 6 digit security
                                        PIN to verify your transaction</label>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="form-group mb-0">
                                    <PinInput
                                        inputStyle={{"color":/*cssmode == 'night' ? '#FFFFFF':*/'#999999', "border":"#565252 1px solid","border-radius":"10%","width":"15.25%"}}
                                        inputFocusStyle={{"color":/*cssmode == 'night' ? '#FFFFFF':*/'#999999', "border":"#065A96 1px solid", "border-radius":"10%","width":"15.25%"}}
                                        length={6}
                                        focus
                                        secret
                                        ref={p => this.pin = p}
                                        type="numeric"
                                        onChange={this.onChange}
                                    />
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="form-group">
                                    <label className="col-sm-12 py-2 px-1 col-form-label">Forgot your PIN?
                                        <span className="click-pointer btn btn-link text-primary" onClick={this.forgotPIN}> Click here</span>
                                    </label>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>

                                <div className="form-group py-3 mb-0">
                                    <div className="justify-content-center align-items-center d-flex py-0">
                                        <button id="pin-click" type="submit" className={'btn btn-grey-gray form-control py-0'}
                                                onClick={this.onClickSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        </tbody>
                    </Table>

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
    tcAndSoe
};
