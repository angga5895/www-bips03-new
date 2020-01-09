import React from 'react';
import { AppFrameAction } from '../appframe.js';
import {WSConnectionAction} from "../appnetwork";
import ModalBuy from "./../app_modals/modal_buy";
import ModalSell from "./../app_modals/modal_sell";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import {AgGridReact} from "ag-grid-react";
import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";
import Switch from "react-switch";
import $ from 'jquery';
window.$ = window.jQuery = $;

class NewSwitch extends React.PureComponent {
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    render() {
        return (
            <div>
                <Switch onChange={this.handleChange} height={20} checked={this.state.checked} />
            </div>
        );
    }
}

class LiveTradePage extends React.PureComponent {
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

    constructor(props) {
        super(props);
        this.state = {
            selected: "1",
        }
    }

    ceksize(){
        if(window.innerWidth > 1265 && window.innerWidth <= 1370){
            return "s110";
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
            return "s100";
        }
    }

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="row pl-4 pt-2 pb-3 h-48 f-livetrade">
                    <div
                        className={`col-md-1 px-0 pt-3 text-center
                        ${this.state.selected == 1?"livetradeMenuActive":"livetradeMenu"}`}
                        onClick={()=>this.setState({selected:1})}
                    >
                        <i className={this.state.selected == 1 ? "far fa-dot-circle" : "far fa-circle"}></i>
                        &nbsp;&nbsp;&nbsp;
                        All
                    </div>
                    <div
                        className={`col-md-1 px-0 pt-3 text-center
                        ${this.state.selected == 2?"livetradeMenuActive":"livetradeMenu"}`}
                        onClick={()=>this.setState({selected:2})}
                    >
                        <i className={this.state.selected == 2 ? "far fa-dot-circle" : "far fa-circle"}></i>
                        &nbsp;
                        WatchList
                    </div>
                    <div
                        className={`col-md-1 px-0 pt-3 text-center
                        ${this.state.selected == 3?"livetradeMenuActive":"livetradeMenu"}`}
                        onClick={()=>this.setState({selected:3})}
                    >
                        <i className={this.state.selected == 3 ? "far fa-dot-circle" : "far fa-circle"}></i>
                        &nbsp;
                        Foreign
                    </div>
                    <div
                        className={`col-md-1 px-0 pt-3 text-center
                        ${this.state.selected == 4?"livetradeMenuActive":"livetradeMenu"}`}
                        onClick={()=>this.setState({selected:4})}
                    >
                        <i className={this.state.selected == 4 ? "far fa-dot-circle" : "far fa-circle"}></i>
                        &nbsp;
                        Tick
                    </div>
                    <div
                        className={`col-md-1 px-0 pt-3 text-center
                        ${this.state.selected == 5?"livetradeMenuActive":"livetradeMenu"}`}
                        onClick={()=>this.setState({selected:5})}
                    >
                        <i className={this.state.selected == 5 ? "far fa-dot-circle" : "far fa-circle"}></i>
                        &nbsp;
                        Non-RG</div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1 pt-3">
                        <NewSwitch/>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-3 pt-1 text-center pr-0">
                            <button className="d-border col-sm-5 btn btn-success mr-3" onClick={this.buttonClickSell}><span>Sell</span></button>
                            <button className="d-border col-sm-5 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>

                    </div>
                </div>
                <div className="col-sm-12 row px-0 mx-0 row">
                    <div className="col-sm-7 px-2 mx-0 card-520">
                        <div className="bg-trading-gray">
                            <LiveTradeAgGrid size={this.ceksize()}/>
                        </div>
                    </div>
                    <div className="col-sm-5 px-2 mx-0 bg-grey card-520 f-12">
                        <TableInfoTransaction lotshare="infoLiveTradePage"/>
                    </div>
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

class LiveTradeAgGrid_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?155:s=="s50"?145:s=="s67"?135:s=="s75"?130:s=="s80"?120:s=="s110"?80:100,
                    minWidth: 100, cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?145:s=="s67"?125:s=="s75"?120:s=="s80"?100:s=="s110"?60:70,
                    minWidth: 70,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-left grid-table d-border-aggrid-right f-12 locked-visible";
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?145:s=="s67"?125:s=="s75"?120:s=="s80"?100:s=="s110"?55:80,
                    minWidth: 80,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?160:s=="s50"?145:s=="s67"?125:s=="s75"?120:s=="s80"?100:85,
                    minWidth: 85,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "percent", headerName: "%", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?145:s=="s50"?120:s=="s67"?105:s=="s75"?100:s=="s80"?80:63,
                    minWidth: 63,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?140:s=="s50"?120:s=="s67"?115:s=="s75"?110:s=="s80"?90:70, minWidth: 70,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "buyer", headerName: "Buyer", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?155:s=="s50"?145:s=="s67"?130:s=="s75"?125:s=="s80"?105:s=="s90"?110:85,
                    minWidth: 85,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var buyer = params.data.buyer;
                        var sBuyer = buyer.split('-');

                        return sBuyer[0].includes('F') === true ? '<span class="text-success">'+sBuyer[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sBuyer[1] :
                            '<span class="text-warning">'+sBuyer[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sBuyer[1];
                    } },
                { field: "seller", headerName: "Seller", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?155:s=="s50"?140:s=="s67"?125:s=="s75"?125:s=="s80"?110:s=="s90"?110:85,
                    minWidth: 85,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var seller = params.data.seller;
                        var sSeller = seller.split('-');

                        return sSeller[0].includes('F') === true ? '<span class="text-success">'+sSeller[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sSeller[1] :
                            '<span class="text-warning">'+sSeller[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sSeller[1];
                    } },
                { field: "board", headerName: "Board", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?155:s=="s50"?155:s=="s67"?135:s=="75"?130:s=="s80"?120:s=="s90"?120:90, minWidth: 90,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function (params) {
                if (props.scaleState === "100" || props.scaleState === "110" || props.scaleState === "120"){
                    var heightLiveTrade = 26;
                } else if (props.scaleState === "90"){
                    var heightLiveTrade = 30;
                } else if (props.scaleState === "80"){
                    var heightLiveTrade = 32;
                }
                return heightLiveTrade;
            },
            rowData: [
                { time: "09:13:37",
                    code: "TLKM"+props.size,
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" }, { time: "09:13:37",
                    code: "TLKM"+props.size,
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" }, { time: "09:13:37",
                    code: "TLKM"+props.size,
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" }, { time: "09:13:37",
                    code: "TLKM"+props.size,
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" }, { time: "09:13:37",
                    code: "TLKM"+props.size,
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "AALI",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ASRI",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "PPTP",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BBCA",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "WSKT",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BBRI",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "CTRA",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ANTM",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ASII",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "PTSP",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "GGRM",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BYAN",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "INDF",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "RDTX",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "TCPI",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "SMMA",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "FASW",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "UNTR",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "UNVR",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },],
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
                    className="card card-520 ag-theme-balham-dark ag-header-border-gray-live-trade ag-striped-odd"
                    style={{
                        width: 'auto' }}>
                    <span>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            defaultColDef={this.state.defaultColDef}
                            getRowHeight={this.state.getRowHeight}
                            onGridReady={this.onGridReady}
                            onFirstDataRendered={this.onFirstDataRendered}>
                        </AgGridReact>
                    </span>
                </div>
            </>
        );
    }
}

const LiveTradeAgGrid = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        scaleState: vars.scaleState,
    }),
)(LiveTradeAgGrid_Base);

export default LiveTradePage;
