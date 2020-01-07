import React from "react";
import {AppFrameAction} from "./../appframe";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import FormSell from "./../app_transaction/form_sell";
import FormBuy from "../app_transaction/form_buy";
import {ResizeResponsive} from "../app_pages/mainPage";

class ModalSell extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row card-520">
                        <div className="col-sm-6 pr-3 pl-0 mt-0 card-520">
                            <TableInfoTransaction lotshare="modalSell" />
                        </div>
                        <div className="col-sm-6 mt-0 d-border-active bg-sell card-520">
                            <FormSell idPrice="modalSellPrice" idVol="modalSellVol" idValue="modalSellValue" columnSm="col-sm-11"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ModalSell;