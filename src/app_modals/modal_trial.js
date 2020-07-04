import React from "react";
import {AppFrameAction} from "./../appframe";

import {ResizeResponsive} from "../app_pages/mainPage";
// import {ForgotModal} from "../app_pages/loginPage";

import $ from "jquery";
import {Checkbox} from "semantic-ui-react";


class ModalTrial extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }
    closeClickNoAlert = (e) => {
        this.refs.frameAction.closeModal(100);
    }
    leaveButton = (e) =>{
        $("#reconnectxbutton").click();
    }
    state = {
        selected: 1,
        selectedMigrate: true,
    }
    migrate = () => {
        if(this.state.selectedMigrate){
            if(this.state.selected == 1){
                this.setState({selected: 4});
            }else{
                this.setState({selected: 3});
            }
        }else{
            this.refs.frameAction.closeModal(100);
        }
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="f-12">
                        <div className={`col-sm-6 pb-3 ${this.state.selected < 3?"d-block":"d-none"}`}>
                            <div
                                className={`px-0 pt-3
                                                  ${this.state.selected == 1?"livetradeMenuActive":"livetradeMenu"}`}
                                onClick={()=>this.setState({selected:1})}
                                style={{display: "inline-block"}}
                            >
                                <i className={this.state.selected == 1 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                &nbsp;
                                Bahasa Indonesia
                            </div>
                            <div
                                className={`px-0 pt-3 pl-5
                                                   ${this.state.selected == 2?"livetradeMenuActive":"livetradeMenu"}`}
                                onClick={()=>this.setState({selected:2})}
                                style={{display: "inline-block"}}
                            >
                                <i className={this.state.selected == 2 ? "far fa-dot-circle" : "far fa-circle"}></i>
                                &nbsp;
                                English
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-12 bg-gradi row ml-0 pr-0"}>
                        <div className={`px-0 pt-3 col-sm-12 col-xs-12 px-3 py-4 ${this.state.selected == 1?"d-block":"d-none"}`}
                        >
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Selamat Datang di DX Trade </h3>
                            <br/>
                            <p className={"p-migrate"}>
                                Terima kasih atas kepercayaan Anda untuk senantiasa menggunakan Online Trading Bahana Sekuritas.<br/><br/>
                                Sebagai bentuk komitmen kami untuk meningkatkan kenyamanan Anda,
                                maka dengan kami informasikan bahwa kami telah melakukan pembaharuan sistem <i>online trading</i> kami
                                menjadi DX Trade. Saat ini DX Trade hanya dapat digunakan melalui <i>web browser</i>.
                                Platform DX Trade di <i>platform</i> lainnya akan segera tersedia pada bulan September 2020.<br/><br/>

                                Anda sudah dapat menggunakan DX Trade dengan menggunakan User ID yang Anda miliki.<br/>
                            <ul>
                                <li>Silahkan pilih “Ya, Saya bersedia.” untuk menggunakan DX Trade untuk transaksi Anda selanjutnya, atau</li>
                                <li>Silahkan pilih “Pelajari DXTrade” untuk mendapatkan akun trial <i>online trading</i></li>
                            </ul>
                                Pada akhir Agustus 2020, DXTrade akan menjadi <i>Official Online Trading</i> PT. Bahana Sekuritas dan akan sepenuhnya menggantikan DTNextG.
                                <br/><br/>
                                Terima kasih,<br/>
                                PT. Bahana Sekuritas<br/><br/>
                            </p>
                            <p className={"p-migrate"}>
                                Apakah anda yakin untuk Migrasi
                            </p>
                            <div className={"row"}>
                                <div className={"text-center col-sm-9"}>
                                    <div className={"text-left"}>
                                        <Checkbox label='Ya, Saya bersedia' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} defaultChecked checked={(this.state.selectedMigrate)?true:false}/>
                                    </div>
                                    <div className={"text-left"}>
                                        <Checkbox label='Pelajari DXTrade' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} checked={(this.state.selectedMigrate)?false:true}/>
                                    </div>
                                </div>
                                <div className={"col-sm-3 text-center"}>
                                    <button className="ui icon button red go-button circular" onClick={this.migrate}><i aria-hidden="true" className="play icon"></i>
                                    </button><br/>
                                    <span className={"f-18 text-danger pointer"} onClick={this.migrate}>OK</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 col-xs-12 px-3 py-4 ${this.state.selected == 2?"d-block":"d-none"}`}
                        >
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Welcome to DX Trade</h3>
                            <br/>
                            <p className={"p-migrate"}>
                                Thank you for your trust to continuously use online trading Bahana Sekuritas.<br/><br/>
                                As a form of our commitment to enhance your conveniences,
                                hereby we inform that we have reform our online trading platform to DXTrade.
                                At this mean time, DXTrade only accessible on web browser version.
                                Other version of DXTrade will be available on September 2020.<br/><br/>

                                Now, you can access DXTrade by using your current User ID for online trading.<br/>
                                <ul>
                                    <li>Please choose “Yes, I want DX Trade” to use DXTrade for your next transaction, or</li>
                                    <li>Please choose “I want to know more” to get your DXTrade trial account</li>
                                </ul>
                                By the end of August 2020, DXTrade will officially replacing DTNextG as PT. Bahana Sekuritas online trading.
                                <br/><br/>
                                Thank you,<br/>
                                PT. Bahana Sekuritas<br/><br/>
                            </p>
                            <p className={"p-migrate"}>
                                Are you sure to migrate?
                            </p>
                            <div className={"row"}>
                                <div className={"text-center col-sm-9"}>
                                    <div className={"text-left"}>
                                        <Checkbox label='Yes, I want DX Trade' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} defaultChecked checked={(this.state.selectedMigrate)?true:false}/>
                                    </div>
                                    <div className={"text-left"}>
                                        <Checkbox label='I want to know more' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} checked={(this.state.selectedMigrate)?false:true}/>
                                    </div>
                                </div>
                                <div className={"col-sm-3 text-center"}>
                                    <button className="ui icon button red go-button circular" onClick={this.migrate}><i aria-hidden="true" className="play icon"></i>
                                    </button><br/>
                                    <span className={"f-18 text-danger pointer"} onClick={this.migrate}>OK</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-center ${this.state.selected == 3?"d-block":"d-none"}`}
                        >
                            <p className={"p-migrate"}>
                                Thank you for evaluating your current DXTrade application, your current DXTrade account is a trial.<br/>
                                Please select a migration when you login to be able to activate your account on DXTrade.<br/>
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-3">
                                    <span id="text-login">OK</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-center ${this.state.selected == 4?"d-block":"d-none"}`}
                        >
                            <br/>
                            <p className={"p-migrate"}>
                                Terimakasih anda telah bersedia kami migrasikan ke aplikasi Dxtrade.
                                <br/>
                                Saat ini account DXTrade anda bersifat percobaan.<br/>
                                Silahkan pilih migrasi saat anda login untuk dapat kami aktifasikan account anda ke DXTrade anda.
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-3">
                                    <span id="text-login">OK</span>
                                </button>
                            </div>
                        </div>
                </div>
            </>
        );
    }
}

export default ModalTrial;
export {ModalTrial};