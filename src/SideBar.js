import React from "react";
import {Button, Table} from "react-bootstrap";
import Select from "react-select";
import {cssmode} from "./App";
import {Dropdown} from "semantic-ui-react";
import {RegisterAmendModal} from "./app_pages/stockPage";
import {AppFrameAction} from "./appframe";
import SweetAlert from "react-bootstrap-sweetalert";



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
                    change: 0.55,
                    percent: 3.56,
                },
                {
                    name: "ADHI",
                    last: "12,750",
                    change: -1.95,
                    percent: -0.06,
                },
                {
                    name: "ANTM",
                    last: "15,350",
                    change: 4.50,
                    percent: 0.56,
                },
                {
                    name: "ASII",
                    last: "30,540",
                    change: -1.45,
                    percent: -3.56,
                },
                {
                    name: "TLKM",
                    last: "70,000",
                    change: 0,
                    percent: 0,
                },
                {
                    name: "WSKT",
                    last: "12,500",
                    change: 11.05,
                    percent: 20.52,
                },
                {
                    name: "INDF",
                    last: "24,600",
                    change: 2.5,
                    percent: 3.90,
                },
            ],
            showAlert:false,
        }
    }

    closeClick = (e) => {
        alert('yak')
        this.setState({showAlert:true});
        // this.refs.frameAction.closeModal(100);
    }

    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={()=>this.setState({showAlert:true})}></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    isFireFox() {
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            var firefox = true;
        } else {
            var firefox = false;
        }

        return firefox;
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <SweetAlert
                    show={this.state.showAlert}
                    warning
                    title={<span className="text-white">Save changes before quiting?</span>}
                    style={{'color':'var(--text-white)',}}
                    customClass={"bg-dark-grey"}
                    customButtons={
                        <React.Fragment>
                            <button className={"btn btn-sa btn-trans btn-sm btn-popup"}
                                    onClick={()=>this.setState({showAlert:false})}>
                                Cancel
                            </button>
                            &nbsp;
                            <button className={"btn btn-sa btn-sm btn-popup btn-danger border-gray-tradding"}
                                    onClick={
                                        ()=>{
                                            this.setState({showAlert:false});
                                            this.refs.frameAction.closeModal(100);
                                        }
                                    }>
                                &nbsp;&nbsp;No&nbsp;&nbsp;
                            </button>
                            &nbsp;
                            <button id="save" autoFocus={true} autofocus className={"btn btn-sa btn-sm btn-popup btn-info border-gray-tradding"}
                                    onClick={
                                        ()=>{
                                            this.setState({showAlert:false});
                                            this.refs.frameAction.closeModal(100);
                                        }
                                    }>
                                &nbsp;&nbsp;Yes&nbsp;&nbsp;
                            </button>
                        </React.Fragment>
                    }

                >
                </SweetAlert>
                <div id="mySideBar" className="col-sm-sidebar px-0 mx-0 bg-black-trading d-border-right d-border-left d-border-top card-575 d-border-bottom d-sidebar-potrait">
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
                            <div className={this.isFireFox() ? "nav-link align-self-center text-center px-0 d-border col-sm-12 mt-0 mb-0 py-0" :
                                "nav-link align-self-center text-center px-0 d-border col-sm-12 my-1 py-0"}>
                                <Dropdown placeholder='Group' search selection options={option} className={"f-9 text-center align-self-center col-sm-12 grey h-31"} defaultValue="groupA"/>
                            </div>
                            <div className="d-sidebar-potrait px-0">
                                <Table size="sm" borderless className="table-sidebar card-452 mb-0">
                                    <tbody>
                                    {
                                        this.state.rowData.map((charx, index) => {
                                            if(charx.percent < 0){
                                                var warna = " text-danger";
                                                var icon = " icofont icofont-caret-down f-8";
                                            } else if (charx.percent > 0) {
                                                var warna = " text-success";
                                                var icon = " icofont icofont-caret-up f-8";
                                            } else {
                                                var warna = " text-warning";
                                                var icon = " icofont icofont-minus f-8";
                                            }

                                            return (
                                                <tr className={this.isFireFox() ? "pl-0 pr-1 d-border-bottom" : "px-1 d-border-bottom"}>
                                                    <td className={this.isFireFox() ? "pl-0 pr-1" : "px-1"}>
                                                        <div className="align-self-center text-left click-pointer noselect">
                                                            <h5 className={this.isFireFox() ? "pl-2 mb-0" : "pl-2 mb-1"}>{charx.name}</h5>
                                                            <div className={this.isFireFox() ? "f-10 mb3 text-right"+warna : "f-10 mb-1 text-right"+warna}>
                                                                <i className={icon}></i>{charx.change+"("+charx.percent+"%)"}
                                                            </div>
                                                            <p className={this.isFireFox() ? "f-11 mb3 text-right"+warna : "f-11 mb-1 text-right"+warna}>{charx.last}</p>
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
                                            <div className="align-self-center text-center noselect">
                                                <i className="icofont icofont-ui-previous text-bips-dark-disabled f-16 click-disabled"></i>
                                                &nbsp;<span className="text-disabled">|</span>&nbsp;
                                                <i className="icofont icofont-ui-next text-bips-dark f-16 click-pointer"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-sidebar px-0 mx-0 bg-black-trading d-border-right d-border-left d-border-top d-border-bottom d-sidebar-landscape">
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

                            <div className="row col-sm-12 mx-0 px-0">
                                <div className="col-sm-1 align-self-center mx-0">
                                    <div className="align-self-center text-center px-sidebar py-0 px-0">
                                        <div className="align-self-center text-center click-disabled">
                                            <i className="icofont icofont-ui-previous text-bips-dark-disabled f-16"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="row col-sm-10 mx-0 px-0" style={{justifyContent : 'center'}}>
                                    {
                                        this.state.rowData.map((charx, index) => {
                                            if(charx.percent < 0){
                                                var warna = " text-danger";
                                                var icon = " icofont icofont-caret-down f-8";
                                            } else if (charx.percent > 0) {
                                                var warna = " text-success";
                                                var icon = " icofont icofont-caret-up f-8";
                                            } else {
                                                var warna = " text-warning";
                                                var icon = " icofont icofont-minus f-8";
                                            }

                                            return (
                                                <div
                                                    className="align-self-center text-left px-sidebar py-sidebar click-pointer d-sidebar-landscape-hover noselect">
                                                    <h5 className="mb-1">{charx.name}</h5>
                                                    <div className={"f-10 mb-1 text-right"+warna}>
                                                        <i className={icon}></i>{charx.change+"("+charx.percent+"%)"}
                                                    </div>
                                                    <p className={"f-11 mb-1 text-right"+warna}>{charx.last}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="col-sm-1 align-self-center mx-0">
                                    <div className="align-self-center text-center px-sidebar py-0 px-0">
                                        <div className="align-self-center text-center click-pointer">
                                            <i className="icofont icofont-ui-next text-bips-dark f-16"></i>
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