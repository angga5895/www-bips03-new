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
            <div className="switchClass">
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

    }

    state = {
        value: "watchlist",
    }

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 row h-45">
                    <div className="col-mbl-radio px-0 mx-0 row">
                        <ul className="ul-radio col-sm-12 px-0 mx-0 row h-37">

                            <li className="li-radio col-radio-sm px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "all"
                                    })
                                }
                            }>
                                <input type="radio" id="a-option" name="selector" checked={this.state.value == "all" ? true : false}/>
                                <label htmlFor="a-option">All</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "watchlist"
                                    })
                                }
                            }>
                                <input type="radio" id="f-option" name="selector" checked={this.state.value == "watchlist" ? true : false}/>
                                <label htmlFor="f-option">Watchlist</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "foreign"
                                    })
                                }
                            }>
                                <input type="radio" id="s-option" name="selector" checked={this.state.value == "foreign" ? true : false}/>
                                <label htmlFor="s-option">Foreign</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "tick"
                                    })
                                }
                            }>
                                <input type="radio" id="t-option" name="selector" checked={this.state.value == "tick" ? true : false}/>
                                <label htmlFor="t-option">Tick</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-title-radio px-0 mx-0 col-sm-2">
                                <NewSwitch/>
                            </li>
                        </ul>
                    </div>
                    <div className="col-mbl-radio-o px-0 mx-0">
                        <div className="title-radio-right col-sm-12 pull-right text-right pt-2">
                            <button className="d-border mx-1 col-sm-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                            <button className="d-border mx-1 col-sm-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 row px-0 mx-0 row">
                    <div className="col-sm-7 px-2 mx-0">
                        <div className="bg-trading-gray">
                            <LiveTradeAgGrid />
                        </div>
                    </div>
                    <div className="col-sm-5 px-2 mx-0 bg-grey">
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
        this.state = {
            columnDefs: [
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 100, minWidth: 100, cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 70,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table d-border-aggrid-right f-12 locked-visible";
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 80, minWidth: 80, cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 85,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "percent", headerName: "%", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 63, minWidth: 63,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 70, minWidth: 70,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            "text-success text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "buyer", headerName: "Buyer", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 85,
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
                    width: 85,
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
                    width: 90, minWidth: 90,
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
                    code: "TLKM",
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
                    className="card card-515 ag-theme-balham-dark ag-header-border-gray-live-trade ag-striped-odd"
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
