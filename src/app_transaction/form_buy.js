import React from "react";
import {Button, InputGroup, Table} from "react-bootstrap";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import Select from "react-select";
import {AppFrameAction} from "./../appframe";
import VerifyPIN, {tanggal} from "../app_pages/verifyPin";
import NumberInput from "./../numberinput";

const stateOptions = [
    { key: 'rg', value: 'rg', text: 'RG' },
    { key: 'day', value: 'day', text: 'Day' },
];

class FormBuy extends React.PureComponent{
    constructor(props){
        super(props);
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickPIN = (e) => {
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            contentClass: PINVerify,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    render(){
        return(
            <div className="f-12 px-3">
                <AppFrameAction ref="frameAction" />
                <Table borderless className={`${(this.props.part == "stockInfo") ? 'card-467' : 'card-475' } mb-0`}>
                    <tbody>
                    <tr>
                        <td className="py-0">
                            <div className="row mb-2">
                                <div className="col-sm-6 f-18 text-danger"></div>
                                <div className="col-sm-6 text-right text-form"><i className="fa fa-calendar-alt"></i> {tanggal()}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-0">
                            <div className="row py-form mb-2">
                                <div className="col-sm-2 text-form">Code</div>
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
                                        <Checkbox label='Prevent same order' className="f-12 text-form mt-2 mb-0 align-self-center" />
                                    </div>
                                </div>
                                <div className="col-sm-12 row">
                                    <div className="col-sm-6">
                                        <div className="pb-0 text-form"><i className="icofont icofont-warning text-warning"></i>&nbsp; Info Acceleration Board/Status Stock Info</div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="pb-0 text-form"><i className="fa fa-info-circle text-danger"></i>&nbsp; Not yet submit annual financial report</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-0">
                            <div className="row py-form mb-2">
                                <div className="col-sm-8 ml-0 px-0 row">
                                    <div className="col-sm-3 text-form">Price</div>
                                    <div className="col-sm-9">
                                        <NumberInput idclassname={this.props.idPrice} name="buy_price" placeholder="Price" size="small" defaultValue={"12650"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
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
                                    <div className="col-sm-3 text-form">Vol</div>
                                    <div className="col-sm-9">
                                        <NumberInput idclassname={this.props.idVol} name="buy_vol" placeholder="Vol" size="small" defaultValue={"10"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                    </div>
                                </div>
                                <div className="col-sm-4 pl-5 row text-center align-middle align-self-center pr-0">
                                    <label className="col-sm-5 pr-4 pl-0 mb-0 bg-buy py-2 align-self-center text-left text-form">Lot</label>
                                    <button type="button"
                                            className="col-sm-7 px-0 btn btn-sm btn-dark py-2 align-self-center">Max
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-0">
                            <div className="row py-form mb-2">
                                <div className="col-sm-8 ml-0 px-0 row">
                                    <div className="col-sm-3 text-form">Mkt.</div>
                                    <div className="col-sm-9">
                                        <Dropdown placeholder='Mkt' search selection options={stateOptions} className={"f-12 text-center align-self-center col-sm-12"} defaultValue="rg"/>
                                    </div>
                                </div>
                                <div className="col-sm-4 align-middle align-self-center">
                                    <div className="col-sm-12 px-0">
                                        <Checkbox label='Order Booking' className="f-12 text-white px-0 py-2 my-0 align-self-center text-form" />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-0">
                            <div className="row">
                                <div className="col-sm-8 ml-0 px-0 row">
                                    <div className="col-sm-3 mb-2 py-form text-form">Expire</div>
                                    <div className="col-sm-9 mb-2 py-form">
                                        <Dropdown placeholder='Expire' search selection options={stateOptions} className={"f-12 text-center align-self-center col-sm-12"} defaultValue="day"/>
                                    </div>

                                    <div className="col-sm-3 mb-2 py-form text-form">Value</div>
                                    <div className="col-sm-9 mb-2 py-form">
                                        <input type="text" id={this.props.idValue} name="buy_value" placeholder="Value" size="small" defaultValue={"12,600"} className="col-sm-12 f-12 text-center align-self-center form-control"
                                               style={{"border-radius": "0px", "text-align": "right"}} readOnly={true} />
                                    </div>
                                </div>
                                <div className="col-sm-4 text-center align-middle align-self-center">
                                    <Button size="sm" className="btn btn-lg btn-danger col-sm-8" onClick={this.buttonClickPIN}>
                                        <i className="icon-icon-buy-btn fa-2x"></i>
                                        <br/>Buy
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
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black">Cash Buy <br/>(Share)</td>
                                        <td className="no-wrap bg-grey d-border-tr-gray">230</td>
                                        <td className="no-wrap bg-gray-tradding d-border-tr-black">Cash Buy <br/>(Lot)</td>
                                        <td className="no-wrap bg-grey d-border-tr-gray">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap bg-gray-tradding">Max Buy <br/>(Share)</td>
                                        <td className="no-wrap bg-grey">303</td>
                                        <td className="no-wrap bg-gray-tradding">Max Buy <br/>(Lot)</td>
                                        <td className="no-wrap bg-grey">3</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

class PINVerify extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'buy'/>
            </>
        );
    }
}

export default FormBuy;