import React from 'react';

// internal framework libraries
import { WSConnectionAction } from '../appnetwork.js';
import { AppFrameAction } from '../appframe.js';
import { ContextConnector } from '../appcontext.js';
import { BIPSAppContext } from '../AppData.js';

import $ from "jquery";

//Form signup
import FormParticular     from "../app_sign_up/form_particular";
import FormDocument       from "../app_sign_up/form_document";
import FormAddress        from "../app_sign_up/form_address";
import FormSource         from "../app_sign_up/form_source";
import FormAdditonal      from "../app_sign_up/form_additional";
import { Checkbox } from 'semantic-ui-react'

class DisclaimerModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <div className="text-white f-12">
                    <p className="text-justify px-5 mx-5 py-1">
                        Proses akses terhadap efek, eksekusi perdagangan serta kinerja dan respon dari system
                        trading bisa terpengaruh, termasuk timbulnya keterlambatan dan kegagalan, oleh volatilitas,
                        volume perdagangan efek tinggi, fluktuasi pasar lainnya, tidak likuidnya suatu efek,
                        resiko dan kondisi pasar lainnya, keterlambatan informasi, kesalahan system, dan perangkat
                        lunak, permasalahan dengan system internet yang terkait dengan volume dan kepasitas
                        lalu - lintas internet, dan faktor - faktor lainnya. Salah satu atau lebih dari
                        faktor - faktor tersebut bisa terjadi sebelum atau sesudah transaksi di-input di dalam system,
                        sehingga menyebabkan keterlambatan atau kegagalan permasalahan order, perubahan order,
                        eksekusi transaksi dan/atau salah satu dari tindakan tersebut di atas. Anda menyatakan
                        telah mengetahui resiko - resiko tersebut, dan membebaskan Bahana Sekuritas dari tanggungjawab
                        terhadap hal tersebut.
                    </p>
                    <p className="text-justify px-5 mx-5 py-1">
                        Account access, trade execution and system response and performance may adversely affected,
                        including delays and failures, as a result of market volatility, high share volume,
                        other market fluctuations, illiquidity, other market conditions and risks, quote delays,
                        system and software errors, Internet system problems relating to Internet traffic volume
                        and capacity or other causes, and other factors. One or more of these factors may occur
                        before or after you place a trade, resulting in delayed or failed order placement, order
                        cancellation, trade execution and/or acknowledgement of any of those actions. Solely you
                        assume those risks, and give indemnity to PT. Bahana Securities.
                    </p>
                    <div className="text-center">
                        <button className="btn btn-primary col-sm-3" onClick={this.closeClick}>Close</button>
                    </div>
                </div>
            </>
        );
    }
}

class HelpModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <div className="text-white f-12">
                    <p className="text-center px-5 mx-5 py-1">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        Coming Soon
                        <br/>
                        <br/>
                        <br/>
                    </p>
                    <div className="text-center">
                        <button className="btn btn-primary col-sm-3" onClick={this.closeClick}>Close</button>
                    </div>
                </div>
            </>
        );
    }
}

class FindIdModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <div className="text-white f-12">
                    <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                        <div className="col-sm-4 pt-2">
                            <label className="col-sm-12">Email</label></div>
                        <div className="col-sm-8">
                            <div className="ui small input gray px-0 col-sm-12 align-self-center"><input
                                placeholder="" autoFocus={true} type="email"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-right">
                        <button className="btn btn-primary col-sm-3">Find</button>
                    </div>
                    <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                        <div className="col-sm-4 pt-2">
                            <label className="col-sm-12">User Id</label></div>
                        <div className="col-sm-8 px-0">
                            <div className="ui small input gray col-sm-12 align-self-center"><input
                                placeholder="" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


class ForgotModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding">Forgot Password</label>
                <div className="text-white f-12">
                    <div className="form-group">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                            send link to reset your password
                        </label>
                    </div>
                    <div className="form-group mb-0">
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
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Login Page</span>
                        </label>
                    </div>
                </div>
            </>
        );
    }
}

