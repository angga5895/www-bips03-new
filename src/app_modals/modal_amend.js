import React from "react";
import {AppFrameAction} from "./../appframe";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import FormAmend from "../app_transaction/form_amend";
import FormSell from "../app_transaction/form_sell";
import {ResizeResponsive} from "../app_pages/mainPage";

class ModalAmend extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row card-520">
                        <div className="col-sm-6 px-2 mt-0 card-520 d-border">
                            <TableInfoTransaction lotshare="modalamend" />
                        </div>
                        <div className="col-sm-6 mt-0 d-border-active bg-amend card-520 d-border">
                            <FormAmend idPrice="modalAmendPrice" idVol="modalAmendVol" idValue="modalAmendValue" columnSm="col-sm-11"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default ModalAmend;