import React from "react";
/*import {Input, InputGroup, InputGroupAddon, InputGroupText, Table, UncontrolledTooltip} from "reactstrap";*/
import {Table} from 'react-bootstrap';
import { Input,Popup } from 'semantic-ui-react';
import {BuyModal, SellModal} from './../app_pages/stockPage';
import {AppFrameAction, AppModal} from "../appframe";
import {WSConnectionAction} from "../appnetwork";

class TableInfoTransaction extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                <div className="col-sm-12 row px-0 mx-0 h-30 my-2">
                    <div className="col-sm-3-6 px-0 mx-0">
                        <Input label={{ color: 'bg-gold', content: '90%' }} defaultValue='AALI'
                               labelPosition='right' placeholder='Code' size='mini' style={{width:'50%'}}/>
                    </div>

                    <div className="col-sm-3-6 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-primary text-center">
                            7,000,545,000,000
                            <br/><span className="text-white f-9">Investment In AALI</span>
                        </label>
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-danger text-center">
                            -1,18%
                            <br/><span className="text-white f-9">%Change</span>
                        </label>
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <Popup content='600 Share' position='top center' trigger={
                            <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-primary text-center" id={this.props.lotshare}>
                                <span id="lotShare">6</span>
                                <br/><span className="text-white f-9">Lot</span>
                            </label>
                        } />
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-danger text-center">
                            -90,240
                            <br/><span className="text-white f-9">P/L</span>
                        </label>
                    </div>
                </div>

                

                <Table responsive borderless size="sm" className={this.props.lotshare === 'modalbuy' || this.props.lotshare === 'modalSell' || this.props.lotshare === 'modalamend' ? "text-white d-border-table bg-dark-grey card-112 mb-1" : "text-white d-border-table bg-dark-grey card-112 mb-2"}>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Last</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Previous</td>
                        <td className="no-wrap text-warning d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Freq</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">779</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Change</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1"><i className="icofont icofont-caret-down"></i> -50</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Open</td>
                        <td className="no-wrap text-success d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Vol(Lot)</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">2 K</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">%</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">-0.40%</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">High</td>
                        <td className="no-wrap text-success d-border-tr-gray text-right py-1">12,800</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Value</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">2.6 B</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Lower AR</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">12,400</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Low</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">12,350</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">F. Buy</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">1.1 B</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding py-1">Upper AR</td>
                        <td className="no-wrap text-right py-1">13,000</td>
                        <td className="no-wrap bg-gray-tradding py-1">Avg.</td>
                        <td className="no-wrap text-danger text-right py-1">12,639.92</td>
                        <td className="no-wrap bg-gray-tradding py-1">F. Sell</td>
                        <td className="no-wrap text-right py-1">825.5 M</td>
                    </tr>
                    </tbody>
                </Table>

                {/*<div className="my-3"></div>*/}

                <div className="bg-dark-grey">
                    <div className="col-sm-12 row mx-0 px-0 d-border-gray-half">
                        <div className="col-sm-6 mx-0 px-0 d-border-right-half">
                            <div className="container-fluid px-0 mx-0">
                                <Table
                                    responsive
                                    bordered size="sm"
                                    className={`text-white bg-dark-grey px-0 mx-0
                                     ${(this.props.lotshare == 'stockInfoBuy') ? 'card-323':
                                          (this.props.lotshare == 'buyPage') ? 'card-356':
                                                (this.props.lotshare == 'buyPageTrade') ? 'card-362':
                                                    (this.props.lotshare == 'autTradeOrd') ? 'card-362':'card-362'
                                        }
                                     mb-0 table-hover table-striped-trans`}>
                                <thead className="d-border-top d-border-bottom bg-gray-tradding">
                                <tr>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">
                                        <Popup content='Number Of Buy' position='top center' trigger={
                                            <span>NoB</span>
                                        } />
                                    </th>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">Bid Vol</th>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">Bid</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="no-wrap py-1 text-right">4</td>
                                    <td className="no-wrap py-1 text-right">17</td>
                                    <td className="no-wrap py-1 text-right text-warning">12,600</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">7</td>
                                    <td className="no-wrap py-1 text-right">19</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,575</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">3</td>
                                    <td className="no-wrap py-1 text-right">85</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,550</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">8</td>
                                    <td className="no-wrap py-1 text-right">14</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,525</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">4</td>
                                    <td className="no-wrap py-1 text-right">274</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,500</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">3</td>
                                    <td className="no-wrap py-1 text-right">14</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,475</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">2</td>
                                    <td className="no-wrap py-1 text-right">178</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,450</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">5</td>
                                    <td className="no-wrap py-1 text-right">20</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,425</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">1</td>
                                    <td className="no-wrap py-1 text-right">739</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,400</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right">2</td>
                                    <td className="no-wrap py-1 text-right">22</td>
                                    <td className="no-wrap py-1 text-right text-danger">12,350</td>
                                </tr>
                                </tbody>
                                <tfoot className="d-border-top bg-gray-tradding">
                                <tr>
                                    <th className="no-wrap py-3 text-right bg-gray-tradding">34</th>
                                    <th className="no-wrap py-3 text-right bg-gray-tradding">1,436</th>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">Total</th>
                                </tr>
                                </tfoot>
                            </Table>
                            </div>
                        </div>
                        <div className="col-sm-6 mx-0 px-0 d-border-left-half">
                            <div className="container-fluid px-0 mx-0">
                                <Table
                                    responsive
                                    bordered size="sm"
                                    className={`text-white bg-dark-grey px-0 mx-0
                                     ${(this.props.lotshare == 'stockInfoBuy') ? 'card-323':
                                        (this.props.lotshare == 'buyPage')? 'card-356':
                                            (this.props.lotshare == 'buyPageTrade') ? 'card-362':
                                                (this.props.lotshare == 'autTradeOrd') ? 'card-362':'card-362'
                                    }
                                        mb-0 table-hover table-striped-trans`}>
                                <thead className="d-border-top d-border-bottom bg-gray-tradding">
                                <tr>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">Offer</th>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">Offer Vol</th>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">
                                        <Popup content='Number Of Sell' position='top center' trigger={
                                            <span>NoS</span>
                                        } />
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,625</td>
                                    <td className="no-wrap py-1 text-right">35</td>
                                    <td className="no-wrap py-1 text-right">4</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,650</td>
                                    <td className="no-wrap py-1 text-right">15</td>
                                    <td className="no-wrap py-1 text-right">4</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,675</td>
                                    <td className="no-wrap py-1 text-right">681</td>
                                    <td className="no-wrap py-1 text-right">2</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,700</td>
                                    <td className="no-wrap py-1 text-right">25</td>
                                    <td className="no-wrap py-1 text-right">7</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,725</td>
                                    <td className="no-wrap py-1 text-right">121</td>
                                    <td className="no-wrap py-1 text-right">4</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,750</td>
                                    <td className="no-wrap py-1 text-right">316</td>
                                    <td className="no-wrap py-1 text-right">3</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,775</td>
                                    <td className="no-wrap py-1 text-right">228</td>
                                    <td className="no-wrap py-1 text-right">2</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,800</td>
                                    <td className="no-wrap py-1 text-right">224</td>
                                    <td className="no-wrap py-1 text-right">5</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,825</td>
                                    <td className="no-wrap py-1 text-right">10</td>
                                    <td className="no-wrap py-1 text-right">1</td>
                                </tr>
                                <tr>
                                    <td className="no-wrap py-1 text-right text-success">12,850</td>
                                    <td className="no-wrap py-1 text-right">158</td>
                                    <td className="no-wrap py-1 text-right">2</td>
                                </tr>
                                </tbody>
                                <tfoot className="d-border-top bg-gray-tradding">
                                <tr>
                                    <th className="no-wrap py-3 text-center bg-gray-tradding">Total</th>
                                    <th className="no-wrap py-3 text-right bg-gray-tradding">1,813</th>
                                    <th className="no-wrap py-3 text-right bg-gray-tradding">39</th>
                                </tr>
                                </tfoot>
                            </Table>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<UncontrolledTooltip placement="top" target={this.props.lotshare} innerClassName="bg-primary">
                    600 Share
                </UncontrolledTooltip>*/}
            </>
        );
    }
}