class SignUpModal extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    /*closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }*/

    state = {
        active1:true,
        active2:false,
        active3:false,
        active4:false,
        active5:false,
        activeTab:1
    }

    buttonClickSignUp = (e) => {
        this.props.isSignup(this.props.signupState)
    }

    render() {
        const activeTab1 =(this.state.activeTab == 1)? "active":"";
        const activeTab2 =(this.state.activeTab == 2)? "active":"";
        const activeTab3 =(this.state.activeTab == 3)? "active":"";
        const activeTab4 =(this.state.activeTab == 4)? "active":"";
        const activeTab5 =(this.state.activeTab == 5)? "active":"";

        const tab1 = this.state.active1 ? "active" : "";
        const tab2 = this.state.active2 ? "active" : "";
        const tab3 = this.state.active3 ? "active" : "";
        const tab4 = this.state.active4 ? "active" : "";
        const tab5 = this.state.active5 ? "active" : "";

        const toggle1 = this.state.active1? "tab" : "";
        const toggle2 = this.state.active2? "tab" : "";
        const toggle3 = this.state.active3? "tab" : "";
        const toggle4 = this.state.active4? "tab" : "";
        const toggle5 = this.state.active5? "tab" : "";

        var props = this.props;
        const step1 = "step1";
        const stepLast = "step-last";

        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12 container-fluid">
                    <div className="col align-self-center py-5">
                        <div className="step-tab">
                            <div id="crumbs">
                                <ul className="nav nav-pills">
                                    <li className={step1+' '+activeTab1} onClick={() => (toggle1=="tab")?this.setState({activeTab:1}):""}><a href="#1" className={tab1} data-toggle={toggle1}>Client Particular</a></li>
                                    <li className={activeTab2} onClick={() => (toggle2=="tab")?this.setState({activeTab:2}):""}><a href="#2" className={tab2} data-toggle={toggle2}>Client Address</a></li>
                                    <li className={activeTab3} onClick={() => (toggle3=="tab")?this.setState({activeTab:3}):""}><a href="#3" className={tab3} data-toggle={toggle3}><div className="more">Client Source of Fund</div></a></li>
                                    <li className={activeTab4} onClick={() => (toggle4=="tab")?this.setState({activeTab:4}):""}><a href="#4" className={tab4} data-toggle={toggle4}>Addtional data</a></li>
                                    <li className={stepLast+' '+activeTab5} onClick={() => (toggle5=="tab")?this.setState({activeTab:5}):""}><a href="#5" className={tab5} data-toggle={toggle5}><div className="more-last">Document Upload</div></a></li>
                                </ul>
                            </div>
                        </div>
                        <div></div>
                        <div className="tab-content clearfix" >
                            <div className="tab-pane active" id="1">
                                <div className="container content-step">
                                    <FormParticular/>
                                </div>
                                <div className="container next-btn">
                                    <a className="btn btn-primary pull-left" onClick={this.buttonClickSignUp}>Back to login</a>
                                    <a className="btn btn-primary pull-right" href="#2" data-toggle="tab" onClick={() => this.setState({active2:true,activeTab:2})}>Next</a>
                                </div>
                            </div>
                            <div className="tab-pane" id="2">
                                <div className="container content-step">
                                    <FormAddress/>
                                </div>
                                <div className="container next-btn">
                                    <a className="btn btn-primary pull-left" onClick={this.buttonClickSignUp}>Back to login</a>
                                    <a className="btn btn-primary pull-right" href="#3" data-toggle="tab" onClick={() => this.setState({active3:true,activeTab:3})}>Next</a>
                                </div>
                            </div>

                            <div className="tab-pane" id="3">
                                <div className="container content-step">
                                    <FormSource/>
                                </div>
                                <div className="container next-btn">
                                    <a className="btn btn-primary pull-left" onClick={this.buttonClickSignUp}>Back to login</a>
                                    <a className="btn btn-primary pull-right" href="#4" data-toggle="tab" onClick={() => this.setState({active4:true,activeTab:4})}>Next</a>
                                </div>
                            </div>

                            <div className="tab-pane" id="4">
                                <div className="container content-step">
                                    <FormAdditonal/>
                                </div>
                                <div className="container next-btn">
                                    <a className="btn btn-primary pull-left" onClick={this.buttonClickSignUp}>Back to login</a>
                                    <a className="btn btn-primary pull-right" href="#5" data-toggle="tab" onClick={() => this.setState({active5:true,activeTab:5})}>Next</a>
                                </div>
                            </div>

                            <div className="tab-pane" id="5">
                                <div className="container content-step">
                                    <FormDocument/>
                                </div>
                                <div className="container next-btn">
                                    <a className="btn btn-primary pull-left" onClick={this.buttonClickSignUp}>Back to login</a>
                                    <button type="submit" className="btn btn-primary pull-right">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class LoginUserPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passlogin : 'password',
            seconds: 0,
            index: 0,
            flipped: true,
            barInfo: [
                {
                    symbol: 'GBP/USD',
                    last: '12849',
                    change: -0.99293,
                    percentage: -0.30,
                },{
                    symbol: 'USD/JPY',
                    last: '108.59',
                    change: 0.06,
                    percentage: 0.06,
                },{
                    symbol: 'USD/CHF',
                    last: '0.9874',
                    change: -0.00005,
                    percentage: -0.04,
                },{
                    symbol: 'AUD/JPY',
                    last: '78.14',
                    change: 0.05,
                    percentage: 0.05,
                },
            ],
        };
    }

    buttonClickDisclaimer = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center">Disclaimer</div>,
            closeIcon: false,
            contentClass: DisclaimerModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }
    buttonClickHelp = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center">Help</div>,
            closeIcon: false,
            contentClass: HelpModal,
            onClose: (result) => {console.log('Modal help result = ', result)}
        })
    }
    buttonFindHelp = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-left">Find Id</div>,
            closeIcon: false,
            size: 'mini',
            contentClass: FindIdModal,
            onClose: (result) => {console.log('Modal find result = ', result)}
        })
    }


    buttonClickForgot = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">BIPS</h1></div>,
            closeIcon: false,
            size : "mini",
            contentClass: ForgotModal,
            onClose: (result) => {console.log('Modal 2 result = ', result)}
        })
    }

    buttonClickSignUp = (e) => {
        /*this.refs.frameAction.showModal({
            headerClass: () => <div className="text-danger font-weight-bold text-center">Sign Up Belum Tersedia</div>,
            closeIcon: true,
            size : "fullscreen",
            contentClass: SignUpModal,
            onClose: (result) => {console.log('Modal 3 result = ', result)}
        })*/
        this.props.isSignup(this.props.signupState)
    }

    buttonClickLogin = () => {
        var r = this.refs;
        var p = this.props;

        /*p.onLogin(r.userID.value, r.password.value);*/
        // console.log(r)

        // var user = $("#inputuser").val();
        // var pass = $("#inputpass").val();
        var user = r.userID.value;
        var pass = r.password.value;

        if (user === '' && pass === ''){
            $("#input-user").addClass("d-border-danger");
            $("#input-pass").addClass("d-border-danger");

            $("#req_user").text("Required");
            $("#req_user").css("display","block");
            $("#req_pass").text("Required");
            $("#req_pass").css("display","block");
        } else if(user === ''){
            $("#input-user").addClass("d-border-danger");

            $("#req_user").text("Required");
            $("#req_user").css("display","block");
        } else if (pass === ''){
            $("#input-pass").addClass("d-border-danger");

            $("#req_pass").text("Required");
            $("#req_pass").css("display","block");
        } else {
            p.onLogin(r.userID.value, r.password.value);

            // if (user === "a" && pass === "b") {
            //     this.props.getLogin(this.props.loginState);
            // } else {
            //     $("#alert-wrong").removeClass("fade-out");
            //     $("#alert-wrong").addClass("fade-in");
            // }
        }
    }

    onMouseDownPass = (e) => {
        this.setState({
            passlogin: 'text'
        })
    }

    onMouseUpPass = (e) => {
        this.setState({
            passlogin: 'password'
        })
    }

    onChangeUser = (e) => {
        $("#input-user").removeClass("d-border-danger");
        $("#req_user").css("display", "none");
    }

    onChangePass = (e) => {
        $("#input-pass").removeClass("d-border-danger");
        $("#req_pass").css("display", "none");
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);

        var input = document.getElementById("press_login");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("click_login").click();
            }
        });
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
            // seconds: prevState.seconds + 0
        }));
        if(this.state.seconds % 20 === 0){
            //set change every 20 sec
            this.setState({flipped: !this.state.flipped})
            this.setState({index: (this.state.index + 1) % this.state.barInfo.length });
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        var props = this.props;
        const logo = "https://dummyimage.com/308x244/949294/fff.jpg";

        const switchPanel = () => {
            if(this.state.flipped === true){
                return "card is-flipped";
            }else{
                return "card";
            }
        }
        //zaky
        //fungsi untuk warna
        const colorLabel = (props) => {
            if(props < 0){
                return "red"
            }else{
                return "green"
            }
        }
        const colorIcon = (props) => {
            if(props < 0){
                return "icofont icofont-caret-down"
            }else{
                return "icofont icofont-caret-up"
            }
        }
        //zaky
        //fungsi untuk flipped
        const cardFace = (props) => {
            let info = this.state.barInfo[this.state.index];
            if(props === "front"){
                if(this.state.flipped){
                    return <div className="card__face card__face--front">&nbsp;</div>
                }else{
                    return <div className="card__face card__face--front">
                        <table width="100%" height="100%">
                            <tr>
                                <td className="spanSymbol">{info.symbol}</td>
                                <td>Last: {info.last}</td>

                                <td>
                                    <span className={colorLabel(info.change) +" "+ colorIcon(info.change)}>{info.change}</span>&nbsp;
                                </td>
                                <td>
                                    <span className={colorLabel(info.percentage)}>({info.percentage}%)</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                }
            }else{
                if(this.state.flipped){
                    return <div className="card__face card__face--back">
                        <table width="100%" height="100%">
                            <tr>
                                <td className="spanSymbol">{info.symbol}</td>
                                <td>Last: {info.last}</td>
                                <td>
                                    <span className={colorLabel(info.change) +" "+ colorIcon(info.change)}>{info.change}</span>&nbsp;
                                </td>
                                <td>
                                    <span className={colorLabel(info.percentage)}>({info.percentage}%)</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                }else{
                    return <div className="card__face card__face--back">&nbsp;</div>
                }
            }
        }
        return (
            <>
                {
                    <div style={{display: !props.signupState ? "block" : "none"}}>
                        <div className="bg-navy-gradient f-12 card-695" id="press_login">
                            <AppFrameAction ref="frameAction"/>
                            <WSConnectionAction ref="wsAction"/>
                            <main>
                                <div className="container-fluid p-login text-center">
                                    <div className={"card card-body d-border-active row bg-box-gradient mx-0"}>
                                        {/* <div id="alert-wrong" className={"col-sm-12 text-center fade-out mb-3 px-0 py-0"}>
                                            <div id="content-alert" className={"py-2 text-white bg-danger "}>The user ID or password
                                                did not match our records.
                                                Please try again
                                            </div>
                                        </div> */}
                                        {this.props.loginErrState === true ? 
                                            <div id="alert-wrong" className={"col-sm-12 text-center mb-3 px-0 py-0"}>
                                                <div id="content-alert" className={"py-2 text-white bg-danger "}>
                                                    {this.props.loginErrReason}. Please try again
                                                </div>
                                            </div>
                                            :''
                                        }
                                        <div className={"col-md-6 px-0"}>
                                            <img src={logo} width="100%"/>
                                        </div>
                                        <div className="col-md-6 pt-3">
                                            <div className="form-group row">
                                                {/*<label className="col-sm-12 px-5 py-2 col-form-label">User ID</label>*/}
                                                <div className="col-sm-12 text-left pl-5">Please enter ID and Password</div>
                                                <div className="col-sm-12 pr-0 pl-5">
                                                    {/*<input type="text" ref="userID" className="text-white input-login col-sm-12"/>*/}
                                                    <div className={"py-2"}>
                                                        <div id="input-user" className="ui left icon input col-sm-12 text-white px-0 dark mx-0 my-0">
                                                            <input type="text" ref="userID" placeholder="User ID" id="inputuser" ref="userID"
                                                                   onChange={this.onChangeUser}
                                                                   defaultValue="user30"/>
                                                            <i aria-hidden="true" className="icon py-3">
                                                                <i className="icon-icon-user-login"></i>&nbsp;&nbsp;|
                                                            </i>
                                                        </div>
                                                        <div className={"text-left"}>
                                                            <i><small className="text-danger" id="req_user" style={{"display": "none"}}></small></i>
                                                        </div>
                                                    </div>
                                                    <div className={"py-2"}>
                                                        <div className="buttonInside">
                                                            <div id="input-pass" className="ui left icon input col-sm-12 text-white px-0 mx-0 my-0 dark">
                                                                <input type={this.state.passlogin} ref="password" placeholder="Password"
                                                                       id="inputpass" onChange={this.onChangePass}
                                                                       defaultValue="Testing30"/>
                                                                <i aria-hidden="true" className="icon py-3">
                                                                    <i className="icon-icon-lock-login"></i>&nbsp;&nbsp;|
                                                                </i>
                                                            </div>
                                                            <button className="button-inside-input-login btn-dark"
                                                                    onMouseDown={this.onMouseDownPass} onMouseUp={this.onMouseUpPass}><i
                                                                className="fa fa-eye"></i></button>
                                                            <div className={"text-left"}>
                                                                <i><small className="text-danger" id="req_pass" style={{"display": "none"}}></small></i>
                                                            </div>
                                                        </div>
                                                        <div className={"text-left"}>
                                                            <Checkbox label='Remember Me' />
                                                            <text className="text-primary text-right pull-right click-pointer mt-9" onClick={this.buttonClickForgot}>Forgot your password?
                                                            </text>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"col-sm-12 pr-0 pl-5"}>
                                                    <div className="justify-content-center align-items-center d-flex    ">
                                                        <button id="click_login" type="submit" onClick={this.buttonClickLogin}
                                                                className="btn btn-primary form-control py-0">
                                                            Login
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={"col-sm-12 text-right pr-0 pl-5 mt-4"}>
                                                    <text
                                                        className="text-right mt-9">
                                                        New BIPS? <span className="click-pointer text-primary" onClick={this.buttonClickSignUp}>Sign Up</span>
                                                    </text>
                                                </div>

                                            </div>
                                            {/*<div className="form-group py-0 mt-0 mb-4 text-center">*/}
                                            {/*<small className="py-0 px-5 col-form-label">*/}
                                            {/*<span className="click-pointer px-0 btn btn-link"*/}
                                            {/*onClick={this.buttonClickDisclaimer}>*/}
                                            {/*<small className="text-primary">Disclaimer</small>*/}
                                            {/*</span>*/}
                                            {/*</small>*/}
                                            {/*</div>*/}


                                        </div>
                                        <div className="col-sm-12 mh-45 px-0 mt-3 mb-0">
                                            <div className={switchPanel()}>
                                                {cardFace("front")}
                                                {cardFace("back")}
                                            </div>
                                        </div>
                                        <div className="col-sm-12 mh-45 px-0 f-11">
                                            <div className="card_help">
                                                <table width="100%" height="100%">
                                                    <tr>
                                                        <td>CALL CENTER 14009</td>
                                                        <td>www.directtrading.co.id</td>
                                                        <td>
                                                            <button onClick={this.buttonClickHelp} className="btn btn-sm px-1 py-0 btn-block btn-default btn-dark">
                                                                <i className="icofont-exclamation"></i>
                                                                &nbsp;Help</button>
                                                        </td>
                                                        <td>
                                                            <button onClick={this.buttonFindHelp} className="btn btn-sm px-1 py-0 btn-block btn-default btn-dark">
                                                                <i className="icofont-search-1"></i>&nbsp;
                                                                Find Id
                                                            </button>
                                                        </td>
                                                        <td ><u className="click-pointer" onClick={this.buttonClickDisclaimer}>Disclaimer</u></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </main>
                        </div>
                    </div>
                }{
                    <div style={{display: props.signupState ? "block" : "none"}}>
                        <SignupUserPage />
                    </div>
                }
            </>
        );
    }
}

const LoginUserPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        networkState:vars.networkState,
        loginErrState: vars.loginErrState,
        loginErrReason: vars.loginErrReason,

        loginState: vars.loginState,
        getLogin : (loginState)=> {actions.sendAction('getLogin', {loginState})},
        signupState: vars.signupState,
        isSignup : (signupState)=> {actions.sendAction('isSignup', {signupState})},
        doLogin: (userID, password) => {actions.sendAction('doLogin', {userID, password})},
    }),
    ["doLogin"]
)(LoginUserPage_Base);

const SignupUserPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        signupState: vars.signupState,
        isSignup : (signupState)=> {actions.sendAction('isSignup', {signupState})}
    }),
)(SignUpModal);

export default LoginUserPage;
