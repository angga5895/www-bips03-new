import React from 'react';
import { AppFrameAction } from '../appframe.js';

import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";

import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import {WSConnectionAction} from "../appnetwork";
import FillHeaderTab from "../tabheaderfill";

import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

import './chatSupport.css';

import {Dropdown, Input, Popup} from 'semantic-ui-react'
import $ from 'jquery';
import {AgGridReact} from "ag-grid-react";
import ModalBuy from "../app_modals/modal_buy";
import Select from "react-select";
import {Table as TableBS} from "react-bootstrap";
import {widthSize} from "./mainPage.js";

window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');

function stringComparator(valueA, valueB){
    if(valueA !== null && valueB !== null){
        if(valueA.length < 2){
            return null;
        }else if(valueB.length < 2){
            return null;
        }else{
            return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        }
    }

}
function integerComparator(valueA, valueB){
    if(valueA == ""){
        return null;
    }else if(valueB == ""){
        return null;
    }else{
        return valueA - valueB;
    }
}

class CustomFrameHeaderBrokerPage_Base extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/*<BIPSAppProvider>*/}
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 align-self-center row">
                    <div className="col-sm-12 pb-0 px-0 mx-0 d-border-bottom">
                        <FillHeaderTab treeName="/brokerPage" linkTitles={
                            {
                                BrokerInfo: 'Broker Info',
                                BrokerTradeSummary: 'Broker Trade Summary',
                                BrokerTradeHistory: 'Broker Trade History',
                                BrokerTopListPage: 'TOP BROKER',
                            }
                        }/>
                    </div>
                </div>
                <AppFrame treeName="/brokerPage" headerComponent={BrokerPageFrameHeader}/>
                {/*<AppModal/>*/}
                {/*</BIPSAppProvider>*/}
            </div>
        );
    }
}
//PARENT TOP CHAT USER
class ChatUserPage_Base extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'activeId':-1,
            'isSearch': false,
            'chatId':0,
        }
        this.changeActiveList = this.changeActiveList.bind(this);
        this.changeActiveId = this.changeActiveId.bind(this);
    }
    changeActiveList(_counter){
        this.setState({
            'isSearch': _counter,
        });
    }
    changeActiveId(_counter){
        this.setState({
            'activeId':_counter,
        })
    }
    render(){
        const switchList = () => {

            if(this.state.isSearch == true){
                return <ChatListUser
                    parentToggle={this.changeActiveId}
                />
            }else{
                return <ChatListPage parentToggle={this.changeActiveId}/>
            }

        };
        const switchChat = () => {
            if(this.state.activeId !== -1){
                return <ActionPageFrame_Base chatId={this.state.activeId}/>
            }else{
                return <ChatListEmpty chatId={this.state.activeId}/>
            }
        }
        return(
            <div className="row px-1 mx-0">
                <div className="col-sm-4 px-1 mx-0">
                    <SearchBtn
                        parentToggle={this.changeActiveList}/>
                    {switchList()}

                </div>
                <div className="col-sm-8 px-1 mx-0">
                    {switchChat()}
                </div>
            </div>
        )
    }
}
class SearchBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'activeId':-1,
            'icon': 'search',
        }
        this.changeActive = this.changeActive.bind(this);
        this.changeNon = this.changeNon.bind(this);
    }
    changeActive(){
        this.setState({'icon': 'remove',});
        this.props.parentToggle(true);
    }
    changeNon(){
        this.setState({'icon':'search'});
        this.props.parentToggle(false);
        this.inputTitle.value='';
    }
    render(){
        return(
            <div className="col-sm-12 ui icon input f-12 px-0">
                <input type="text" id="inputSearch" ref={el => this.inputTitle = el} size="small" placeholder="Search..." onChange={this.changeActive}/>
                <i aria-hidden="true" className={`${this.state.icon} icon i-pointer`} onClick={this.changeNon} ></i>
            </div>
        )
    }

}
class ChatListUser_Base extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            friendList: [
                {
                    'id':'budihasilsearch@gmail',
                    'from':'budiantara@gmail',
                    'message':'Hello dude search - test',
                    'status':'active',
                    'new':'0',
                    'time':'-',
                    'img': '/static/media/man.3e62c017.png',
                    'isFriend':true,
                },{
                    'id':'AhmadGokil@gmail',
                    'from':'Ahmad@gmail',
                    'message':'Hidupku tanpa hidupmu gapapa',
                    'status':'active',
                    'new':'0',
                    'time':'-',
                    'img': '/static/media/man.3e62c017.png',
                    'isFriend':false,
                }
            ],
        }
        this.doParentToggle = this.doParentToggle.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    doParentToggle(_counterFromChild){
        this.setState({
            activeIndex: _counterFromChild,
        });
        this.props.parentToggle(_counterFromChild);
    }
    addFriend(_counter){
        //sini
        this.setState(state=>{
            const friendList = this.state.friendList.map(item=>{
                if(item.id === _counter){
                    var varId = {
                        'id':item.id,
                        'from':item.from,
                        'message':item.message,
                        'status':item.status,
                        'new':item.new,
                        'time':item.time,
                        'img': item.img,
                        'isFriend':true,
                    };
                    return varId
                }else{
                    return item
                }
            });
            return {
                friendList
            };
        });
        this.props.changeIdChatBot(_counter);
    }
    render(){
        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll rsc-scroll d-border-top">
                <nav className="nav flex-column">
                    {
                        this.state.friendList.map((charx, index) => {
                            return <Square
                                from={charx.from}
                                message={charx.message}
                                new={charx.new}
                                id={charx.id}
                                img={charx.img}
                                time={charx.time}
                                isFriend={charx.isFriend}
                                active={(charx.id == this.state.activeIndex) ? "active" : ""}
                                parentToggle={this.doParentToggle}
                                parentAdd={this.addFriend}
                            />
                        })}
                </nav>
            </div>

        )
    }
}
class ChatListPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            friendList: [
                {
                    'id':'budi@gmail',
                    'from':'budiantara@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'ahmadi@gmail',
                    'from':'ahmadi@gmail',
                    'message':'testing wan wan 2',
                    'status':'active',
                    'new':'2',
                    'time':'07.00',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'kirsanaa@gmail',
                    'from':'kirsanaa@gmail',
                    'message':'yamasa gitu sih masnya',
                    'status':'active',
                    'new':'1',
                    'time':'06.50',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'mukti@gmail',
                    'from':'mukti@gmail',
                    'message':'sama mukti nanti diurus',
                    'status':'active',
                    'new':'',
                    'time':'06.00',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'bramantiio@gmail',
                    'from':'bramantiio@gmail',
                    'message':'soalnya kaya gamungkin gitu da ..',
                    'status':'active',
                    'new':'3',
                    'time':'19.00',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'Sarah007@gmail',
                    'from':'Sarah007@gmail',
                    'message':'Memang pak budi mintanya begitu',
                    'status':'active',
                    'new':'1',
                    'time':'18.31',
                    'img': '/static/media/man.3e62c017.png',
                },
            ],
        }
        this.doParentToggle = this.doParentToggle.bind(this);
    }
    doParentToggle(_counterFromChild){
        this.setState({
            activeIndex: _counterFromChild,
        });
        this.props.parentToggle(_counterFromChild);

        // console.log(_counterFromChild);
        // this.props.changeIdChatBot(_counterFromChild)
    }
    render(){
        const addFriend = () => {
            var newfr = {
                'id':this.props.chatId,
                'from':this.props.chatId,
                'message':'Say hi to your friend dude',
                'status':'active',
                'new':'1',
                'time':'09.00',
                'img': '/static/media/man.3e62c017.png',
            };
            this.setState(state => {
                const friendList = [newfr, ...this.state.friendList];
                return {
                    friendList
                };
            });
            this.props.changeIdChatBot("");
        };

        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll rsc-scroll d-border-top">

                <nav className="nav flex-column">
                    {(this.props.chatId !== "") ? addFriend() : ""}
                    {this.state.friendList.map((charx, index) => {
                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            img={charx.img}
                            time={charx.time}
                            isFriend="null"
                            active={(charx.id == this.state.activeIndex) ? "active" : ""}
                            parentToggle={this.doParentToggle}
                        />
                    })}
                </nav>
            </div>

        )
    }
}

class TopBrokerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: s=="s49"?140:s=="s50"?90:s=="s67"?70:50, minWidth:50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, resizable: true,
                    width: s=="s49"?200:s=="s50"?170:s=="s67"?140:120,minWidth:120,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?500:s=="s50"?460:s=="s67"?420:s=="s75"?410:s=="s80"?370:s=="s85"?300:s=="s90"?300:240,minWidth:240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?300:s=="s50"?270:s=="s67"?250:s=="s75"?240:s=="s80"?230:s=="s85"?180:s=="s90"?180:150,minWidth:150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "bval", headerName: "B. Val(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?300:s=="s50"?270:s=="s67"?240:s=="s75"?230:s=="s80"?210:s=="s85"?190:s=="s90"?190:170,minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "sval", headerName: "S. Val(T)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?290:s=="s50"?280:s=="s67"?240:s=="s75"?230:s=="s80"?210:s=="s85"?190:s=="s90"?190:175,minWidth: 175,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?270:s=="s50"?220:s=="s67"?200:190,minWidth:190,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?390:s=="s50"?380:s=="s67"?350:s=="s75"?340:s=="s80"?210:s=="s85"?190:s=="s90"?190:170,minWidth:170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 6,
                    code: "AK",
                    company: "UBS Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 7,
                    code: "YP",
                    company: "Mirae Asset Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 8,
                    code: "CC",
                    company: "Mandiri Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
            getRowHeight: function (params) {
                return 23;
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TopBrokerBAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: s=="s49"?140:50,minWidth:50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?200:s=="s50"?195:s=="s67"?180:120,minWidth:120, uppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?520:s=="s50"?500:s=="s67"?420:s=="s75"?410:s=="s80"?370:s=="s85"?300:s=="s90"?300:240,
                    minWidth: 240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?330:s=="s50"?300:s=="s67"?250:s=="s75"?240:s=="s80"?230:s=="s85"?180:s=="s90"?180:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "bval", headerName: "B. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?325:s=="s50"?300:s=="s67"?250:s=="s75"?230:s=="s80"?210:s=="s85"?190:s=="s90"?190:170,
                    minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?300:260,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?570:s=="s50"?550:s=="s67"?500:s=="s75"?480:s=="s80"?350:s=="s85"?310:s=="s90"?310:275,
                    minWidth: 275,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 23;
            },
            rowData: [
                { no: 1,
                code: "DX",
                company: "Bahana Sekuritas",
                tval: "99.64",
                bval: "61.62",
                sval: "38.62",
                tvol: "104.73",
                tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class TopBrokerSAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: s=="s49"?140:50, minWidth: 50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s49"?200:s=="s50"?195:s=="s67"?180:120, minWidth: 120,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s49"?520:s=="s50"?500:s=="s67"?420:s=="s75"?410:s=="s80"?370:s=="s85"?300:s=="s90"?300:240,
                    minWidth: 240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?330:s=="s50"?300:s=="s67"?250:s=="s75"?240:s=="s80"?230:s=="s85"?180:s=="s90"?180:150,
                    minWidth: 150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "sval", headerName: "S. Val(T)", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?325:s=="s50"?300:s=="s67"?250:s=="s75"?230:s=="s80"?210:s=="s85"?190:s=="s90"?190:170,
                    minWidth: 170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?300:260, minWidth: 260,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agNumberColumnFilter",
                    resizable: true, width: s=="s49"?570:s=="s50"?550:s=="s67"?500:s=="s75"?480:s=="s80"?350:s=="s85"?310:s=="s90"?310:275,
                    minWidth: 275,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 23;
            },
            rowData: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class ChatListSupport extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            friendList: [
                {
                    'id':'IT SUPPORT',
                    'from':'IT SUPPORT',
                    'message':'',
                    'status':'active',
                    'new':'0',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'FINANCE SUPPORT',
                    'from':'FINANCE SUPPORT',
                    'message':'',
                    'status':'active',
                    'new':'0',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'QUALITY SUPPORT',
                    'from':'QUALITY SUPPORT',
                    'message':'',
                    'status':'active',
                    'new':'0',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'NETWORK SUPPORT',
                    'from':'NETWORK SUPPORT',
                    'message':'',
                    'status':'active',
                    'new':'0',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },
            ],
        }
        this.doParentToggle = this.doParentToggle.bind(this);
    }
    doParentToggle(_counterFromChild){
        this.setState({
            activeIndex: _counterFromChild,
        });
        this.props.parentToggle(_counterFromChild);

        // console.log(_counterFromChild);
        // this.props.changeIdChatBot(_counterFromChild)
    }

    render(){


        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll d-border-top">

                <nav className="nav flex-column">

                    {this.state.friendList.map((charx, index) => {
                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            img={charx.img}
                            time={charx.time}
                            isFriend="null"
                            active={(charx.id == this.state.activeIndex) ? "active" : ""}
                            parentToggle={this.doParentToggle}
                        />
                    })}
                </nav>
            </div>

        )
    }
}

