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
                this.setState({selected: 4});
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
                        <div className={`px-0 pt-3 col-sm-8 px-3 py-4 ${this.state.selected == 1?"d-block":"d-none"}`}
                        >
                            <h2 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Peringatan Notifikasi </h2>
                            <br/>
                            <p className={"p-migrate"}>
                                Terimakasih anda telah bersedia kami migrasikan ke aplikasi Dxtrade.<br/>
                                Berikut ini informasi yang harus kami sampaikan :<br/><br/>

                                1. Account anda akan active mulai H + , jika pilih setuju sebelum Pukul 15.00 WIB.<br/>
                                2. Setelah Account DXTrade anda kami Active-kan, Account anda tidak dapat di pergunakan kembali di aplikasi DT NextG.<br/>
                                3. Saat ini aplikasi DXTrade hanya dapat di akses melalui browser di alamat <a href={"https://dxtrade.bahana.co.id/"} target={"_blank"}>https://dxtrade.bahana.co.id/</a> dan
                                aplikasi DXTrade belum dapat di akses oleh mobile app device.<br/>
                                4. Aplikasi DXTrade versi mobile akan tersedia pada bulan September 2020 setelah mendapatkan sertifikasi dari bursa. <br/>
                            </p>
                            <p className={"p-migrate"}>
                                Apakah anda yakin untuk Migrasi
                            </p>
                            <div className={"row"}>
                                <div className={"text-center col-sm-9"}>
                                    <div className={"text-left"}>
                                        <Checkbox label='Ya' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} defaultChecked checked={(this.state.selectedMigrate)?true:false}/>
                                    </div>
                                    <div className={"text-left"}>
                                        <Checkbox label='Tidak' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} checked={(this.state.selectedMigrate)?false:true}/>
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
                            className={`px-0 pt-3 col-sm-8 px-3 py-4 ${this.state.selected == 2?"d-block":"d-none"}`}
                        >
                            <h2 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Notification Alert</h2>
                            <br/>
                            <p className={"p-migrate"}>
                                Thank you for being willing to migrate to the Dxtrade application.<br/>
                                Here is the information that we have to submit:<br/><br/>
                                1. Your account will be active starting H +, if you choose agree before 15.00 WIB.<br/>
                                2. After you activate your DXTrade account, your account cannot be reused in the DT NextG application.<br/>
                                3. At present the DXTrade application can only be accessed through a browser at the address <a href={"https://dxtrade.bahana.co.id/"} target={"_blank"}>https://dxtrade.bahana.co.id/</a> <br/>
                                and the DXTrade application cannot be accessed by a mobile app device.<br/>
                                4. The mobile version of the DXTrade application will be available in September 2020 after obtaining certification from the Market exchange<br/>
                            </p>
                            <p className={"p-migrate"}>
                                Are u sure about migration?
                            </p>
                            <div className={"row"}>
                                <div className={"text-center col-sm-9"}>
                                    <div className={"text-left"}>
                                        <Checkbox label='Yes' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} defaultChecked checked={(this.state.selectedMigrate)?true:false}/>
                                    </div>
                                    <div className={"text-left"}>
                                        <Checkbox label='No' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} checked={(this.state.selectedMigrate)?false:true}/>
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