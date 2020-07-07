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
            if(this.state.selected == 1){
                this.setState({selected: 5});
            }else{
                this.setState({selected: 6});
            }
            // this.refs.frameAction.closeModal(100);
        }
    }
    closeClickToTrial = (e) => {
        if(this.state.selected == 4){
            this.setState({selected: 5});
        }else{
            this.setState({selected: 6});
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
                                Sebagai bentuk komitmen kami untuk meningkatkan kenyamanan Anda bertransaksi,
                                kami informasikan bahwa saat ini kami telah melakukan pembaharuan terhadap sistem <i>online trading</i>
                                yang kami miliki dengan mengganti aplikasi DT Next G dengan aplikasi DX Trade.<br/>
                                Untuk tahap awal aplikasi DX Trade hanya dapat diakses melalui <i>web browser</i> dari komputer Anda.
                                Untuk <i>Platform mobile</i> dan <i>tablet</i>, akan segera tersedia pada bulan September 2020.<br/><br/>

                                Saat ini Anda sudah dapat menggunakan DX Trade dengan menggunakan User ID lama yang Anda miliki.<br/>
                            <ul>
                                <li>Silahkan pilih “Ya, Saya bersedia.” untuk menggunakan DX Trade pada transaksi Anda selanjutnya, atau</li>
                                <li>Silahkan pilih “Pelajari DXTrade” untuk melakukan  trial terlebih dahulu <i>online trading</i></li>
                            </ul><br/>
                                Sebagai informasi, kami akan melakukan migrasi secara bertahap mulai bulan Agustus terhadap akun-akun yang
                                masih menggunakan <i>system online trading</i> Kami yang lama, dan melakukan penghentian operasi
                                aplikasi online trading yang lama secara keseluruhan pada tanggal 1 Oktober 2020.<br/>
                                Besar harapan kami untuk Anda dapat menjadi nasabah kami yang lebih dulu dapat memakai aplikasi DX Trade
                                untuk transaksi Anda.
                                Semoga investasi Anda dapat lebih menguntungkan dan tidak terkendala dengan menggunakan aplikasi DX Trade yang baru.
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
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Notification Alert</h3>
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
                            All DT NextG customers who still use DT NextG application will be migrated to DXTRADE applcation at the end of August 2020.
                            <br/><br/>
                            Thank you.
                            Are u sure about migration?
                        </p>
                        <div className={"text-center col-sm-12"}>
                            <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                    className="btn btn-primary form-control py-0 col-sm-2">
                                <span id="text-login">Yes</span>
                            </button>&nbsp;&nbsp;
                            <button id="click_migrate" type="submit" onClick={this.closeClickToTrial}
                                    className="btn btn-danger form-control py-0 col-sm-2">
                                <span id="text-login">No</span>
                            </button>
                        </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-left ${this.state.selected == 4?"d-block":"d-none"}`}
                        >
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Peringatan Notifikasi</h3>
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
                                Terimakasih anda telah bersedia kami migrasikan ke aplikasi Dxtrade.<br/>
                                Berikut ini informasi yang harus kami sampaikan :<br/><br/>

                                1. Account anda akan active mulai H + , jika pilih setuju sebelum Pukul 15.00 WIB.<br/>
                                2. Setelah Account DXTrade anda kami Active-kan, Account anda tidak dapat di pergunakan kembali di aplikasi DT NextG.<br/>
                                3. Saat ini aplikasi DXTrade hanya dapat di akses melalui browser di alamat <a href={"https://dxtrade.bahana.co.id/"} target={"_blank"}>https://dxtrade.bahana.co.id/</a> dan
                                aplikasi DXTrade belum dapat di akses oleh mobile app device.<br/>
                                4. Aplikasi DXTrade versi mobile akan tersedia pada bulan September 2020 setelah mendapatkan sertifikasi dari bursa. <br/>
                            </p>
                            <p className={"p-migrate"}>
                                Seluruh nasabah DT NextG yang masih menggunakan aplikasi DT NextG akan kami migrasikan ke aplikasi DxTrade pada akhir agustus 2020.
                                <br/>
                                Terimakasih.<br/>
                            </p>
                            <p className={"p-migrate text-center"}>
                                Apakah anda yakin untuk Migrasi
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-2">
                                    <span id="text-login">Ya</span>
                                </button>&nbsp;&nbsp;
                                <button id="click_migrate" type="submit" onClick={this.closeClickToTrial}
                                        className="btn btn-danger form-control py-0 col-sm-2">
                                    <span id="text-login">Tidak</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-left ${this.state.selected == 5?"d-block":"d-none"}`}
                        >
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Peringatan Notifikasi</h3>
                            <br/>
                            <p className={"p-migrate"}>
                                Terimakasih anda telah bersedia mengevaluasi aplikasi DXTrade saat ini, Account DXTrade anda saat ini bersifat percobaan.
                                Silahkan pilih migrasi saat anda login untuk dapat kami aktifasikan Account anda di DXTrade..<br/>
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-2">
                                    <span id="text-login">Ya</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-left ${this.state.selected == 6?"d-block":"d-none"}`}
                        >
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Notification Alert</h3>
                            <br/>
                            <p className={"p-migrate"}>
                              Thank you for evaluating your current DXTrade Application, your current DXTrade account is a trial.<br/>
                                Please select a migration when you login to be able to activate your account on DXTrade.
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-2">
                                    <span id="text-login">Yes</span>
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