//PARENT CHAT COMMENT PAGE
class ChatCommentPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'activeId':-1,
            'isSearch': false,
            'chatId':0,
        }
        this.changeActiveId = this.changeActiveId.bind(this);
    }
    changeActiveId(_counter){
        this.setState({
            'activeId':_counter,
        })
    }
    render(){
        const switchChat = () => {
            if(this.state.activeId !== -1){
                return <ActionPageFrame_Base chatId={this.state.activeId}/>
            }else{
                return <ChatListEmpty chatId={this.state.activeId}/>
            }
        }
        return(
            <div className="row px-1 mx-0">
                <div className="col-sm-4 px-1 mx-0">
                    <ChatListComment parentToggle={this.changeActiveId}/>
                </div>
                <div className="col-sm-8 px-1 mx-0">
                    {switchChat()}
                </div>
            </div>
        )
    }
}
class ChatListComment extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            friendList: [
                {
                    'id':'BUY',
                    'from':'BUY',
                    'message':'',
                    'status':'active',
                    'new':'',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'SELL',
                    'from':'SELL',
                    'message':'',
                    'status':'active',
                    'new':'',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'AMEND',
                    'from':'AMEND',
                    'message':'',
                    'status':'active',
                    'new':'',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'WITHDRAW',
                    'from':'WITHDRAW',
                    'message':'',
                    'status':'active',
                    'new':'',
                    'time':'',
                    'img': '/static/media/man.3e62c017.png',
                },
            ],
        }
        this.doParentToggle = this.doParentToggle.bind(this);
    }
    doParentToggle(_counterFromChild){
        this.setState({
            activeIndex: _counterFromChild,
        });
        this.props.parentToggle(_counterFromChild);

        // console.log(_counterFromChild);
        // this.props.changeIdChatBot(_counterFromChild)
    }

    render(){


        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll rsc-scroll d-border-top">

                <nav className="nav flex-column">

                    {this.state.friendList.map((charx, index) => {
                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            img={charx.img}
                            time={charx.time}
                            isFriend="null"
                            active={(charx.id == this.state.activeIndex) ? "active" : ""}
                            parentToggle={this.doParentToggle}
                        />
                    })}
                </nav>
            </div>

        )
    }
}


class ActionPageFrame_Base extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            steps: [
                {
                    id:'1',
                    message:'Hello, What`s your name?',
                    trigger:'1.2',
                },
                {
                    id:'1.2',
                    user:true,
                    trigger: '2',
                },
                {
                    id: '2',
                    message: 'Hey {previousValue}, Greatings!',
                    trigger: 'next2',
                },
                {
                    id: 'next2',
                    message: 'Can I help you?',
                    trigger: '3',
                },
                {
                    id: '3',
                    options: [
                        { value: "Error Text", label: 'Chat Issue', trigger: '3.1' },
                        { value: "What is trading?", label: 'Trade Issue', trigger: '3.2' },
                        { value: "Error Chart", label: 'Chart Issue', trigger: '3.1' },
                    ],
                },
                {
                    id: '3.1',
                    message: 'Maybe this can help you.',
                    trigger: '3.1.2',
                },
                {
                    id: '3.1.2',
                    component: (
                        <div> You can open and reload the page </div>
                    ),
                    trigger: 'next2',
                },
                {
                    id: '3.2',
                    message: 'Trading is ..',
                    trigger: 'next2',
                },
            ],
        }
    }

    render() {

        const theme = {
            background: '#4D4E4E',
            fontFamily: 'Open Sans',
            headerBgColor: '#000000',
            headerFontColor: '#fff',
            headerFontSize: '12px',
            botBubbleColor: '#fff',
            botFontColor: '#000',
            userBubbleColor: '#2cf871',
            userFontColor: '#000',
        };
        var logo = "/static/media/man.3e62c017.png";

        const HeaderTitleProvider = () => {
            return (
                <div className="rsc-header">
                    <div className="row">
                        <div className="col-md-1">
                            <img src={logo} alt="User" className="img-avatar d-border mr-2"/>
                        </div>
                        <div className="col-md-11 divStatusChat">
                            <span className="textTitleChat">{this.props.chatId}</span>
                            <span className="textStatusChat">Online</span>

                        </div>
                    </div>
                </div>
            )
        };

        const ThemedExample = () => (
            <ThemeProvider theme={theme}>
                <ChatBot
                    steps={this.state.steps}
                    headerTitle="Support"
                    hideBotAvatar="true"
                    hideUserAvatar="true"
                    width="100%"
                    headerComponent={HeaderTitleProvider()}
                />
            </ThemeProvider>
        );
        return(
            <div className="bg-grey col-sm-12 mx-0 px-0">
                <div style={{ display : this.props.chatId !== '' ? "none" : "block"}}><ChatListEmpty/></div>
                <ThemedExample/>
            </div>
        )
    }

}
const BrokerPageFrameHeader = (props) => {
    return (
        <></>
    );
}

