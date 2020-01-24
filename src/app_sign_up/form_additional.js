import React from "react";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import {AppFrameAction} from "../appframe";

//datepicker
import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';


const stateOptions = [
    { key: 'm', value: 'male', text: 'Male' },
    { key: 'f', value: 'female', text: 'Female' },
];

const stateOptionsEdc =[
    { key: 'SMA', value: 'SMA', text: 'SMA' },
    { key: 'D3', value: 'D3', text: 'D3' },
    { key: 'S1', value: 'S1', text: 'S1' },
    { key: 'S2', value: 'S2', text: 'S2' },
    { key: 'S3', value: 'S3', text: 'S3' },
];

const stateOptionsNPWP = [
    { key: '1', value: 'own', text: 'Own' },
];

const stateOptionsMrt = [
    { key: 'S', value: 'single', text: 'Single' },
    { key: 'M', value: 'maried', text: 'Maried' },

];

class FormAdditional extends React.PureComponent{
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
/*            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });*/
        });
    }
    render(){

        return(
            <div className="f-12">
                <AppFrameAction ref="frameAction" />
                <div className="col-sm-3">Family contact name/related</div>
                <div className="col-sm-8 mx-0 mb-3 ">
                    <div className="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <input type="text" className="black"/>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Relationship
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Phone No / Cell Phone
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="text" className="black" />
                        </div>
                    </div>
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="text" className="black" />
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-12 mx-0 mb-2 ">
                        <div className="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Beneficiary Name
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Relationship
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Phone No / Cell Phone
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            ID Number
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsEdc} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Bank Reference (Current Account No)
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Bank Name
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Account No
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsNPWP} className="col-sm-12 f-12 black-dropdown"/>

                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="text" className="black"/>

                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Account Name
                            {/* <span className="fa fa-helicopter"></span> */}

                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Branch
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Please choose your Investor Bank
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-12 mx-0 mb-2 ">
                        <div className="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Does any of your family or relative works for Bahana group ?
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="family" id="family1" value="option"/>
                            <label htmlFor="family1" className="text-white f-12-center">
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="family" id="family2" value="option" defaultChecked/>
                            <label htmlFor="family2" className="text-white f-12-center">
                                No
                            </label>
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Name
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Department
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-12 mx-0 mb-2 ">
                        <div className="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
                    </div>
                </div>




                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 align-self-center text-white">
                            Does any of your family or relative works for others Sekuritas House, Stock Exchange, Bapepam, or other similiar financial ?
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="familyb" id="familyb1" value="option"/>
                            <label htmlFor="familyb1" className="text-white f-12-center">
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="familyb" id="familyb2" value="option" defaultChecked/>
                            <label htmlFor="familyb2" className="text-white f-12-center">
                                No
                            </label>
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Name
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Department
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-12 mx-0 mb-2 ">
                        <div className="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
                    </div>
                </div>




                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 align-self-center text-white">
                            Does any of your family or relative works as Directors, or having controls of listed limited liabilities company
                            <br/>(minimum 5% of ownership)
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="familyc" id="familyc1" value="option"/>
                            <label htmlFor="familyc1" className="text-white f-12-center">
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="familyc" id="familyc2" value="option" defaultChecked/>
                            <label htmlFor="familyc2" className="text-white f-12-center">
                                No
                            </label>
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Name
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Department
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-12 mx-0 mb-2 ">
                        <div className="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
                    </div>
                </div>




                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 align-self-center text-white">
                            Does any of your family or close relative works as senior executive of  State Own Enterprise, ministry, Senate, Judicative, or other government bodies in Indonesia?
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="familyd" id="familyd1" value="option"/>
                            <label htmlFor="familyd1" className="text-white f-12-center">
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="familyd" id="familyd2" value="option" defaultChecked/>
                            <label htmlFor="familyd2" className="text-white f-12-center">
                                No
                            </label>
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Name
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Department
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-8 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-12 mx-0 mb-2 ">
                        <div className="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
                    </div>
                </div>



            </div>
        );
    }
}

export default FormAdditional;