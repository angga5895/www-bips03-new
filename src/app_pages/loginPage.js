import React from 'react';

// internal framework libraries
import { WSConnectionAction } from '../appnetwork.js';
import { AppFrameAction } from '../appframe.js';
import { ContextConnector } from '../appcontext.js';
import { BIPSAppContext } from '../AppData.js';
import Flash from '../flash';
import Bus from '../bus';

import {Dropdown} from 'semantic-ui-react';
import $ from "jquery";

//Form signup
import FormParticular     from "../app_sign_up/form_particular";
import FormDocument       from "../app_sign_up/form_document";
import FormAddress        from "../app_sign_up/form_address";
import FormSource         from "../app_sign_up/form_source";
import FormAdditonal      from "../app_sign_up/form_additional";
import { Checkbox } from 'semantic-ui-react'
import bahana_logo from './../img/bahanalogos.png';
import bahana_logo_black from './../img/bahanalogos_black.png';
import ojk_logo from './../img/ojk.png';
import idx_logo from './../img/idx.png';
import dxtrade_logo from './../img/dxtradelogos.png';

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
                        assume those risks, and give indemnity to PT. Bahana Sekuritas.
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
    copyClip(){
        var copyText = document.getElementById("resultID");
        // copyText.select();
        document.execCommand("copy");
        // alert("Copied the text: " + copyText.value);
    }
    findId(){
        var result = document.getElementById("resultID");
        result.value = "thisssmiy";
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding f-16">Find ID</label>
                <div className="text-white f-12">
                    <div className="form-group mb-0">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your ID(KTP) number or Email, and we'll
                            find your user ID.
                        </label>
                    </div>
                    <div className="form-group mb-0 d-border row px-0 mr-1 pt-1 mx-5">
                        <div className="col-sm-4 pl-0 pr-0 n-border">
                            <Dropdown placeholder='Buy'
                                      defaultValue={"Email"}
                                      search selection options={[{key:'ID(KTP)',value:'(ID)KTP',text: '(ID)KTP'},{key:'Email',value:'Email',text: 'Email'}]}
                                      className={"f-12 text-center align-self-center col-sm-12 n-border"}
                            />
                        </div>
                        <div className="ui small n-border input col-sm-7 px-0 f-12 text-center align-self-center black">
                            <input type="email" autoFocus={true} className="n-border" placeholder="bahana@gmail.com"/>
                        </div>
                    </div>
                    <div className="form-group py-2">
                        <div className="justify-content-center align-items-center d-flex py-0 px-5">
                            <button type="submit" className="btn btn-primary form-control py-0" onClick={()=>this.findId()}>
                                Find ID
                            </button>
                        </div>
                    </div>
                    <div className={"py-2 mx-5 click-pointer"} onClick={()=>this.copyClip()}>
                        <div id="input-user" className="ui left icon input col-sm-12 text-white px-0 click-pointer dark mx-0 my-0">
                            <input type="text" ref="userID" placeholder=""
                                   id="resultID"
                                 />
                            <i aria-hidden="true" className="icon py-3">
                                <i className="far fa-copy"></i>&nbsp;&nbsp;|
                            </i>
                        </div>
                        <div className={"text-left click-pointer"} >
                            <i><small className="text-danger" id="req_user" style={{"display": "none"}}></small></i>
                        </div>
                    </div>
                    <div className="form-group text-center">
                            <span className="click-pointer btn btn-link text-primary text-underline" onClick={this.closeClick}> Cancel</span>
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
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding f-16 text-center">Forgot Password</label>
                <div className="text-white f-12 text-center">
                    <div className="form-group">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Please Contact Our Support Center 14045
                        </label>
                    </div>
                </div>
                <div className="text-center">
                        <button className="btn btn-primary col-sm-3" onClick={this.closeClick}>Close</button>
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
class SlideBarLogin extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            index: 0,
            flipped: false,
            barSatu: [
                {
                    symbol: '',
                    last: 0,
                    change: 0,
                    percentage: 0,
                },
            ],
            barDua: [
                {
                    symbol: '',
                    last: 0,
                    change: 0,
                    percentage: 0,
                },
            ],
            barInfo: [
                {
                    symbol: 'GBP/USD',
                    last: '12849',
                    change: -0.99,
                    percentage: -0.30,
                },{
                    symbol: 'USD/JPY',
                    last: '108.59',
                    change: 0,
                    percentage: 0,
                },{
                    symbol: 'USD/CHF',
                    last: '0.9874',
                    change: -0.05,
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
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 10000);
    }
    tick() {

        this.setState(prevState => ({
            seconds: prevState.seconds + 1
            // seconds: prevState.seconds + 0
        }));
        if(this.state.seconds === 0){
            this.setState({barSatu: this.state.barInfo[0]})
        }
        if(this.state.seconds % 1 === 0){
            var elementBox = document.getElementById("hid-box");
            var nextIndex = (this.state.index + 1) % this.state.barInfo.length;
            elementBox.classList.toggle("active");
            //set change every 20 sec
            this.setState({flipped: !this.state.flipped});
            this.setState({index: nextIndex});

            if(this.state.flipped === false){
                this.setState({barSatu: this.state.barInfo[nextIndex]})
            }else{
                this.setState({barDua: this.state.barInfo[nextIndex]})
            }
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(){
        const colorLabelFront = (props) => {
            if(props < 0){
                return "bg-red-dark-grad"
            }if(props > 0){
                return "bg-green-dark-grad"
            }else{
                return "bg-yellow-red-grad"
            }
        }
        const colorIcon = (props) => {
            if(props < 0){
                return "icofont icofont-caret-down"
            }if(props > 0){
                return "icofont icofont-caret-up"
            }else{
                return "icofont icofont-minus"
            }
        }
        return(
            <div className="box-selection">
                <div className={"box-inside"+' '+colorLabelFront(this.state.barSatu.change)} id="show-box">
                    <table width="100%" height="100%">
                        <tr>
                            <td className="spanSymbol px-0">{this.state.barSatu.symbol}</td>
                            <td className=" px-0">{this.state.barSatu.last}</td>
                            <td className={"changeTd"}>
                                <span className={"white"}><i className={colorIcon(this.state.barSatu.change)}></i>
                                    {this.state.barSatu.change}
                                    </span>&nbsp;
                            </td>
                            <td>
                                <span className="white">
                                    ({this.state.barSatu.percentage}%)
                                    </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={"hid-box"+' '
                         +colorLabelFront(this.state.barDua.change)
                         +" "+(this.state.flipped===true ? 'active' : '')} id="hid-box">
                    <table width="100%" height="100%">
                        <tr>
                            <td className="spanSymbol px-0">{this.state.barDua.symbol}</td>
                            <td className="px-0">{this.state.barDua.last}</td>
                            <td>
                                <span className={"white"}><i className={colorIcon(this.state.barDua.change)}></i>
                                    {this.state.barDua.change}
                                    </span>&nbsp;
                            </td>
                            <td>
                                <span className="white">
                                    ({this.state.barDua.percentage}%)
                                    </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

}
class LoginUserPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            passlogin : 'password',
            seconds: 0,
            index: 0,
            flipped: false,
            barSatu: [
                {
                    symbol: '',
                    last: 0,
                    change: 0,
                    percentage: 0,
                },
            ],
            barDua: [
                {
                    symbol: '',
                    last: 0,
                    change: 0,
                    percentage: 0,
                },
            ],
            barInfo: [
                {
                    symbol: 'GBP/USD',
                    last: '12849',
                    change: -0.99,
                    percentage: -0.30,
                },{
                    symbol: 'USD/JPY',
                    last: '108.59',
                    change: 0,
                    percentage: 0,
                },{
                    symbol: 'USD/CHF',
                    last: '0.9874',
                    change: -0.05,
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
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">DX TRADE</h1></div>,
            closeIcon: false,
            size: 'mini',
            contentClass: FindIdModal,
            onClose: (result) => {console.log('Modal find result = ', result)}
        })
    }


    buttonClickForgot = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">DX TRADE</h1></div>,
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
    hideThis = () => {
        $("#alert-wrong").css("display","none");
        $("#buttonLogin").css("display","block");
        $("#loader").css("display","none");
    }
    buttonClickLogin = () => {
        var r = this.refs;
        var p = this.props;
        $("#loader").css("display","block");
        $("#buttonLogin").css("display","none");
        this.setState({isLoading: true});



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
      var input = document.getElementById("press_login");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("click_login").click();
            }
        });
    }

    clickOjk = (e) => {
        window.open('https://www.ojk.go.id/');
    }

    clickIdx = (e) => {
        window.open('https://www.idx.co.id/');
    }

    render () {

        var props = this.props;
        const logo = "https://dummyimage.com/308x244/949294/fff.jpg";


        // const testAlert = () => {
        //     window.flash = (message, type="info") => Bus.emit('flash', ({message, type}));
        //     window.flash('Record has been created successfully!', 'info');
        // }

        return (
            <>
                {
                    <div style={{display: !props.signupState ? "block" : "none"}}>
                        <div className="bg-navy-gradient f-12" id="press_login">
                            <AppFrameAction ref="frameAction"/>
                            <WSConnectionAction ref="wsAction"/>
                            <main>
                                <div className="container-fluid p-login text-center">
                                <Flash/>
                                    <div className={"card card-body d-border-active row bg-box-gradient mx-0"}>
                                        {this.props.loginErrState === true ?
                                            <div id="alert-wrong" className={"col-sm-12 text-center mb-3 px-0 py-0"}>
                                                <div className="pull-right mt-2 mr-3">
                                                    <i className="click-pointer icofont icofont-close" onClick={this.hideThis}></i>
                                                </div>
                                                <div id="content-alert" className={"py-2 text-white bg-danger "}>
                                                    {this.props.loginErrReason} Please try again
                                                </div>
                                            </div>
                                            :''
                                        }
                                        {/*<div className={"col-md-6 px-0"}>
                                            <img src={logo} width="100%"/>
                                        </div>*/}
                                        <div className="col-md-12 px-0 mb-0">
                                            <div className="form-group row mb-0" style={{ paddingLeft:"10%", paddingRight:"10%" }}>
                                                {/*<label className="col-sm-12 px-5 py-2 col-form-label">User ID</label>*/}
                                                <div className="col-sm-12 text-left text-center px-5">
                                                    <img src={dxtrade_logo} height="auto" width="35%" alt={"logo bahana"}/>
                                                </div>
                                                <div className="col-sm-12 pr-0 px-5">
                                                    {/*<input type="text" ref="userID" className="text-white input-login col-sm-12"/>*/}
                                                    <div className={"py-2"}>
                                                        <div id="input-user" className="ui left icon input col-sm-12 text-white px-0 dark mx-0 my-0">
                                                            <input type="text" ref="userID" placeholder="User ID" id="inputuser" ref="userID"
                                                                   onChange={this.onChangeUser}
                                                                   defaultValue="user7"/>
                                                            <i aria-hidden="true" className="icon py-3">
                                                                <i className="icon-icon-user-login"></i>&nbsp;&nbsp;|
                                                            </i>
                                                        </div>
                                                        <div className={"text-left"}>
                                                            <i><small className="text-danger" id="req_user" style={{"display": "none"}}></small></i>
                                                        </div>
                                                    </div>
                                                    <div className={"pt-2"}>
                                                        <div className="buttonInside">
                                                            <div id="input-pass" className="ui left icon input col-sm-12 text-white px-0 mx-0 my-0 dark">
                                                                <input type={this.state.passlogin} ref="password" placeholder="Password"
                                                                       id="inputpass" onChange={this.onChangePass}
                                                                       defaultValue="Testing7"/>
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"col-sm-12 pr-0 px-5"}>
                                                    <div id="loader"></div>

                                                    <div id="buttonLogin" className="justify-content-center text-center align-items-center d-flex    ">
                                                        <button id="click_login" type="submit" onClick={this.buttonClickLogin}
                                                                className="btn btn-primary form-control py-0">
                                                            <span id="text-login">Login</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={"col-sm-12 text-right px-5 mt-4 text-center"}>
                                                    <text 
                                                        className="text-primary text-right click-pointer mt-2 " 
                                                        onClick={this.buttonClickForgot}>Forgot your password?
                                                    </text>
                                                    <text
                                                        className="text-right mt-2 dot-login">
                                                        New DX TRADE?&nbsp;
                                                        <span 
                                                            className="click-pointer text-primary" 
                                                            onClick={this.buttonClickSignUp}>
                                                            Sign Up
                                                        </span>
                                                    </text>
                                                    
                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-sm-12 mh-45 px-0 mt-3 mb-0">
                                            <SlideBarLogin/>
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
                                                        <td><u className="click-pointer" onClick={this.buttonClickDisclaimer}>Disclaimer</u></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-sm-12 f-10 py-4 px-5">
                                        PT. Bahana Sekuritas, member dari Bursa Efek Indonesia, serta terdaftar
                                        dan diawasi oleh Otoritas Jasa Keuangan (OJK)
                                    </div>

                                    <div className="col-sm-12 text-center row mx-0" style={{justifyContent : "center"}}>
                                        <img src={idx_logo} width="15%" className="click-pointer" onClick={this.clickIdx}/>
                                        <img src={ojk_logo} width="30%" className="click-pointer" onClick={this.clickOjk}/>
                                    </div>

                                    <div className="col-sm-12 f-10 pt-4 px-5">
                                        Copyright 2020 by PT. Bahana Sekuritas
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
        thememode:vars.thememode,

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
