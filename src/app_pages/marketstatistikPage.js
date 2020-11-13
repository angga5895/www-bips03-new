import React from 'react';
import {Dropdown, Popup} from 'semantic-ui-react';
import { AppFrameAction } from '../appframe.js';
import StreamChart from './streamChart.js';
import {AppFrame} from "../appframe";
import {BIPSAppContext} from "../AppData";
import FillHeaderTab from "../tabheaderfill";
import {WSConnectionAction} from "./../appnetwork";
import {Table as TableBS, Button} from "react-bootstrap";
import Select from "react-select";
import ModalBuy from "./../app_modals/modal_buy";
import ModalSell from "./../app_modals/modal_sell";
import {AgGridReact} from "ag-grid-react";
import MenuOfContent from "../menuofcontent";
import AnyChart from '../../node_modules/anychart-react/dist/anychart-react.min.js'

import newsImg1 from './../img/noimage.png';
import newsImg2 from './../img/noimage.png';
import newsImg3 from './../img/noimage.png';
import newsImg4 from './../img/noimage.png';
import newsImg5 from './../img/noimage.png';
import {ContextConnector} from "../appcontext";
import anychart from 'anychart';
import $ from 'jquery';
import {ResizeResponsive} from "./mainPage";
import TableInfoTransaction from "../app_transaction/tableInfoTransaction";
import FormBuy from "../app_transaction/form_buy";
import FormSell from "../app_transaction/form_sell";
window.$ = window.jQuery = $;


const stateOptions = [
    //untuk top active
    { key: 'value', value: 'value', text: 'by value' },
    { key: 'volume', value: 'volume', text: 'by volume' },
    { key: 'frequentop gainercy', value: 'frequency', text: 'by frequency' },
    //untuk  dan top looser --> tambahkan value
    { key: 'percentage', value: 'percentage', text: 'by percentage' },
];
const summaryOptions = [
    //untuk top active
    // { key: 'all', value: 'all', text: 'All' },
    { key: 'rg', value: 'rg', text: 'RG' },
    // { key: 'tn', value: 'tn', text: 'TN' },
    // { key: 'ng', value: 'ng', text: 'NG' },
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

const CustomFrameHeaderMarketStatistik= (props) =>{
    return (
        <div>
            <div className="col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 pb-0 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab treeName="/marketstatistikPage" linkTitles={
                        {
                            marketStatistikPage: 'SUMMARY',
                            statisticMarketStatistikPage: 'MARKET INDEX',
                            indiceMarketStatistikPage: 'SECTORAL INDEX',
                            nonSectoralStatistikPage: 'NON SECTORAL INDEX',
                            topBrokerMarketStatistikPage: 'TOP BROKER',
                            currenciesMarketStatistikPage: 'CURRENCIES & INT.INDICES',
                            newResearchMarketStatistikPage: 'NEWS',
                        }
                    }/>
                </div>
            </div>
            <AppFrame treeName="/marketstatistikPage" headerComponent={MarketStatistikFrameHeader}/>
        </div>
    );
}

const MarketStatistikFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

const ResearchMarketStatistikFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

