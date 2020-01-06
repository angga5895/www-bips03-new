import React from 'react';
import { ContextConnector } from './appcontext.js';
import { AppFrameContext } from './appframe.js';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import user_avatar from './img/man.png';
import {cssmode} from "./App";
// application-logic libraries
import { BIPSAppContext } from './AppData.js';
import { Table, Navbar, Collapse } from 'react-bootstrap';
import ModalPortofolio from "./app_modals/modal_portofolio";
import ModalChangePassPin from "./app_modals/modal_changepasspin";
import ModalSetting from "./app_modals/modal_setting";
import ModalHistorical from "./app_modals/modal_historical";
import ModalFund from "./app_modals/modal_fund";
import ModalTransactionHistory from "./app_modals/modal_transaction_history";
import ModalInquiry from "./app_modals/modal_inquiry";
import { AppFrame, AppFrameAction, AppFrameProvider, AppModal } from "./appframe";

import './selectiontab.css';

const options = [
    { value: 'compositeindex', label: 'Composite Index' },
    { value: 'compositethome', label: 'Composite Home' }
];

const option = [
    { value: 'indonesia', label: 'Indonesia (IDX)' }
];

class MenuHeader extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                {
                    Object.keys(this.props.id.instances).map((k) => {
                            var e = this.props.id.instances[k];
                            return (
                                <Menu.Item
                                    className = {this.props.ms === "menuscale" ? "col-sm-tab-scale" : "col-sm-tab h-72-77"}
                                    key={e.instanceName}
                                    name={e.instanceName}
                                    active={this.props.id.activeInstance === e}
                                    onClick={
                                        () => this.props.id.activateFrame(e.instanceName)
                                    }
                                >
                                    {
                                        this.props.id.linkTitles[e.instanceName] || e.title
                                    }
                                </Menu.Item>
                            )
                        }
                    )
                }
            </>
        );
    }
}

class MenuScaleHeader extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                {
                    Object.keys(this.props.id.instances).map((k) => {
                            var e = this.props.id.instances[k];
                            return (
                                <a className={this.props.id.activeInstance === e ? "menuscaleheader act" : "menuscaleheader"}
                                   key={e.instanceName}
                                   name={e.instanceName}
                                   active={this.props.id.activeInstance === e}
                                   onClick={
                                       () => this.props.id.activateFrame(e.instanceName)}>
                                    {
                                        this.props.id.linkTitles[e.instanceName] || e.title
                                    }
                                </a>
                            )
                        }
                    )
                }
            </>
        );
    }
}

