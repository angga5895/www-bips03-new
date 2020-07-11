import React from "react";
import {AppFrameAction} from "./../appframe";

import {ResizeResponsive} from "../app_pages/mainPage";
// import {ForgotModal} from "../app_pages/loginPage";
import marketImage from "../img/marketImage3.jpg";

import $ from "jquery";
import {Checkbox} from "semantic-ui-react";


class ModalLogout extends React.Component{
    componentDidMount(){
        ResizeResponsive();
    }
    closeClickNoAlert = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                    <div className={"col-sm-12 row ml-0 px-0"}>
                        <div className={`px-0 pt-3 col-sm-12 col-xs-8 px-3 py-4`}
                        >
                            <h3 className={"text-center pb-2 b-title"}>Are you sure exiting DX TRADE application?</h3>
                            <br/>
                                <div className={"text-center col-sm-12"}>
                                     <button id="clickExit" type="submit" onClick={()=>window.location.reload()}
                                       className="btn btn-primary form-control py-0 col-sm-3">
                                      <span id="text-login">Yes</span>
                                      </button>&nbsp;&nbsp;
                                       <button id="clickCancel" type="submit" onClick={this.closeClickNoAlert}
                                       className="btn btn-danger form-control py-0 col-sm-3">
                                       <span id="text-login">No</span>
                                      </button>
                                </div>
                            </div>
                </div>
            </>
        );
    }
}

export default ModalLogout;
export {ModalLogout};