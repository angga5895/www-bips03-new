import React from "react";
import { AppFrameAction } from "./../appframe";
import { Tab ,Dropdown} from 'semantic-ui-react'
import user_avatar from './../img/man.png';
import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";
import {ResizeResponsive} from "./../app_pages/mainPage";
import $ from "jquery";

const stateLanguages = [
    { key: '1', value: 'eng', text: 'English' },
    { key: '2', value: 'ina', text: 'Indonesian' },
];

const stateTimeZone = [
    { key: '1', value: 'gmt-12', text: '(GMT-12:00) International' },
    { key: '2', value: 'gmt-11', text: '(GMT-11:00) Midway Island' },
];



const panes = [
  { menuItem: 'Appearance', render: () => <Tab.Pane><TabAppearance/></Tab.Pane> },
  { menuItem: 'Security', render: () => <Tab.Pane><TabPrivacy/></Tab.Pane> },
  // { menuItem: 'Notification', render: () => <Tab.Pane><TabNotification/></Tab.Pane> },
]
class ModalSetting extends React.Component {

  render() {
      const grey = 'gray';
    return (
      <>
        <div className="text-white f-12">
        <Tab
            menu={{grey, fluid: true, vertical: true }}
            menuPosition='left'
            panes={panes}
            grid={{paneWidth: 12, tabWidth: 3}}
        />
        </div>
      </>
    );
  }
}

