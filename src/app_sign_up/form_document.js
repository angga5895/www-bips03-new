import React from "react";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import {AppFrameAction} from "../appframe";
// import ID from ".././img/img-sign_up/ID.png";
// import Bank from ".././img/img-sign_up/bank.png";

//datepicker
import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';

class FormDocument extends React.PureComponent{
    constructor(props) {
        super(props);
    }
    state = {
        IDImage:"",
        BankImage: ""
    }
    onChangeBrowserBank = (e) => {
        var uploadFile = document.getElementById("uploadBtnBank").value;
        document.getElementById("uploadFileBank").value = uploadFile;
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                BankImage: reader.result
            });
        }

        reader.readAsDataURL(file)
        // this.setState({IDImage:uploadFile});
    }
    onChangeBrowserID = (e) => {
        var uploadFile = document.getElementById("uploadBtnID").value;
        document.getElementById("uploadFileID").value = uploadFile;

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                IDImage: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    render(){

        const IDImg = "img-sign_up/ID.png";
        const BankImg = "img-sign_up/bank.png";
        // console.log(window.location.href);

        const srcIDImage = (this.state.IDImage)?this.state.IDImage:require("./../img/"+IDImg)
        const srcBankImage = (this.state.BankImage)?this.state.BankImage:require("./../img/"+BankImg)

        return(
            <div className="f-12">
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-3">ID Card</div>
                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 pl-5">
                        <div className="ui small input">
                            <input id="uploadFileID" placeholder="Choose File..." disabled="disabled" />
                        </div>
                        <div className="fileUpload btn btn-primary">
                            <span>Browse</span>
                            <input id="uploadBtnID" type="file" className="upload" accept="image/*" onChange={this.onChangeBrowserID}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8 mx-0 mb-3 ">
                    <div className="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <img src={srcIDImage} alt="Logo" width="250px" height="150px"/>;

                    </div>
                </div>


                <div className="col-sm-3">Bank Account</div>
                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 pl-5">
                        <div className="ui small input">
                            <input id="uploadFileBank" placeholder="Choose File..." disabled="disabled" />
                        </div>
                        <div className="fileUpload btn btn-primary">
                            <span>Browse</span>
                            <input id="uploadBtnBank" type="file" className="upload" accept="image/*" onChange={this.onChangeBrowserBank} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-8 mx-0 mb-3 ">
                    <div className="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <img src={srcBankImage} alt="Bank Account Image" width="250px" height="150px"/>;
                    </div>
                </div>
            </div>
        );
    }
}

export default FormDocument;