class TableInfoTransactionWithButton extends React.PureComponent{
    constructor(props){
        super(props);
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-white text-icofont-close click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-white text-icofont-close click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-12 row px-2 mx-0 py-3">
                    <div className="col-sm-3 px-0 mx-0">
                        <Input defaultValue={this.props.saham} placeholder='Code' className={"col-md-12 px-0"}/>
                    </div>
                    <div className="col-sm-5 px-0 mx-0">
                        <Input defaultValue={this.props.sahamName} placeholder='Code Name' className={"col-md-12 pr-0"}/>
                </div>

                    <div className="col-sm-4 align-self-center mx-0 px-0">
                        <button className="mx-1 pull-right col-sm-5 col-md-5 btn btn-sm btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                        <button className="mx-1 pull-right col-sm-5 col-md-5 btn btn-sm btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                    </div>
                </div>

                <Table responsive borderless size="sm" className="text-white d-border-table bg-dark-grey card-112 mb-1">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Last</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Previous</td>
                        <td className="no-wrap text-warning d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Freq</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">779</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Change</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1"><i className="icofont icofont-caret-down"></i> -50</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Open</td>
                        <td className="no-wrap text-success d-border-tr-gray text-right py-1">12,650</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Vol</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">2 K</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">%</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">-0.40%</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">High</td>
                        <td className="no-wrap text-success d-border-tr-gray text-right py-1">12,800</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Value</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">2.6 B</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Lower AR</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">12,400</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Low</td>
                        <td className="no-wrap text-danger d-border-tr-gray text-right py-1">12,350</td>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">F. Buy</td>
                        <td className="no-wrap d-border-tr-gray text-right py-1">1.1 B</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding d-border-tr-black py-1">Upper AR</td>
                        <td className="no-wrap text-right py-1 d-border-tr-black py-1" >13,000</td>
                        <td className="no-wrap bg-gray-tradding py-1 d-border-tr-black py-1">Avg.</td>
                        <td className="no-wrap text-danger text-right py-1 d-border-tr-black py-1">12,639.92</td>
                        <td className="no-wrap bg-gray-tradding py-1 d-border-tr-black py-1">F. Sell</td>
                        <td className="no-wrap text-right py-1 d-border-tr-black py-1">825.5 M</td>
                    </tr>
                    <tr>
                        <td className="no-wrap bg-gray-tradding py-1" colSpan={3}>Status</td>
                        <td className="no-wrap text-left py-1" colSpan={3}>
                            Success
                        </td>
                    </tr>
                    </tbody>
                </Table>

                <div className="card bg-dark-grey">
                    <div className="col-sm-12 row mx-0 px-0 d-border-gray">
                        <div className="col-sm-6 mx-0 px-0 d-border-right-half">
                            <div className="container-fluid px-0 mx-0">
                                <Table responsive bordered size="sm" className="text-white bg-dark-grey px-0 mx-0 card-326 table-hover table-striped-trans mb-0">
                                    <thead className="d-border-top d-border-bottom bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">
                                            <Popup content='Number Of Buy' position='top center' trigger={
                                                <span>NoB</span>
                                            } />
                                        </th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Bid Vol</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Bid</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">4</td>
                                        <td className="no-wrap py-1 text-right">17</td>
                                        <td className="no-wrap py-1 text-right text-warning">12,600</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">7</td>
                                        <td className="no-wrap py-1 text-right">19</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,575</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">3</td>
                                        <td className="no-wrap py-1 text-right">85</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,550</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">8</td>
                                        <td className="no-wrap py-1 text-right">14</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,525</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">4</td>
                                        <td className="no-wrap py-1 text-right">274</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,500</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">3</td>
                                        <td className="no-wrap py-1 text-right">14</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,475</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">2</td>
                                        <td className="no-wrap py-1 text-right">178</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,450</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">5</td>
                                        <td className="no-wrap py-1 text-right">20</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,425</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">1</td>
                                        <td className="no-wrap py-1 text-right">739</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,400</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right">2</td>
                                        <td className="no-wrap py-1 text-right">22</td>
                                        <td className="no-wrap py-1 text-right text-danger">12,350</td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="d-border-top bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">34</th>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">1,436</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Total</th>
                                    </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </div>
                        <div className="col-sm-6 mx-0 px-0 d-border-left-half">
                            <div className="container-fluid px-0 mx-0">
                                <Table responsive bordered size="sm" className="text-white bg-dark-grey px-0 mx-0 card-326 table-hover table-striped-trans mb-0">
                                    <thead className="d-border-top d-border-bottom bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Offer</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Offer Vol</th>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">
                                            <Popup content='Number Of Sell' position='top center' trigger={
                                                <span>NoS</span>
                                            } />
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,625</td>
                                        <td className="no-wrap py-1 text-right">35</td>
                                        <td className="no-wrap py-1 text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,650</td>
                                        <td className="no-wrap py-1 text-right">15</td>
                                        <td className="no-wrap py-1 text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,675</td>
                                        <td className="no-wrap py-1 text-right">681</td>
                                        <td className="no-wrap py-1 text-right">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,700</td>
                                        <td className="no-wrap py-1 text-right">25</td>
                                        <td className="no-wrap py-1 text-right">7</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,725</td>
                                        <td className="no-wrap py-1 text-right">121</td>
                                        <td className="no-wrap py-1 text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,750</td>
                                        <td className="no-wrap py-1 text-right">316</td>
                                        <td className="no-wrap py-1 text-right">3</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,775</td>
                                        <td className="no-wrap py-1 text-right">228</td>
                                        <td className="no-wrap py-1 text-right">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,800</td>
                                        <td className="no-wrap py-1 text-right">224</td>
                                        <td className="no-wrap py-1 text-right">5</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,825</td>
                                        <td className="no-wrap py-1 text-right">10</td>
                                        <td className="no-wrap py-1 text-right">1</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-1 text-right text-success">12,850</td>
                                        <td className="no-wrap py-1 text-right">158</td>
                                        <td className="no-wrap py-1 text-right">2</td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="d-border-top bg-gray-tradding">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-gray-tradding">Total</th>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">1,813</th>
                                        <th className="no-wrap py-3 text-right bg-gray-tradding">39</th>
                                    </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default TableInfoTransaction;
export {TableInfoTransactionWithButton};