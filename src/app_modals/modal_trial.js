import React from "react";
import {AppFrameAction} from "./../appframe";

import {ResizeResponsive} from "../app_pages/mainPage";
// import {ForgotModal} from "../app_pages/loginPage";
import marketImage from "../img/marketImage3.jpg";

import $ from "jquery";
import {Checkbox} from "semantic-ui-react";
import WminiLogo from "../img/logo_white_mini.png";
import BminiLogo from "../img/logo_black_mini.png";


class ModalTrial extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
            name: 'cs bahana',
            email: 'zaky@vsi.co.id',
            selected: 1,
            selectedMigrate: true,
        };
    }
    handleSubmit = () => {
        const templateId = 'template_PvJzOAuw';
        var variables = {from_name: this.state.name,from_email: this.state.email};
        window.emailjs.send(
            'mailjet', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!');
             this.closeClickNoAlert();
        })
        // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    componentDidMount(){
        ResizeResponsive();
    }

    closeClickNoAlert = (e) => {
        this.refs.frameAction.closeModal(100);
    }
    leaveButton = (e) =>{
        $("#reconnectxbutton").click();
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
    migrateStep2 = () => {
            if(this.state.selectedMigrate){
                this.closeClickNoAlert();
            }else{
                this.setState({selected: 7});
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
                    <div className={`col-sm-12 ${this.state.selected < 3?"bg-gradi":"bg-gradi2"} row ml-0 pr-0 `}>
                        <div className={`px-0 pt-3 col-sm-8 col-xs-8 px-3 py-4 ${this.state.selected == 1?"d-block":"d-none"}`}
                        >
                            <img src={WminiLogo} alt="DX TRADE Logo" className="logo-trial"/>

                            <div className={"mt-4"}>
                                <h3 className={"text-left pb-2 b-title"}>
                                    Selamat Datang di DX Trade
                                </h3>
                                <p className={"p-migrate"}>
                                    Untuk memulai, Anda dapat memilih satu pilihan di bawah ini:
                                </p>
                                <div className={"row"}>
                                    <div className={"text-center col-sm-9"}>
                                        <div className={"text-left"}>
                                            <Checkbox label='Ya, Aktifkan DX Trade saya' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} defaultChecked checked={(this.state.selectedMigrate)?true:false}/>
                                        </div>
                                        <div className={"text-left"}>
                                            <Checkbox label='Saya masih ingin mempelajari dengan menggunakan trial account' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} checked={(this.state.selectedMigrate)?false:true}/>
                                        </div>
                                    </div>
                                </div><br/>
                                <p className={"p-migrate"}>
                                    Untuk saat ini DX Trade hanya dapat digunakan melalui web browser dari computer Anda. Versi mobile/tablet akan hadir pada bulan September 2020.<br/><br/>

                                    Pada tanggal <b><u className={"text-white"}>24 Agustus 2020</u></b> transaksi pembelian atau penjualan saham melalui web browser akan dialihkan secara otomatis ke DX Trade.<br/><br/>

                                    Bila Anda membutuhkan bantuan untuk mengakses/menggunakan aplikasi DX Trade, Anda dapat menghubungi <b>customer service kami di 14009 | Email cs@bahana.co.id </b><br/>
                                </p>
                                <div className={"row"}>
                                    <div className={"text-left col-sm-9"}>
                                        <p className={"p-migrate"}>
                                            Semoga investasi Anda dapat lebih menguntungkan dan tidak terkendala dengan menggunakan aplikasi DX Trade yang baru.<br/><br/>

                                            Terima kasih,<br/>
                                            PT. Bahana Sekuritas<br/><br/><br/>
                                        </p>
                                    </div>
                                    <div className={"col-sm-3 text-center mt-5"}>
                                        <button className="ui icon button red go-button circular" onClick={this.migrate}><i aria-hidden="true" className="play icon"></i>
                                        </button><br/>
                                        <span className={"f-18 text-danger pointer"} onClick={this.migrate}>OK</span>
                                    </div>
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
                            </p>
                                <ul>
                                    <li>Please choose “Yes, I want DX Trade” to use DXTrade for your next transaction, or</li>
                                    <li>Please choose “I want to know more” to get your DXTrade trial account</li>
                                </ul>
                            <p className={"p-migrate"}>
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
                            <img src={WminiLogo} alt="DX TRADE Logo" className="logo-trial"/>

                            <h3 className={"text-center pb-2 b-title"}>Aktivasi DX Trade<br/>
                            Informasi Aktivasi DX Trade</h3>
                            <br/>
                            <div className={"row "}>
                                <div className={"col-sm-2"}>&nbsp;</div>
                                <div className={"col-sm-8"}>
                                    <p className={"p-migrate"}>
                                        1. Untuk transaksi saham melalui DX Trade hanya dapat diakses melalui web-based.<br/>
                                        2. Untuk saat ini Mobile Apps DX Trade belum tersedia.<br/>
                                        3. Akun DTNext G sudah tidak dapat diakses setelah aktivasi DX Trade telah berhasil.<br/>
                                        4. DX Trade dapat digunakan H+1(paling lambat 15.00 WIB) setelah Anda menyetujui permintaan Aktivasi.<br/>
                                        5. Riwayat transkasi yang dilakukan melalui DTNext G tidak dapat diakses melalui DX Trade.<br/><br/>
                                        Dengan ini, saya menyutujui untuk aktivasi DX Trade.<br/>
                                    </p>
                                    <div className={"row"}>
                                        <div className={"text-center col-sm-9"}>
                                            <div className={"text-left"}>
                                                <Checkbox label='Ya, saya setuju' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} defaultChecked checked={(this.state.selectedMigrate)?true:false}/>
                                            </div>
                                            <div className={"text-left"}>
                                                <Checkbox label='Saya masih ingin mempelajari dengan menggunakan trial account' className={"text-black"} onChange={()=>this.setState({selectedMigrate: !this.state.selectedMigrate})} checked={(this.state.selectedMigrate)?false:true}/>
                                            </div>
                                        </div>
                                    </div><br/>
                                    <div className={"text-center col-sm-12 mt-5"}>
                                        <button id="click_migrate" type="submit" onClick={this.migrateStep2}
                                                className="btn btn-primary form-control py-0 col-sm-2">
                                            <span id="text-login">Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-left ${this.state.selected == 5?"d-block":"d-none"}`}
                        >
                            <img src={WminiLogo} alt="DX TRADE Logo" className="logo-trial"/>
                            <br/>
                            <div className={"row "}>
                                <div className={"col-sm-2"}>&nbsp;</div>
                                <div className={"col-sm-8"}>

                                    <p className={"p-migrate"}>
                                        Terimakasih anda telah bersedia mengevaluasi aplikasi DXTrade saat ini, Account DXTrade anda saat ini bersifat percobaan.
                                        Silahkan pilih migrasi saat anda login untuk dapat kami aktifasikan Account anda di DXTrade..<br/>
                                    </p>
                                    <div className={"text-center col-sm-12 mt-5"}>
                                        <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                                className="btn btn-primary form-control py-0 col-sm-2">
                                            <span id="text-login">Ok</span>
                                        </button>
                                    </div>

                                </div>
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
                        <div
                            className={`px-0 pt-3 col-sm-12 px-3 py-4 text-left ${this.state.selected == 7?"d-block":"d-none"}`}
                        >
                            <img src={WminiLogo} alt="DX TRADE Logo" className="logo-trial"/>
                            <br/>

                            <h3 className={"text-center pb-2 b-title"}>Trial Account<br/>
                                Informasi Trial Account DX Trade</h3>
                            <br/>
                            <div className={"row "}>
                                <div className={"col-sm-2"}>&nbsp;</div>
                                <div className={"col-sm-8"}>
                                    <p className={"p-migrate"}>
                                        1. Trial hanya berlaku hingga 23 Agustus 2020.<br/>
                                        2. Trial Account hanya dapat diakses melalui web-based.<br/>
                                        3. Apabila anda tidak melakukan aktivasi DX Trade hingga tanggal Trial Account
                                        berakhir, maka akun DX Trade anda akan diaktifkan secara otomatis pada tanggal
                                        24 Agustus 2020.<br/>

                                    </p>
                                    <p className={"p-migrate text-center b-title"}>
                                        <b>Terima kasih telah memilih untuk mempelajari DX Trade</b>
                                    </p>
                                    <div className={"text-center col-sm-12 mt-5"}>
                                        <button id="click_migrate" type="submit" onClick={this.closeClickNoAlert}
                                                className="btn btn-primary form-control py-0 col-sm-2">
                                            <span id="text-login">Ok</span>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                </div>
            </>
        );
    }
}

export default ModalTrial;
export {ModalTrial};