const UISelectionTab_Base = (props) => {
    // expected in props:
    // instances: array of pageInstance object
    // activeInstance: current pageInstance object
    // activateFrame: (instanceName) => {} hook to activate selected frame ID
    // linkTitles: object, mapping instanceName to link title
    return (
        <div class="h-84 mb-1">
            <div className="d-xxl-none d-xxl-block d-border-bottom mb-1">
                <div className="header-normal-menu">
                    <Menu className="row">
                        <div className="col-sm-header-logo px-0 text-center align-middle align-self-center text-white click-pointer">
                            <Navbar.Brand href="/" className="text-white pr-0 pl-3"><h2>BIPS</h2></Navbar.Brand>
                        </div>
                        <div className="d-border-left d-border-right row main-header col-sm-header-menu px-0 mr-0 py-1 h-87">
                            <MenuHeader id={props}/>

                            {/*Zaky*/}
                            <Menu.Menu className="px-1 align-self-center mx-0" style={{ flex:"auto" }}>
                                <SelectItem1 />
                            </Menu.Menu>
                        </div>

                        <div className="col-sm-header-user row mx-0">
                            <Menu.Menu className="col-sm-8 px-2 mx-0">
                                <InfoCash/>
                            </Menu.Menu>

                            <Menu.Menu className="px-0 mx-0">
                                <UserInfo/>
                            </Menu.Menu>
                        </div>
                    </Menu>
                </div>
                <div className="header-scale-menu">
                    <Navbar className="navbar-trading my-0">
                        <div className="col-sm-12 px-0 mx-0 row bg-navy-gradient-odd">
                            <div className="col-sm-1 px-0 mx-0 align-self-center text-center click-pointer">
                                <Navbar.Brand href="/" className="mr-auto text-white">
                                    <h2>BIPS</h2>
                                </Navbar.Brand>
                            </div>
                            <div className="col-sm-10 px-0 mx-0 align-self-center text-center">
                                <div className="col-sm-12 align-self-center text-center row">
                                    <div className="col-sm-8 px-0 mx-0 row">
                                        {/*Zaky*/}
                                        <Menu.Menu className="col-sm-12 px-4 align-self-center">
                                            <SelectItem1 />
                                        </Menu.Menu>
                                    </div>
                                    <div className="col-sm-4 px-0 mx-0 row">
                                        <Menu.Menu className="col-sm-8 px-4 mx-0">
                                            <InfoCash/>
                                        </Menu.Menu>

                                        <Menu.Menu className="col-sm-4 px-1 mx-0">
                                            <UserInfo/>
                                        </Menu.Menu>
                                    </div>
                                </div>
                            </div>
                            <MenuCollapse>
                                <Menu className="row col-sm-12" style={{zIndex:"1"}}>
                                    <MenuHeader id={props} ms="menuscale"/>
                                </Menu>
                            </MenuCollapse>
                        </div>
                    </Navbar>
                </div>
            </div>

            <div className="d-sml-none d-sml-block d-border-bottom mb-1">
                <Menu className="row">
                    <div className="col-sm-header-logo-scale px-0 text-center align-middle align-self-center text-white click-pointer">
                        <Navbar.Brand href="/" className="text-white px-3"><h3>BIPS</h3></Navbar.Brand>
                    </div>
                    <div className="d-border-left d-border-right row main-header col-sm-header-menu-scale px-0 mr-0 pb-2 h-87">
                        <MenuScaleHeader id={props}/>

                        {/*Zaky*/}
                        <Menu.Menu className="px-1 align-self-center mx-0" style={{ flex:"auto" }}>
                            <SelectItem1 />
                        </Menu.Menu>
                    </div>

                    <div className="col-sm-header-user-scale row mx-0">
                        <Menu.Menu className="col-sm-8 pl-0 pr-1 mx-0">
                            <InfoCash/>
                        </Menu.Menu>

                        <Menu.Menu className="col-sm-4 pl-3 pr-0 mx-0">
                            <UserInfo/>
                        </Menu.Menu>
                    </div>
                </Menu>
            </div>

            <div className="d-xsml-none d-xsml-block d-border-bottom mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-smb-12 px-0 mx-0 row bg-navy-gradient-odd">
                        <div className="col-smb-1 px-0 mx-0 align-self-center text-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-smb-10 px-0 mx-0 align-self-center text-center">
                            <div className="col-smb-12 align-self-center text-center row">
                                <div className="col-smb-7 pr-0 pl-5 mx-0 row">
                                    {/*Zaky*/}
                                    <Menu.Menu className="col-smb-12 pl-2 pr-2 align-self-center">
                                        <SelectItem1 />
                                    </Menu.Menu>
                                </div>
                                <div className="col-smb-5 px-0 mx-0 row">
                                    <Menu.Menu className="col-smb-8 px-4 mx-0">
                                        <InfoCash/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-smb-4 px-1 mx-0">
                                        <UserInfo/>
                                    </Menu.Menu>
                                </div>
                            </div>
                        </div>
                        <MenuCollapse>
                            <Menu className="row col-smb-12" style={{zIndex:"1"}}>
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>
                </Navbar>
            </div>

            <div className="d-xxsml-none d-xxsml-block d-border-bottom mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-smb-12 px-0 mx-0 row bg-navy-gradient-odd">
                        <div className="col-smb-1 px-0 mx-0 align-self-center text-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-smb-10 px-4 mx-0 align-self-center text-center">
                            <div className="col-smb-12 align-self-center text-center row">
                                <div className="col-smb-7 pr-0 pl-5 mx-0 row">
                                    <Menu.Menu className="col-smb-12 pl-0 pr-2 align-self-center">
                                        <SelectItem1 />
                                    </Menu.Menu>
                                </div>
                                <div className="col-smb-5 px-0 mx-0 row">
                                    <Menu.Menu className="col-smb-8 px-1 mx-0">
                                        <InfoCash/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-smb-4 px-1 mx-0">
                                        <UserInfo/>
                                    </Menu.Menu>
                                </div>
                            </div>
                        </div>
                        <MenuCollapse>
                            <Menu className="row col-smb-12" style={{zIndex:"1"}}>
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>
                </Navbar>
            </div>

            <div className="d-xsm-none d-xsm-block d-border-bottom mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-smb-12 px-0 mx-0 row text-center align-self-center bg-navy-gradient-odd">
                        <div className="col-smb-3 px-2 text-center align-self-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-smb-4 px-4 text-center align-self-center">
                            <Menu.Menu>
                                <InfoCash/>
                            </Menu.Menu>
                        </div>
                        <div className="col-smb-4 px-3 align-self-center">
                            <Menu.Menu>
                                <UserInfo/>
                            </Menu.Menu>
                        </div>

                        <MenuCollapse>
                            <Menu className="row col-smb-12" style={{zIndex:"1"}}>
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>

                    <div className="col-smb-12 px-0 mx-0 row text-center align-self-center">
                        {/*Zaky*/}
                        <Menu.Menu className="col-smb-12 px-2 align-self-center text-center">
                            <SelectItem1 />
                        </Menu.Menu>
                    </div>
                </Navbar>
            </div>

        </div>
    )
};

