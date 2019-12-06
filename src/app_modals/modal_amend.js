import React from "react";
import {AppFrameAction} from "./../appframe";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import FormAmend from "../app_transaction/form_amend";
import FormSell from "../app_transaction/form_sell";

class ModalAmend extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row">
                        <div className="col-sm-6 pr-3 pl-0 mt-4">
                            <TableInfoTransaction lotshare="modalamend" />
                        </div>
                        <div className="col-sm-6 mt-4 d-border-active">
                            <FormAmend idPrice="modalAmendPrice" idVol="modalAmendVol" idValue="modalAmendValue" columnSm="col-sm-11"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default ModalAmend;