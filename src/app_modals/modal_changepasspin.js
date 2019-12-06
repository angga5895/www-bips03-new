import React from "react";
import $ from "jquery";
import {AppFrameAction} from "../appframe";
import {WSConnectionAction} from "../appnetwork";


class ChangePassPinModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            inputCpass : 'password',
            inputNpass : 'password',
            inputCnpass : 'password',
            inputCPin : 'password',
            inputNPin : 'password',
            inputCnpin : 'password',
        };
    }

    onChange = value =>{
        this.setState({ value });
    };

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonForgotPassword = (e) => {
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            contentClass: ForgotPassModal,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    buttonForgotPIN = (e) => {
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            contentClass: ForgotPINModal,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    onClickCloseAlertPass = (e) => {
        $("#alert-wrongpass").removeClass("fade-in");
        $("#alert-wrongpass").addClass("fade-out");
    };
    onClickCloseAlertPin = (e) => {
        $("#alert-wrongpin").removeClass("fade-in");
        $("#alert-wrongpin").addClass("fade-out");
    };

    onMouseDownCPass = (e) => {
        this.setState({
            inputCpass : "text"
        });
    }
    onMouseUpCPass = (e) => {
        this.setState({
            inputCpass : "password"
        });
    }
    onMouseDownNPass = (e) => {
        this.setState({
            inputNpass : "text"
        });
    }
    onMouseUpNPass = (e) => {
        this.setState({
            inputNpass : "password"
        });
    }
    onMouseDownCNPass = (e) => {
        this.setState({
            inputCnpass : "text"
        });
    }
    onMouseUpCNPass = (e) => {
        this.setState({
            inputCnpass : "password"
        });
    }

    onMouseDownCPin = (e) => {
        this.setState({
            inputCPin : "text"
        });
    }
    onMouseUpCPin = (e) => {
        this.setState({
            inputCPin : "password"
        });
    }
    onMouseDownNPin = (e) => {
        this.setState({
            inputNPin : "text"
        });
    }
    onMouseUpNPin = (e) => {
        this.setState({
            inputNPin : "password"
        });
    }
    onMouseDownCnPin = (e) => {
        this.setState({
            inputCnpin : "text"
        });
    }
    onMouseUpCnPin = (e) => {
        this.setState({
            inputCnpin : "password"
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount(){
        $("#btn_pass").click(function () {
            var cpass = $("#cpass").val();
            var npass = $("#npass").val();
            var cnpass = $("#cnpass").val();

            if (cpass === '' && npass === '' && cnpass === ''){
                $("#npass").addClass("d-border-danger-bottom");
                $("#cnpass").addClass("d-border-danger-bottom");
                $("#cpass").addClass("d-border-danger-bottom");

                $("#req_npass").text("required");
                $("#req_npass").css("display","block");
                $("#req_cpass").text("required");
                $("#req_cpass").css("display","block");
                $("#req_cnpass").text("required");
                $("#req_cnpass").css("display","block");
            } else if(cpass === '' && npass === '' ){
                $("#cpass").addClass("d-border-danger-bottom");
                $("#npass").addClass("d-border-danger-bottom");

                $("#req_npass").text("required");
                $("#req_npass").css("display","block");
                $("#req_cpass").text("required");
                $("#req_cpass").css("display","block");
            } else if(npass === '' && cnpass === ''){
                $("#npass").addClass("d-border-danger-bottom");
                $("#cnpass").addClass("d-border-danger-bottom");

                $("#req_cnpass").text("required");
                $("#req_cnpass").css("display","block");
                $("#req_npass").text("required");
                $("#req_npass").css("display","block");
            } else if(cpass === '' && cnpass === ''){
                $("#cpass").addClass("d-border-danger-bottom");
                $("#cnpass").addClass("d-border-danger-bottom");

                $("#req_cnpass").text("required");
                $("#req_cnpass").css("display","block");
                $("#req_cpass").text("required");
                $("#req_cpass").css("display","block");
            } else if(cpass === ''){
                $("#cpass").addClass("d-border-danger-bottom");

                $("#req_cpass").text("required");
                $("#req_cpass").css("display","block");
            } else if(cnpass === ''){
                $("#cnpass").addClass("d-border-danger-bottom");

                $("#req_cnpass").text("required");
                $("#req_cnpass").css("display","block");
            } else if(npass === ''){
                $("#npass").addClass("d-border-danger-bottom");

                $("#req_npass").text("required");
                $("#req_npass").css("display","block");
            } else{
                if(npass !== cnpass){
                    $("#cnpass").val("");
                    $("#cnpass").addClass("d-border-danger-bottom");

                    $("#req_cnpass").text("confirm password is wrong");
                    $("#req_cnpass").css("display","block");
                } else{
                    //password tinggal disesuaikan dengan pass user
                    if (cpass === '123456'){
                        $("#content-alertpass").text("Change password is successfully.");
                        $("#alert-wrongpass").removeClass("fade-out bg-danger");
                        $("#alert-wrongpass").addClass("fade-in bg-success");
                    } else {
                        $("#content-alertpass").text("Failed change password, please check your current password.");
                        $("#alert-wrongpass").removeClass("fade-out bg-success");
                        $("#alert-wrongpass").addClass("fade-in bg-danger");
                    }
                }
            }
        })

        $("#btn_pin").click(function () {
            var cpin = $("#cpin").val();
            var npin = $("#npin").val();
            var cnpin = $("#cnpin").val();

            if (cpin === '' && npin === '' && cnpin === ''){
                $("#npin").addClass("d-border-danger-bottom");
                $("#cnpin").addClass("d-border-danger-bottom");
                $("#cpin").addClass("d-border-danger-bottom");

                $("#req_npin").text("required");
                $("#req_npin").css("display","block");
                $("#req_cpin").text("required");
                $("#req_cpin").css("display","block");
                $("#req_cnpin").text("required");
                $("#req_cnpin").css("display","block");
            } else if(cpin === '' && npin === '' ){
                $("#cpin").addClass("d-border-danger-bottom");
                $("#npin").addClass("d-border-danger-bottom");

                $("#req_npin").text("required");
                $("#req_npin").css("display","block");
                $("#req_cpin").text("required");
                $("#req_cpin").css("display","block");
            } else if(npin === '' && cnpin === ''){
                $("#npin").addClass("d-border-danger-bottom");
                $("#cnpin").addClass("d-border-danger-bottom");

                $("#req_cnpin").text("required");
                $("#req_cnpin").css("display","block");
                $("#req_npin").text("required");
                $("#req_npin").css("display","block");
            } else if(cpin === '' && cnpin === ''){
                $("#cpin").addClass("d-border-danger-bottom");
                $("#cnpin").addClass("d-border-danger-bottom");

                $("#req_cnpin").text("required");
                $("#req_cnpin").css("display","block");
                $("#req_cpin").text("required");
                $("#req_cpin").css("display","block");
            } else if(cpin === ''){
                $("#cpin").addClass("d-border-danger-bottom");

                $("#req_cpin").text("required");
                $("#req_cpin").css("display","block");
            } else if(cnpin === ''){
                $("#cnpin").addClass("d-border-danger-bottom");

                $("#req_cnpin").text("required");
                $("#req_cnpin").css("display","block");
            } else if(npin === ''){
                $("#npin").addClass("d-border-danger-bottom");

                $("#req_npin").text("required");
                $("#req_npin").css("display","block");
            } else{
                if(npin !== cnpin){
                    $("#cnpin").val("");
                    $("#cnpin").addClass("d-border-danger-bottom");

                    $("#req_cnpin").text("confirm password is wrong");
                    $("#req_cnpin").css("display","block");
                } else{
                    //password tinggal disesuaikan dengan pass user
                    if (cpin === '123456'){
                        $("#content-alertpin").text("Change PIN is successfully.");
                        $("#alert-wrongpin").removeClass("fade-out bg-danger");
                        $("#alert-wrongpin").addClass("fade-in bg-success");
                    } else {
                        $("#content-alertpin").text("Failed change PIN, please check your current PIN.");
                        $("#alert-wrongpin").removeClass("fade-out bg-success");
                        $("#alert-wrongpin").addClass("fade-in bg-danger");
                    }
                }
            }
        })

        $("#npass").on("change", function () {
            $("#npass").removeClass("d-border-danger-bottom");
            $("#req_npass").css("display", "none");
        })
        $("#cnpass").on("change", function () {
            $("#cnpass").removeClass("d-border-danger-bottom");
            $("#req_cnpass").css("display", "none");
        })
        $("#cpass").on("change", function () {
            $("#cpass").removeClass("d-border-danger-bottom");
            $("#req_cpass").css("display", "none");
        })

        $("#npin").on("change", function () {
            $("#npin").removeClass("d-border-danger-bottom");
            $("#req_npin").css("display", "none");
        })
        $("#cnpin").on("change", function () {
            $("#cnpin").removeClass("d-border-danger-bottom");
            $("#req_cnpin").css("display", "none");
        })
        $("#cpin").on("change", function () {
            $("#cpin").removeClass("d-border-danger-bottom");
            $("#req_cpin").css("display", "none");
        })
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <div className="f-12">
                    <div className="text-center">Change Passwod/PIN</div>
                    <div className="cssmenumodal bg-dark-grey pb-4 col-sm-12 mx-0 px-0">
                        <ul>
                            <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; PASSWORD</span></a></li>
                            <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; PIN</span></a></li>
                        </ul>
                    </div>
                    <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                        <div className="form-group mb-2">
                            <label className="col-sm-12 px-5 py-2 col-form-label">Current Password</label>
                            <div className="col-sm-12 px-5 py-0">
                                <small className="text-danger" id="req_cpass" style={{"display":"none"}}></small>
                                <div className="buttonInside">
                                    <input type={this.state.inputCpass} name="cpass" id="cpass" className="text-white input-login col-sm-12 input-inside-button"/>
                                    <button className="button-inside-input bg-dark-grey" onMouseDown={this.onMouseDownCPass} onMouseUp={this.onMouseUpCPass}><i className="fa fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="col-sm-12 px-5 py-2 col-form-label">New Password</label>
                            <div className="col-sm-12 px-5 py-0">
                                <small className="text-danger" id="req_npass" style={{"display":"none"}}></small>
                                <div className="buttonInside">
                                    <input type={this.state.inputNpass} name="npass" id="npass" className="text-white input-login col-sm-12 input-inside-button"/>
                                    <button className="button-inside-input bg-dark-grey" onMouseDown={this.onMouseDownNPass} onMouseUp={this.onMouseUpNPass}><i className="fa fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="col-sm-12 px-5 py-2 col-form-label">Confirm New Password</label>
                            <div className="col-sm-12 px-5 py-0">
                                <small className="text-danger" id="req_cnpass" style={{"display":"none"}}></small>
                                <div className="buttonInside">
                                    <input type={this.state.inputCnpass} name="cnpass" id="cnpass" className="text-white input-login col-sm-12 input-inside-button"/>
                                    <button className="button-inside-input bg-dark-grey" onMouseDown={this.onMouseDownCNPass} onMouseUp={this.onMouseUpCNPass}><i className="fa fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-12 px-5 py-2 col-form-label">Forgot your password?
                                <span className="click-pointer btn btn-link text-primary" onClick={this.buttonForgotPassword}> Click here</span>
                            </label>
                        </div>

                        <div className="form-group py-3">
                            <div className="justify-content-center align-items-center d-flex py-0 px-5">
                                <button type="submit" className="btn btn-primary form-control py-0" id="btn_pass">
                                    Change
                                </button>
                            </div>
                        </div>

                        <div id="alert-wrongpass" className={"col-sm-12 text-center fade-out"}>
                            <div className={/*{cssmode == 'night'? */"px-2 pt-2 text-right text-white" /*: "px-2 pt-2 text-right text-black"*/}><i className="click-pointer icofont icofont-close" onClick={this.onClickCloseAlertPass}></i></div>
                            <div id="content-alertpass" className={"px-2 py-4 text-white"}></div>
                        </div>
                    </div>
                    <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                        <div className="form-group mb-2">
                            <label className="col-sm-12 px-5 py-2 col-form-label">Current PIN</label>
                            <div className="col-sm-12 px-5 py-0">
                                <small className="text-danger" id="req_cpin" style={{"display":"none"}}></small>
                                <div className="buttonInside">
                                    <input type={this.state.inputCPin} name="cpin" id="cpin" className="text-white input-login col-sm-12 input-inside-button"/>
                                    <button className="button-inside-input bg-dark-grey" onMouseDown={this.onMouseDownCPin} onMouseUp={this.onMouseUpCPin}><i className="fa fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="col-sm-12 px-5 py-2 col-form-label">New PIN</label>
                            <div className="col-sm-12 px-5 py-0">
                                <small className="text-danger" id="req_npin" style={{"display":"none"}}></small>
                                <div className="buttonInside">
                                    <input type={this.state.inputNPin} name="npin" id="npin" className="text-white input-login col-sm-12 input-inside-button"/>
                                    <button className="button-inside-input bg-dark-grey" onMouseDown={this.onMouseDownNPin} onMouseUp={this.onMouseUpNPin}><i className="fa fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label className="col-sm-12 px-5 py-2 col-form-label">Confirm New PIN</label>
                            <div className="col-sm-12 px-5 py-0">
                                <small className="text-danger" id="req_cnpin" style={{"display":"none"}}></small>
                                <div className="buttonInside">
                                    <input type={this.state.inputCnpin} name="cnpin" id="cnpin" className="text-white input-login col-sm-12 input-inside-button"/>
                                    <button className="button-inside-input bg-dark-grey" onMouseDown={this.onMouseDownCnPin} onMouseUp={this.onMouseUpCnPin}><i className="fa fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-12 px-5 py-2 col-form-label">Forgot your PIN?
                                <span className="click-pointer btn btn-link text-primary" onClick={this.buttonForgotPIN}> Click here</span>
                            </label>
                        </div>

                        <div className="form-group py-3">
                            <div className="justify-content-center align-items-center d-flex py-0 px-5">
                                <button type="submit" className="btn btn-primary form-control py-0" id="btn_pin">
                                    Change
                                </button>
                            </div>
                        </div>

                        <div id="alert-wrongpin" className={"col-sm-12 text-center fade-out"}>
                            <div className={/*{cssmode == 'night'? */"px-2 pt-2 text-right text-white" /*: "px-2 pt-2 text-right text-black"*/}><i className="click-pointer icofont icofont-close" onClick={this.onClickCloseAlertPin}></i></div>
                            <div id="content-alertpin" className={"px-2 py-4 text-white"}></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class ForgotPassModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="card-325">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding f-12 mt-4">Forgot Password</label>
                <div className="text-white f-12 mt-5">
                    <div className="form-group mb-3">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                            send link to reset your password
                        </label>
                    </div>
                    <div className="form-group mb-5">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Email</label>
                        <div className="col-sm-12 px-5 py-0">
                            <input type="email" className="text-white input-login col-sm-12"/>
                        </div>
                    </div>

                    <div className="form-group py-3">
                        <div className="justify-content-center align-items-center d-flex py-0 px-5">
                            <button type="submit" className="btn btn-primary form-control py-0">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="form-group text-center">
                        <label className="col-sm-12 px-5 py-2 col-form-label">
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Change Password</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

class ForgotPINModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="card-325">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding f-12 mt-4">Forgot PIN</label>
                <div className="text-white f-12 mt-5">
                    <div className="form-group mb-3">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                            send link to reset your PIN
                        </label>
                    </div>
                    <div className="form-group mb-5">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Email</label>
                        <div className="col-sm-12 px-5 py-0">
                            <input type="email" className="text-white input-login col-sm-12"/>
                        </div>
                    </div>

                    <div className="form-group py-3">
                        <div className="justify-content-center align-items-center d-flex py-0 px-5">
                            <button type="submit" className="btn btn-primary form-control py-0">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="form-group text-center">
                        <label className="col-sm-12 px-5 py-2 col-form-label">
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Change PIN</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassPinModal;