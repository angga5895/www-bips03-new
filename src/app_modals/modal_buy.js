import React from "react";
import {AppFrameAction} from "./../appframe";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import FormBuy from "./../app_transaction/form_buy";
import {ResizeResponsive} from './../app_pages/mainPage';

class ModalBuy extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row card-520">
                        <div className="col-sm-6 px-2 mt-0 card-520 d-border bg-blackgrey">
                            <TableInfoTransaction lotshare="modalbuy" />
                        </div>
                        <div className="col-sm-6 mt-0 d-border-active bg-buy card-520 d-border">
                            <FormBuy idPrice="modalBuyPrice" idVol="modalBuyVol" idValue="modalBuyValue" columnSm="col-sm-11" />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ModalBuy;