function _connectFrameTree(vars, actions, ownProps) {
    var tree = vars.instanceTreeIndexes[ownProps.treeName]
    if (!tree) {
        return {
            frameActive: false,
            instances: {},
            activeInstance: null,
            activateFrame: (instanceName) => actions.sendAction('switchPage', {treeName: ownProps.treeName, instanceName})
        }
    } else {
        return {
            frameActive: tree.frameActive,
            instances: tree.pageInstances,
            activeInstance: tree.activeInstance,
            activateFrame: (instanceName) => actions.sendAction('switchPage', {treeName: ownProps.treeName, instanceName})
        }
    }
}

const UISelectionTab = ContextConnector(AppFrameContext,
    (v, act, props) => (
        v.useInstanceTree ? _connectFrameTree(v, act, props) : {
            frameActive: v.frameActive,
            instances: v.pageInstances,
            activeInstance: v.activeInstance,
            activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
        }
    )
)(UISelectionTab_Base);

class SelectItem1 extends React.PureComponent {
    constructor(props) {
        super(props);
        //Zaky -
        //menambahkan state untuk flipped bar
        this.state = {
            seconds: 0,
            index: 0,
            flipped: true,
            barInfo: [
                {
                    symbol: 'COMPOSITE INDEX',
                    last: '12849',
                    change: -0.99,
                    percentage: -0.30,
                },{
                    symbol: 'INFRASTRUCTUR',
                    last: '108.59',
                    change: 0,
                    percentage: 0,
                },{
                    symbol: 'AGRI',
                    last: '0.9874',
                    change: -0.05,
                    percentage: -0.04,
                },{
                    symbol: 'MINING',
                    last: '78.14',
                    change: 0.05,
                    percentage: 0.05,
                },
            ],
        };
    }

    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : this.props.thememode === true ? '#181717':'#F8F9F9',
            neutral20 : this.props.thememode === true ? '#565252':'#DDDDDD',
            neutral30 : this.props.thememode === true ? '#565252':'#DDDDDD',
            neutral40 : this.props.thememode === true ? '#cccccc':'#767676',
            neutral80 : this.props.thememode === true ? '#FFFFFF':'#999999',
            primary75 : this.props.thememode === true ? '#FFFFFF':'#999999',
            primary50 : this.props.thememode === true ? '#4D4D4E':'#F3F3F3',
            primary25 : this.props.thememode === true ? '#4D4D4E':'#F3F3F3',
            primary   : '#0071BC',
        },
    });
    // zaky
    // fungsi untuk flipped
    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
            // seconds: prevState.seconds + 0
        }));
        if(this.state.seconds % 5 === 0){
            //set change every 30 sec
            this.setState({flipped: !this.state.flipped})
            this.setState({index: (this.state.index + 1) % this.state.barInfo.length });
        }
    }
    //zaky
    //fungsi untuk flipped
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }
    //zaky
    //fungsi untuk flipped
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        //zaky
        //fungsi untuk flipped
        const switchPanel = () => {
            if(this.state.flipped === true){
                return "card is-flipped";
            }else{
                return "card";
            }
        }
        //zaky
        //fungsi untuk warna
        const colorLabelFront = (props) => {
            if(props < 0){
                return "card__face--front-red"
            }if(props > 0){
                return "card__face--front"
            }else{
                return "card__face--front-yellow"
            }
        }
        const colorLabelBack = (props) => {
            if(props < 0){
                return "card__face--back-red"
            }if(props > 0){
                return "card__face--back"
            }else{
                return "card__face--back-yellow"
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
        //zaky
        //fungsi untuk flipped
        const cardFace = (props) => {
            let info = this.state.barInfo[this.state.index];
            if(props === "front"){
                if(this.state.flipped){
                    return <div className={"card__face"+' '+colorLabelFront(info.change)}>&nbsp;</div>
                }else{
                    return <div className={"card__face"+' '+colorLabelFront(info.change)}>
                        <table width="100%" height="100%">
                            <tr>
                                <td rowSpan="2" className="spanSymbol px-0">{info.symbol}</td>
                                <td colSpan="2" className="lastColor px-0">{info.last}</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className={'white '+colorIcon(info.change)}>&nbsp;
                                        {info.change}</span>&nbsp;
                                </td>
                                <td>
                                    <span className="white">({info.percentage}%)</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                }
            }else{
                if(this.state.flipped){
                    return <div className={"card__face"+' '+colorLabelBack(info.change)}>
                        <table width="100%" height="100%">
                            <tr>
                                <td rowSpan="2" className="spanSymbol px-0">{info.symbol}</td>
                                <td colSpan="2" className="lastColor px-0">{info.last}</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className={'white '+colorIcon(info.change)}>&nbsp;
                                        {info.change}</span>&nbsp;
                                </td>
                                <td>
                                    <span className="white">({info.percentage}%)</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                }else{
                    return <div className={"card__face"+' '+colorLabelBack(info.change)}>&nbsp;</div>
                }
            }
        }
        return (
            <div className="nav-link col-sm-12 px-0 mx-0 py-0 text-white">
                <div className="col-sm-12 bg-black-trading px-0 text-center" style={{ borderRadius : "5px" }}>
                    {/*zaky
                    Element Flipped*/}
                    <div className="scene scene--card">

                        <div className={switchPanel()}>
                            {cardFace("front")}
                            {cardFace("back")}
                        </div>
                    </div>
                    {/*<Select
                        className="f-12-fix"
                        defaultValue={option[0]}
                        label="Single select"
                        options={option}
                        theme={this.selectSelectionTab}
                    />*/}
                </div>
                <label className="col-sm-12 text-center text-jam pt-1 my-0 pb-0 f-12">{fullDate(0)} WIB <span className="text-white">|</span> <span className={fullDate(1) === 'Open' ? 'text-success' : 'text-danger'}>{fullDate(1)}</span></label>
            </div>
        );
    }
}

