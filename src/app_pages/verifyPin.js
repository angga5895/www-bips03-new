import React from "react";
import PinInput from "react-pin-input";
import {AppFrameAction} from "../appframe";
import {Table, Alert} from "react-bootstrap";
import AmendArrow from "./../img/amend-arrow.svg";
import $ from "jquery";

class AlertPinSalah extends React.PureComponent{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <Alert color="danger">
                    PIN is wrong!
                </Alert>
            </>
        );
    }
}

function tanggal() {
    var fullDate = new Date().toLocaleDateString();
    var spDate = fullDate.split('/');

    var day = '';
    spDate[0].length < 2 ?
        day = '0'+spDate[0]
        : day = spDate[0]

    var month = '';
    spDate[1].length < 2 ?
        month = '0'+spDate[1]
        : month = spDate[1]

    var date = day+'/'+month+'/'+spDate[2];
    return date;
}

class VerifyPIN extends React.PureComponent{
    constructor(props){
        super(props);
    }

    state = {
        value: "",
        visible:false,
        isEmpty: false,
    }

    onChange = value =>{
        this.setState({ value });
    };

    onAutoSubmit = () => {
        $("#pin-click-verify").click();
    }

    onClickSubmit = (e) => {
        if(this.state.value.length >= '6'){
            if(this.state.value === '123456') {
                if (this.props.tipe === 'buy'){
                    this.refs.frameAction.closeModal(100);
                    var frameAction = this.refs.frameAction;
                    frameAction.showModal({
                        headerClass: () => <div className="text-white f-12 text-right"><i className="fa fa-calendar-alt"></i> &nbsp; {tanggal()}</div>,
                        contentClass: detailBuyModal,
                        onClose: (result) => console.log('Second modal result = ', result),
                        size: "mini"
                    });
                } else if (this.props.tipe === 'sell'){
                    this.refs.frameAction.closeModal(100);
                    var frameAction = this.refs.frameAction;
                    frameAction.showModal({
                        headerClass: () => <div className="text-white f-12 text-right"><i className="fa fa-calendar-alt"></i> &nbsp; {tanggal()}</div>,
                        contentClass: detailSellModal,
                        onClose: (result) => console.log('Second modal result = ', result),
                        size: "mini"
                    });
                }else if (this.props.tipe === 'amend'){
                    this.refs.frameAction.closeModal(100);
                    var frameAction = this.refs.frameAction;
                    frameAction.showModal({
                        headerClass: () =>
                            <div className="row col-sm-12 px-0 mx-0">
                                <div className="col-sm-6 px-0 mx-0 text-white f-14">Order Information</div>
                                <div className="col-sm-6 px-0 mx-0 text-white f-12 text-right">
                                    <i className="fa fa-calendar-alt"></i> &nbsp; {tanggal()}
                                </div>
                            </div>,
                        contentClass: detailAmendModal,
                        onClose: (result) => console.log('Second modal result = ', result),
                        size: "small"
                    });
                } else if (this.props.tipe === 'withdraw'){
                    this.refs.frameAction.closeModal(100);
                    var frameAction = this.refs.frameAction;
                    frameAction.showModal({
                        headerClass: () => 'Ini : '+this.props.tipe,
                        contentClass: detailWithdrawModal,
                        onClose: (result) => console.log('Second modal result = ', result),
                        size: "mini"
                    });
                }else if (this.props.tipe === 'pinLanding'){
                    this.refs.frameAction.closeModal(100);

                    $("#pinPortofolio").removeClass("d-block");
                    $("#pinPortofolio").addClass("d-none");
                    $("#detailPortofolio").addClass("d-block");
                    $("#detailPortofolio").removeClass("d-none");

                    $("#contentPinStockCash").removeClass("d-none");
                    $("#contentPinStockCash").addClass("d-block");

                    $("#verifyPinStockCash").removeClass("d-block");
                    $("#verifyPinStockCash").addClass("d-none");

                    $("#FundPin").addClass("d-none");
                    $("#ContentFund").removeClass("d-none");
                    $("#ContentFund").addClass("d-block");

                } else {
                    var visible = false;
                    var value = "";
                    this.setState({ visible });
                    this.pin.clear();
                    this.setState({ value });
                }
            } else{
                var visible = true;
                this.setState({ visible });
                var isEmpty = false;
                this.setState({ isEmpty });
            }
        }else{
            var isEmpty = true;
            this.setState({ isEmpty });

            var visible = false;
            this.setState({ visible });
        }
    };