class Square extends React.PureComponent {
    constructor(props){
        super(props);
        this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
        this.addFriendChild = this.addFriendChild.bind(this);
        this.id= this.props.id;
        this.time=this.props.time;
        this.new=this.props.new;
        this.active = this.props.active;

    }
    doParentToggleFromChild(){
        this.props.parentToggle(this.id)
    }
    addFriendChild(){
        this.props.parentAdd(this.id);
    }
    render() {
        const actionButton = (props) => {
            if(props === true || props === false){
                return <span className="textPesanTimeMessage">&nbsp;</span>
            }else{
                return <span className="textPesanTimeMessage">{this.time}</span>
            }
        }
        const spanList = (props) => {
            if(props === true){
                return <i className="fa fa-comment"></i>
            }else if(props === false){
                return <i className="fa fa-user-plus" onClick={() => this.addFriendChild()}></i>
            }else{
                return <span className={(parseInt(this.new) > 0) ? "badge textPesanBadge" : ""}>
                    {(parseInt(this.new) > 0) ? this.new : ""}
                    </span>
            }
        }
        const checkFriend = (props) => {
            if(props === true){
                this.doParentToggleFromChild();
            }else if(props === false){
                return false;
            }else{
                this.doParentToggleFromChild();
            }
        }
        return (
            <div
                className={`container-fluid divChatList nav-link row ${this.active}`}
                onClick={() => checkFriend(this.props.isFriend)}>
                <div className="col-sm-3 divImgListChat">
                    <img src={this.props.img} alt="User" className="img-avatar d-border mr-2"/>
                </div>
                <div className="col-sm-7 divBodyListChat">
                    <span className="textPesanTitle"> {this.props.from}</span>
                    <span className="textPesan">{this.props.message}</span>
                </div>
                <div className="col-sm-2 divAttrListChat" >
                    {actionButton(this.props.isFriend)}
                    {spanList(this.props.isFriend)}
                </div>
            </div>
        )
    }
}

class ChatListEmpty extends  React.PureComponent{
    render(){
        return(
            <>
                <div className="card-body card-527 align-self-center text-center bg-grey f-14 py-3">
                    <div className="py-5 my-5">
                        <div className="py-5 my-5">
                            <i className="icofont icofont-warning-alt f-25"></i>
                            <div className="py-3">Empty</div>
                            <div>Please choose one person to send a message</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class ChatActionPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            chatMessage: [
                {
                    'id':'budibudibuiantara@gmail',
                    'from':'budiantara@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'asepsupriadibalap@support',
                    'from':'asep@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'iantaracintadanduka@ceo',
                    'from':'iantara@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                },{
                    'id':'tatangsutarmasihsama@gmail',
                    'from':'tatangsutarma@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'odingdingdangding@support',
                    'from':'oding@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'sigarantangdinatarang@ceo',
                    'from':'sigarantang@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                },{
                    'id':'amirbudiardjojobu@gmail.com',
                    'from':'amirbudiardjo@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'wirantokenapanto@support',
                    'from':'wiranto@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'emilembambabilo@ceo',
                    'from':'emilembamba@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                },{
                    'id':'udjangjjangmirna@gmail',
                    'from':'udjangudha@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'rohmatullohirahmin@support',
                    'from':'rohmatulloh@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'ulisulistiawastid@ceo',
                    'from':'ulisulistia@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                }
            ],
        }
        this.doParentToggle = this.doParentToggle.bind(this);
    }
    doParentToggle(_counterFromChild){
        this.setState({
            activeIndex: _counterFromChild,
        });
        console.log(_counterFromChild);
        this.props.changeIdChatBot(_counterFromChild)
    }
    render(){
        return(

            <div className="container-fluid px-1 mx-0 col-sm-4 scroll d-border-top">
                <nav className="nav flex-column">
                    {this.state.chatMessage.map((charx, index) => {

                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            img={charx.img}
                            time={charx.time}
                            active={(charx.id == this.state.activeIndex) ? "active" : ""}
                            parentToggle={this.doParentToggle}
                        />
                    })}
                </nav>
            </div>

        )
    }
}

class BrokerPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <ChatSupport2/>
        )
    }
}

