import React from "react";
import { AppFrameAction } from "./../appframe";
import { ContextConnector } from '../appcontext.js';
import { BIPSAppContext } from "../AppData";

import SweetAlert from "react-bootstrap-sweetalert";

// modalAlert without confirm button
class ModalAlertN_Base extends React.Component{    
    render(){
        return(
            <>   
                <AppFrameAction ref="frameAction" />
                <SweetAlert
                    show={this.props.statusAlertN}
                    title={<span className="text-white">Info</span>}
                    text="SweetAlert in React"
                    showCancelButton
                    info
                    style={{'color':'var(--text-white)',}}
                    confirmBtnCssClass={"btn btn-sm btn-popup bg-gray-tradding border-gray-tradding"}
                    customClass={"bg-dark-grey"}
                    onConfirm={() => this.props.handleStatusAlert3('noConfirm',this.props.statusAlertN)}
                    onCancel={() => this.props.handleStatusAlert3('noConfirm',this.props.statusAlertN)}                        
                    onEscapeKey={() => this.props.handleStatusAlert3('noConfirm',this.props.statusAlertN)}
                    onOutsideClick={() => this.props.handleStatusAlert3('noConfirm',this.props.statusAlertN)}>
                    <span className={"text-white"}>{this.props.msgAlert3}</span>
                </SweetAlert>
            </>
        );
    }

}

// modalAlert with confirm button
class ModalAlertC_Base extends React.Component{    
    render(){
        let data = this.props.ieudata
        // console.log('dataM', data)
        // myWatclist#confirmSave#yes
        if(data !== undefined){
            let dataM = data.split('#')
            
            return(
                <>   
                    <AppFrameAction ref="frameAction" />
                    <SweetAlert
                        show={this.props.statusAlertC}
                        warning
                        title={<span className={`text-white ${dataM[1] === 'confirmSave'? 'f-16' : ''}`}>{dataM[1] === 'confirmSave' ?'Save changes before quiting? dari App/modal_alert' : this.props.msgAlert3 }</span>}
                        style={{'color':'var(--text-white)',}}
                        customClass={"bg-dark-grey"}                        
                        customButtons={
                            <React.Fragment>
                                <button className={"btn btn-sa btn-trans btn-sm btn-popup"}
                                        onClick={() => this.props.handleStatusAlert3('confirm',this.props.statusAlertC,"noSave")}
                                        >
                                    Cancel
                                </button>                                
                                {dataM[1] === 'confirmSave' ?
                                    <>&nbsp;
                                        <button className={"btn btn-sa btn-sm btn-popup btn-danger border-gray-tradding"}
                                                onClick={() => this.props.handleStatusAlert3('confirm',this.props.statusAlertC,"noSave")}
                                                >
                                            &nbsp;&nbsp;No&nbsp;&nbsp;
                                        </button>
                                        &nbsp;
                                        <button id="save" autoFocus={true} autofocus className={"btn btn-sa btn-sm btn-popup btn-info border-gray-tradding"}
                                                onClick={() => this.props.handleStatusAlert3('confirm',this.props.statusAlertC,"noSave")}
                                                >
                                            &nbsp;&nbsp;Yes&nbsp;&nbsp;
                                        </button>
                                    </>
                                    : <>&nbsp;
                                        <button autoFocus={true} autofocus className={"btn btn-sa btn-sm btn-popup btn-danger border-gray-tradding"}
                                                onClick={() => this.props.handleStatusAlert3('confirm',this.props.statusAlertC,"noSave")}
                                                >
                                            &nbsp;&nbsp;Yes, delete it!&nbsp;&nbsp;
                                        </button>
                                    </>
                                }
                            </React.Fragment>
                        }
                        >
                        {dataM[1] === 'confirmSave' ? '' :
                            <span className={"text-white"}>
                                You will not be able to undo this action!
                            </span>
                        }
                    </SweetAlert>
                </>
            );
        }else{return''}
    }
}

//************************** Context Connector **************************

const ModalAlertN = ContextConnector(BIPSAppContext,
    (vars, actions)=>({
        msgAlert3:vars.msgAlert3,
        statusAlertN:vars.statusAlertN,
        handleStatusAlert3:(type,statusAlert,msg, data)=>actions.sendAction('handleStatusAlert3',{type,statusAlert,msg, data}),
    }),
    ['handleStatusAlert3', ]
)(ModalAlertN_Base)

const ModalAlertC = ContextConnector(BIPSAppContext,
    (vars, actions)=>({      
        statusAlertC:vars.statusAlertC,
        msgAlert3:vars.msgAlert3,
        ieudata:vars.ieudata,
        handleStatusAlert3:(type,statusAlert,msg, data)=>actions.sendAction('handleStatusAlert3',{type,statusAlert,msg, data}),
        // handleOnClick:(pageType, type, data)=>actions.sendAction('handleOnClick',{pageType, type, data}),
    }),
    ['handleStatusAlert3', 'handleOnClick', ]
)(ModalAlertC_Base)

export default ModalAlertN;
export {ModalAlertC};