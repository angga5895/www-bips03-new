import React from "react";
import {AppFrameAction} from "./../appframe";
import {Table} from "react-bootstrap";
import {AgGridReact} from "ag-grid-react";
import CustomTooltip from "../app_pages/CustomTooltip";

class ModalOrderDetail extends React.PureComponent{
    render() {
        return (
            <>
                <style>{'' +
                'thead.orderdetail th {' +
                '    background-color: var(--warna-header-card)!important;' +
                '}' +
                ''}
                </style>
                <div className="col-sm-12 text-white px-0 mx-0 py-2 f-12">
                    <div className="col-sm-12 row mx-0 px-0">
                        <Table size="sm" responsive bordered className="text-white">
                            <thead></thead>
                            <tbody className="f-12">
                            <tr>
                                <td colSpan="2" className="f-14 bg-gray-tradding text-center font-weight-bold py-2">ORDER DETAIL</td></tr>
                            <tr>
                                <td className="pt-2 pb-2">Order Number</td>
                                <td className="bg-black-trading hover-tables pt-2 pb-2">001682</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Market Order Number</td>
                                <td className="hover-tables pt-2 pb-2">MKT021</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Code</td>
                                <td className="bg-black-trading hover-tables pt-2 pb-2">AALI [Astra Argo Lestari Tbk.]</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Command</td>
                                <td className="text-danger hover-tables pt-2 pb-2">Buy</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Type</td>
                                <td className="bg-black-trading hover-tables pt-2 pb-2">Day</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Market</td>
                                <td className="hover-tables pt-2 pb-2">RG</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Price</td>
                                <td className="hover-tables pt-2 pb-2">RG</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Total Match Volume (Lot)</td>
                                <td className="bg-black-trading hover-tables pt-2 pb-2">70</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Order Volume (Lot)</td>
                                <td className="hover-tables pt-2 pb-2">88,550,000</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Order By</td>
                                <td className="bg-black-trading hover-tables pt-2 pb-2">23,999</td>
                            </tr>
                            <tr>
                                <td className="pt-2 pb-2">Status</td>
                                <td className="bg-black-trading hover-tables pt-2 pb-2">Pending</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-sm-12 text-white px-0 mx-0 py-2">
                    <div className="card bg-grey">
                        <div className="card-body mx-0 px-0 my-0 py-0">
                            <OrderLictCodeAgGrid/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class OrderLictCodeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "dateTop", headerName: "", sortable: true,
                    filter: "agTextColumnFilter", resizable: true,
                    width: 69, minWidth: 69, lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                    }, suppressSizeToFit: true, children: [{
                        field: "dateO", headerName: "Date", sortable: true,
                        filter: "agTextColumnFilter", resizable: true,
                        width: 69, minWidth: 69, lockPosition: true, lockVisible: true,
                        cellClass : function (params) {
                            return " grid-table text-center f-12 locked-visible locked-col d-border-aggrid-right";
                        }, suppressSizeToFit: true
                    },]},
                { field: "timeTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 150,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "timeO", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 80, minWidth: 80,
                            cellClass : function (params) {
                                return "text-center grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "marketOrderTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 150,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "marketOrderNo0", headerName: "Market Order No.", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 140, minWidth: 140,
                            cellClass : function (params) {
                                return "text-center grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "actionsTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width:160,
                    cellClass : function (params) {
                        var pl = params.data.actionsO;
                        return pl.includes('-') === true ? "text-danger text-center grid-table f-12 d-border-aggrid-right text-uppercase" :
                            "text-success text-center grid-table f-12 d-border-aggrid-right text-uppercase";
                    }, children: [{ field: "actionsO", headerName: "Action", sortable: true, filter: "agTextColumnFilter", resizable: true,
                        width: 80, minWidth: 80,
                        cellClass : function (params) {
                            var pl = params.data.actionsO;
                            return pl === 'buy' ? "text-danger text-center grid-table f-12 d-border-aggrid-right text-uppercase" :
                                pl === 'sell' ? "text-success text-center grid-table f-12 d-border-aggrid-right text-uppercase" :
                                pl === 'amend' ? "text-primary text-center grid-table f-12 d-border-aggrid-right text-uppercase" :
                                pl === 'withdraw' ? "text-warning text-center grid-table f-12 d-border-aggrid-right text-uppercase" :
                                    "text-center grid-table f-12 d-border-aggrid-right text-uppercase";
                        }
                    },],
                },
                { field: "statusTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 130,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 d-border-aggrid-right text-capitalize";
                    }, children: [
                        { field: "statusO", headerName: "Status", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 130, minWidth: 130,
                            cellClass : function (params) {
                                return " text-center grid-table f-12 d-border-aggrid-right text-capitalize";
                            }
                        },
                    ],
                },
                { field: "remaksTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 230, suppressSizeToFit: true,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right text-capitalize";
                    }, children: [
                        { field: "remarksO", headerName: "Remark", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            suppressSizeToFit: true,tooltipField: 'remarksO',
                            tooltipComponentParams: { type: 'remarksO' },
                            
                            width: 230, minWidth: 230,
                            cellClass : function (params) {
                                return " text-center grid-table f-12 d-border-aggrid-right text-capitalize";
                            }
                        },
                    ],
                },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 260,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                    ,
                    children: [
                        { field: "vlot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 80, minWidth: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },

                    ]
                },
                { field: "priceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "priceO", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 100, minWidth: 100,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "matchvol", headerName: "Match Vol", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    cellClass : function (params) {
                        return " text-center grid-table f-12 d-border-aggrid-right";
                    }
                    ,
                    children: [
                        { field: "mlot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 80, minWidth: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                        { field: "mshares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 80, minWidth: 80,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            },
                        }
                    ]
                },
                { field: "matchpriceTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 110,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "matchpriceO", headerName: "Match Price", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 110, minWidth: 110,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "leaveVolTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 110,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "leaveVol0", headerName: "Leave Vol(Lot)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 150, minWidth: 150,
                            cellClass : function (params) {
                                return " text-right grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
                { field: "userIdTop", headerName: "", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 110,
                    cellClass : function (params) {
                        return " text-right grid-table f-12 d-border-aggrid-right";
                    }, children: [
                        { field: "userId0", headerName: "User ID", sortable: true, filter: "agTextColumnFilter", resizable: true,
                            width: 110, minWidth: 110,
                            cellClass : function (params) {
                                return " text-center grid-table f-12 d-border-aggrid-right";
                            }
                        },
                    ],
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                tooltipComponent: 'customTooltip',

            },
            tooltipShowDelay: 0,
            frameworkComponents: {customTooltip: CustomTooltip},
            rowData: [
                { dateO: "04/07/2019",
                    timeO: "11:22:17",
                    actionsO: "withdraw",
                    statusO: "done",
                    remarksO: "Order Amend Request Confirmed 123123123",
                    vlot: "10",
                    vshares: "1,000",
                    priceO: "12,650",
                    mlot: "",
                    mshares: ""   ,
                    matchpriceO:"",
                    amountO:"12,650,000" ,
                    marketOrderNo0: "MKT0001",
                    leaveVol0: "10",
                    userId0: "johndide",
                },
                { dateO: "04/07/2019",
                    timeO: "11:12:10",
                    actionsO: "",
                    statusO: "partial",
                    remarksO: "Order Amend Request Confirmed",
                    vlot: "30",
                    vshares: "3,000",
                    priceO: "12,650",
                    mlot: "20",
                    mshares: "2,000"   ,
                    matchpriceO:"12,600",
                    amountO:"25,300,000",
                    marketOrderNo0: "MKT0002",
                    leaveVol0: "10",
                    userId0: "johndide",
                },
                { dateO: "04/07/2019",
                    timeO: "11:10:17",
                    actionsO: "amend",
                    statusO: "done",
                    remarksO: "",
                    vlot: "30",
                    vshares: "3,000",
                    priceO: "12,650",
                    mlot: "",
                    mshares: ""   ,
                    matchpriceO:"",
                    amountO:"37,950,000",
                    marketOrderNo0: "MKT0003",
                    leaveVol0: "10",
                    userId0: "johndide",
                },
                { dateO: "04/07/2019",
                    timeO: "11:02:55",
                    actionsO: "",
                    statusO: "partial",
                    remarksO: "patial match",
                    vlot: "100",
                    vshares: "10,000",
                    priceO: "12,650",
                    mlot: "50",
                    mshares: "5,000"   ,
                    matchpriceO:"12,600",
                    amountO:"63,250,000",
                    marketOrderNo0: "MKT0004",
                    leaveVol0: "10",
                    userId0: "johndide",},
                { dateO: "04/07/2019",
                    timeO: "11:00:23",
                    actionsO: "buy",
                    statusO: "done",
                    remarksO: "",
                    vlot: "100",
                    vshares: "10,000",
                    priceO: "12,650",
                    mlot: "",
                    mshares: ""   ,
                    matchpriceO:"",
                    amountO:"126,500,000",
                    marketOrderNo0: "MKT0005",
                    leaveVol0: "10",
                    userId0: "johndide",
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
                    className={"card-233 ag-theme-balham-dark ag-bordered ag-header-gray table-bordered ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        tooltipShowDelay={this.state.tooltipShowDelay}
                        frameworkComponents={this.state.frameworkComponents}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

export default ModalOrderDetail;