    onClickCloseAlert = (e) => {
        var visible = false;
        var value = "";
        this.setState({ visible });
        this.pin.clear();
        this.setState({ value });
    };
    onClickCloseFullFill = (e) => {
        var isEmpty = false;
        this.setState({ isEmpty });
        this.pin.clear();
    }

    forgotPIN = (e) =>{
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">BIPS</h1></div>,
            contentClass: ForgotPINModal,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    componentDidMount(){
        $(".pincode-input-text").on('keypress',function(e) {
            if(e.which == 13) {
                $("#pin-click-verify").click();
            }
        });
    }

    render(){
        const {value} = this.state;
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="text-center align-self-center align-middle">
                        <div className="d-border-bold img-round-icon">
                            <i className="icofont icofont-lock icofont-4x"></i>
                        </div>
                    </div>
                    <div className="form-group text-center pt-5">
                        <label className="col-sm-12 px-5 py-2 col-form-label f-14 font-weight-bold">Please insert 6 digit PIN Security</label>
                        {/*<label className="col-sm-12 px-5 py-2 col-form-label">Please fullfill with 6 digit security*/}
                            {/*PIN to verify your transaction</label>*/}
                    </div>
                    <div className="form-group mb-0">
                        <PinInput
                            inputStyle={{"color":/*cssmode == 'night' ? '#FFFFFF':*/'#999999', "border":"#565252 1px solid","border-radius":"10%","width":"15.25%"}}
                            inputFocusStyle={{"color":/*cssmode == 'night' ? '#FFFFFF':*/'#999999', "border":"#065A96 1px solid", "border-radius":"10%","width":"15.25%"}}
                            length={6}
                            focus
                            secret
                            ref={p => (this.pin = p)}
                            type="numeric"
                            onComplete={this.onAutoSubmit}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group mx-0 my-0 py-2">
                        <label className="col-sm-12 my-0 py-0 px-1 col-form-label">Forgot your PIN?
                            <span className="click-pointer btn btn-link text-primary" onClick={this.forgotPIN}> Click here</span>
                        </label>
                    </div>

                    <div className="form-group pt-1 pb-1 mb-0 pb-0">
                        <div className="justify-content-center align-items-center d-flex py-0">
                            <button id="pin-click-verify" type="submit" className=
                                {
                                    this.props.tipe === 'buy'? 'btn btn-danger form-control py-0' :
                                        this.props.tipe === 'sell'? 'btn btn-success form-control py-0' :
                                            this.props.tipe === 'amend'? 'btn btn-primary form-control py-0' :
                                                this.props.tipe === 'withdraw'? 'btn btn-brown form-control py-0' :
                                                'btn btn-danger form-control py-0'
                                }
                                    onClick={this.onClickSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="form-group text-center f-12 mb-0 mt-2">
                        <span className="click-pointer btn btn-link text-primary text-underline" onClick={(e) => this.refs.frameAction.closeModal(100)}> Cancel</span>
                    </div>

                    <div className={this.state.visible ? "col-sm-12 text-center bg-danger fade-in" : "col-sm-12 text-center bg-danger fade-out"}>
                        <div className={/*cssmode == 'night'? */"px-1 py-2 text-white" /*: "px-2 py-4 text-black"*/}>
                            <i className="click-pointer icofont icofont-close pull-right pt-1" onClick={this.onClickCloseAlert}></i>
                            Please insert the correct pin!
                        </div>
                    </div>
                    <div className={this.state.isEmpty ? "col-sm-12 text-center bg-info fade-in" : "col-sm-12 text-center bg-info fade-out"}>
                        <div className={/*cssmode == 'night'? */"px-1 py-2 text-white" /*: "px-2 py-4 text-black"*/}>
                            <i className="click-pointer icofont icofont-close pull-right pt-1" onClick={this.onClickCloseFullFill}></i>
                            Please fullfil pin number.
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class detailBuyModal extends React.Component {
    componentDidMount(){
        $(document).keypress(function(e) {
            if(e.which == 13) {
                $("#enter-ok").click();
            }
        });
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-12 text-white px-0 mx-0 f-12">
                    <div className="col-sm-12 row mx-0 px-0">
                        <div className="col-sm-6 px-0 mx-0">
                            Order Information
                        </div>
                        <div className="col-sm-6 px-0 mx-0 text-right">
                            (Order No: <span className="text-primary">#123456</span>)
                        </div>
                    </div><br/>
                    <div className="col-sm-12 mx-0 px-0">
                        <Table size="sm" responsive borderless className="text-white">
                            <thead className="d-border-table">
                            <tr>
                                <th className={/*cssmode == 'night'? */"text-center bg-danger text-white" /*: "text-center bg-danger text-black"*/} colSpan="3">BUY</th>
                            </tr>
                            </thead>
                            <tbody className="no-wrap d-border-table">
                            <tr>
                                <td>Code</td>
                                <td>:</td>
                                <td>AALI (Astra Argo Lestari Tbk.)</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>:</td>
                                <td className="text-success">12,600</td>
                            </tr>
                            <tr>
                                <td>Vol (Lot)</td>
                                <td>:</td>
                                <td className="text-success">10</td>
                            </tr>
                            <tr>
                                <td>Mkt</td>
                                <td>:</td>
                                <td>RG</td>
                            </tr>
                            <tr>
                                <td>Expire</td>
                                <td>:</td>
                                <td>Day</td>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td>:</td>
                                <td className="text-success">12,600,000</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div><br/>
                <div className="col-sm-12 text-center mx-0 px-0">Do you want to buy this stock ?</div><br/>
                <div className="col-sm-12 row mx-0 px-0">
                    <div className="col-sm-6 text-right">
                        <button className="btn btn-dark col-sm-12" onClick={
                            () => {
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>Cancel</button>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-danger col-sm-12" id="enter-ok" onClick={
                            () => {
                                alert('OK!!');
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>OK</button>
                    </div>
                </div>
            </>
        );
    }
}

class detailSellModal extends React.Component {
    componentDidMount(){
        $(document).keypress(function(e) {
            if(e.which == 13) {
                $("#enter-ok").click();
            }
        });
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-12 text-white px-0 mx-0 f-12">
                    <div className="col-sm-12 row mx-0 px-0">
                        <div className="col-sm-6 px-0 mx-0">
                            Order Information
                        </div>
                        <div className="col-sm-6 px-0 mx-0 text-right">
                            (Order No: <span className="text-primary">#123456</span>)
                        </div>
                    </div><br/>
                    <div className="col-sm-12 mx-0 px-0">
                        <Table size="sm" responsive borderless className="text-white">
                            <thead className="d-border-table">
                            <tr>
                                <th className={/*cssmode == 'night'? */"text-center bg-success text-white" /*: "text-center bg-success text-black"*/} colSpan="3">SELL</th>
                            </tr>
                            </thead>
                            <tbody className="no-wrap d-border-table">
                            <tr>
                                <td>Code</td>
                                <td>:</td>
                                <td>AALI (Astra Argo Lestari Tbk.)</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>:</td>
                                <td className="text-success">12,600</td>
                            </tr>
                            <tr>
                                <td>Vol (Lot)</td>
                                <td>:</td>
                                <td className="text-success">10</td>
                            </tr>
                            <tr>
                                <td>Mkt</td>
                                <td>:</td>
                                <td>RG</td>
                            </tr>
                            <tr>
                                <td>Expire</td>
                                <td>:</td>
                                <td>Day</td>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td>:</td>
                                <td className="text-success">12,600,000</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div><br/>
                <div className="col-sm-12 text-center mx-0 px-0">Do you want to sell this stock ?</div><br/>
                <div className="col-sm-12 row mx-0 px-0">
                    <div className="col-sm-6 text-right">
                        <button className="btn btn-dark col-sm-12" onClick={
                            () => {
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>Cancel</button>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-success col-sm-12" id="enter-ok" onClick={
                            () => {
                                alert('OK!!');
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>OK</button>
                    </div>
                </div>
            </>
        );
    }
}

class detailWithdrawModal extends React.Component {
    componentDidMount(){
        $(document).keypress(function(e) {
            if(e.which == 13) {
                $("#enter-ok").click();
            }
        });
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-12 text-white px-0 mx-0 f-12">
                    <div className="col-sm-12 row mx-0 px-0">
                        <div className="col-sm-6 px-0 mx-0">
                            Order Information
                        </div>
                        <div className="col-sm-6 px-0 mx-0 text-right">
                            (Order No: <span className="text-primary">#123456</span>)
                        </div>
                    </div><br/>
                    <div className="col-sm-12 mx-0 px-0">
                        <Table size="sm" responsive borderless className="text-white">
                            <thead className="d-border-table">
                            <tr>
                                <th className={/*cssmode == 'night'? */"text-center bg-brown text-white" /*: "text-center bg-brown text-black"*/} colSpan="3">WITHDRAW</th>
                            </tr>
                            </thead>
                            <tbody className="no-wrap d-border-table">
                            <tr>
                                <td>Code</td>
                                <td>:</td>
                                <td>AALI (Astra Argo Lestari Tbk.)</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>:</td>
                                <td className="text-success">12,600</td>
                            </tr>
                            <tr>
                                <td>Vol (Lot)</td>
                                <td>:</td>
                                <td className="text-success">10</td>
                            </tr>
                            <tr>
                                <td>Mkt</td>
                                <td>:</td>
                                <td>RG</td>
                            </tr>
                            <tr>
                                <td>Expire</td>
                                <td>:</td>
                                <td>Day</td>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td>:</td>
                                <td className="text-success">12,600,000</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div><br/>
                <div className="col-sm-12 text-center mx-0 px-0">Do you want to withdraw this stock ?</div><br/>
                <div className="col-sm-12 row mx-0 px-0">
                    <div className="col-sm-6 text-right">
                        <button className="btn btn-dark col-sm-12" onClick={
                            () => {
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>Cancel</button>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-brown col-sm-12" id="enter-ok" onClick={
                            () => {
                                alert('OK!!');
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>OK</button>
                    </div>
                </div>
            </>
        );
    }
}

class detailAmendModal extends React.Component {
    componentDidMount(){
        $(document).keypress(function(e) {
            if(e.which == 13) {
                $("#enter-ok").click();
            }
        });
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-12 row mx-0 px-0 mb-2 f-12">
                    <div className="col-sm-9 px-1 mx-0 f-14">
                        <span className="pr-4">[Order No: <span className="text-primary">#123456</span>]</span>
                        <span className="text-right pl-5 ml-5">
                            Current Order
                            <img src={AmendArrow} alt="amend-arrow" width="9%" height="auto" className="px-2"/>
                            Amend Order
                        </span>
                    </div>
                </div>
                <div className="col-sm-12 px-0 mx-0 row f-12">
                    <div className="col-sm-6 text-white px-0 mx-0">
                        <div className="col-sm-12 mx-0 px-0">
                            <Table size="sm" responsive borderless className="text-white">
                                <thead></thead>
                                <tbody className="no-wrap d-border-table">
                                <tr>
                                    <td colSpan="3">BUY</td>
                                </tr>
                                <tr>
                                    <td>Code</td>
                                    <td>:</td>
                                    <td>AALI (Astra Argo Lestari Tbk.)</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>:</td>
                                    <td>12,600</td>
                                </tr>
                                <tr>
                                    <td>Vol (Lot)</td>
                                    <td>:</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Mkt</td>
                                    <td>:</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>Expire</td>
                                    <td>:</td>
                                    <td>Day</td>
                                </tr>
                                <tr>
                                    <td>Value</td>
                                    <td>:</td>
                                    <td>12,600,000</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-sm-6 text-white px-1 mx-0">
                        <div className="col-sm-12 mx-0 px-0">
                            <Table size="sm" responsive borderless className="text-white bg-gray-tradding">
                                <thead></thead>
                                <tbody className="no-wrap d-border-table">
                                <tr>
                                    <td colSpan="3" className="text-danger">BUY</td>
                                </tr>
                                <tr>
                                    <td>Code</td>
                                    <td>:</td>
                                    <td>AALI (Astra Argo Lestari Tbk.)</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>:</td>
                                    <td className="text-success">12,600</td>
                                </tr>
                                <tr>
                                    <td>Vol (Lot)</td>
                                    <td>:</td>
                                    <td className="text-success">100</td>
                                </tr>
                                <tr>
                                    <td>Mkt</td>
                                    <td>:</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>Expire</td>
                                    <td>:</td>
                                    <td>Day</td>
                                </tr>
                                <tr>
                                    <td>Value</td>
                                    <td>:</td>
                                    <td className="text-success">12,600,000</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div><br/>
                <div className="col-sm-12 text-center mx-0 px-0">Do you want to amend this stock ?</div><br/>
                <div className="col-sm-12 row mx-0 px-0">
                    <div className="col-sm-6 text-right">
                        <button className="btn btn-dark col-sm-4" onClick={
                            () => {
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>Cancel</button>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-primary col-sm-4" id="enter-ok" onClick={
                            () => {
                                alert('OK!!');
                                var refs = this.refs;
                                refs.frameAction.closeModal(100)
                            }
                        }>OK</button>
                    </div>
                </div>
            </>
        );
    }
}

class ForgotPINModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <div className="f-12">
                <AppFrameAction ref="frameAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding">Forgot PIN</label>
                <div className="text-white">
                    <div className="form-group">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                            send link to reset your PIN
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
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Verify PIN</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerifyPIN;
export {tanggal};