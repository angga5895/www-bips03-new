import React from "react";
import {AppFrameAction} from "../appframe";
import {WSConnectionAction} from "../appnetwork";
import TableInfoTransaction from "./tableInfoTransaction";
import {Checkbox, Dropdown, Input} from "semantic-ui-react";
import NumberInput from "../numberinput";
import {tanggal} from "../app_pages/verifyPin";
import {Button, Table} from "react-bootstrap";
import VerifyPIN from "../app_pages/verifyPin";

const stateOptionsLp = [
    { key: 'lastprice', value: 'lastprice', text: 'Last Price' },
    { key: 'bestofferprice', value: 'bestofferprice', text: 'Best Offer Price' },
    { key: 'bestbidprice', value: 'bestbidprice', text: 'Best Bid Price' },
];

const stateOptionsOperator = [
    { key: 'lebihkecil', value: 'lebihkecil', text: '< =' },
    { key: 'lebihbesar', value: 'lebihbesar', text: '> =' },
];

class PINVerifyBuy extends React.Component {
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'buy'/>
            </>
        );
    }
}class PINVerifySell extends React.Component {
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'sell'/>
            </>
        );
    }
}

class SettingOrder extends React.Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    buttonClickPIN = (e) => {
        var frameAction = this.refs.frameAction;
        var getpin = document.getElementById("buttonAct").value;
        frameAction.showModal({
            headerClass: () => <div className="text-right">
               </div>,
            contentClass: (getpin == "Buy") ? PINVerifyBuy : PINVerifySell,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });

    }
    render(){
        const buttonCustomSetting = (no) => {
            if(no == 1){
                return (
                    <button type="button" className="col-sm-7 px-0 btn btn-sm btn-dark align-self-center">Max</button>
                )
            }else{
                return (
                    <Checkbox label='All' className="f-12 text-white my-0 align-self-center" />
                )
            }
        }
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col-sm-12 px-2 pt-2 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 f-12">
                        <TableInfoTransaction lotshare="buyPageTrade"/>
                    </div>
                    <div className={this.state.activeTab === '1' ? "col-sm-6 my-0 d-border-active bg-danger py-0 px-0" : "col-sm-6 my-0 d-border-active bg-success py-0 px-0"}>
                        <div className="cssmenumodal bg-dark-grey pb-0 mb-2 col-sm-12 mx-0 px-0">
                            <ul>
                                <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a className="pb-3 pt-4"><span className="f-11">&nbsp; Buy</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a className="pb-3 pt-4"><span className="f-11">&nbsp; Sell</span></a></li>
                            </ul>
                        </div>
                        <div className='d-block f-12 px-3'>
                            <Table borderless className="card-475 mb-0">
                                <tbody>
                                <tr>
                                    <td className="py-0">
                                        <div className="row mb-2">
                                            <div className={`col-sm-6 f-18 ${(this.state.activeTab == 1) ? 'text-danger' : 'text-success'}`}>
                                                {/*<div className="col-sm-6 f-18 text-success">*/}
                                                {/*{this.state.activeTab == 1 ? "Buy" : "Sell"}*/}
                                            </div>
                                            <div className="col-sm-6 text-right"><i className="fa fa-calendar-alt"></i> {tanggal()}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0">
                                        <div className="row py-form mb-2">
                                            <div className="col-sm-2">Code</div>
                                            <div className="col-sm-10 row pr-0">
                                                <div className="col-sm-4 pr-0 text-center align-self-center">
                                                    <input type="text" placeholder="Code" defaultValue={"AALI"} className="form-control f-12" style={{"border-radius": "0px", }}/>
                                                </div>
                                                <div className="input-group col-sm-8 align-self-center pl-4">
                                <span className="input-group-btn">
                                    <label className="form-control ui icon button bg-gold px-2 py-3" style={{"margin": "0px","border-bottom-left-radius": ".28571429rem","border-top-left-radius": ".28571429rem", "border-bottom-right-radius": "0px", "cursor": "default"}}>
                                        {"90%"}
                                    </label>
                                </span>
                                                    <input type="text" placeholder="Name" defaultValue={"Astra Argo Lestari Tbk."} className="form-control f-12" style={{"border-radius": "0px", }}/>
                                                </div>
                                                <div className="col-sm-12">
                                                    <Checkbox label='Prevent same order' className="f-12 text-white mt-2 mb-0 align-self-center" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 row">
                                                <div className="col-sm-6">
                                                    <div className="pb-0"><i className="icofont icofont-warning text-warning"></i>&nbsp; Info Acceleration Board/Status Stock Info</div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="pb-0"><i className="fa fa-info-circle text-danger"></i>&nbsp; Not yet submit annual financial report</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0">
                                        <div className="row py-form mb-2">
                                            <div className="col-sm-8 ml-0 px-0 row">
                                                <div className="col-sm-3">Price</div>
                                                <div className="col-sm-9">
                                                    <NumberInput idclassname={this.props.idPrice} name="sell_price" placeholder="Price" size="small" defaultValue={"12650"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 text-center align-middle align-self-center">
                                                {/*<Checkbox label='Auto Last' className="f-12 text-white col-sm-11 px-4 my-0 align-self-center" />*/}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0">
                                        <div className="row py-form mb-2">
                                            <div className="col-sm-8 ml-0 px-0 row">
                                                <div className="col-sm-3">Vol</div>
                                                <div className="col-sm-9">
                                                    <NumberInput idclassname={this.props.idVol} name="sell_vol" placeholder="Vol" size="small" defaultValue={"10"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 pl-5 row text-center align-middle align-self-center pr-0">
                                                <label className={this.state.activeTab === '1' ? "col-sm-5 pr-4 pl-0 mb-0 bg-danger py-2 align-self-center text-left" : "col-sm-5 pr-4 pl-0 mb-0 bg-success py-2 align-self-center text-left"}>Lot</label>
                                                <div className="col-sm-7 px-0 mx-0 py-0 align-self-center text-left">
                                                    {buttonCustomSetting(this.state.activeTab)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0">
                                        <div className="row py-form mb-2">
                                            <div className="col-sm-8 ml-0 px-0 row">
                                                <div className="col-sm-3">Mkt.</div>
                                                <div className="col-sm-9">
                                                    <Dropdown placeholder='Mkt' search selection options="" className={"f-12 text-center align-self-center col-sm-12"} defaultValue="rg"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 align-middle align-self-center">
                                                <div className="col-sm-12 px-0">
                                                    <Checkbox label='Order Booking' className="f-12 text-white px-0 py-2 my-0 align-self-center" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0">
                                        <div className="row">
                                            <div className="col-sm-8 ml-0 px-0 row">
                                                <div className="col-sm-3 mb-3 py-form">Expire</div>
                                                <div className="col-sm-9 mb-3 py-form">
                                                    <Dropdown placeholder='Expire' search selection options="" className={"f-12 text-center align-self-center col-sm-12"} defaultValue="day"/>
                                                </div>

                                                <div className="col-sm-3 mb-3 py-form">Value</div>
                                                <div className="col-sm-9 mb-3 py-form">
                                                    <input type="text" id={this.props.idValue} name="sell_value" placeholder="Value" size="small" defaultValue={"12,600"} className="col-sm-12 f-12 text-center align-self-center form-control"
                                                           style={{"border-radius": "0px", "text-align": "right"}} readOnly={true} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 text-center align-middle align-self-center">
                                                <Button
                                                    size="sm"
                                                    className={`btn btn-lg col-sm-8 ${(this.state.activeTab == 1) ? '  btn-danger' : ' btn-success'}`}
                                                    onClick={this.buttonClickPIN}
                                                    id="buttonAct"
                                                    value={this.state.activeTab == 1 ? 'Buy' : 'Sell'}
                                                >
                                                    <i className={`fa-2x ${(this.state.activeTab == 1) ? '  icon-icon-buy-btn' : ' icon-icon-sell-btn'}`}></i>
                                                    <br/>{this.state.activeTab == 1 ? 'Buy' : 'Sell'}
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0">
                                        <div className="row px-4 py-form">
                                            <Table responsive borderless size="sm" className="text-white pb-0 mb-0 d-border-table">
                                                <thead></thead>
                                                <tbody>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Cash On <br/> T+2</td>
                                                    <td className="no-wrap bg-grey d-border-tr-gray">5,911,198</td>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Remain <br/> Trade Limit</td>
                                                    <td className="no-wrap bg-grey d-border-tr-gray">15,000,980</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">Investment</td>
                                                    <td className="no-wrap bg-grey d-border-tr-gray">7,545,000</td>
                                                    <td className="no-wrap bg-gray-tradding d-border-tr-black">% Change</td>
                                                    <td className="no-wrap bg-grey d-border-tr-gray">-1.18%</td>
                                                </tr>
                                                <tr>
                                                    <td className="no-wrap bg-gray-tradding">Vol</td>
                                                    <td className="no-wrap bg-grey">6</td>
                                                    <td className="no-wrap bg-gray-tradding">P/L</td>
                                                    <td className="no-wrap bg-grey">-90,240</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

export default SettingOrder;