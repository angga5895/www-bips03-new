import React from "react";
import { AppFrameAction } from "../appframe";
import user_avatar from './../img/man.png';
// import '../App-costum.css';

import { AgGridReact } from 'ag-grid-react';

import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';

import {Dropdown, Input} from "semantic-ui-react";
import NumberInput from "../numberinput";

const stateOptionsLp = [
    { key: 'lastprice', value: 'lastprice', text: 'Last Price' },
    { key: 'bestofferprice', value: 'bestofferprice', text: 'Best Offer Price' },
    { key: 'bestbidprice', value: 'bestbidprice', text: 'Best Bid Price' },
];

const stateOptionsOperator = [
    { key: 'lebihkecil', value: 'lebihkecil', text: '< =' },
    { key: 'lebihbesar', value: 'lebihbesar', text: '> =' },
];


class ModalFund extends React.Component {
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
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
    };

        const paddingParagraph = {
            padding: '10px'
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
                <div className="container-fluid pl-0 pr-0" >
                    <div className="row d-border-bottom" style={paddingParagraphBottom}>
                        <div className="col-md-3">
                            <div className="row group" style={imgUser} >
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div> */}

                    <div className="row">
                        <div className="col-md-12" style={paddingParagraph}>
                            {/* <PortofolioAgGrid/> */}

                            <div className="col-sm-12 mt-4 bg-black-trading px-0">
                                <div className="cssmenu pb-4 col-sm-12 mx-0 px-0">
                                    <ul>
                                        <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; FUND TRANSFER</span></a></li>
                                        <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; F/T LIST</span></a></li>
                                    </ul>
                                </div>
                                <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                                    <div className="container">
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
                                                    </div>
                                                    <div className="row p-3">
                                                        <div className="col-md-2">
                                                            Transfer Date (T1/T2) 
                                                        </div>
                                                        <div className="col-md-1">
                                                            
                                                        </div>
                                                        <div className="col-md-3">
                                                            <Input defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-12 pl-4 pr-0 text-center align-self-center"/>                                            
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
                                                </div>

                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                                    <div className="d-border-transparent-grey">
                                        <div className="d-border-bottom mb-3">
                                            <div className="form-group mb-3 px-4">
                                                <FundAgGrid/>
                                            </div>
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

class FundAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "date", headerName: "Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "order", headerName: "Order#", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                       return "text-center  grid-table f-12";
                    }
                },
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-danger text-center  grid-table f-12" :
                            "text-success text-center  grid-table f-12";
                    }
                },
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return "text-center  grid-table f-12";
                    }
                },
                { field: "mkt", headerName: "Mkt", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "amount", headerName: "Amount", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                },
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 80 : 100,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
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
                    cmd: "SELL",
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
                    className={this.props.gridView == 'grid' ? "card-235 ag-theme-balham-dark ag-bordered table-bordered" : "card-580 ag-theme-balham-dark ag-bordered table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                        height: "359px"
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

export default ModalFund;