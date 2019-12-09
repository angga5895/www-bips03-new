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

import { Input } from 'semantic-ui-react'
import $ from 'jquery';

window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');


class CustomFrameHeaderChatSupportPage_Base extends React.PureComponent{
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
                        <FillHeaderTab treeName="/chatsupportPage" linkTitles={
                            {
                                ChatUserPage: 'Chat User',
                                ChatSuppPage: 'Chat Support',
                                ChatCommentPage: 'Chat DXBot',
                            }
                        }/>
                    </div>
                </div>
                <AppFrame treeName="/chatsupportPage" headerComponent={ChatSuppportPageFrameHeader}/>
                <AppModal/>
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

//PARENT CHAT SUPP PAGE
class ChatSuppPage extends React.Component {
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
                    <ChatListSupport parentToggle={this.changeActiveId}/>
                </div>
                <div className="col-sm-8 px-1 mx-0">
                    {switchChat()}
                </div>
            </div>
        )
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
const ChatSuppportPageFrameHeader = (props) => {
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

class ChatSupportPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <ChatSupport/>
        )
    }
}

class ChatSupport extends React.PureComponent {
    render () {

        return (
            //hanya memanggil headernya saja
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

const CustomFrameHeaderChatSupportPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(CustomFrameHeaderChatSupportPage_Base);

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


export default ChatSupportPage;
export {CustomFrameHeaderChatSupportPage, ChatSupport,
    ChatUserPage, ChatSuppPage, ChatCommentPage
};
