import React from "react";
import { AppFrameAction } from "./../appframe";
import user_avatar from './../img/man.png';
// import '../App-costum.css';

import { AgGridReact } from 'ag-grid-react';

class ModalPortofolio extends React.Component {
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
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
            // borderBottom: '2px solid var(--warna-inactive-gradient)'
        }


        return (
            <>
                <AppFrameAction ref="frameAction" />
                {/* <div classNameName="text-white f-12">
                    <div classNameName="col sm-8 px-0 mx-0 row">
                        <div classNameName="col-sm-6 pr-3 pl-0 mt-4">
                            <TableInfoTransaction lotshare="modalbuy" />
                        </div>
                        <div classNameName="col-sm-6 mt-4 d-border-active">
                            <FormBuy cb1="checkbox1modalbuy" cb2="checkbox2modalbuy" cb3="checkbox3modalbuy" />
                        </div>
                    </div>
                </div> */}

                <div className="container-fluid">
                    {/* <div className="row">
                        <div className="col-md-12" style={divMargin}>
                            <h4>Portofolio & Balance</h4>
                        </div>
                    </div> */}
                    <div className="row f-12">
                        <div className="col-md-4">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="list-group f-14">
                                        <li className="list-group-item-portofolio">Cash and Balance <span className="text-primary pull-right">5,911,198</span></li>
                                        <li className="list-group-item-portofolio">P/L <span className="text-success pull-right">1,496,198</span></li>
                                        <li className="list-group-item-portofolio">P/L Ratio <span className="text-success pull-right">+7.50%</span></li>
                                        <li className="list-group-item-portofolio">Cash Ballance T+2 <span className="text-primary pull-right">4,500,000</span></li>
                                        <li className="list-group-item-portofolio">Buy Limit <span className="pull-right">15,980,000</span></li>
                                        <li className="list-group-item-portofolio">Stock Value <span className="pull-right">15,234,000</span></li>
                                        <li className="list-group-item-portofolio">Unsettled Amt <span className="pull-right">?</span></li>
                                        <li className="list-group-item-portofolio">Mkt. Value <span className="pull-right">4,400,000</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12" sty>
                                   <PortofolioAgGrid/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="text-left mt-3 mb-0">Settlement</p>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Date</td>
                                                            <td className="d-border-tr-gray-all py-1">22/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-1">23/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-1">24/6/2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Receiveable</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Payable</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Tax + Fee</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">-30</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Penalty</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Settlement Amount</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">- 1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Cash Balance</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Total</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                        </tr>
                                                    </table>
                                                </div>
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

class PortofolioAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12" :
                            "text-success text-right  grid-table f-12";
                    }
                }, 
                { field: "port", headerName: "Portofolio", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    }
                    ,
                    children: [
                        { field: "lot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            }
                        },
                        { field: "share", headerName: "Share", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            },
                        }
                    ]
                },
               
                { field: "mktvalue", headerName: "Mkt. Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "pl", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    }
                },
                { field: "perc", headerName: "%", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    }
                },

                { field: "sellable", headerName: "Sellable Balance", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                cellClass : function (params) {
                    return " text-center grid-table f-12";
                }
                ,
                children: [
                    { field: "lot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                        cellClass : function (params) {
                            return " text-right grid-table f-12";
                        }
                    },
                    { field: "share", headerName: "Share", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                        cellClass : function (params) {
                            return " text-right grid-table f-12";
                        },
                    }
                ]
            },
                { field: "lqVal", headerName: "Lq. Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        return "text-success text-right  grid-table f-12";
                    }
                },
            
                { field: "stockVal", headerName: "Stock Val (Avg.)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                cellClass : function (params) {
                    var pl = params.data.pl;
                    return "text-success text-right  grid-table f-12";
                }
            }
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
                    indicator : "",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: "",
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    indicator : "",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    indicator : "",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    indicator : "",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    indicator : "",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    indicator : "",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
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
                    indicator : "",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    indicator : "",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: "",
                    action: ""},
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
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
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
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
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
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
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
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
                    className={this.props.gridView == 'grid' ? "card-235 ag-theme-balham-dark ag-bordered ag-header-gray table-bordered" : "card-580 ag-theme-balham-dark ag-bordered ag-header-gray table-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%",
                        height: "185px"
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


export default ModalPortofolio;