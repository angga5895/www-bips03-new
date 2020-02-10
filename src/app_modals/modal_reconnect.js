import React from "react";
import {AppFrameAction} from "./../appframe";

import {ResizeResponsive} from "../app_pages/mainPage";
import {ForgotModal} from "../app_pages/loginPage";

import $ from "jquery";


class ModalReconnect extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }
    leaveButton = (e) =>{
        $("#reconnectxbutton").click();
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="text-center align-self-center align-middle">
                        <div className="img-round-icon">
                            {/*<i className="icofont icofont-ui-wifi icofont-5x"></i>*/}
                            <i className="ion ion-ios-radio icofont-5x"></i>
                        </div>
                    </div>
                    <div className="form-group text-center d-border-bottom-bold">
                        <label className="col-sm-12 px-5 py-2 col-form-label f-12 font-weight-bold">
                            Disconnected
                        </label>
                    </div>
                    <div className="form-group text-center pt-3">
                        <label className="col-sm-12 px-5 py-1 col-form-label f-11 font-weight-bold">
                            Lost Connection<br/>Please insert your username and password
                        </label>
                    </div>
                    <div className="col-sm-12 pt-0">
                        <div className="form-group row">
                            {/*<label className="col-sm-12 px-5 py-2 col-form-label">User ID</label>*/}
                            <div className="col-sm-12 pr-3 pb-0">
                                <div className={"pt-2"}>
                                    <div className="buttonInside">
                                        <div id="input-pass" className="ui left icon input col-sm-12 text-white px-0 mx-0 my-0 dark">
                                            <input type={""} ref="password" placeholder="Password"
                                                   id="inputpass" onChange={""}
                                                   defaultValue="Testing1"/>
                                            <i aria-hidden="true" className="icon py-3">
                                                <i className="icon-icon-lock-login"></i>&nbsp;&nbsp;|
                                            </i>
                                        </div>
                                        <button className="button-inside-input-login btn-dark"
                                                onMouseDown={""} onMouseUp={""}><i
                                            className="fa fa-eye"></i></button>
                                        <div className={"text-left"}>
                                            <i><small className="text-danger" id="req_pass" style={{"display": "none"}}></small></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-sm-12 text-right pr-0 pb-3 my-2 text-center"}>
                                <text>Forgot your password?</text>&nbsp;
                                <text
                                    className="text-primary text-right click-pointer mt-2 ">Click Here
                                </text>
                            </div>
                            <div className={"col-sm-6 pr-2"}>
                                <div id="buttonLeave" className="justify-content-center text-center align-items-center d-flex    ">
                                    <button id="click_login" type="button"
                                            onClick={()=>this.leaveButton()}
                                    className="btn btn-dark form-control py-0">
                                        <span id="text-login">Leave</span>
                                    </button>
                                </div>
                            </div>
                            <div className={"col-sm-6 pr-3 pl-0"}>
                            <div id="buttonReconnect" className="justify-content-center text-center align-items-center d-flex    ">
                                <button id="click_login" type="submit" onClick={""}
                                        className="btn btn-primary form-control py-0">
                                    <span id="text-login">Reconnect</span>
                                </button>
                            </div>
                        </div>

                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default ModalReconnect;
export {ModalReconnect};