function fullDate(params) {
    var fullDate = new Date();
    /*var splitDate = fullDate.replace(/\./g,':');*/
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var m = month[fullDate.getMonth()];
    var d = fullDate.getDate();
    var day = d < 10 ? '0'+d : d;

    var y = fullDate.getFullYear();

    var h = fullDate.getHours();
    var hours = h < 10 ? '0'+h : h;

    var mnt = fullDate.getMinutes();
    var minutes = mnt < 10 ? '0'+mnt : mnt;

    var s = fullDate.getSeconds();
    var seconds = s < 10 ? '0'+s : s;

    var dateFull = day +"-"+ m +"-"+y +" "+ hours +":"+ minutes +":"+ seconds;

    var time = hours > 8 && hours < 16 ? 'Open' : 'Close';

    if(params === 0){
        return dateFull;
    } else {
        return time;
    }
}

class SelectItem2_Base extends React.Component {
    constructor(props) {
        super(props);
    }

    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : this.props.thememode === true ? '#181717':'#F8F9F9',
            neutral20 : this.props.thememode === true ? '#565252':'#DDDDDD',
            neutral30 : this.props.thememode === true ? '#565252':'#DDDDDD',
            neutral40 : this.props.thememode === true ? '#cccccc':'#767676',
            neutral80 : this.props.thememode === true ? '#FFFFFF':'#999999',
            primary75 : this.props.thememode === true ? '#FFFFFF':'#999999',
            primary50 : this.props.thememode === true ? '#4D4D4E':'#F3F3F3',
            primary25 : this.props.thememode === true ? '#4D4D4E':'#F3F3F3',
            primary   : '#0071BC',
        },
    });

    render() {
        return (
            <div className="nav-link col-sm-12 px-0 mx-0 py-3 text-white">
                <div className="col-md-12 bg-black-trading px-0">
                    <Select
                        className="f-12-fix"
                        defaultValue={options[0]}
                        label="Single select"
                        options={options}
                        theme={this.selectSelectionTab}
                    />
                </div>
                <label className="col-md-12 f-11-center text-success">6,453,98 +68.8 (+1.08%)</label>
            </div>
        );
    }
}