class TabAppearance_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        valueTheme: this.props.thememode === true ? "night" : "light",
        valueScale: this.props.scaleState,
        valueBalance : "0",
        scalemode: 1,
    }

    changeScale80 = () => {
        var zoomLevelL = 1.26;

        var zoomLevel = 0.8;
        $('html').css({ zoom: zoomLevel });

        /*document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");*/

        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');

        ResizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "80"
        })
        this.props.changeScale("80");
    }

    changeScale90 = () => {
        var zoomLevelL = 1.1;

        var zoomLevel = 0.9;
        $('html').css({ zoom: zoomLevel });

        /*document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");*/

        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');

        ResizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "90"
        })
        this.props.changeScale("90");
    }

    changeScale100 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1;
        $('html').css({ zoom: zoomLevel });

        /*document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");*/

        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');

        ResizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "100"
        })
        this.props.changeScale("100");
    }

    changeScale110 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1.1;
        $('html').css({ zoom: zoomLevel });

        /*document.body.style.setProperty('--column-col-sm-3-6', "50%");
        document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");*/

        document.body.style.setProperty('--header-menu-scale', 'block');
        document.body.style.setProperty('--header-menu', 'none');

        ResizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "110"
        })
        this.props.changeScale("110");
    }

    changeScale120 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1.2;
        $('html').css({ zoom: zoomLevel });


        /*document.body.style.setProperty('--column-col-sm-3-6', "50%");
        document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");*/

        document.body.style.setProperty('--header-menu-scale', 'block');
        document.body.style.setProperty('--header-menu', 'none');

        ResizeResponsive();

        this.setState({
            scalemode : zoomLevel,
            valueScale: "120"
        })
        this.props.changeScale("120");
    }

    render() {
        return (
            <div>
                <div className="col align-item-center"> 
                    <div className="text-white setting align-items-center">

                    {/* <div className="border-bottom"> */}
                        {/*<div className="form-group row mb-0">*/}
                            {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                                {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">*/}
                                    {/*Language*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                                {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">*/}
                                    {/*Time zone*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        {/*<div className="form-group row mb-0">*/}
                            {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                                {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center">*/}
                                    {/*<Dropdown placeholder='Choose' search selection options={stateLanguages} className="col-sm-12 f-12"/>                                                        */}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                                {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center">*/}
                                    {/*<Dropdown placeholder='Choose' search selection options={stateTimeZone} className="col-sm-12 f-12"/>                                                                                        */}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/* </div> */}

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                                Theme Settings
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-5 f-12 text-center align-self-center" >
                            <input type="radio" class="radio_item" value="" name="itemTheme" id="radio1" onClick={
                                (e) => {
                                    this.setState({
                                        valueTheme: "night"
                                    });
                                    this.props.isNight(true);
                                }
                            } checked={this.state.valueTheme === "night" ? true : false}/>
                                <label class="label_item" htmlFor="radio1"> <i className="logo-dark-theme"/> </label>
                            </div>
                            <div class="ui small input col-sm-6 f-12 text-center align-self-center">
                            <input type="radio" class="radio_item" value="" name="itemTheme" id="radio2" onClick={
                                (e) => {
                                    this.setState({
                                        valueTheme: "light"
                                    });
                                    this.props.isNight(false);
                                }
                            } checked={this.state.valueTheme === "light" ? true : false} />
                                <label class="label_item" htmlFor="radio2"> <i className="logo-light-theme"/> </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Interface Scale
                            </div>
                            <div className="ui small input col-sm-12 f-9 text-center align-self-center danger-text">
                                *) Not compatible in Mozilla Firefox
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0 pl-4">
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                                
                                <input class="magic-radio" type="radio" name="scale" id="scale1" value="option" onClick={this.changeScale80} checked={this.state.valueScale === "80" ? true : false} />
                                <label htmlFor="scale1" className="text-white">
                                80 %
                                </label>
    
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale2" value="option" onClick={this.changeScale90} checked={this.state.valueScale === "90" ? true : false}/>
                                <label htmlFor="scale2" className="text-white">
                                90 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale3" value="option" onClick={this.changeScale100} checked={this.state.valueScale === "100" ? true : false}/>
                                <label htmlFor="scale3" className="text-white">
                                100 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale4" value="option" onClick={this.changeScale110} checked={this.state.valueScale === "110" ? true : false}/>
                                <label htmlFor="scale4" className="text-white">
                                110 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale5" value="option" onClick={this.changeScale120} checked={this.state.valueScale === "120" ? true : false}/>
                                <label htmlFor="scale5" className="text-white">
                                120 %
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    {/*<div className="form-group row mb-0">*/}
                        {/*<div class="col-sm-6 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">*/}
                                {/*Balance/Limit displayed at the top*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="form-group row mb-0 pl-4">*/}
                        {/*<div class="col-sm-4 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">*/}
                            {/*<input class="magic-radio" type="radio" name="balance" id="a" value="option" onClick={*/}
                                {/*(e) => {*/}
                                    {/*this.setState({*/}
                                        {/*valueBalance: "0"*/}
                                    {/*});*/}
                                {/*}*/}
                            {/*} checked={this.state.valueBalance === "0" ? true : false}/>*/}
                                {/*<label htmlFor="a" className="text-white f-10-center">*/}
                                {/*Always show the "Total" amount*/}
                                {/*</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div class="col-sm-4 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">*/}
                            {/*<input class="magic-radio" type="radio" name="balance" id="b" value="option" onClick={*/}
                                {/*(e) => {*/}
                                    {/*this.setState({*/}
                                        {/*valueBalance: "1"*/}
                                    {/*});*/}
                                {/*}*/}
                            {/*} checked={this.state.valueBalance === "1" ? true : false}/>*/}
                                {/*<label htmlFor="b" className="text-white f-10-center">*/}
                                {/*Hide account balance/limit*/}
                                {/*</label>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>*/}

                   
                </div>
                <div className="form-group row mb-0">
                        <div class="col-sm-12 mx-0 mb-2 pl-5">
                            <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                        </div>
                    </div>
                </div> 
            </div>
            
            
        );
    }
}

class TabPrivacy extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        valuePinUsage : "1",
        ImgProfil:""
    }
    onChangeAvatar = (e) => {
        // var uploadFile = document.getElementById("uploadBtnID").value;
        // document.getElementById("uploadFileID").value = uploadFile;

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                ImgProfil: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    render() {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
            };
            
            const paddingParagraph = {
            padding: '10px'
            }
            
            const divMargin = {
            marginBottom: '15px'
            }
            
            const imgUser = {
            margin: 'auto',
            backgroundColor: '#3c3c3c',
            borderBottom: '2px solid #1A1A1A'
            }

        const avatar = (this.state.ImgProfil)?this.state.ImgProfil:user_avatar;
        return (
            <div>
            <div className="col align-item-center"> 
                <div className="text-white setting align-items-center">
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                               Privacy Settings
                            </div>
                        </div>
                    </div>                        
                    {/*<div className="form-group row mb-0">*/}
                        {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">*/}
                                {/*Email*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="form-group row mb-0">*/}
                        {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center">*/}
                               {/*<input type="text"/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center">*/}
                                {/*<button className="btn btn-md btn-primary">Changes</button>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="form-group row mb-0">*/}
                        {/*<div class="col-sm-5 mx-0 mb-2 ">*/}
                            {/*<div class="ui small input col-sm-12 f-9 text-right">*/}
                                {/*<i className="text-blue">Current email</i>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*/!* </div> *!/*/}

                {/*<div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>*/}

                {/*<div className="form-group row mb-0">*/}
                    {/*<div class="col-sm-6 mx-0 mb-2 ">*/}
                        {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">*/}
                            {/*Profile Photo*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/*<div className="form-group row mb-0">*/}
                    {/*<div class="col-sm-1 mx-0 mb-2 ">*/}
                        {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center">*/}
                            {/*<div className="col-md-12" style={imgdisplay}>*/}
                                {/*<img src={avatar} alt="User" className="img-avatar d-border mr-2" />*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div class="col-sm-3 mx-0 mb-2 ">*/}
                        {/*<div class="ui small input col-sm-12 f-12 text-center align-self-center ver-center">*/}
                            {/*/!* <button className="btn btn-md btn-primary">Upload</button> *!/*/}
                            {/*<div className="fileUpload btn btn-primary">*/}
                                {/*<span>Browse</span>*/}
                                {/*<input id="uploadBtnID" type="file" className="upload" accept="image/*" onChange={this.onChangeAvatar}/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/*<div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>*/}

                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Pin Usage
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0 pl-4">
                    <div class="col-sm-4 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                        <input class="magic-radio" type="radio" name="balance" id="a" value="option" onClick={
                            (e) => {
                                this.setState({
                                    valuePinUsage: "0"
                                });
                            }
                        } checked={this.state.valuePinUsage === "0" ? true : false}/>
                            <label htmlFor="a" className="text-white f-12-center">
                            Always use PIN
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-4 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                        <input class="magic-radio" type="radio" name="balance" id="b" value="option" onClick={
                            (e) => {
                                this.setState({
                                    valuePinUsage: "1"
                                });
                            }
                        } checked={this.state.valuePinUsage === "1" ? true : false}/>
                            <label htmlFor="b" className="text-white f-12-center">
                            Once PIN
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center danger-text">
                            *) Only use PIN for 1st transaction each Login
                        </div>
                    </div>
                </div>
                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

               
            </div>
            <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 pl-5">
                        <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                    </div>
                </div>
            </div>
        </div>  
        );
    }
}

class TabNotification extends React.Component {
    render() {
        return (
            <div>
            <div className="col align-item-center"> 
                <div className="text-white setting align-items-center">
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                                Notification Settings
                            </div>
                        </div>
                    </div>                        
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                NOTIFICATION ON THE PLATFORM
                            </div>
                        </div>
                    </div>
        
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif1" id="notif1" value="option"/>
                                <label htmlFor="notif1" className="text-white f-12-center">
                                Notify me when my Forex/CFD position is about to close
                                </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif2" id="notif2" value="option"/>
                                <label htmlFor="notif2" className="text-white f-12-center">
                                Notify me of my new position in the rating this week
                                </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif3" id="notif3" value="option"/>
                                <label htmlFor="notif3" className="text-white f-12-center">
                                Price Alert Set
                                </label>
                        </div>
                    </div>
                </div>

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
               
                <div className="form-group row mb-0">
                    <div class="col-sm-5 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            IN-BROWSER NOTIFICATION
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif4" id="notif4" value="option"/>
                                <label htmlFor="notif4" className="text-white f-12-center">
                                Background Push Notifications
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Account Activity
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif5" id="notif5" value="option"/>
                                <label htmlFor="notif5" className="text-white f-12-center">
                                Closed trades
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Receive the resuilt of trades even while you are away
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif6" id="notif6" value="option"/>
                                <label htmlFor="notif6" className="text-white f-12-center">
                                Successful withdrawal
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;We Will let you know once the request is appoved
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif7" id="notif7" value="option"/>
                                <label htmlFor="notif7" className="text-white f-12-center">
                                Pending orders
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Receive notifications when your pending orders get executed or canceled
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif8" id="notif8" value="option"/>
                                <label htmlFor="notif8" className="text-white f-12-center">
                                Margin trading notifications
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Margin trading notifications
                        </div>
                    </div>
                </div>

            </div>
            <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 pl-5">
                        <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                    </div>
                </div>
            </div>
        </div>
        
            
        );
    }
}

const TabAppearance = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        isNight : (thememode)=> {actions.sendAction('isNight', {thememode})},
        scaleState : vars.scaleState,
        changeScale : (scaleState) => {actions.sendAction('changeScale', {scaleState})}
    }),
)(TabAppearance_Base);

export default ModalSetting;