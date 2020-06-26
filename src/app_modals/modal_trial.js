import React from "react";
import {AppFrameAction} from "./../appframe";

import {ResizeResponsive} from "../app_pages/mainPage";
// import {ForgotModal} from "../app_pages/loginPage";

import $ from "jquery";


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
    }
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="f-12">
                    <div>
                        <div className={`col-sm-6 pb-3 text-white ${this.state.selected < 3?"d-block":"d-none"}`}>
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
                        <div
                            className={`px-0 pt-3 col-sm-8 px-3 py-4 ${this.state.selected == 1?"d-block":"d-none"}`}
                        >
                            <h2 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Selamat Datang di DXTRADE</h2>
                            <br/>
                            <p className={"p-migrate"}>
                                Nasabah yang terhormat terimakasih atas kepercayaan anda menggunakan Trading bersama DT nextG.
                                Kami informasikan bahwa aplikasi DT NextG akan segera kami ganti dengan aplikasi baru yaitu DxTrade.<br/>
                                Saat ini DxTrade hanya dapat diakses melalui web browser. Versi lain dari aplikasi ini
                                akan segera tersedia pada bulan September 2020.
                            </p>
                            <p className={"p-migrate"}>
                                Anda dapat mempergunakan User DT NextG anda di aplikasi DxTrade.
                                Jika anda berkenan untuk kami migrasikan dari DT NextG ke DxTrade saat ini,
                                silahkan pilih "Setuju Migrasi" atau "Masih ingin mencoba" bila belum anda tidak dapat
                                lagi mengakses DT NextG, bilamana sudah dimigrasikan.<br/>
                            </p>
                            <p className={"p-migrate"}>
                                Seluruh nasabah DT NextG yang masih menggunakan aplikasi DT NextG akan kami migrasikan ke aplikasi DxTrade pada akhir agustus 2020.
                                <br/><br/>
                                Terimakasih.
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button onClick={()=>this.setState({selected:4})} id="click_migrate" type="submit"
                                        className="btn btn-primary form-control py-0 col-sm-3">
                                    <span id={"text-login"}>Migrasikan Saya</span>
                                </button>
                                <br/><br/>
                                <u className={"click-pointer"} onClick={this.closeClickNoAlert}>Mungkin nanti</u>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-8 px-3 py-4 ${this.state.selected == 2?"d-block":"d-none"}`}
                        >
                            <h2 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Welcome to DX TRADE</h2>
                            <br/>
                            <p className={"p-migrate"}>
                                Dear Customers, thank you for your trust using trading with DT NextG.<br/>
                                We inform you that the DT NextG application will be replaced soon with newest application called DXTrade.
                                Currently DXTRADE can only accessed via web browser and for mobile application version would be available in September 2020.
                            </p>
                            <p className={"p-migrate"}>
                                You can use your DT NextG account in DXTrade Application.
                                If you wish to migrate from DT NextG to DXTRADE, please select "Agree to migrate".
                                If you wish to continue exploring please select "Still want to try".
                                You can not longer access DT NextG, if it has been migrated.<br/>
                            </p>
                            <p className={"p-migrate"}>
                                All DT NextG customers who still use DT NextG application will be migrated to DXTRADE applcation at the end of August 2020.
                                <br/><br/>
                                Thank you.
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button onClick={()=>this.setState({selected:3})} id="click_migrate" type="submit"
                                        className="btn btn-primary form-control py-0 col-sm-3">
                                    <span id="text-login" >Migrate Me</span>
                                </button>
                                <br/><br/>
                                <u className={"click-pointer"} onClick={this.closeClickNoAlert}>Maybe Later</u>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 ${this.state.selected == 3?"d-block":"d-none"}`}
                        >
                            <h2 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>THANK YOU</h2>
                            <br/>
                            <p className={"p-migrate"}>
                                Thank you for being willing to migrate to the Dxtrade application.<br/>
                                Your account will be active starting H +, if you choose agree before 15.00 WIB.
                                After you activate your DXTrade account, your account cannot be reused in the DT NextG
                                application.
                            </p>
                            <p className={"p-migrate"}>
                                The mobile version of the DXTrade application will be available in September 2020 after
                                obtaining certification from the exchange.
                            </p>
                            <p className={"p-migrate"}>
                                At present the DXTrade application can only be accessed through a browser at the address
                                &quot;https://dxtrade.bahana.co.id/&quot; and the DXTrade application cannot be accessed by a
                                mobile app device.<br/>
                            </p>
                            <p className={"p-migrate"}>
                                The mobile version of the DXTrade application will be available in September 2020 after
                                obtaining certification from the exchange.
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-3">
                                    <span id="text-login">OK</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 ${this.state.selected == 4?"d-block":"d-none"}`}
                        >
                            <h2 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Terimakasih</h2>
                            <br/>
                            <p className={"p-migrate"}>
                                Terimakasih anda telah bersedia kami migrasikan ke aplikasi Dxtrade.
                                <br/>
                                Saat ini DxTrade hanya dapat diakses melalui web browser. Versi lain dari aplikasi ini
                                akan segera tersedia pada bulan September 2020.
                                Berikut ini informasi yang harus kami sampaikan :
                                Account anda akan active mulai H + , jika pilih setuju sebelum Pukul 15.00 WIB.
                                Setelah Account DXTrade anda kami Active-kan, Account anda tidak dapat di pergunakan
                                kembali di aplikasi DT NextG.
                            </p>
                            <p className={"p-migrate"}>
                                Saat ini aplikasi DXTrade hanya dapat di akses melalui browser di alamat &quot;
                                https://dxtrade.bahana.co.id/ &quot; dan aplikasi DXTrade belum dapat di akses oleh mobile app
                                device.
                            </p>
                            <p className={"p-migrate"}>
                                Aplikasi DXTrade versi mobile akan tersedia pada bulan September 2020 setelah
                                mendapatkan sertifikasi dari bursa.
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-3">
                                    <span id="text-login">OK</span>
                                </button>
                            </div>
                        </div>


                        <div className={`col-sm-4 ${this.state.selected < 3? "d-block":"d-none"} bg-grey` }>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default ModalTrial;
export {ModalTrial};