class InfoCash_Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balanceOpt : this.props.balanceOpt,
            balanceVal : this.props.balanceVal,
        }
    }

    render() {
        const changeBalanceOpt = (props) => {
            var value = (props == 'cashBalance') ? document.getElementById('cashBalanceVal').innerHTML:document.getElementById('buyLimitVal').innerHTML;

            this.setState({
                balanceOpt: props,
                balanceVal: value,
            });
            // this.props.changeAccountType(props);
        }
        return (
            <div className="nav-link px-0 mx-0 pt-1 pb-0 text-white align-self-center">
                <Dropdown icon={null} text={
                    <div>
                        <Table size="sm" className="text-white cursor-menu py-0 my-0">
                            <thead></thead>
                            <tbody>
                            <tr className="f-12-fix text-center">
                                <td className="text-success"><i className="fa fa-square"></i></td>
                                <td>{this.state.balanceOpt == 'cashBalance' ? 'Cash Balance':'Buy Limit'}</td>
                                <td rowSpan="2" className="py-2"><i className="f-11-center text-gray-tradding oi oi-caret-bottom"></i></td>
                            </tr>
                            <tr className="f-16 text-white">
                                <td colSpan="2" className="text-center">{this.state.balanceVal}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                }
                          className="text-white align-self-center">
                    <Dropdown.Menu className={'bg-black-trading f-14 w-100 d-border'}>
                        <Dropdown.Item
                            className="item-hover text-white text-left px-2" text={
                            <div>
                                Cash Balance
                                <div className="text-primary text-right" id={"cashBalanceVal"}>{this.props.balanceVal}</div>
                            </div>
                        }
                            onClick={()=>changeBalanceOpt('cashBalance')}
                        />
                        <Dropdown.Divider className='d-border' />
                        <Dropdown.Item
                            className="item-hover text-white text-left px-2"
                            onClick={()=>changeBalanceOpt('buyLimit')}
                            text={
                                <div>
                                    Buy Limit
                                    <div className="text-primary text-right" id={"buyLimitVal"}>{this.props.buyLimitVal}</div>
                                </div>
                            } />
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

class UserInfo_Base extends React.Component {
    constructor(props){
        super(props);
        //zaky
        //menambahkan state general untuk tipe akun
        this.state={
            general: true,
        }
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickSetting = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="container-fluid">
                <div className="row">
                    <div className="col-sm">
                        <div className="text-white text-left"><span class="pull-left fa fa-cog"></span> <h4>&nbsp;&nbsp;Setting</h4></div>
                    </div>
                    <div className="col-sm text-right">
                        <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                           onClick={this.closeClick}></i>
                    </div>
                </div>
            </div>,
            size: 'fullscreen',
            contentClass: SettingModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }

    /*buttonClickPortofolio = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <div className="text-white text-left"><span class="pull-left icon-icon-portofolio"></span> <h4>&nbsp;&nbsp;Portofolio & Balance</h4></div>
                        </div>
                        <div className="col-sm text-right">
                            <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                               onClick={this.closeClick}></i>
                        </div>
                    </div>
                </div>,

            size: 'fullscreen',
            contentClass: PortofolioModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }

    buttonClickHistorical = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <div className="text-white text-left"><span class="pull-left icon-icon-historical"></span> <h4>&nbsp;&nbsp;Historical Trade List</h4></div>
                        </div>
                        <div className="col-sm text-right">
                            <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                               onClick={this.closeClick}></i>
                        </div>
                    </div>
                </div>,

            size: 'fullscreen',
            contentClass: HistoricalModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }

    buttonClickFund = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <div className="text-white text-left"><span class="pull-left icon-icon-fund"></span> <h4>&nbsp;&nbsp;Fund Transfer</h4></div>
                        </div>
                        <div className="col-sm text-right">
                            <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                               onClick={this.closeClick}></i>
                        </div>
                    </div>
                </div>,

            size: 'fullscreen',
            contentClass: FundModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }

    buttonClickTransactionHistory = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <div className="text-white text-left"><span class="pull-left icon-icon-transactional"></span> <h4>&nbsp;&nbsp;Transaction History</h4></div>
                        </div>
                        <div className="col-sm text-right">
                            <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                               onClick={this.closeClick}></i>
                        </div>
                    </div>
                </div>,

            size: 'fullscreen',
            contentClass: TransactionHistoryModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }

    buttonClickInquiry = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            <div className="text-white text-left"><span class="pull-left icon-icon-inquiry"></span> <h4>&nbsp;&nbsp;Inquiry of Account Info</h4></div>
                        </div>
                        <div className="col-sm text-right">
                            <i className="icofont icofont-close text-icofont-close text-border click-pointer"
                               onClick={this.closeClick}></i>
                        </div>
                    </div>
                </div>,

            size: 'fullscreen',
            contentClass: InquiryModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }*/

    buttonClickChangePassPin = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: ChangePassPinModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render(){
        //zaky
        //fungsi untuk mengubah state switch akun
        const changeGeneralState = (props) => {
            this.setState({
                general: props
            });
            this.props.changeAccountType(props);
        }
        //zaky
        //fungsi untuk mengubah state switch akun dengan perubahan style
        const changeStyle = (props,type) => {
            if(props === true && type === "general"){
                return "radioAccount checkedRadio"
            }else if(props === false && type === "margin"){
                return "radioAccount checkedRadio"
            }else{
                return "radioAccount"
            }
        }
        return(
            <div className="nav-link px-0 mx-0 py-0 text-white">
                <AppFrameAction ref="frameAction" />
                {/*Zaky*/}
                {/*perubahan nama*/}
                <table>
                    <tr>
                        <td className="py-0">
                            <Dropdown icon={null} text={
                                <div className="cursor-menu pt-1">
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2"/><i className="f-11-center text-gray-tradding oi oi-caret-bottom"></i>
                                </div>
                            } className="text-white align-self-center">
                                <Dropdown.Menu className={'bg-black-trading f-14 w-300 d-border'} style={{ left: 'auto', right: 0 }}>
                                    <Dropdown.Header className="bg-gray-tradding text-white py-3 text-transform-none" content={
                                        <Table size="sm" className="py-0 my-0 px-2 bg-gray-tradding">
                                            <thead></thead>
                                            <tbody>
                                            <tr><td className="py-0 my-0 f-18">Mr. John Du</td></tr>
                                            <tr><td className="py-0 my-0 f-14">001-01-008538</td></tr>
                                            <tr><td className="py-0 my-0 f-11">john.du@gmail.com</td></tr>
                                            </tbody>
                                        </Table>
                                    }/>

                                    {/* zaky */}
                                    {/*perubahan akun general menjadi margin dan sebalikanya*/}
                                    <table className="w-100">
                                        <thead></thead>
                                        <tbody className="text-center">
                                        <tr>
                                            <td>
                                                <div className="divAccountOpt input col-sm-12 text-center align-self-center px-0 ">
                                                    <input type="radio" className={changeStyle(this.state.general,"general")} name="itemTheme2" id="radioAccount"
                                                           onClick={()=>{changeGeneralState(true);}
                                                           } checked={(this.state.general === true) ? true : false}/>
                                                    <label className="radioLabelAccount" htmlFor="radioAccount">
                                                        <text>Regular<br/>Account</text>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="input col-sm-12 text-center align-self-center divAccountOpt px-0">
                                                    <input type="radio" className={changeStyle(this.state.general,"margin")} name="itemTheme2" id="radioAccount2"
                                                           onClick={()=>{changeGeneralState(false);}
                                                           }  checked={(this.state.general === false) ? true : false} />
                                                    <label className="radioLabelAccount" htmlFor="radioAccount2">
                                                        <text>Margin<br/>Account</text>
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    {/*End*/}
                                    {/*<Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickPortofolio} text={
                            <div>
                                <i className="icon-icon-portofolio"></i>&nbsp;&nbsp; Portofolio & Balance
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickHistorical} text={
                            <div>
                                <i className="icon-icon-historical"></i>&nbsp;&nbsp; Historical Trade List
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickFund} text={
                            <div>
                                <i className="icon-icon-fund"></i>&nbsp;&nbsp; Fund Transfer
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickTransactionHistory} text={
                            <div>
                                <i className="icon-icon-transactional"></i>&nbsp;&nbsp; Transaction History
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickInquiry} text={
                            <div>
                                <i className="icon-icon-inquiry"></i>&nbsp;&nbsp; Inquiry Of Account
                            </div>
                        }/>*/}
                                    <Dropdown.Divider className="d-border py-0 my-0" />
                                    <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickChangePassPin} text={
                                        <div>
                                            <i className="icon-icon-change-pinpass"></i>&nbsp;&nbsp; Change Password/PIN
                                        </div>
                                    }/>
                                    <Dropdown.Divider className="d-border py-0 my-0" />
                                    <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickSetting} text={
                                        <div>
                                            <i className="fa fa-cog"></i>&nbsp;&nbsp; Settings
                                        </div>
                                    }/>
                                    <Dropdown.Divider className="d-border py-0 my-0" />
                                    <Dropdown.Item href="/" className="item-hover text-white text-left" text={
                                        <div>
                                            <i className="oi oi-power-standby"></i>&nbsp;&nbsp; Logout
                                        </div>
                                    }/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-0 px-0 text-center text-primary f-16">
                            <kbd>{(this.props.GeneralType === true) ? "REGULAR" : "MARGIN"}</kbd>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

class SettingModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalSetting />
            </>
        );
    }
}


class PortofolioModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalPortofolio />
            </>
        );
    }
}

class HistoricalModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalHistorical />
            </>
        );
    }
}

class FundModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalFund />
            </>
        );
    }
}

class TransactionHistoryModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalTransactionHistory />
            </>
        );
    }
}

class InquiryModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalInquiry />
            </>
        );
    }
}

class ChangePassPinModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalChangePassPin />
            </>
        );
    }
}

class MenuCollapse extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };
    }

    render() {
        return (
            <>
                <div className="col-sm-1 col-smb-1 px-0 mx-0 align-self-center text-center">
                    <div onClick={() => this.setState({ open: !this.state.open })} className="click-pointer">
                        <div className="d-border toggler-menu">
                            <i className="fas fa-bars f-18 text-white"></i>
                        </div>
                    </div>
                </div>
                <Collapse in={this.state.open} className="w-100">
                    <div>
                        {this.props.children}
                    </div>
                </Collapse>
            </>
        );
    }
}

class MenuScaleN_Base extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display : this.props.scaleState === "80" ||
                this.props.scaleState === "90" ||
                this.props.scaleState === "100" ? "block" : "none"}}>
                {this.props.children}
            </div>
        );
    }
}

class MenuScaleZ_Base extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                display: this.props.scaleState === "110" ||
                this.props.scaleState === "120" ? "block" : "none"
            }}>
                {this.props.children}
            </div>
        );
    }
}

//Zaky
const UserInfo = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        GeneralType: vars.GeneralType,
        changeAccountType : (GeneralType) => {actions.sendAction('changeAccountType', {GeneralType})}

    })
)(UserInfo_Base);

const SelectItem2 = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode : vars.thememode,
    }),
)(SelectItem2_Base)

const InfoCash = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        balanceOpt: vars.balanceOpt,
        balanceVal: vars.balanceVal,
        buyLimitVal: vars.buyLimitVal,
        changeBalanceOpt : (balanceOpt) => {actions.sendAction('changeBalanceType', {balanceOpt})}
    })
)(InfoCash_Base);

export default UISelectionTab;