class ChatSupport2 extends React.PureComponent {
    render () {

        return (
            //hanya memanggil headernya saja
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}
class BrokerTopListPage extends React.PureComponent {
   render(){
        return(
            <div className="f-12 px-0">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="card bg-black-trading f-12">
                    <div className="card-header bg-tableheader h-37 pt-3">
                        TOP BROKER
                        <Popup content='Refresh' position='top center' trigger={
                            <button
                                className="col-sm-1 pull-right btn btn-primary"
                                style={{"font-size": "12px", "margin-top": "-7px", "width": "38px"}}>
                                <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                            </button>
                        }/>
                    </div>
                    <div className="card-body">
                        <TopBrokerAgGrid size={widthSize()}/>
                    </div>
                </div>
                <div className="card card-175 bg-black-trading f-12">
                    <div className="card-header bg-tableheader h-37 pt-3">
                        TOP BUYER
                    </div>
                    <div className="card-body">
                        <TopBrokerBAgGrid size={widthSize()}/>
                    </div>
                </div>
                <div className="card card-175 bg-black-trading f-12">
                    <div className="card-header bg-tableheader h-37 pt-3">
                        TOP SELLER
                    </div>
                    <div className="card-body">
                        <TopBrokerSAgGrid size={widthSize()}/>
                    </div>
                </div>
            </div>
        );
    }
}
class BrokerTradeHistory extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabNumber: 1,
            startRow: 0,
            currStock: 'TLKM',
        }
    }
    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#3D3E3F' : '#3D3E3F',
            neutral20: this.props.thememode === true ? '#333332' : '#333332',
            neutral30: this.props.thememode === true ? '#333332' : '#333332',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#4D4D4E' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#202020' : '#202020',
            primary: '#0071BC',
        },
    });
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('#datepickerstartBroker').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });
            $('#datepickerendBroker').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                endDate: ed,
                autoclose: true,
                todayBtn: "linked",
            });


        });
    }

    render () {
        const stockOptions = [
            {value: 'bmpt', code: 'BMPT', saham: 'Bumi Mega Pertama '},
            {value: 'bnmp-ppt', code: 'BNMP-PPT', saham: 'Bumi Nusa Putra '},
            {value: 'bumi', code: 'BUMI', saham: 'Bumi Resource '},
            {value: 'asii', code: 'ASII', saham: 'Argo Astra Lestari '},
            {value: 'tlkm', code: 'TLKM', saham: 'Telekomunikasi Indonesia '},
            {value: 'wskt', code: 'WSKT', saham: 'Waskita '},
            {value: 'indf', code: 'INDF', saham: 'Indofood '},
            {value: 'bbca', code: 'BBCA', saham: 'Bank BCA '},
            {value: 'smrg', code: 'SMGR', saham: 'Semen Indonesia '},
            {value: 'bbri', code: 'BBRI', saham: 'Bank BRI '}
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid",
                color : "white!important"
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                color : "white!important"
            })
        };

        //Add your search logic here.
        const customFilter  = (option, searchText) => {
            var code = option.data.code.toLowerCase().includes(searchText.toLowerCase());
            var saham = option.data.saham.toLowerCase().includes(searchText.toLowerCase());

            if(searchText.toLowerCase().includes(' ')){
                if(saham){
                    return true;
                }
            } else {
                if (code) {
                    return true;
                }
            }
        };
        return (
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction" />
                <main>
                    {/*outer*/}
                    {/*<div className="container-fluid f-12 card-520">*/}
                    <div className="container-fluid px-0 f-12">
                        {/*card 520*/}
                        <div className="py-2 px-2 pb-0">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40">
                                <div className="col-sm-4 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-4 px-0 mx-0">Broker Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-8 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={155} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 mx-0 px-0 align-self-center">
                            <table className={"ml-2"}>
                                <tr>
                                    <td className={"px-0 py-1"}>
                                        <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>Periode</span>
                                    </td>
                                    <td className={"px-0 py-1"}>
                                        <div className="ui input pl-0" style={{paddingRight:'37px',marginLeft:'-1px'}}>
                                            <Input placeholder='dd/mm/yy' id="datepickerstartBroker" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                            <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className={"px-0 py-1"}>
                                        <span className="input-group-addon h-35 bg-tableheader" style={{height:'31px',border: "1px solid var(--warna-d-border)"}}>To</span>
                                    </td>
                                    <td className={"px-0 py-1"}>

                                        <div className="ui input" style={{paddingRight:'40px',marginLeft:'-1px'}}>
                                            <Input placeholder='dd/mm/yy' id="datepickerendBroker" className="col-sm-12 pl-0 pr-0 text-center align-self-center "/>
                                            <span className="input-group-addon h-35 no-border-radius bg-tableheader" style={{width: '100%'}}>
                                                <span
                                                    className="fa fa-calendar-alt"></span>
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="submit" style={{height:'30px !important'}} className="btn btn-md btn-block btn-dark btnDatePick">Go</button>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className="px-1 mx-0 col-sm-12 row">
                            <div className="col-md-12 pr-1 pl-0">
                                <BrokerTradeHistoryAgGrid size={widthSize()}/>
                            </div>
                        </div>

                    </div>
                </main>
            </div>


        );
    }
}
class BrokerTradeSummary extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabNumber: 1,
            startRow: 0,
            currStock: 'TLKM',
        }
    }
    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#3D3E3F' : '#3D3E3F',
            neutral20: this.props.thememode === true ? '#333332' : '#333332',
            neutral30: this.props.thememode === true ? '#333332' : '#333332',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#4D4D4E' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#202020' : '#202020',
            primary: '#0071BC',
        },
    });


    render () {
        const stockOptions = [
            {value: 'bmpt', code: 'BMPT', saham: 'Bumi Mega Pertama '},
            {value: 'bnmp-ppt', code: 'BNMP-PPT', saham: 'Bumi Nusa Putra '},
            {value: 'bumi', code: 'BUMI', saham: 'Bumi Resource '},
            {value: 'asii', code: 'ASII', saham: 'Argo Astra Lestari '},
            {value: 'tlkm', code: 'TLKM', saham: 'Telekomunikasi Indonesia '},
            {value: 'wskt', code: 'WSKT', saham: 'Waskita '},
            {value: 'indf', code: 'INDF', saham: 'Indofood '},
            {value: 'bbca', code: 'BBCA', saham: 'Bank BCA '},
            {value: 'smrg', code: 'SMGR', saham: 'Semen Indonesia '},
            {value: 'bbri', code: 'BBRI', saham: 'Bank BRI '}
        ];

        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid",
                color : "white!important"
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                color : "white!important"
            })
        };

        //Add your search logic here.
        const customFilter  = (option, searchText) => {
            var code = option.data.code.toLowerCase().includes(searchText.toLowerCase());
            var saham = option.data.saham.toLowerCase().includes(searchText.toLowerCase());

            if(searchText.toLowerCase().includes(' ')){
                if(saham){
                    return true;
                }
            } else {
                if (code) {
                    return true;
                }
            }
        };
        return (
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction" />
                <main>
                    {/*outer*/}
                    {/*<div className="container-fluid f-12 card-520">*/}
                    <div className="container-fluid px-0 f-12">
                        {/*card 520*/}
                        <div className="py-2 px-2 pb-0">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40">
                                <div className="col-sm-4 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-4 px-0 mx-0">Broker Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-8 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={155} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="px-1 mx-0 col-sm-12 row">
                            <div className="col-md-12 pr-1 pl-0">
                                <BrokerTradeSummaryAgGrid size={widthSize()}/>
                            </div>

                            <div className="col-md-4 pr-1 pl-0 py-2 d-none">
                                <div className="col-sm-12 px-0 mx-0 text-center row ">
                                    <div className="col-sm-12 px-2 pt-3 mx-0 text-center f-15 bg-currencies">
                                        TRADE SUMMARY "{ this.state.currStock }"
                                        <Popup content='Refresh' position='top center' trigger={
                                            <button
                                                className={`btn btn-primary pull-right col-sm-1`}
                                                style={{"font-size": "14px", "width": "38px", "margin-top": "-8px"}}>
                                                <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                            </button>
                                        }/>
                                    </div>
                                    <div className="col-sm-12 px-0 mx-0 bg-trading-gray " style={{marginBottom : "10px"}}>
                                        <BrokerTradeSummary2AgGrid size={widthSize()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


        );
    }
}

class BrokerTradeHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                // { field: "date", headerName: "Date ", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                //     width: s=="s49"?120:s=="s50"?0:s=="s67"?0:s=="s75"?0:s=="s80"?0:s=="s85"?0:s=="s90"?0:0, minWidth: 100,
                //     cellClass : function (params) {
                //         return "grid-table d-border-aggrid-right f-12 text-left";
                //     },},
                { field: "code", headerName: "Code", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?225:s=="s50"?220:s=="s67"?200:s=="s75"?190:s=="s80"?175:s=="s85"?155:s=="s90"?150:150, minWidth: 120,
                    cellClass : function (params) {
                        return "grid-table d-border-aggrid-right f-12 text-left";
                    }, },
                { field: "buyVol", headerName: "Buy Vol(Shr)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?230:s=="s50"?200:s=="s67"?170:s=="s75"?190:s=="s80"?170:s=="s85"?160:s=="s90"?150:150, minWidth: 120,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "buyVal", headerName: "Buy Val", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?280:s=="s50"?260:s=="s67"?230:s=="s75"?215:s=="s80"?190:s=="s85"?170:s=="s90"?160:150, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "avgBuy", headerName: "Avg. Buy", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?280:s=="s50"?260:s=="s67"?230:s=="s75"?215:s=="s80"?190:s=="s85"?160:s=="s90"?160:160, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "sellVol", headerName: "Sell Vol(Shr)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?290:s=="s50"?260:s=="s67"?230:s=="s75"?215:s=="s80"?190:s=="s85"?160:s=="s90"?160:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "sellVal", headerName: "Sell Val", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?290:s=="s50"?250:s=="s67"?230:s=="s75"?205:s=="s80"?160:s=="s85"?145:s=="s90"?140:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "avgSell", headerName: "Avg. Sell", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?220:s=="s75"?185:s=="s80"?160:s=="s85"?150:s=="s90"?140:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "netVol", headerName: "Net Vol(Shr)", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?200:s=="s75"?185:s=="s80"?160:s=="s85"?150:s=="s90"?140:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
                { field: "netVal", headerName: "Net Val", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?260:s=="s50"?230:s=="s67"?200:s=="s75"?185:s=="s80"?165:s=="s85"?150:s=="s90"?140:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                {
                    date: "10,870"+s,
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "-123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "-123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "-123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "-123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "-123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "123",
                    netVal: "2317",
                }, {
                    date: "10,870",
                    code: "9",
                    buyVol: "20",
                    buyVal: "20",
                    avgBuy: "156",
                    sellVol: "123",
                    sellVal: "111",
                    avgSell: "123123123",
                    netVol: "-123",
                    netVal: "2317",
                }, {
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },{
                    date: "",
                    code: "",
                    buyVol: "",
                    buyVal: "",
                    avgBuy: "",
                    sellVol: "",
                    sellVal: "",
                    avgSell: "",
                    netVol: "",
                    netVal: "",
                },
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className={"card card-brokerInfo ag-theme-balham-dark ag-header-border-gray ag-striped-odd"}
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class BrokerTradeSummary2AgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "price", headerName: "Price", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?155:s=="s75"?145:s=="s80"?115:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    },},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?195:s=="s50"?175:s=="s67"?150:s=="s75"?140:s=="s80"?130:s=="s90"?105:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "value", headerName: "Value", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?150:s=="s75"?140:s=="s80"?135:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?150:s=="s75"?140:s=="s80"?135:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
                { field: "netQty", headerName: "Net QTY", sortable: true, filter: "agNumberColumnFilter", resizable: true, comparator: integerComparator,
                    width: s=="s49"?190:s=="s50"?170:s=="s67"?150:s=="s75"?140:s=="s80"?135:s=="s90"?110:100, minWidth: 100,
                    cellClass : function (params) {
                        return "text-right grid-table d-border-aggrid-right f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { price: "10,870",
                    freq: "9",
                    vol: "20",
                    value: "156",
                    netQty: "2",
                },
                { price: "10,860",
                    freq: "8",
                    vol: "21",
                    value: "156",
                    netQty: "2",},
                { price: "10,850",
                    freq: "7",
                    vol: "22",
                    value: "156",
                    netQty: "2",},
                { price: "10,840",
                    freq: "6",
                    vol: "23",
                    value: "156",
                    netQty: "2",},
                { price: "10,830",
                    freq: "5",
                    vol: "24",
                    value: "156",
                    netQty: "2",},
                { price: "10,820",
                    freq: "4",
                    vol: "25",
                    value: "156",
                    netQty: "2",},
                { price: "10,810",
                    freq: "3",
                    vol: "26",
                    value: "156",
                    netQty: "2",},
                { price: "10,800",
                    freq: "2",
                    vol: "27",
                    value: "156",
                    netQty: "2",},
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className={"card card-215 ag-theme-balham-dark ag-header-border-gray ag-striped-odd"}
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class BrokerTradeSummaryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "stock", headerName: "Stock", resizable: true,
                    width: s=="s49"?250:s=="s50"?230:s=="s67"?215:s=="s75"?190:s=="s80"?180:s=="s85"?160:s=="s90"?150:150, minWidth: 130,
                    lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 text-white locked-col locked-visible";
                    },
                },
                { field: "buyVol", headerName: "Buy Vol(Shr)", filter: "agNumberColumnFilter", resizable: true,
                    width: s=="s49"?260:s=="s50"?240:s=="s67"?215:s=="s75"?200:s=="s80"?170:s=="s85"?150:s=="s90"?140:150, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },
                },
                { field: "buyVal", headerName: "Buy Val", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?260:s=="s50"?240:s=="s67"?210:s=="s75"?200:s=="s80"?170:s=="s85"?160:s=="s90"?150:150, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "avgBuyPrice", headerName: "Avg. Buy Price", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?270:s=="s50"?240:s=="s67"?210:s=="s75"?200:s=="s80"?170:s=="s85"?155:s=="s90"?150:140, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "sellVol", headerName: "Sell Vol(Shr)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?270:s=="s50"?240:s=="s67"?215:s=="s75"?200:s=="s80"?170:s=="s85"?150:s=="s90"?150:140, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "sellVal", headerName: "Sell Val" , resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?270:s=="s50"?240:s=="s67"?215:s=="s75"?200:s=="s80"?170:s=="s85"?150:s=="s90"?150:140, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "avgSellPrice", headerName: "Avg. Sell Price" , resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?270:s=="s50"?240:s=="s67"?210:s=="s75"?200:s=="s80"?170:s=="s85"?160:s=="s90"?150:140, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "netVol", headerName: "Net Vol(Shr)", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?270:s=="s50"?240:s=="s67"?210:s=="s75"?200:s=="s80"?180:s=="s85"?160:s=="s90"?150:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
                { field: "netVal", headerName: "Net Val", resizable: true, filter: "agNumberColumnFilter",
                    width: s=="s49"?270:s=="s50"?240:s=="s67"?210:s=="s75"?200:s=="s80"?180:s=="s85"?160:s=="s90"?150:130, minWidth: 130,
                    cellClass : function (params) {
                        var cmd = params.data.netVol;
                        return cmd.includes('-') === true ? " text-right text-danger grid-table d-border-aggrid-right f-12" :
                            " text-right text-success grid-table d-border-aggrid-right f-12";
                    },},
            ],
            defaultColDef: {
                sortable: false,
                filter: true,
                // headerCheckboxSelection: isFirstColumn,
                // checkboxSelection: isFirstColumn,
            },
            // rowSelection: "multiple",
            rowData: [
                {
                    stock : "AGRI"+s,
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "-1,450,07",
                    netVal : "10,454,100",
                }, {
                    stock : "AGRI",
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "1,450,07",
                    netVal : "10,454,100",
                }, {
                    stock : "AGRI",
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "-1,450,07",
                    netVal : "10,454,100",
                }, {
                    stock : "AGRI",
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "-1,450,07",
                    netVal : "10,454,100",
                }, {
                    stock : "AGRI",
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "-1,450,07",
                    netVal : "10,454,100",
                }, {
                    stock : "AGRI",
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "-1,450,07",
                    netVal : "10,454,100",
                }, {
                    stock : "AGRI",
                    buyVol : "1,450,595",
                    buyVal : "12,139",
                    avgBuyPrice : "12",
                    sellVol : "1,462,73",
                    sellVal : "1,462,73",
                    avgSellPrice: "1,488,19",
                    netVol : "-1,450,07",
                    netVal : "10,454,100",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },{
                    stock : "",
                    buyVol : "",
                    buyVal : "",
                    avgBuyPrice : "",
                    sellVol : "",
                    sellVal : "",
                    avgSellPrice: "",
                    netVol : "",
                    netVal : "",
                },
            ],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className="grid-294 ag-header-border-gray ag-theme-balham-dark ag-striped-even card-brokerTradeSummary"
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        // rowSelection={this.state.rowSelection}
                        groupSelectsFiltered={true}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class BrokerInfo extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabNumber: 1,
            startRow: 0,
        }
    }
    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#3D3E3F' : '#3D3E3F',
            neutral20: this.props.thememode === true ? '#333332' : '#333332',
            neutral30: this.props.thememode === true ? '#333332' : '#333332',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#4D4D4E' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#202020' : '#202020',
            primary: '#0071BC',
        },
    });

    render () {
        const stockOptions = [
            {value: 'bmpt', code: 'BMPT', saham: 'Bumi Mega Pertama '},
            {value: 'bnmp-ppt', code: 'BNMP-PPT', saham: 'Bumi Nusa Putra '},
            {value: 'bumi', code: 'BUMI', saham: 'Bumi Resource '},
            {value: 'asii', code: 'ASII', saham: 'Argo Astra Lestari '},
            {value: 'tlkm', code: 'TLKM', saham: 'Telekomunikasi Indonesia '},
            {value: 'wskt', code: 'WSKT', saham: 'Waskita '},
            {value: 'indf', code: 'INDF', saham: 'Indofood '},
            {value: 'bbca', code: 'BBCA', saham: 'Bank BCA '},
            {value: 'smrg', code: 'SMGR', saham: 'Semen Indonesia '},
            {value: 'bbri', code: 'BBRI', saham: 'Bank BRI '}
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid",
                color : "white!important"
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                color : "white!important"
            })
        };

        //Add your search logic here.
        const customFilter  = (option, searchText) => {
            var code = option.data.code.toLowerCase().includes(searchText.toLowerCase());
            var saham = option.data.saham.toLowerCase().includes(searchText.toLowerCase());

            if(searchText.toLowerCase().includes(' ')){
                if(saham){
                    return true;
                }
            } else {
                if (code) {
                    return true;
                }
            }
        };
        return (
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction" />
                <main>
                    {/*outer*/}
                    {/*<div className="container-fluid f-12 card-520">*/}
                    <div className="container-fluid px-0 f-12">
                        {/*card 520*/}
                        <div className="py-2 px-2 pb-0">
                            <div className="px-1 mx-0 my-0 col-sm-12 row h-40">
                                <div className="col-sm-4 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-4 px-0 mx-0">Broker Code</label>
                                    {/*<Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>*/}
                                    <div className="col-sm-8 text-left align-self-center">
                                        <Select
                                            getOptionLabel={(option) => `${option.code} - ${option.saham}`}
                                            filterOption={customFilter} isSearchable={true}
                                            maxMenuHeight={155} styles={customStyles} placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 pl-1 card-472 mt-2 bg-dark-grey pr-0">
                            <div className="col-sm-12 px-0 mx-0 text-center row ">
                                <div className="col-sm-12 px-2 pt-3 mx-0 text-left f-15 bg-currencies">
                                    PROFILE BROKER
                                    <Popup content='Refresh' position='top center' trigger={
                                        <button
                                            className={`btn btn-primary pull-right col-sm-1`}
                                            style={{"font-size": "14px", "width": "38px", "margin-top": "-8px"}}>
                                            <i className="glyphicon glyphicon-refresh" aria-hidden={"true"}></i>
                                        </button>
                                    }/>
                                </div>
                            </div>
                            <div className="container-fluid mx-0" style={{ paddingTop : "10px" }}>
                                <div className="row">
                                    <div className={"col-sm-12 pl-0"}>
                                        <table width="100%" className={"table table-bordered table-responsive mb-0 ml-2 card-brokerInfo"}>
                                            <tr>
                                                <td className={"d-border"}>Nama Member</td>
                                                <td width="70%" className={"even-td d-border hover-tables"} ></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>No Akte</td>
                                                <td width="70%" className={"d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Modal Dasar*
                                                </td>
                                                <td width="70%" className={"even-td d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Modal Disetor*</td>
                                                <td width="70%" className={"d-border hover-tables"} ></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Status Perusahaan
                                                </td>
                                                <td width="70%" className={"even-td d-border hover-tables"}></td>

                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Status Operasiona</td>
                                                <td width="70%" className={"d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Ijin Usaha
                                                </td>
                                                <td width="70%" className={"even-td d-border hover-tables"}></td>
                                            </tr>
                                            {/*<tr>*/}
                                                {/*<td className={"d-border"}>Nilai MKBD Terakhir*/}
                                                {/*</td>*/}
                                                {/*<td width="70%" className={"d-border hover-tables"}></td>*/}
                                            {/*</tr>*/}
                                            <tr>
                                                <td className={"d-border"}>Kantor Pusat
                                                </td>
                                                <td width="70%" className={"d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Nomor Telepon</td>
                                                <td width="70%" className={"even-td d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Faks</td>
                                                <td width="70%" className={"d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Kode Pos</td>
                                                <td width="70%" className={"even-td d-border hover-tables"}></td>
                                            </tr>
                                            <tr>
                                                <td className={"d-border"}>Situs</td>
                                                <td width="70%" className={"d-border hover-tables"}></td>
                                            </tr>

                                        </table>
                                    </div>


                                </div>
                            </div>
                            {/*<InternationalIndicesAgGrid size={widthSize()}/>*/}
                        </div>
                    </div>
                </main>
            </div>


        );
    }
}

const CustomFrameHeaderBrokerPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(CustomFrameHeaderBrokerPage_Base);

const ChatListPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatListPage_Base);

const ChatActionPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatActionPage_Base);

const ActionPageFrame = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ActionPageFrame_Base);

const ChatUserPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatUserPage_Base);

const ChatListUser = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatListUser_Base);


export default BrokerPage;
export {CustomFrameHeaderBrokerPage, ChatSupport2,
    ChatCommentPage,
    BrokerInfo,
    BrokerTradeSummary,
    BrokerTradeHistory,
    BrokerTopListPage,
};
