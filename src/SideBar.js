import React from "react";
import {Button, Table} from "react-bootstrap";
import Select from "react-select";
import {cssmode} from "./App";
import {Dropdown, Popup} from "semantic-ui-react";
import {RegisterAmendModal} from "./app_pages/stockPage";

import { BIPSAppContext } from './AppData.js';
import { ContextConnector } from './appcontext.js';
import {ModalAlertC} from "./app_modals/modal_Alert";
import TableInfoTransaction from "./app_transaction/tableInfoTransaction";
import {BuyPage} from "./app_pages/stockPage";


import {ModalReconnect} from "./app_modals/modal_reconnect";
import {ModalTrial} from "./app_modals/modal_trial";
import {AppFrameAction} from "./appframe";
import SweetAlert from "react-bootstrap-sweetalert";
import $ from "jquery";
import {WSConnectionAction} from "./appnetwork";


const option = [
    { key: 'groupA', value: 'groupA', text: 'Group A' },
    { key: 'groupB', value: 'groupB', text: 'Group B' },
    { key: 'groupC', value: 'groupC', text: 'Group C' },
    { key: 'groupD', value: 'groupD', text: 'Group D' },
    { key: 'groupE', value: 'groupE', text: 'Group E' }
];

class SideBar_Base extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rowData: [
                {
                    name: "AALI",
                    fullname: "Agro Astra Lestari",
                    last: "41,560",
                    change: 0.55,
                    percent: 3.56,
                },
                {
                    name: "ADHI",
                    fullname: "Adhi Karya",
                    last: "12,750",
                    change: -1.95,
                    percent: -0.06,
                },
                {
                    name: "ANTM",
                    fullname: "Aneka Tambang",
                    last: "15,350",
                    change: 4.50,
                    percent: 0.56,
                },
                {
                    name: "ASII",
                    fullname: "Astar Motor",
                    last: "30,540",
                    change: -1.45,
                    percent: -3.56,
                },
                {
                    name: "TLKM",
                    fullname: "Telkom Indonesia",
                    last: "70,000",
                    change: 0,
                    percent: 0,
                },
                {
                    name: "WSKT",
                    fullname: "Waskita Karya",
                    last: "12,500",
                    change: 11.05,
                    percent: 20.52,
                },
                {
                    name: "INDF",
                    fullname: "Indofood",
                    last: "24,600",
                    change: 2.5,
                    percent: 3.90,
                },
            ],
            showAlert:false,
            showReconnect: false,
        };
            this.inactivity = this.inactivity.bind(this);

    }
    closeClickNoAlert = (e) => {
        this.refs.frameAction.closeModal(100);
    }
    closeClick = (e) => {
        this.setState({showAlert:true});
    }
    closeReconnect = (e) => {
    // this.setState({showAlert:true});
    this.refs.frameAction.closeModal(100);
    this.setState({showReconnect: false});
    }
    clickOpen = (e) => {
        if(this.state.showReconnect == false){
            this.setState({showReconnect: true});
            this.buttonClickReconnect();
        }
    }
    clickMigrate = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => "",
            size: 'large2',
            contentClass: ModalTrial,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
                    // onClick={()=>this.setState({showAlert:true})}
                    onClick={()=>this.props.handleStatusAlert3('confirm',this.props.statusAlertC,'Save changes before quiting? dari App/modal_Alert', 'myWatclist#confirmSave#yes')}
                    ></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    buttonClickNewOrder = (e) => {
        // $(".card-356").css("minHeight","500px");
        // console.log("hello");

        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right text-white">
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
                   onClick={this.closeClickNoAlert}></i></div>,
            size: 'large',
            contentClass: BuyPage,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    buttonClickReconnect = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right">
                <i className="icofont icofont-close text-icofont-close text-white click-pointer"
                   onClick={()=>this.closeReconnect()} id={"reconnectxbutton"}></i></div>,
            size: 'mini',
            contentClass: ModalReconnect,
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
    componentDidMount(){
        window.addEventListener('load', this.inactivity);
    }
    inactivity(){
        var time;

        document.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onmousedown = resetTimer; // touchscreen presses
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer;     // touchpad clicks
        document.onkeypress = resetTimer;
        document.addEventListener('scroll', resetTimer, true); // improved; see comments
        window.addEventListener('load', resetTimer, true);
        var events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(function(name) {
            document.addEventListener(name, resetTimer, true);
        });

        function logout() {
            let a = $("#login-state").css("display");
            // alert(a);
            if(a === "none"){
                $("#idTriggerReconnect").click();
            }
        }

        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, 3000000)
        }
    };
    stockClick(event){
        // $valueAnalyticChart = event;
        $("#sideBarValue").val(event);
        $("#sideBarValue").click();
        // $("#stockoptionstockChrt").change();
    }

    render(){
        return(

            <>
                <AppFrameAction ref="frameAction" />
                <ModalAlertC />
                {/*<SweetAlert*/}
                    {/*show={this.state.showAlert}*/}
                    {/*warning*/}
                    {/*title={<span className="text-white f-16">Save changes before quiting?</span>}*/}
                    {/*style={{'color':'var(--text-white)',}}*/}
                    {/*customClass={"bg-dark-grey"}*/}
                    {/*customButtons={*/}
                        {/*<React.Fragment>*/}
                            {/*<button className={"btn btn-sa btn-trans btn-sm btn-popup"}*/}
                                    {/*onClick={()=>this.setState({showAlert:false})}>*/}
                                {/*Cancel*/}
                            {/*</button>*/}
                            {/*&nbsp;*/}
                            {/*<button className={"btn btn-sa btn-sm btn-popup btn-danger border-gray-tradding"}*/}
                                    {/*onClick={*/}
                                        {/*()=>{*/}
                                            {/*this.setState({showAlert:false});*/}
                                            {/*this.refs.frameAction.closeModal(100);*/}
                                        {/*}*/}
                                    {/*}>*/}
                                {/*&nbsp;&nbsp;No&nbsp;&nbsp;*/}
                            {/*</button>*/}
                            {/*&nbsp;*/}
                            {/*<button id="save" autoFocus={true} autofocus className={"btn btn-sa btn-sm btn-popup btn-info border-gray-tradding"}*/}
                                    {/*onClick={*/}
                                        {/*()=>{*/}
                                            {/*this.setState({showAlert:false});*/}
                                            {/*this.refs.frameAction.closeModal(100);*/}
                                        {/*}*/}
                                    {/*}>*/}
                                {/*&nbsp;&nbsp;Yes&nbsp;&nbsp;*/}
                            {/*</button>*/}
                        {/*</React.Fragment>*/}
                    {/*}*/}

                {/*>*/}
                {/*</SweetAlert>*/}

                <input type="hidden" onClick={()=>this.setState({showAlert: true})} id={"alertOut"}/>
                <div id="mySideBar" className="col-sm-sidebar px-0 mx-0 bg-black-trading d-border-right d-border-left d-border-top card-575 d-border-bottom d-sidebar-potrait">
                    <div className="flex-grow-1">
                        <div className="flex-lg-column mb-1 cssmenu">

                            <Popup content='New Order'
                                   mouseEnterDelay={900}
                                   mouseLeaveDelay={100}
                                   position='top center'
                                   trigger={
                                <div onClick={this.buttonClickNewOrder}
                                     className="align-self-center text-center d-border-bottom col-sm-12 paddingY-2 px-0 mx-0 click-pointer">
                                    <i className="fa-3x icofont-shopping-cart"></i>
                                </div>
                            } />
                        </div>
                        <div className="align-self-center text-center px-1 py-0 h-25">
                            <Popup content='Modify Watchlist'
                                   mouseEnterDelay={900}
                                   mouseLeaveDelay={100}
                                   position='top center'
                                   trigger={
                                        <button className="f-9 col-sm-12 px-0 my-0 py-2 btn btn-sm btn-dark h-22" onClick={this.buttonClickAmendRegister}>
                                            <i className="icofont icofont-edit"></i> &nbsp; Modify
                                        </button>
                                   } />
                        </div>
                        <span
                            onClick={this.clickOpen}
                              id={"idTriggerReconnect"}>
                        </span>
                        <span
                            onClick={this.clickMigrate}
                            id={"triggerMigrate"}>
                        </span>

                        <div className="nav flex-lg-column">
                            <Popup content='Watchlist Group'
                                   mouseEnterDelay={900}
                                   mouseLeaveDelay={100}
                                   position='top center'
                                   trigger={
                                       <div
                                           className={this.isFireFox() ? "nav-link align-self-center text-center px-0 d-border col-sm-12 mt-0 mb-0 py-0" :
                                               "nav-link align-self-center text-center px-0 d-border col-sm-12 my-1 py-0"}>
                                           <Dropdown placeholder='Group' search selection options={option}
                                                     className={"f-9 text-center align-self-center col-sm-12 grey h-31"}
                                                     defaultValue="groupA"/>
                                       </div>
                                   }/>
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
                                                        <div onClick={()=>this.stockClick(charx.name+"-"+charx.fullname)} className="align-self-center text-left click-pointer noselect">
                                                            <h5 className={this.isFireFox() ? "pl-2 mb-0" : "pl-2 mb-1"}>{charx.name}</h5>
                                                            <div  className={this.isFireFox() ? "f-10 mb3 text-right"+warna : "f-10 mb-1 text-right"+warna}>
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
                                        <td className="py-0 px-0">
                                            <div className="align-self-center text-center noselect btn-area-sidebar">
                                                <button className={"btn btn-custom-nav disabled"} disabled="disabled">
                                                    <i className="icofont icofont-ui-previous"></i>
                                                </button>
                                                <button className={"btn btn-custom-primary btn-primary"}>
                                                    <i className="icofont icofont-refresh"></i>
                                                </button>
                                                <button className={"btn btn-custom-nav f-16"}>
                                                   <i className="icofont icofont-ui-next click-pointer"></i>
                                               </button>
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
                            <button className="f-9 col-sm-12 px-0 my-0 py-2 btn btn-sm btn-dark h-22" onClick={this.buttonClickAmendRegister}>
                                <i className="icofont icofont-edit"></i> &nbsp; Modify
                            </button>
                        </div>

                                   <div className="nav flex-lg-column">

                                       <div
                                           className="nav-link align-self-center text-center px-0 d-border col-sm-12 mt-0 mb-0 py-0 tooltip">
                                           <Dropdown placeholder='Group' search selection options={option}
                                                     className={"f-9 text-center align-self-center col-sm-12 grey h-31"}
                                                     defaultValue="groupB"/>

                                       </div>

                                       <div className="row col-sm-12 mx-0 px-0">

                                           <div className="col-sm-1 align-self-center mx-0">
                                               <div className="align-self-center text-center px-sidebar py-0 px-0">
                                                   <div className="align-self-center text-center click-pointer">
                                                       <i className="glyphicon glyphicon-refresh"></i>
                                                   </div>
                                               </div>
                                           </div>

                                           <div className="col-sm-1 align-self-center mx-0">
                                               <div className="align-self-center text-center px-sidebar py-0 px-0">
                                                   <div className="align-self-center text-center click-disabled">
                                                       <i className="icofont icofont-ui-previous text-bips-dark-disabled f-16"></i>
                                                   </div>
                                               </div>
                                           </div>

                                           <div className="row col-sm-9 mx-0 px-0" style={{justifyContent: 'center'}}>
                                               {
                                                   this.state.rowData.map((charx, index) => {
                                                       if (charx.percent < 0) {
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
                                                               <div className={"f-10 mb-1 text-right" + warna}>
                                                                   <i className={icon}></i>{charx.change + "(" + charx.percent + "%)"}
                                                               </div>
                                                               <p className={"f-11 mb-1 text-right" + warna}>{charx.last}</p>
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
class tableInfoModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <TableInfoTransaction/>
            </>
        );
    }
}

//************************** Context Connector **************************
const SideBar = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        statusAlertC:vars.statusAlertC,
        handleStatusAlert3:(type,statusAlert,msg, data)=>actions.sendAction('handleStatusAlert3',{type,statusAlert,msg, data}),
    }),
    ["handleStatusAlert3"]
)(SideBar_Base);

export default SideBar;