import React from "react";
/*import {Input, InputGroup, InputGroupAddon, InputGroupText, Table, UncontrolledTooltip} from "reactstrap";*/
import { Table } from 'react-bootstrap';
import { Input, Popup } from 'semantic-ui-react';

class PortofolioModalTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "code", title: "Code" },
                { name: "avgprice", title: "Avg. Price" },
                { name: "lastprice", title: "Last Price" },
                { name: "lot", title: "Vol.Lot" },
                { name: "shares", title: "Vol. Shares" },
                { name: "stockval", title: "Stock Val" },
                { name: "pl", title: "P/L" },
                { name: "remark", title: "Remark" },
                { name: "action", title: "Action" },
            ],
            colspan: [{
                title: 'Vol',
                align: 'center',
                children: [
                    { columnName: 'lot' },
                    { columnName: 'shares' },
                ],
            }],
            rows: [
                {
                    code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-0,40%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-1,50%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-2,50%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-5,78%",
                    remark: "",
                    action: ""
                },
                {
                    code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "+2,50%",
                    remark: "",
                    action: ""
                }, {
                    code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-0,40%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-1,50%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-2,50%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-5,78%",
                    remark: "",
                    action: ""
                },
                {
                    code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "+2,50%",
                    remark: "",
                    action: ""
                }, {
                    code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-0,40%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-1,50%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-2,50%",
                    remark: "",
                    action: ""
                },
                {
                    code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "-5,78%",
                    remark: "",
                    action: ""
                },
                {
                    code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "+2,50%",
                    remark: "",
                    action: ""
                },
            ],
            defaultColumnWidths: [
                { columnName: 'code', align: 'center', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'avgprice', align: 'right', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'lastprice', align: 'right', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'lot', align: 'right', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'shares', align: 'right', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'stockval', align: 'right', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'pl', align: 'right', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'remark', align: 'center', width: this.props.gridView == 'grid' ? 10 : 135 },
                { columnName: 'action', align: 'center', width: this.props.gridView == 'grid' ? 10 : 135 },
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        return (
            <>
                <div className="col-sm-12 row px-0 mx-0">
                    <div className="col-sm-3-6 px-0 mx-0">
                        {/*<InputGroup size="sm">
                            <Input className="col-sm-12 d-border bg-dark-grey" value="AALI" size="sm"/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText className="bg-gold">90%</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>*/}
                        <Input label={{ color: 'bg-gold', content: '90%' }} defaultValue='AALI'
                            labelPosition='right' placeholder='Code' size='mini' style={{ width: '50%' }} />
                    </div>

                    <div className="col-sm-3-6 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-primary text-center">
                            7,000,545,000,000
                            <br /><span className="text-white f-9">My Investment In AALI</span>
                        </label>
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-danger text-center">
                            -1,18%
                            <br /><span className="text-white f-9">%Change</span>
                        </label>
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <Popup content='600 Share' position='top center' trigger={
                            <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-primary text-center" id={this.props.lotshare}>
                                <span id="lotShare">6</span>
                                <br /><span className="text-white f-9">Lot</span>
                            </label>
                        } />
                    </div>

                    <div className="col-sm-2-4 px-0 mx-0">
                        <label className="col-sm-12 f-12 f-xs-14 px-0 mx-0 text-danger text-center">
                            -90,240
                            <br /><span className="text-white f-9">P/L</span>
                        </label>
                    </div>
                </div>

                <div><i className="fa fa-info-circle text-danger"></i>&nbsp; Not yet submit annual financial report</div>

                <Table responsive borderless size="sm" className="text-white d-border-table bg-dark-grey">
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
                            <td className="no-wrap bg-gray-tradding py-1">Upper AR</td>
                            <td className="no-wrap text-right py-1">13,000</td>
                            <td className="no-wrap bg-gray-tradding py-1">Avg.</td>
                            <td className="no-wrap text-danger text-right py-1">12,639.92</td>
                            <td className="no-wrap bg-gray-tradding py-1">F. Sell</td>
                            <td className="no-wrap text-right py-1">825.5 M</td>
                        </tr>
                    </tbody>
                </Table>

                <div className="card bg-dark-grey">
                    <div className="col-sm-12 row mx-0 px-2">
                        <div className="col-sm-6 mx-0 px-0">
                            <Table responsive borderless size="sm" className="text-white bg-dark-grey px-0">
                                <thead className="d-border-top d-border-bottom">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">NoB</th>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">Bid Vol</th>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">Bid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">4</td>
                                        <td className="no-wrap py-2-scale text-right">17</td>
                                        <td className="no-wrap py-2-scale text-right text-warning">12,600</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">7</td>
                                        <td className="no-wrap py-2-scale text-right">19</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,575</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">3</td>
                                        <td className="no-wrap py-2-scale text-right">85</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,550</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">8</td>
                                        <td className="no-wrap py-2-scale text-right">14</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,525</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">4</td>
                                        <td className="no-wrap py-2-scale text-right">274</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,500</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">3</td>
                                        <td className="no-wrap py-2-scale text-right">14</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,475</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">2</td>
                                        <td className="no-wrap py-2-scale text-right">178</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,450</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">5</td>
                                        <td className="no-wrap py-2-scale text-right">20</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,425</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">1</td>
                                        <td className="no-wrap py-2-scale text-right">739</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,400</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right">2</td>
                                        <td className="no-wrap py-2-scale text-right">22</td>
                                        <td className="no-wrap py-2-scale text-right text-danger">12,350</td>
                                    </tr>
                                </tbody>
                                <tfoot className="d-border-top">
                                    <tr>
                                        <th className="no-wrap py-3 text-right bg-dark-grey">34</th>
                                        <th className="no-wrap py-3 text-right bg-dark-grey">1,436</th>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">Total</th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                        <div className="col-sm-6 mx-0 px-0">
                            <Table responsive borderless size="sm" className="text-white bg-dark-grey px-0">
                                <thead className="d-border-top d-border-bottom">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">Offer</th>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">Offer Vol</th>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">NoS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,625</td>
                                        <td className="no-wrap py-2-scale text-right">35</td>
                                        <td className="no-wrap py-2-scale text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,650</td>
                                        <td className="no-wrap py-2-scale text-right">15</td>
                                        <td className="no-wrap py-2-scale text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,675</td>
                                        <td className="no-wrap py-2-scale text-right">681</td>
                                        <td className="no-wrap py-2-scale text-right">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,700</td>
                                        <td className="no-wrap py-2-scale text-right">25</td>
                                        <td className="no-wrap py-2-scale text-right">7</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,725</td>
                                        <td className="no-wrap py-2-scale text-right">121</td>
                                        <td className="no-wrap py-2-scale text-right">4</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,750</td>
                                        <td className="no-wrap py-2-scale text-right">316</td>
                                        <td className="no-wrap py-2-scale text-right">3</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,775</td>
                                        <td className="no-wrap py-2-scale text-right">228</td>
                                        <td className="no-wrap py-2-scale text-right">2</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,800</td>
                                        <td className="no-wrap py-2-scale text-right">224</td>
                                        <td className="no-wrap py-2-scale text-right">5</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,825</td>
                                        <td className="no-wrap py-2-scale text-right">10</td>
                                        <td className="no-wrap py-2-scale text-right">1</td>
                                    </tr>
                                    <tr>
                                        <td className="no-wrap py-2-scale text-right text-success">12,850</td>
                                        <td className="no-wrap py-2-scale text-right">158</td>
                                        <td className="no-wrap py-2-scale text-right">2</td>
                                    </tr>
                                </tbody>
                                <tfoot className="d-border-top">
                                    <tr>
                                        <th className="no-wrap py-3 text-center bg-dark-grey">Total</th>
                                        <th className="no-wrap py-3 text-right bg-dark-grey">1,813</th>
                                        <th className="no-wrap py-3 text-right bg-dark-grey">39</th>
                                    </tr>
                                </tfoot>
                            </Table>
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

export default PortofolioModalTable;