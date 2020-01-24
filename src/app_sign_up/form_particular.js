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

class FormParticular extends React.PureComponent{
    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            /*$('.input-daterange').datepicker({
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
                <div className="form-group row mb-0">
                    <div className="col-sm-3">Name as stated in the ID</div>
                </div>
                <div className="col-sm-8 mx-0 mb-3 ">
                    <div className="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <input type="text" className="black"/>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Place of birth
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Date of birth
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Input type="text" /> */}
                            <div className="input-group input-daterange">
                                <input placeholder="dd/mm/yyyy" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                <span className="input-group-addon black-dropdown">
                                    <span className="fa fa-calendar-alt black-dropdown"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            ID Type
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="IDType" id="IDType1" value="option"/>
                            <label htmlFor="IDType1" className="text-white f-12-center">
                                KTP / ID Card
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="IDType" id="IDType2" value="option" defaultChecked/>
                            <label htmlFor="IDType2" className="text-white f-12-center">
                                Passport/ KITAS / KITAP
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input className="magic-radio" type="radio" name="IDType" id="IDType3" value="option"/>
                            <label htmlFor="IDType3" className="text-white f-12-center">
                                Student ID
                            </label>
                        </div>
                    </div>

                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            ID Number
                        </div>
                    </div>

                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Date of birth
                        </div>
                    </div>

                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Gender
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Input type="text" /> */}
                            <div className="input-group input-daterange">
                                <input placeholder="dd/mm/yyyy" id="startDate1" name="startDate1" type="text" className="form-control date-clear black-dropdown" readOnly="readonly" />
                                <span className="input-group-addon black-dropdown">
                                    <span className="fa fa-calendar-alt black-dropdown"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <input type="text" /> */}
                            <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Education
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsEdc} className="col-sm-12 f-12 black-dropdown"/>

                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            NPWP/Indonesian Taxpayer Reg No.
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Taxpayer Reg Status
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsNPWP} className="col-sm-12 f-12 black-dropdown"/>

                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Marital Status
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Interesting Activities
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsMrt} className="col-sm-12 f-12 black-dropdown"/>

                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">Mother's maiden name</div>
                <div className="col-sm-8 mx-0 mb-3 ">
                    <div className="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <input type="text" className="black"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormParticular;