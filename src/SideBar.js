import React from "react";
import {Button, Table} from "react-bootstrap";
import Select from "react-select";
import {cssmode} from "./App";
import {Dropdown} from "semantic-ui-react";
import {RegisterAmendModal} from "./app_pages/stockPage";
import {AppFrameAction} from "./appframe";


const option = [
    { key: 'groupA', value: 'groupA', text: 'Group A' },
    { key: 'groupB', value: 'groupB', text: 'Group B' },
    { key: 'groupC', value: 'groupC', text: 'Group C' },
    { key: 'groupD', value: 'groupD', text: 'Group D' },
    { key: 'groupE', value: 'groupE', text: 'Group E' }
];

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rowData: [
                {
                    name: "AALI",
                    last: "41,560",
                },
                {
                    name: "ADHI",
                    last: "12,750",
                },
                {
                    name: "ANTM",
                    last: "15,350",
                },
                {
                    name: "ASII",
                    last: "30,540",
                },
                {
                    name: "TLKM",
                    last: "70,000",
                },
                {
                    name: "WSKT",
                    last: "12,500",
                },
                {
                    name: "INDF",
                    last: "24,600",
                },
                {
                    name: "BBCA",
                    last: "58,950",
                },
                {
                    name: "SMGR",
                    last: "5,400",
                },
                {
                    name: "BUMI",
                    last: "1,025",
                },
            ],
        }
    }

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

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div id="mySideBar" className="col-sm-sidebar px-0 mx-0 bg-black-trading d-border-right d-border-left d-border-top card-575 d-border-bottom">
                    <div className="flex-grow-1">
                        <div className="flex-lg-column mb-1 cssmenu">
                            <div className="align-self-center text-center d-border-bottom col-sm-12 paddingY-2 px-0 mx-0 click-pointer">
                                <i className="fa-2x icon-icon-stock-list"></i>
                            </div>
                        </div>
                        <div className="align-self-center text-center px-1 py-0 h-25">
                            <buttom className="f-9 col-sm-12 px-0 my-0 py-2 btn btn-sm btn-dark h-22" onClick={this.buttonClickAmendRegister}>
                                <i className="icofont icofont-edit"></i> &nbsp; Modify
                            </buttom>
                        </div>
                        <div className="nav flex-lg-column">
                            <div className="nav-link align-self-center text-center px-0 d-border col-sm-12 mt-0 mb-0 py-0">
                                <Dropdown placeholder='Group' search selection options={option} className={"f-9 text-center align-self-center col-sm-12 grey h-31"} defaultValue="groupA"/>
                            </div>
                            <div className="d-sidebar-potrait px-0">
                                <Table size="sm" borderless className="table-sidebar card-452 mb-0">
                                    <tbody>
                                    {
                                        this.state.rowData.map((charx, index) => {
                                            return (
                                                <tr className="d-border-bottom px-3">
                                                    <td className="px-3">
                                                        <div className="align-self-center text-center click-pointer">
                                                            <h5 className="mb-1">{charx.name}</h5>
                                                            <p className="f-11-center mb-1 text-danger">{charx.last}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td className="py-0 px-3">
                                            <div className="align-self-center text-center click-pointer">
                                                <i className="icofont icofont-ui-next text-bips-dark f-16"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </Table>
                            </div>

                                {
                                    this.state.rowData.map((charx, index) => {
                                        return (
                                            <div
                                                className="align-self-center text-center px-sidebar my-sidebar click-pointer d-border-bottom d-sidebar-landscape">
                                                <h5 className="mb-2">{charx.name}</h5>
                                                <p className="f-11-center mb-1 text-danger">{charx.last}</p>
                                            </div>
                                        )
                                    })
                                }

                                <div className="align-self-center text-center px-sidebar py-0 d-sidebar-landscape">
                                    <div className="align-self-center text-center click-pointer">
                                        <i className="icofont icofont-ui-next text-bips-dark f-16"></i>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class SelectGroup extends React.Component {
    /*selectStyleNight = theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                neutral0: '#3D3E3F',
                neutral20 : '#333332',
                neutral30 : '#333332',
                neutral40 : '#1A1A1A',
                neutral80 : '#FFFFFF',
                primary75 : '#FFFFFF',
                primary50 : '#4D4D4E',
                primary25 : '#4D4D4E',
                primary : '#0071BC',
                /!*primary : '#808282',*!/
            },
        });

    selectStyleLight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            /!*neutral0: '#E7E8E8',*!/
            neutral0: '#CDCDCE',
            neutral20 : '#DDDDDD',
            neutral30 : '#DDDDDD',
            neutral40 : '#767676',
            neutral80 : '#999999',
            primary75 : '#999999',
            primary50 : '#F3F3F3',
            primary25 : '#F3F3F3',
            primary : '#0071BC',
            /!*primary : '#808282',*!/
        },
    });*/
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-sm-12 px-0 mx-0 text-white">
                <div className="col-md-12 bg-grey-mystic px-0 text-center">
                    <Select
                        className="f-9 col-sm-12 px-0 text-center"
                        defaultValue={option[0]}
                        label="Single select"
                        options={option}
                        theme={this.props.themestyle}
                    />
                </div>
            </div>
        );
    }
}

export default SideBar;