class MarketStatistik extends React.PureComponent {
    //hanya memanggil headernya saja
    render () {
        return (
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

class MarketStatistikPage extends React.PureComponent {
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

    constructor(props) {
        super(props);

    }

    state = {
        top: "topactive",
        selected: 1,
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
    refreshData(){
        alert('Data refreshed');
    }
    render (){
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="card card-527">
                    <div className="card-header pt-1 h-49 bg-grey pb-0">
                        <div className="f-14 px-0 mx-0 py-0 col-sm-12 h-49">
                            <div className="row col-sm-12 px-0 mx-0">
                                <div className={"col-sm-6"}>
                                    <div
                                        className={`px-0 pt-3 pl-5
                                                  ${this.state.selected == 1?"livetradeMenuActive":"livetradeMenu"}`}
                                        onClick={()=>this.setState({selected:1})}
                                        style={{display: "inline-block"}}
                                    >
                                        <i className={this.state.selected == 1 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                        &nbsp;
                                        Top Active
                                    </div>
                                    <div
                                        className={`px-0 pt-3 pl-5
                                                   ${this.state.selected == 2?"livetradeMenuActive":"livetradeMenu"}`}
                                        onClick={()=>this.setState({selected:2})}
                                        style={{display: "inline-block"}}
                                    >
                                        <i className={this.state.selected == 2 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                        &nbsp;
                                        Top Gainer
                                    </div>
                                    <div
                                        className={`px-0 pt-3 pl-5
                                                    ${this.state.selected == 3?"livetradeMenuActive":"livetradeMenu"}`}
                                        onClick={()=>this.setState({selected:3})}
                                        style={{display: "inline-block"}}
                                    >
                                        <i className={this.state.selected == 3 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                        &nbsp;
                                        Top Losers
                                    </div>
                                </div>
                                <div className="col-sm-6 px-0 mx-0 row text-right h-49 py-2">
                                    <div className="col-sm-3">
                                    </div>
                                    <div className="col-sm-4">
                                        <Dropdown
                                            placeholder='Choose'
                                            search selection
                                            options={summaryOptions}
                                            defaultValue={summaryOptions[0].value}
                                            className="col-sm-12 f-12"/>
                                    </div>
                                    <div className="col-sm-4">
                                        <Dropdown
                                            placeholder='Choose'
                                            search
                                            selection
                                            options={stateOptions}
                                            defaultValue={stateOptions[2].value}
                                            className="col-sm-12 f-12"/>
                                    </div>
                                    <div className={"col-sm-1 text-center"}>
                                        <Popup content='Refresh' position='top center' trigger={
                                            <button
                                                className="pull-left btn btn-primary"
                                                style={{"font-size": "12px", "margin-left": "-10px"}}>
                                                <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                            </button>
                                        }/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <MarketStatistikAgGrid typegrid="summary" size={this.ceksize()} clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                    </div>
                </div>
            </>
        );
    }
}

class IndiceMarketStatistikPage extends React.PureComponent{
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
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />

                <div className="card grid-294 bg-black-trading f-12">
                    <MarketIndicesAgGrid size={this.ceksize()}/>
                    {/*<MarketIndicesGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>

                <div className="card card-233 bg-black-trading f-12">
                    <div className="card-header px-0 py-0">
                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                            <div className="bg-tableheader col-sm-12 px-0 mx-0 text-center py-3 h-30">
                                FINANCE
                                <Popup content='Refresh' position='top center' trigger={
                                    <button
                                        className="col-sm-1 pull-right btn btn-primary mr-2"
                                        style={{"margin-top": "-8px", "width": "39px", "height": "28px"}}>
                                        <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                    </button>
                                }/>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <MarketStatistikAgGrid typegrid="indices" size={this.ceksize()} clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                    </div>
                    {/*<MarketStatistikGrid typegrid="indices" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>
            </>
        );
    }
}

class NonSectoralStatistikPage extends React.PureComponent{
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
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />

                <div className="card grid-294 bg-black-trading f-12">
                    <MarketNonIndicesAgGrid size={this.ceksize()}/>
                    {/*<MarketIndicesGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>

                <div className="card card-233 bg-black-trading f-12">
                    <div className="card-header px-0 py-0">
                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                            <div className="bg-tableheader col-sm-12 px-0 mx-0 text-center py-3 h-30">
                                FINANCE
                                <Popup content='Refresh' position='top center' trigger={
                                    <button
                                        className="col-sm-1 pull-right btn btn-primary mr-2"
                                        style={{"margin-top": "-8px", "width": "39px", "height": "28px"}}>
                                        <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                    </button>
                                }/>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <MarketStatistikAgGrid typegrid="indices" size={this.ceksize()} clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                    </div>
                    {/*<MarketStatistikGrid typegrid="indices" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>
            </>
        );
    }
}

class IndiceMarketSecondStatistikPage extends React.PureComponent{
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
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />

                <div className="card grid-294 bg-black-trading f-12">
                    <MarketIndicesAgGrid size={this.ceksize()}/>
                    {/*<MarketIndicesGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>

                <div className="card card-233 bg-black-trading f-12">
                    <div className="card-header px-0 py-0">
                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                            <div className="bg-tableheader col-sm-12 px-0 mx-0 text-center py-3 h-30">FINANCE</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <MarketStatistikAgGrid typegrid="indices" size={this.ceksize()} clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                    </div>
                    {/*<MarketStatistikGrid typegrid="indices" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>
            </>
        );
    }
}

class StatisticMarketStatistikPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newRow: 100,
            seconds: 0,
            newStream: null,
        };
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

    componentDidMount() {
        $('#container').css('height', '100%');
        // var tommorow = new Date();
        // tommorow.setDate(tommorow.getDate()+1);
        // const ntommorow = tommorow.getTime();
        // //create new point every 1 minute
        // var period = 4;
        // //new price ticks come every 15 seconds
        // var tickPeriod = 15000;

        // var newTimestamp;

        // var newDataRow = [];
        // //current price variable
        // var point = null;
        // var time = null;
        // var tempTitle = null;
        // var dataset = null;
        // var intervals = [];

        // anychart.onDocumentReady(function () {

        //     dataset = anychart.data.table();
        //     //start data
        //     dataset.addData([
        //         [1582703100063, 300],
        //         [1582705100063, 500],
        //         [1582709420063, 900],
        //     ]);

        //     // map the data
        //     var mapping = dataset.mapAs({x: 0, value: 1});
        //     // set chart type
        //     var chart = anychart.stock();

        //     chart.scroller(true);
        //     chart.scroller().enabled(false);

        //     var credits = chart.credits();
        //     credits.enabled(false);

        //     // set the series
        //     var series = chart.plot(0).line(mapping);

        //     var columnTooltip = series.tooltip();
        //     chart.tooltip().titleFormat('{%x}{type:time}');
        //     columnTooltip.format("{%seriesName}: {%value}");
        //     columnTooltip.displayMode("single");

        //     chart.crosshair().xLabel().format(' ');

        //     chart.plot(0).legend(true);

        //     var title = chart.plot(0).legend().title();
        //     title.useHtml(true);

        //     title.enabled(true);
        //     title.text("&nbsp;");

        //     title.fontSize(14);
        //     title.hAlign("center");

        //     series.name("");
        //     chart.title('Stock Streaming');

        //     // set container and draw chart
        //     chart.container("container").draw();

        //     //create empty array for point data update
        //     newDataRow[0] = new Array(2);

        //     //select the last point from existing datatable
        //     var selectable = mapping.createSelectable();
        //     selectable.selectAll();
        //     var iterator = selectable.getIterator();

        //     while (iterator.advance()) {
        //         //put data from the last exsiting point
        //         newDataRow[0][0] = iterator.get('x');
        //         newDataRow[0][1] = iterator.get('value');
        //     }
        //     //timestamp variable for incoming ticks
        //     newTimestamp = newDataRow[0][0];

        //     function reset(){
        //         dataset.remove(1509986691452,ntommorow);
        //         $("#marketClickInput").click();
        //     }
        //     function convertTime(param){
        //         var StrVersion = String(param);
        //         var d = new Date();
        //         var h = parseInt(StrVersion.substring(0,2));
        //         d.setHours(h);
        //         d.setMinutes(StrVersion.substring(3,5));
        //         d.setSeconds(StrVersion.substring(6,8));

        //         return parseInt(d.getTime()) + 25200000;
        //     }
        //     function streamStart() {
        //         var ahay = document.getElementById('propsluar').value;
        //         if(ahay.length < 1){
        //             // alert('data kosong');
        //         }else{
        //             document.getElementById("hello").click();
        //         }

        //         dataInteval = setInterval(
        //             // data streaming itself

        //             function () {

        //                 newTimestamp += tickPeriod;
        //                 point = document.getElementById("tempVal").value;
        //                 time = document.getElementById("tempTime").value;
        //                 //current point update or create new point

        //                     // if (newTimestamp - newDataRow[0][0] <= period) {
        //                     //     //set price as close for existing point
        //                     //     newDataRow[0][2] = point;
        //                     // } else {
        //                         //erase update data array
        //                         newDataRow[0] = new Array(2);
        //                         //set data for the new point
        //                         newDataRow[0][0] = time;
        //                         newDataRow[0][1] = point;
        //                     // }
        //                     dataset.addData(newDataRow);


        //             }, 300            // interval
        //         );
        //     }

        //     let streamButton = document.getElementById("streamButton");
        //     let resetButton = document.getElementById("resetButton");
        //     let resetTitle = document.getElementById("resetTitle");
        //     let inputButton = document.getElementById("marketClickInput");
        //     let stopInterval = document.getElementById("stopInterval");

        //     let streamState = 0;
        //     let dataInteval;
        //     var timeTemp = Date.now();
        //     stopInterval.onclick = function(){
        //         intervals.forEach(clearInterval);
        //     }

        //     inputButton.onclick = function(){
        //         // intervalTime
        //          var dataInquiry = $("#arrayLengthInquiry").data('arr');
        //          var dataInquiryLength = $("#arrayLengthInquiry").val();
        //        dataInquiry = dataInquiry.split(",");
        //        // // console.log(dataInquiry);
        //        // var newArr = [];
        //        //  for(let i = 0; i< 200; i + 2){
        //        //     newArr.push([dataInquiry[i],dataInquiry[i+1]]);
        //        // }
        //         var counter = 0;
        //         // var counter2 = 0;
        //         var i = setInterval(function(){
        //             // do your thing
        //             // newDataRow[counter2] = new Array(2);
        //             // time = convertTime(dataInquiry[counter]);
        //             time = dataInquiry[counter];
        //             point = parseInt(dataInquiry[counter+1]);

        //             dataset.addData([[time, point]]);
        //             // newDataRow[counter2][0] = point;
        //             // newDataRow[counter2][1] = time;
        //             console.log( "point: "+point+" time: "+time + " counter" + counter +" "+dataInquiryLength);
        //             counter = counter + 2;
        //             timeTemp = timeTemp+1;
        //             // dataset.addData(newDataRow);
        //             if(counter == dataInquiryLength) {
        //                 clearInterval(i);
        //             }
        //         }, 1);

        //         intervals.push(i);

        //         // for (let i=0; i < dataInquiry; i++){
        //        //     point = 1582705100063 + (i*2);
        //        //     time = 400 + (i*10);
        //        //     newDataRow[0] = new Array(2);
        //        //     newDataRow[0][0] = time;
        //        //     newDataRow[0][1] = point;
        //        //     dataset.addData(newDataRow);
        //        // }
        //     }
        //     //untuk mengganti title chart
        //     resetTitle.onclick = function(){
        //         reset();

        //         tempTitle = document.getElementById("resetTitle").value;
        //         var dataset = anychart.data.table();
        //         dataset.addData([
        //             [1582703100063, 300],
        //         ]);
        //         series.name(tempTitle);
        //         // set container and draw chart
        //         chart.container("container").draw();
        //     }
        //     resetButton.onclick = function(){
        //         // streamButton.innerHTML = "Start" + "\nstream";
        //         // streamState = 0;
        //         // clearInterval(dataInteval);
        //         reset();
        //     }

        //     streamButton.onclick = function () {
        //         streamButton.innerHTML = "Stop" + "\nstream";
        //         streamState++;

        //         if (streamState > 1) {
        //             streamButton.innerHTML = "Start" + "\nstream";
        //             streamState = 0;
        //             clearInterval(dataInteval);
        //         } else {
        //             streamStart();
        //         }

        //     };

        // });
    }
    changelist = event => {
        // document.getElementById("resetTitle").value = event.toUpperCase();
        // document.getElementById("resetTitle").click();
        // this.setState({newStream: true});
        this.props.handleSearchCode(event);
    }
    handleStartStopStream = () => {
        this.props.handleStreamChart(this.props.streamStatus)
    }

    newStream = event => {
        if(this.state.newStream){
            document.getElementById("resetTitle").click();
            document.getElementById("resetButton").click();
            this.setState({newStream: false});
            this.props.handleStreamChart(this.props.streamStatus)
        }
    }

    checkColor(param){
        if(param < 0){
            return "text-right text-danger py-1";
        }else if(param == 0){
            return "text-right text-warning py-1";
        }else{
            return "text-right text-success py-1";
        }
    }
    convertTime(param){
        var d = new Date();
        var h = parseInt(param.substring(0,2));
        d.setHours(h);
        d.setMinutes(param.substring(3,5));
        d.setSeconds(param.substring(6,8));

        return parseInt(d.getTime()) + 25200000;
    }

    render(){
        const stockOptions = [
            { value: 'AGRI', label: 'AGRI' },
            { value: 'COMPOSITE', label: 'COMPOSITE' },
            { value: 'MINING', label: 'MINING' },
        ];

        // Chart
        anychart.theme('darkEarth');
        let chart = anychart.stock();
        let credits = chart.credits();
        credits.enabled(false);
        var dataset = anychart.data.table();
        dataset.addData(this.props.indexStreamChart);
        var data1 = dataset.mapAs({x: 0, value: 1,});
        var seriesRaw = chart.plot(0);
        var series = seriesRaw.line(data1);
        seriesRaw.yGrid().enabled(true);
        seriesRaw.yGrid().stroke({color: "#555555", dash: "3 4"});
        seriesRaw.xMinorGrid().enabled(true);
        seriesRaw.xMinorGrid().stroke({color: "#555555", dash: "2 4"});

        series.stroke("#64B5F6");
        series.name("Price");
        var columnTooltip = series.tooltip();
        chart.tooltip().titleFormat('{%x}{type:time}');
        columnTooltip.format("{%seriesName}: {%value}");

        columnTooltip.displayMode("single");

        chart.crosshair().xLabel().format(' ');

        chart.plot(0).legend(true);

        var title = chart.plot(0).legend().title();
        title.useHtml(true);

        // enable legend title
        title.enabled(true);
        title.text("&nbsp;");

        // set font size and align
        title.fontSize(14);
        title.hAlign("center");

        chart.scroller(true);
        chart.scroller().enabled(false);
        chart.container('container').draw();


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

        console.log("stream",this.props.codeSearchMarketIndex, "datanya : ", this.props.streamChart, "timenya",
            this.props.timeChart, "hasil inquiry",this.props.indexStreamChart)

        return(
            <>
                <style>{'' +
                'thead.t-statistic th {' +
                '    border-bottom: 0.7px solid var(--warna-d-border)!important' +
                '}' +
                'tbody.tb-statistic tr td, ' +
                'tfoot.tb-statistic tr th {' +
                '    padding-top: 10px;' +
                '    padding-bottom: 10px;' +
                '}' +
                ''}
                </style>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="px-1 mx-0 col-sm-12 row f-12 card-520">
                    <div className="col-sm-7 px-1 py-0 d-border-table-right">
                        <div className="card card-520 bg-black-trading">
                            <div className="card-header py-3 pr-0 h-121 n-border-bottom">
                                <div className="col-sm-12 mb-4 row text-left ml-1">
                                    <label className="align-self-center col-sm-2 px-0 mx-0 f-16">Index</label>
                                    {/*<Input defaultValue='AGRI' placeholder='Code' size='small' className="col-sm-7 text-center align-self-center"/>*/}
                                    <div className="col-sm-10 mr-0 pl-0 pr-0 text-left align-self-center">
                                        <Select
                                            maxMenuHeight={150}
                                            styles={customStyles}
                                            size="small"
                                            placeholder={<div>Search..</div>}
                                            options={stockOptions}
                                            className="stockPageSelect"
                                            onChange={(e)=>this.changelist(e.value)}
                                            theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                </div>
                                <div className="col-sm-12 mb-4 pt-3 row f-25">
                                    <div className="col-sm-4 text-success">1,557.09</div>
                                    <div className="col-sm-3 text-success text-center">28.28</div>
                                    <div className="col-sm-4 text-success text-right">(1.85%)</div>
                                    <div className="col-sm-1 text-success text-right"><i className="icofont icofont-caret-up"></i></div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="col-sm-12">
                                    <div className="card card-399 text-white bg-trading-gray delayTransition">
                                        <div>
                                            <button id="streamButton" onClick={()=>this.props.handleStreamChart(this.props.streamStatus)}
                                                    className="btn btn-sm btn-grey py-3 px-3 d-border h-40 ml-3 mt-3">{this.props.streamStatus ? "Stop Stream" : "Start Stream"}</button>

                                            {/* <button id="streamButton"
                                                onClick={this.newStream} className="btn btn-sm btn-grey py-3 px-3 d-border h-40 ml-3 mt-3">
                                                    {this.props.streamStatus ? "Stop Stream" : "Start Stream"}</button>
                                            <i id="resetButton"></i>
                                            <input type="hidden" id={"tempVal"} value={this.props.streamChart}/>
                                            <input type="hidden" id={"tempTime"} value={this.convertTime(this.props.timeChart)}/>
                                            <input type="hidden" id={"propsluar"} value=""/>
                                            <input type="hidden" id={"newStream"} value={this.props.streamStatus}/> */}
                                            {/*<input type="hidden" id={"resetTitle"} value={this.props.codeSearchMarketIndex}/>*/}
                                            {/* <input type="hidden" id={"resetTitle"}/>
                                            <button type="button" className={"btn btn-sm btn-grey"} id={"marketClickInput"}>X</button>
                                            <input type="text" id={"arrayLengthInquiry"} data-arr={this.props.indexStreamChart} value={(this.props.indexStreamChart) ? this.props.indexStreamChart.length : 0
                                            }/> */}
                                            {/* <button id={"stopInterval"}>STOP</button>

                                            <span onClick={this.handleStartStopStream} id={"hello"}></span> */}
                                            {/* <div id="container" className="mt-2 py-3 px-3 card-344"></div> */}
                                            <div  className="mt-2 py-3 px-3 card-344 addmorewidth" >
                                                <AnyChart instance={chart} id="container" title={this.props.codeSearchMarketIndex} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-5 px-1 py-0 d-border-table-left">
                        <div className="card card-520 bg-black-trading text-white">
                            <div className="card-body px-3 pt-3">
                                <div className="bg-tableheader text-center py-3 h-30">
                                    <Popup content='Refresh' position='top center' trigger={
                                        <button
                                            className="pull-right btn btn-primary btn-10"
                                        >
                                            <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                        </button>
                                    }/>
                                    <span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {/*Biar di tengah*/}
                                        BOARD SUMMARY</span>
                                </div>
                                <TableBS responsive bordered size="sm"
                                         className="table-hover table-striped text-center align-self-center align-middle mb-3 card-152">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th className="py-1 bg-gray-tradding">BOARD</th>
                                        <th className="py-1 bg-gray-tradding">VALUE</th>
                                        <th className="py-1 bg-gray-tradding">VOL(SHR)</th>
                                        <th className="py-1 bg-gray-tradding">FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap">
                                    <tr>
                                        <td className="text-left py-1">Reguler</td>
                                        <td className="text-right py-1">6.35</td>
                                        <td className="text-right py-1">100.3</td>
                                        <td className="text-right py-1">403,040 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left py-1">Negotiated</td>
                                        <td className="text-right py-1">2.64</td>
                                        <td className="text-right py-1">55.41</td>
                                        <td className="text-right py-1">870 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left py-1">Cash</td>
                                        <td className="text-right py-1">0</td>
                                        <td className="text-right py-1">0</td>
                                        <td className="text-right py-1">0 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-primary text-left py-1">TOTAL</td>
                                        <td className="text-primary text-right py-1">8.99</td>
                                        <td className="text-primary text-right py-1">156.15</td>
                                        <td className="text-primary text-right py-1">403,914 </td>
                                    </tr>
                                    </tbody>
                                </TableBS>
                                <div className="bg-tableheader text-center py-3 h-30 mt-1">
                                    <span>&nbsp;</span></div>
                                <TableBS responsive bordered size="sm"
                                         className="table-hover table-striped text-center bold align-self-center align-middle mb-3 card-92">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th className="py-1 bg-gray-tradding"></th>
                                        <th className="py-1 bg-gray-tradding">VALUE</th>
                                        <th className="py-1 bg-gray-tradding">VOL(SHR)</th>
                                        <th className="py-1 bg-gray-tradding">FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap">
                                    <tr>
                                        <td className="text-left py-1">Rights</td>
                                        <td className="text-right py-1">500,00</td>
                                        <td className="text-right py-1">100.3</td>
                                        <td className="text-right py-1">403,040 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left py-1">Warrants</td>
                                        <td className="text-right py-1">2.64</td>
                                        <td className="text-right py-1">55.41</td>
                                        <td className="text-right py-1">870 </td>
                                    </tr>
                                    </tbody>
                                </TableBS>
                                <div className="bg-tableheader text-center py-3 h-30 mt-1">
                                    <span>FOREIGN ACTIVITY</span></div>

                                <TableBS
                                    responsive
                                    bordered
                                    size="sm"
                                    className="table-hover table-striped text-center align-self-center align-middle card-152 mb-0">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th className="py-1 bg-gray-tradding">FOREIGN</th>
                                        <th className="py-1 bg-gray-tradding">VALUE</th>
                                        <th className="py-1 bg-gray-tradding">VOL(SHR)</th>
                                        <th className="py-1 bg-gray-tradding">FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap">
                                    <tr>
                                        <td className="text-left py-1">F.Buy</td>
                                        <td className="text-right py-1">2.29 T</td>
                                        <td className="text-right py-1">11.68 M</td>
                                        <td className="text-right py-1">63,578 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left text-white py-1">F.Sell</td>
                                        <td className="text-right py-1">3.02 T</td>
                                        <td className="text-right py-1">11.44 M</td>
                                        <td className="text-right py-1">85,982 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left text-white py-1">F.Total</td>
                                        <td className="text-right text-primary py-1">5.31 T</td>
                                        <td className="text-right text-primary py-1">23.13 M</td>
                                        <td className="text-right text-primary py-1">148,560 </td>
                                    </tr>
                                    <tr>
                                        {/*kondisi*/}
                                        <td className="text-left text-white py-1">F.Net</td>
                                        <td className={this.checkColor(-731.36)}>-731.36 B</td>
                                        <td className={this.checkColor(241.671)}>241,671</td>
                                        <td className={this.checkColor(0)}>-21,404 </td>
                                    </tr>
                                    </tbody>
                                </TableBS>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class TopBrokerMarketStatistikPage extends React.PureComponent {
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
            <div className="f-12 px-0">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="card bg-black-trading f-12">
                    <div className="card-header bg-tableheader h-37 pt-3">
                        TOP BROKER
                        <Popup content='Refresh' position='top center' trigger={
                            <button
                                className="col-sm-1 pull-right btn btn-primary"
                                style={{"font-size": "12px", "margin-top": "-7px", "width": "38px"}}>
                                <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                            </button>
                        }/>
                    </div>
                    <div className="card-body">
                        <TopBrokerAgGrid size={this.ceksize()}/>
                    </div>
                </div>
                <div className="card card-175 bg-black-trading f-12">
                    <div className="card-header bg-tableheader h-37 pt-3">
                        TOP BUYER
                    </div>
                    <div className="card-body">
                        <TopBrokerBAgGrid size={this.ceksize()}/>
                    </div>
                </div>
                <div className="card card-175 bg-black-trading f-12">
                    <div className="card-header bg-tableheader h-37 pt-3">
                        TOP SELLER
                    </div>
                    <div className="card-body">
                        <TopBrokerSAgGrid size={this.ceksize()}/>
                    </div>
                </div>
            </div>
        );
    }
}

class CurrenciesMarketStatistikPage extends React.PureComponent{
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
                <div className={"row pl-4 pr-4 mt-2"}>
                    <div className="col-sm-4 px-0 mb-3 bg-currencies">
                        <div className="col-sm-12 mx-0 text-center row px-2">
                            <div className="col-sm-11 px-0 text-left text-primary pt-3 pb-2">
                                <h1>USD/IDR</h1>
                            </div>
                            <div className={"col-sm-1 px-0"}>
                                <Popup content='Refresh' position='top center' trigger={
                                    <button
                                        className={`btn btn-primary pull-right`}
                                        style={{"font-size": "12px", "marginTop": "6px", "width": "38px"}}>
                                        <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                    </button>
                                }/>
                            </div>
                            <div className={"col-sm-5 px-0 mx-0 text-left"}>
                                14,850
                            </div>
                            <div className={"col-sm-1 f-12 px-0 mx-0 pt-3 text-success text-left"}>
                                <i className="oi oi-caret-bottom"></i>
                            </div>
                            <div className={"col-sm-6 f-12 px-0 mx-0 pt-3 text-success text-left"}>
                                +5 (+0.03%)
                            </div>
                            <div className={"col-sm-12 px-0 mb-3 py-2 f-12 text-left bb-blue"}>
                                Last Updated: 11:42::00 WIB | 28/09/2020
                            </div>
                        </div>
                        <CurrenciesAgGrid size={this.ceksize()}/>
                    </div>

                    <div className="col-sm-8 pl-1 pr-0 mb-3 ">
                        <div className="col-sm-12 px-2 mx-0 text-center row ">
                            <div className="col-sm-12 px-3 pt-3 mx-0 text-left f-15 bg-currencies">
                                INTERNATIONAL INDICES
                                <Popup content='Refresh' position='top center' trigger={
                                    <button
                                        className={`btn btn-primary pull-right col-sm-1`}
                                        style={{"font-size": "14px", "width": "38px", "margin-top": "-8px"}}>
                                        <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                    </button>
                                }/>
                            </div>

                        </div>
                        <InternationalIndicesAgGrid size={this.ceksize()}/>
                    </div>
                </div>


            </div>
        )
    };
}
class CurrenciesAgGrid extends React.PureComponent{
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "other", headerName: "Other Currencies", sortable: true, resizable: true,comparator: stringComparator,
                    width: s=="s49"?160:s=="s50"?160:s=="s67"?160:s=="s75"?160:s=="s80"?155:s=="s90"?145:s=="s100"?140:130, minWidth:130,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "last", headerName: "Last", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?270:s=="s50"?225:s=="s67"?185:s=="s75"?165:s=="s80"?130:s=="s90"?100:s=="s100"?90:80,
                    minWidth: 80,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    },
                },{ field: "change", headerName: "Change", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?265:s=="s50"?230:s=="s67"?185:s=="s75"?165:s=="s80"?130:s=="s90"?100:s=="s100"?90:85,
                     minWidth: 85,
                    cellClass : function (params) {
                        return params.data.change.includes("-") === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "percentage", headerName: "%", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: 70, minWidth: 70,
                    cellClass : function (params) {
                        return params.data.change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    other: "USD/IDR",
                    last: 14.233,
                    change: "-5",
                    percentage: "0.003%",
                },{
                    other: "SGD/IDR",
                    last: 10003,
                    change: "13",
                    percentage: "0.05%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
                },{
                    other: "JPY/IDR",
                    last: 150,
                    change: "-1",
                    percentage: "0.001%",
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
            <div className={"px-3"} style={{ width: "100%", height: "100%" }}>
                <p className={"text-primary f-15"}>PREV CLOSE
                &nbsp;<span className={"text-success"}>14,876</span></p>
                <div
                    className={"card-354 ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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
class InternationalIndicesAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "symbol", headerName: "Symbol", sortable: true, resizable: true,comparator: stringComparator,
                    width: 135,
                    minWidth:135,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "name", headerName: "Name", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?420:s=="s50"?370:s=="s67"?310:s=="s75"?290:s=="s80"?230:s=="s90"?185:s=="s100"?220:180,
                    minWidth: 180,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    },
                },{ field: "lastUpdated", headerName: "Last Updated", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?420:s=="s50"?360:s=="s67"?310:s=="s75"?280:s=="s80"?245:s=="s90"?190:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    },
                },{ field: "lastPrice", headerName: "Last Price", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: s=="s49"?430:s=="s50"?385:s=="s67"?330:s=="s75"?300:s=="s80"?250:s=="s90"?200:s=="s100"?155:145,
                    minWidth: 145,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "change", headerName: "Change", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: 100,
                    minWidth: 100,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }
                },{ field: "percentage", headerName: "%", sortable: true, filter: "agNumberColumnFilter", resizable: true,comparator: integerComparator,
                    width: 60,
                    minWidth: 60,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    symbol: "GSPC",
                    name: 123232131,
                    lastUpdated: 12,
                    lastPrice: 5+" "+s,
                    change: "-23",
                    percentage: "1.6%",
                },{
                    symbol: "DJI",
                    name: "Dow jones Industrial Average",
                    lastUpdated: "10/8/2020 10:39",
                    lastPrice: "334.32",
                    change: "-23",
                    percentage: "1.6%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
                },{
                    symbol: "^NYA",
                    name: "Nasdaq Jones Industrial Average",
                    lastUpdated: "10/9/2020 10:33",
                    lastPrice: "2213.11",
                    change: "10",
                    percentage: "3%",
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
            <div style={{ width: "100%", height: "100%" }} className={"px-2"}>
                <div
                    className={"card-watchlistcust ag-theme-balham-dark ag-bordered ag-striped-odd d-border"}
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



class NewResearchMarketStatistikPage extends React.PureComponent {
    render(){
        return(
            <div>
                {/*<BIPSAppProvider>*/}
                {/*<WSConnectionAction />*/}
                <div className="row col-sm-12 px-0 mx-0 pt-1">
                    <div className="col-sm-12 px-2 h-45">
                        <MenuOfContent treeName="/marketstatistikPage/newResearchMarketStatistikPage" linkTitles={
                            {
                                newsGeneral : 'General News',
                                newsStock : 'Stock News',
                                newsMutualFund : 'Mutual Fund News',
                                // newsResearch : 'Research'
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2">
                        <AppFrame treeName="/marketstatistikPage/newResearchMarketStatistikPage" headerComponent={ResearchMarketStatistikFrameHeader}/>
                    </div>
                </div>
                {/*</BIPSAppProvider>*/}
            </div>
        );
    }
}

class GeneralNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                {/* <div className={"text-center align-self-center"}>
                                    <img src={newsImg1} alt="News 1" height={"auto"} width={"50%"} />
                                </div> */}
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg2} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg3} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg4} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    {/* <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div> */}
                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
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

class StockNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                {/* <div className={"text-center align-self-center"}>
                                    <img src={newsImg1} alt="News 1" height={"auto"} width={"50%"} />
                                </div> */}
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
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

class MutualNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
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

class ReseacrhNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">

                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-12 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">

                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
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

const option = [
    { value: 'choose', label: 'Choose' },
];

class SelectChoose extends React.Component {
    selectStyleNight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#181717',
            neutral20 : '#565252',
            neutral30 : '#565252',
            neutral40 : '#cccccc',
            neutral80 : '#FFFFFF',
            primary75 : '#FFFFFF',
            primary50 : '#4D4D4E',
            primary25 : '#4D4D4E',
            primary : '#0363A7',
        },
    });

    selectStyleLight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#E7E7E7',
            neutral20 : '#9A9A9A',
            neutral30 : '#9A9A9A',
            neutral40 : '#767676',
            neutral80 : '#888888',
            primary75 : '#888888',
            primary50 : '#F3F3F3',
            primary25 : '#F3F3F3',
            primary : '#0363A7',
        },
    });

    render() {
        return (
            <div className="col-md-12 bg-black-grey px-0 text-center text-white">
                <Select
                    className="f-12"
                    defaultValue={option[0]}
                    label="Single select"
                    options={option}
                    theme={this.selectStyleNight}
                />
            </div>
        );
    }
}

class BuyModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        ResizeResponsive();
    }
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col-sm-12 px-0 py-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 f-12">
                        <TableInfoTransaction lotshare="buyPage"/>
                    </div>
                    <div className={"col-sm-6 mt-0 d-border-active bg-buy card-520 d-border"}>
                        <FormBuy
                            idPrice="stockBuyPrice"
                            part="stockInfo"
                            idVol="stockBuyVol"
                            idValue="stockBuyValue"
                            columnSm="col-sm-12"
                            part="stock"
                        />
                    </div>
                </div>
            </>
        );
    }
}

class SellModal extends React.Component  {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        ResizeResponsive();
    }
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col-sm-12 px-0 py-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 f-12">
                        <TableInfoTransaction lotshare="buyPage"/>
                    </div>
                    <div className="col-sm-6 mt-0 d-border-active bg-sell card-520 d-border">
                        <FormSell
                            idPrice="stockSellPrice"
                            part="stockInfo"
                            idVol="stockSellVol"
                            idValue="stockSellValue"
                            columnSm="col-sm-12"
                            part={"stock"}/>
                    </div>
                </div>
            </>
        );
    }
}

class MarketStatistikAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", filter: "agTextColumnFilter",
                    width: s=="s49"?110:s=="s50"?100:s=="s67"?80:60, minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", resizable: true,
                    width: s=="s49"?130:s=="s50"?120:s=="s67"?100:90, minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "prev", headerName: "Prev.", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?135:s=="s50"?130:s=="s67"?100:85, minWidth: 85,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12 text-warning";
                    }},
                { field: "last", headerName: "Last", resizable: true,filter: "agNumberColumnFilter",
                    width: s=="s49"?135:s=="s50"?130:s=="s67"?100:81, minWidth: 81,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        var lasts = params.data.last;
                        return lasts;
                        // return last < prev ? lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                        //     last > prev ? lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>' :
                        //         lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-minus text-warning"></i>';
                    } },
                { field: "updown", headerName: "", resizable: true,
                    width: 40, minWidth: 40,
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
                { field: "change", headerName: "Change", resizable: true,filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?140:105, minWidth: 105,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "persen", headerName: "%", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?150:s=="s67"?140:73, minWidth: 73,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "open", headerName: "Open", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?125:s=="s50"?110:s=="s67"?100:91, minWidth: 91,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "low", headerName: "Low", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?110:s=="s50"?100:s=="s67"?90:82, minWidth: 82,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "high", headerName: "High", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?120:s=="s50"?110:s=="s67"?100:86, minWidth: 86,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "avg", headerName: "Avg.", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?135:s=="s50"?110:s=="s67"?110:s=="s75"?95:82, minWidth: 82,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "val", headerName: "Value", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?135:s=="s67"?125:s=="s75"?120:102, minWidth: 102,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "vol", headerName: "Vol (Lot)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?155:s=="s50"?130:s=="s67"?127:s=="s75"?120:110, minWidth: 110,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "freq", headerName: "Freq", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?120:s=="s50"?110:s=="s75"?100:82, minWidth: 82,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "fbuy", headerName: "F.Buy", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?180:s=="s50"?165:s=="s75"?170:140, minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fsell", headerName: "F.Sell", filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?180:s=="s50"?165:s=="s75"?170:140, minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fnet", headerName: "F.Net", filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?183:s=="s50"?163:s=="s75"?165:140, minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "action", headerName: "Action", width: 100, minWidth: 100, pinned: "right", lockPosition: true,
                    lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy</button>' +
                            '<button class="btn-cellsell btn btn-sm btn-success mx-1 f-9 w-50">Sell</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellsell')[0];

                        bButton.addEventListener('click', self.props.clickbuy);
                        sButton.addEventListener('click', self.props.clicksell);

                        return eDiv;
                    }, suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: false,
                filter: true,
            },
            rowData: [
                {
                    no : 1,
                    code : "TLKM"+s,
                    prev : "4,010",
                    last : "3,980",
                    change : "-30",
                    persen : "-0.7",
                    open : "4,020",
                    low : "3,980",
                    high : "4,050",
                    avg : "4,018",
                    val : "225.3",
                    vol : "560,801",
                    freq : "4,010",
                    fbuy : "100,000,000,000,000",
                    fsell : "100,000,000,000,000",
                    fnet : "100,000,000,000,000",
                    financial : "3,000,000,000,000",
                    action:""
                },
                {
                    no : 2,
                    code : "AALI",
                    prev : "29,550",
                    last : "29,325",
                    change : "-225",
                    persen : "-0.8",
                    open : "29,700",
                    low : "29,300",
                    high : "29,700",
                    avg : "29,440",
                    val : "333.1",
                    vol : "113,160",
                    freq : "29,825",
                    fbuy : "29,325",
                    fsell : "500",
                    fnet : "28,825",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 3,
                    code : "BBCA",
                    prev : "7,950",
                    last : "7,950",
                    change : "0",
                    persen : "0",
                    open : "7,850",
                    low : "7,850",
                    high : "8,000",
                    avg : "7,953",
                    val : "286.8",
                    vol : "350,576",
                    freq : "54,247",
                    fbuy : "7,950",
                    fsell : "46,297",
                    fnet : "38,347",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 4,
                    code : "WSKT",
                    prev : "4,330",
                    last : "4,360",
                    change : "+30",
                    persen : "+0.7",
                    open : "4,330",
                    low : "4,320",
                    high : "4,370",
                    avg : "4,352",
                    val : "447.6",
                    vol : "1.0 M",
                    freq : "6,274",
                    fbuy : "4,350",
                    fsell : "1,924",
                    fnet : "2,426",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 5,
                    code : "BBRI",
                    prev : "1,980",
                    last : "1,945",
                    change : "-35",
                    persen : "-1.8",
                    open : "1,980",
                    low : "1,945",
                    high : "1,985",
                    avg : "1,961",
                    val : "24.9",
                    vol : "126.783",
                    freq : "4,092",
                    fbuy : "1,945",
                    fsell : "2,147",
                    fnet : "-202",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 6,
                    code : "WIKA",
                    prev : "2,240",
                    last : "2,180",
                    change : "-60",
                    persen : "-2.7",
                    open : "2,240",
                    low : "2,150",
                    high : "2,240",
                    avg : "2,186",
                    val : "49.7",
                    vol : "227,402",
                    freq : "2,794",
                    fbuy : "2,170",
                    fsell : "624",
                    fnet : "1,546",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 7,
                    code : "ASRI",
                    prev : "2,350",
                    last : "2,340",
                    change : "-10",
                    persen : "-0.4",
                    open : "2,350",
                    low : "2,300",
                    high : "2,370",
                    avg : "2,337",
                    val : "41.2",
                    vol : "176,162",
                    freq : "3,255",
                    fbuy : "2,330",
                    fsell : "925",
                    fnet : "1,405",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 8,
                    code : "PPTP",
                    prev : "1,160",
                    last : "1,170",
                    change : "+10",
                    persen : "+0.9",
                    open : "1,155",
                    low : "1,155",
                    high : "1,200",
                    avg : "1,182",
                    val : "9.6",
                    vol : "81,047",
                    freq : "1,201",
                    fbuy : "1,170",
                    fsell : "31",
                    fnet : "1,139",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 9,
                    code : "BMRI",
                    prev : "346",
                    last : "346",
                    change : "0",
                    persen : "0",
                    open : "346",
                    low : "338",
                    high : "350",
                    avg : "343",
                    val : "1.9",
                    vol : "54,681",
                    freq : "12,378",
                    fbuy : "344",
                    fsell : "12,034",
                    fnet : "11,690",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 10,
                    code : "CTRA",
                    prev : "1,075",
                    last : "1,065",
                    change : "-10",
                    persen : "-0.9",
                    open : "1,080",
                    low : "1,050",
                    high : "1,115",
                    avg : "1,073",
                    val : "38.2",
                    vol : "355,717",
                    freq : "2,692",
                    fbuy : "1,065",
                    fsell : "1,627",
                    fnet : "-562",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 11,
                    code : "TLKM",
                    prev : "4,010",
                    last : "3,980",
                    change : "-30",
                    persen : "-0.7",
                    open : "4,020",
                    low : "3,980",
                    high : "4,050",
                    avg : "4,018",
                    val : "225.3",
                    vol : "560,801",
                    freq : "4,010",
                    fbuy : "3,980",
                    fsell : "30",
                    fnet : "3,950",
                    financial : "3,000,000,000,000",
                    action:""
                },
                {
                    no : 12,
                    code : "AALI",
                    prev : "29,550",
                    last : "29,325",
                    change : "-225",
                    persen : "-0.8",
                    open : "29,700",
                    low : "29,300",
                    high : "29,700",
                    avg : "29,440",
                    val : "333.1",
                    vol : "113,160",
                    freq : "29,825",
                    fbuy : "29,325",
                    fsell : "500",
                    fnet : "28,825",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 13,
                    code : "BBCA",
                    prev : "7,950",
                    last : "7,950",
                    change : "0",
                    persen : "0",
                    open : "7,850",
                    low : "7,850",
                    high : "8,000",
                    avg : "7,953",
                    val : "286.8",
                    vol : "350,576",
                    freq : "54,247",
                    fbuy : "7,950",
                    fsell : "46,297",
                    fnet : "38,347",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 14,
                    code : "WSKT",
                    prev : "4,330",
                    last : "4,360",
                    change : "+30",
                    persen : "+0.7",
                    open : "4,330",
                    low : "4,320",
                    high : "4,370",
                    avg : "4,352",
                    val : "447.6",
                    vol : "1.0 M",
                    freq : "6,274",
                    fbuy : "4,350",
                    fsell : "1,924",
                    fnet : "2,426",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 15,
                    code : "BBRI",
                    prev : "1,980",
                    last : "1,945",
                    change : "-35",
                    persen : "-1.8",
                    open : "1,980",
                    low : "1,945",
                    high : "1,985",
                    avg : "1,961",
                    val : "24.9",
                    vol : "126.783",
                    freq : "4,092",
                    fbuy : "1,945",
                    fsell : "2,147",
                    fnet : "-202",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 16,
                    code : "WIKA",
                    prev : "2,240",
                    last : "2,180",
                    change : "-60",
                    persen : "-2.7",
                    open : "2,240",
                    low : "2,150",
                    high : "2,240",
                    avg : "2,186",
                    val : "49.7",
                    vol : "227,402",
                    freq : "2,794",
                    fbuy : "2,170",
                    fsell : "624",
                    fnet : "1,546",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 17,
                    code : "ASRI",
                    prev : "2,350",
                    last : "2,340",
                    change : "-10",
                    persen : "-0.4",
                    open : "2,350",
                    low : "2,300",
                    high : "2,370",
                    avg : "2,337",
                    val : "41.2",
                    vol : "176,162",
                    freq : "3,255",
                    fbuy : "2,330",
                    fsell : "925",
                    fnet : "1,405",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 18,
                    code : "PPTP",
                    prev : "1,160",
                    last : "1,170",
                    change : "+10",
                    persen : "+0.9",
                    open : "1,155",
                    low : "1,155",
                    high : "1,200",
                    avg : "1,182",
                    val : "9.6",
                    vol : "81,047",
                    freq : "1,201",
                    fbuy : "1,170",
                    fsell : "31",
                    fnet : "1,139",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 19,
                    code : "BMRI",
                    prev : "346",
                    last : "346",
                    change : "0",
                    persen : "0",
                    open : "346",
                    low : "338",
                    high : "350",
                    avg : "343",
                    val : "1.9",
                    vol : "54,681",
                    freq : "12,378",
                    fbuy : "344",
                    fsell : "12,034",
                    fnet : "11,690",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 20,
                    code : "CTRA",
                    prev : "1,075",
                    last : "1,065",
                    change : "-10",
                    persen : "-0.9",
                    open : "1,080",
                    low : "1,050",
                    high : "1,115",
                    avg : "1,073",
                    val : "38.2",
                    vol : "355,717",
                    freq : "2,692",
                    fbuy : "1,065",
                    fsell : "1,627",
                    fnet : "-562",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 21,
                    code : "TLKM",
                    prev : "4,010",
                    last : "3,980",
                    change : "-30",
                    persen : "-0.7",
                    open : "4,020",
                    low : "3,980",
                    high : "4,050",
                    avg : "4,018",
                    val : "225.3",
                    vol : "560,801",
                    freq : "4,010",
                    fbuy : "3,980",
                    fsell : "30",
                    fnet : "3,950",
                    financial : "3,000,000,000,000",
                    action:""
                },
                {
                    no : 22,
                    code : "AALI",
                    prev : "29,550",
                    last : "29,325",
                    change : "-225",
                    persen : "-0.8",
                    open : "29,700",
                    low : "29,300",
                    high : "29,700",
                    avg : "29,440",
                    val : "333.1",
                    vol : "113,160",
                    freq : "29,825",
                    fbuy : "29,325",
                    fsell : "500",
                    fnet : "28,825",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 23,
                    code : "BBCA",
                    prev : "7,950",
                    last : "7,950",
                    change : "0",
                    persen : "0",
                    open : "7,850",
                    low : "7,850",
                    high : "8,000",
                    avg : "7,953",
                    val : "286.8",
                    vol : "350,576",
                    freq : "54,247",
                    fbuy : "7,950",
                    fsell : "46,297",
                    fnet : "38,347",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 24,
                    code : "WSKT",
                    prev : "4,330",
                    last : "4,360",
                    change : "+30",
                    persen : "+0.7",
                    open : "4,330",
                    low : "4,320",
                    high : "4,370",
                    avg : "4,352",
                    val : "447.6",
                    vol : "1.0 M",
                    freq : "6,274",
                    fbuy : "4,350",
                    fsell : "1,924",
                    fnet : "2,426",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 25,
                    code : "BBRI",
                    prev : "1,980",
                    last : "1,945",
                    change : "-35",
                    persen : "-1.8",
                    open : "1,980",
                    low : "1,945",
                    high : "1,985",
                    avg : "1,961",
                    val : "24.9",
                    vol : "126.783",
                    freq : "4,092",
                    fbuy : "1,945",
                    fsell : "2,147",
                    fnet : "-202",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 26,
                    code : "WIKA",
                    prev : "2,240",
                    last : "2,180",
                    change : "-60",
                    persen : "-2.7",
                    open : "2,240",
                    low : "2,150",
                    high : "2,240",
                    avg : "2,186",
                    val : "49.7",
                    vol : "227,402",
                    freq : "2,794",
                    fbuy : "2,170",
                    fsell : "624",
                    fnet : "1,546",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 27,
                    code : "ASRI",
                    prev : "2,350",
                    last : "2,340",
                    change : "-10",
                    persen : "-0.4",
                    open : "2,350",
                    low : "2,300",
                    high : "2,370",
                    avg : "2,337",
                    val : "41.2",
                    vol : "176,162",
                    freq : "3,255",
                    fbuy : "2,330",
                    fsell : "925",
                    fnet : "1,405",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 28,
                    code : "PPTP",
                    prev : "1,160",
                    last : "1,170",
                    change : "+10",
                    persen : "+0.9",
                    open : "1,155",
                    low : "1,155",
                    high : "1,200",
                    avg : "1,182",
                    val : "9.6",
                    vol : "81,047",
                    freq : "1,201",
                    fbuy : "1,170",
                    fsell : "31",
                    fnet : "1,139",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 29,
                    code : "BMRI",
                    prev : "346",
                    last : "346",
                    change : "0",
                    persen : "0",
                    open : "346",
                    low : "338",
                    high : "350",
                    avg : "343",
                    val : "1.9",
                    vol : "54,681",
                    freq : "12,378",
                    fbuy : "344",
                    fsell : "12,034",
                    fnet : "11,690",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 30,
                    code : "CTRA",
                    prev : "1,075",
                    last : "1,065",
                    change : "-10",
                    persen : "-0.9",
                    open : "1,080",
                    low : "1,050",
                    high : "1,115",
                    avg : "1,073",
                    val : "38.2",
                    vol : "355,717",
                    freq : "2,692",
                    fbuy : "1,065",
                    fsell : "1,627",
                    fnet : "-562",
                    financial : "3,000,000,000,000",
                    action: ""
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
    //lagi
    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
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

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={this.props.typegrid =="summary" ? "card-478 ag-theme-balham-dark ag-striped-odd" : "card-202 ag-theme-balham-dark ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        rowHeight= "32"
                        defaultColDef={this.state.defaultColDef}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class MarketIndicesAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "sector", headerName: "Sector", resizable: true,
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?150:125,
                    minWidth: 125,
                    lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 text-primary locked-col locked-visible";
                    },suppressSizeToFit: true, pinned: 'left'},
                { field: "last", headerName: "Last", filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?160:s=="s75"?140:128,
                    minWidth: 128,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?140:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "persen", headerName: "%" , resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?155:s=="s75"?140:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "prevclosed", headerName: "Prev. Closed", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?190:s=="s50"?180:s=="s67"?160:s=="s75"?135:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "open", headerName: "Open", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?145:s=="s75"?133:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "high", headerName: "High", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?143:s=="s75"?133:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "low", headerName: "Low", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s60"?160:s=="s67"?145:s=="s75"?135:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "volume", headerName: "Volume", resizable: true, width: 122,
                    minWidth: 122, filter: "agNumberColumnFilter",
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "value", headerName: "Value (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?162:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fbuy", headerName: "F.Buy (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?140:s=="s75"?132:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fsell", headerName: "F.Sell (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?180:s=="s60"?170:s=="s75"?150:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fnet", headerName: "F.Net (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?230:s=="s50"?220:s=="s75"?150:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: false,
                filter: true,
            },
            rowData: [
                {
                    sector : "AGRI",
                    last : "1,450,595",
                    change : "12,139",
                    persen : "12",
                    prevclosed : "1,462,73",
                    open : "1,462,73",
                    high: "1,488,19",
                    low : "1,450,07",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "BASIC-IND",
                    last : "764,357",
                    change : "8,727",
                    persen : "8",
                    prevclosed : "773,084",
                    open : "773,084",
                    high: "773,837",
                    low : "765,718",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "CONSUMER",
                    last : "2,401,342",
                    change : "3,777",
                    persen : "3",
                    prevclosed : "2,405,119",
                    open : "2,405,119",
                    high: "2,420,738",
                    low : "2,395,573",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "FINANCE",
                    last : "1,289,866",
                    change : "1,492",
                    persen : "1",
                    prevclosed : "1,291,358",
                    open : "1,291,358",
                    high: "1,291,937",
                    low : "1,288,628",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "INFRASTUCTUR",
                    last : "1,184,857",
                    change : "6,146",
                    persen : "6",
                    prevclosed : "1,191,003",
                    open : "1,191,003",
                    high: "1,198,257",
                    low : "1,188,002",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "MINING",
                    last : "16,452",
                    change : "84,267",
                    persen : "8",
                    prevclosed : "1,729,467",
                    open : "1,729,467",
                    high: "1,729,911",
                    low : "1,646,26",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "MISC-IND",
                    last : "1,275,075",
                    change : "-1,017",
                    persen : "-1",
                    prevclosed : "1,274,058",
                    open : "1,274,058",
                    high: "1,283,462",
                    low : "1,261,231",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "PROPERTY",
                    last : "4,883",
                    change : "-1,769",
                    persen : "-17",
                    prevclosed : "486,531",
                    open : "486,531",
                    high: "491,971",
                    low : "485,299",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "TRADE",
                    last : "799,128",
                    change : "3,053",
                    persen : "3",
                    prevclosed : "802,181",
                    open : "802,181",
                    high: "803,575",
                    low : "798,562",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
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
                    className="grid-294 ag-theme-balham-dark ag-striped-even"
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

class MarketNonIndicesAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "index", headerName: "Index Name", resizable: true,
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?150:125,
                    minWidth: 125,
                    lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 text-primary locked-col locked-visible";
                    },suppressSizeToFit: true, pinned: 'left'},
                { field: "last", headerName: "Last", filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?180:s=="s67"?160:s=="s75"?140:128,
                    minWidth: 128,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?140:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "persen", headerName: "%" , resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?155:s=="s75"?140:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "prevclosed", headerName: "Prev. Closed", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?190:s=="s50"?180:s=="s67"?160:s=="s75"?135:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "open", headerName: "Open", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?145:s=="s75"?133:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "high", headerName: "High", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?143:s=="s75"?133:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "low", headerName: "Low", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s60"?160:s=="s67"?145:s=="s75"?135:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "volume", headerName: "Volume", resizable: true, width: 122,
                    minWidth: 122, filter: "agNumberColumnFilter",
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "value", headerName: "Value (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?200:s=="s50"?190:s=="s67"?170:s=="s75"?162:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fbuy", headerName: "F.Buy (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?170:s=="s50"?160:s=="s67"?140:s=="s75"?132:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fsell", headerName: "F.Sell (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?180:s=="s60"?170:s=="s75"?150:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fnet", headerName: "F.Net (T)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?230:s=="s50"?220:s=="s75"?150:122,
                    minWidth: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: false,
                filter: true,
            },
            rowData: [
                {
                    index : "AGRI",
                    last : "1,450,595",
                    change : "12,139",
                    persen : "12",
                    prevclosed : "1,462,73",
                    open : "1,462,73",
                    high: "1,488,19",
                    low : "1,450,07",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "BASIC-IND",
                    last : "764,357",
                    change : "8,727",
                    persen : "8",
                    prevclosed : "773,084",
                    open : "773,084",
                    high: "773,837",
                    low : "765,718",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "CONSUMER",
                    last : "2,401,342",
                    change : "3,777",
                    persen : "3",
                    prevclosed : "2,405,119",
                    open : "2,405,119",
                    high: "2,420,738",
                    low : "2,395,573",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "FINANCE",
                    last : "1,289,866",
                    change : "1,492",
                    persen : "1",
                    prevclosed : "1,291,358",
                    open : "1,291,358",
                    high: "1,291,937",
                    low : "1,288,628",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "INFRASTUCTUR",
                    last : "1,184,857",
                    change : "6,146",
                    persen : "6",
                    prevclosed : "1,191,003",
                    open : "1,191,003",
                    high: "1,198,257",
                    low : "1,188,002",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "MINING",
                    last : "16,452",
                    change : "84,267",
                    persen : "8",
                    prevclosed : "1,729,467",
                    open : "1,729,467",
                    high: "1,729,911",
                    low : "1,646,26",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "MISC-IND",
                    last : "1,275,075",
                    change : "-1,017",
                    persen : "-1",
                    prevclosed : "1,274,058",
                    open : "1,274,058",
                    high: "1,283,462",
                    low : "1,261,231",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "PROPERTY",
                    last : "4,883",
                    change : "-1,769",
                    persen : "-17",
                    prevclosed : "486,531",
                    open : "486,531",
                    high: "491,971",
                    low : "485,299",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "TRADE",
                    last : "799,128",
                    change : "3,053",
                    persen : "3",
                    prevclosed : "802,181",
                    open : "802,181",
                    high: "803,575",
                    low : "798,562",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "TRADE",
                    last : "799,128",
                    change : "3,053",
                    persen : "3",
                    prevclosed : "802,181",
                    open : "802,181",
                    high: "803,575",
                    low : "798,562",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "TRADE",
                    last : "799,128",
                    change : "3,053",
                    persen : "3",
                    prevclosed : "802,181",
                    open : "802,181",
                    high: "803,575",
                    low : "798,562",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    index : "TRADE",
                    last : "799,128",
                    change : "3,053",
                    persen : "3",
                    prevclosed : "802,181",
                    open : "802,181",
                    high: "803,575",
                    low : "798,562",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
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
                    className="grid-294 ag-theme-balham-dark ag-striped-even"
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

class TopBrokerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: s=="s49"?140:s=="s50"?90:s=="s67"?70:50, minWidth:50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, resizable: true,
                    width: s=="s49"?200:s=="s50"?170:s=="s67"?140:120,minWidth:120,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?500:s=="s50"?460:s=="s67"?420:s=="s75"?410:s=="s80"?370:s=="s90"?300:240,minWidth:240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?300:s=="s50"?270:s=="s67"?250:s=="s75"?240:s=="s80"?230:s=="s90"?180:150,minWidth:150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "bval", headerName: "B. Val(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?300:s=="s50"?270:s=="s67"?240:s=="s75"?230:s=="s80"?210:s=="s90"?190:170,minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "sval", headerName: "S. Val(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?290:s=="s50"?280:s=="s67"?240:s=="s75"?230:s=="s80"?210:s=="s90"?190:175,minWidth: 175,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?270:s=="s50"?220:s=="s67"?200:190,minWidth:190,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?390:s=="s50"?380:s=="s67"?350:s=="s75"?340:s=="s80"?210:s=="s90"?190:170,minWidth:170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 6,
                    code: "AK",
                    company: "UBS Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 7,
                    code: "YP",
                    company: "Mirae Asset Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 8,
                    code: "CC",
                    company: "Mandiri Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},],
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
            getRowHeight: function (params) {
                return 23;
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
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
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

class TopBrokerBAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: s=="s49"?140:50,minWidth:50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?195:s=="s67"?180:120,minWidth:120, uppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?520:s=="s50"?500:s=="s67"?420:s=="s75"?410:s=="s80"?370:s=="s90"?300:240,
                    minWidth: 240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?330:s=="s50"?300:s=="s67"?250:s=="s75"?240:s=="s80"?230:s=="s90"?180:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "bval", headerName: "B. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?325:s=="s50"?300:s=="s67"?250:s=="s75"?230:s=="s80"?210:s=="s90"?190:170,
                    minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?300:260,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?570:s=="s50"?550:s=="s67"?500:s=="s75"?480:s=="s80"?350:s=="s90"?310:275,
                    minWidth: 275,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 23;
            },
            rowData: [{ no: 1,
                code: "DX",
                company: "Bahana Sekuritas",
                tval: "99.64",
                bval: "61.62",
                sval: "38.62",
                tvol: "104.73",
                tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
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
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
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

class TopBrokerSAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: s=="s49"?140:50, minWidth: 50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?200:s=="s50"?195:s=="s67"?180:120, minWidth: 120,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?520:s=="s50"?500:s=="s67"?420:s=="s75"?410:s=="s80"?370:s=="s90"?300:240,
                    minWidth: 240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?330:s=="s50"?300:s=="s67"?250:s=="s75"?240:s=="s80"?230:s=="s90"?180:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "sval", headerName: "S. Val(T)", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?325:s=="s50"?300:s=="s67"?250:s=="s75"?230:s=="s80"?210:s=="s90"?190:170,
                    minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?300:260, minWidth: 260,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?570:s=="s50"?550:s=="s67"?500:s=="s75"?480:s=="s80"?350:s=="s90"?310:275,
                    minWidth: 275,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 23;
            },
            rowData: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
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
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
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

const StatisticMarketStatistikPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        codeSearchMarketIndex:vars.codeSearchMarketIndex,
        // data Stream
        indexStreamChart:vars.indexStreamChart,
        streamChart:vars.streamChart,
        timeChart:vars.timeChart,
        streamStatus:vars.streamStatus,
        handleStreamChart: (streamStatus) => { actions.sendAction('handleStreamChart', { streamStatus }) },
        handleSearchCode: (newCode) => { actions.sendAction('handleSearchCode', { newCode }) },
    }),
    ["handleStreamChart","handleSearchCode"]
)(StatisticMarketStatistikPage_Base);

export default MarketStatistikPage;
export {CustomFrameHeaderMarketStatistik, MarketStatistik,
    StatisticMarketStatistikPage,
    IndiceMarketStatistikPage,
    IndiceMarketSecondStatistikPage,
    TopBrokerMarketStatistikPage,
    CurrenciesMarketStatistikPage,
    NewResearchMarketStatistikPage,
    NonSectoralStatistikPage,
    GeneralNewResearchPage, StockNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage};