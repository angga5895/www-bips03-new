import React from "react";
import {AppFrameAction} from "./../appframe";

import {ResizeResponsive} from "../app_pages/mainPage";
// import {ForgotModal} from "../app_pages/loginPage";
import marketImage from "../img/marketImage3.jpg";

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
                        {/*<div className={`col-sm-6 pb-2 ${this.state.selected < 3?"d-block":"d-none"}`}>*/}
                            {/*<div*/}
                                {/*className={`px-0 pt-1*/}
                                                  {/*${this.state.selected == 1?"livetradeMenuActive":"livetradeMenu"}`}*/}
                                {/*onClick={()=>this.setState({selected:1})}*/}
                                {/*style={{display: "inline-block"}}*/}
                            {/*>*/}
                                {/*<i className={this.state.selected == 1 ? "far fa-dot-circle" : "far fa-circle"}></i>*/}
                                {/*&nbsp;*/}
                                {/*Bahasa Indonesia*/}
                            {/*</div>*/}
                            {/*<div*/}
                                {/*className={`px-0 pt-1 pl-5*/}
                                                   {/*${this.state.selected == 2?"livetradeMenuActive":"livetradeMenu"}`}*/}
                                {/*onClick={()=>this.setState({selected:2})}*/}
                                {/*style={{display: "inline-block"}}*/}
                            {/*>*/}
                                {/*<i className={this.state.selected == 2 ? "far fa-dot-circle" : "far fa-circle"}></i>*/}
                                {/*&nbsp;*/}
                                {/*English*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"col-sm-12 bg-gradi row ml-0 pr-0"}>
                        <div className={`px-0 pt-3 col-sm-8 col-xs-8 px-3 py-4 ${this.state.selected == 1?"d-block":"d-none"}`}
                        >
                            <h3 className={"text-center d-border-bottom-bold-migrate pb-2 b-title"}>Selamat Datang di DX Trade </h3>
                            <br/>
                            <p className={"p-migrate"}>
                                Terima kasih atas kepercayaan Anda untuk senantiasa bertransaksi melalui Online Trading Bahana Sekuritas.
                                Saat ini Anda tengah mengakses aplikasi online trading kami yang baru, DXTrade.
                                <br/><br/>

                                Sebagai bentuk komitmen kami untuk terus meningkatkan kenyamanan Anda bertransaki saham,
                                kami hadirkan aplikasi online trading DXTrade sebagai pengganti apliasi online trading DT NextG
                                yang akan berakhir masa operasi nya pada tanggal <b><i>1 Oktober 2020</i></b><br/>

                                Untuk itu kami mengundang Anda untuk  mengenal dan mencoba aplikasi DXTrade<br/><br/>

                                Untuk tahap awal aplikasi DX Trade hanya dapat diakses melalui web browser dari komputer Anda.
                                Selanjutnya, kami akan menghadirkan DXTrade dalam bentuk aplikasi mobile/tablet pada pertengahan bulan September 2020.<br/>
                                Silahkan Anda login dengan menggunakan user id anda saat ini dan password baru yang sudah kami kirimkan lewat email<br/><br/>

                                Bila Anda bersedia beralih menggunakan aplikasi DXTrade sekarang dan selanjutnya, silahkan pilih <b>“Ya, Saya bersedia.”</b><br/>

                                Namun bila Anda masih ingin mencoba nya lebih lanjut, Silahkan pilih <b>“Mencoba DXTrade”</b><br/>

                                Kami informasikan juga bahwa bagi nasabah yang masih belum beralih ke aplikasi DXTrade,
                                akan kami pindahkan secara otomatis ke aplikasi DXTrade selambat-lambatnya <b>30 September 2020</b>.<br/><br/>

                                Besar harapan kami untuk Anda dapat mencoba dan segera beralih ke aplikasi DXTrade<br/>

                                Bila Anda membutuhkan bantuan untuk mengakses / menggunakan aplikasi DXTrade,
                                dapat menghubungi  customer service kami di 14009 | Email cs@bahana.co.id.<br/><br/>

                                Semoga investasi Anda dapat lebih menguntungkan dan tidak terkendala dengan menggunakan aplikasi DX Trade yang baru.<br/><br/>

                                Terima kasih,<br/>
                                PT. Bahana Sekuritas<br/>
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
                            className={`px-0 pt-3 col-sm-8 col-xs-8 px-3 py-4 ${this.state.selected == 2?"d-block":"d-none"}`}
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
                        <div className={`col-sm-4 pr-0 ${(this.state.selected    < 3) ? "d-block":"d-none"}`}>
                            <img src={marketImage} alt="" className={"imgMarketStream"}/>
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
                                Terima kasih atas kesediaan Anda untuk beralih ke aplikasi DXTrade.<br/>
                            </p>
                            <p className={"p-migrate"}>
                                Berikut ini informasi yang harus kami sampaikan :<br/><br/>

                                1. Akun DXTrade Anda akan kami aktivasi sehari setelah konfirmasi anda bila konfirmasi kami terima sebelum Pukul 15.00 WIB.<br/>
                                2. Setelah akun DXTrade anda kami aktifkan, anda tidak akan dapat mengakses kembali di aplikasi DT NextG dengan akun lama Anda.<br/>
                                3. Saat ini aplikasi DXTrade hanya dapat di akses melalui browser di alamat dari komputer Anda .<br/>
                                4. Aplikasi DXTrade versi mobile akan tersedia pada pertengahan bulan September 2020 setelah mendapatkan sertifikasi dari bursa.<br/>
                            </p>
                            <p className={"p-migrate"}>
                                Seluruh nasabah DT NextG yang masih menggunakan aplikasi DT NextG akan kami alihkan secara otomatis selambat-lambatnya 30 September 2020.<br/>
                                Terimakasih.<br/>
                            </p>
                            <p className={"p-migrate text-center"}>
                                Apakah anda yakin untuk beralih ke DXTrade
                            </p>
                            <div className={"text-center col-sm-12"}>
                                <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                        className="btn btn-primary form-control py-0 col-sm-1">
                                    <span id="text-login">Ya</span>
                                </button>&nbsp;&nbsp;
                                <button id="click_migrate" type="submit" onClick={this.closeClickToTrial}
                                        className="btn btn-danger form-control py-0 col-sm-1">
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