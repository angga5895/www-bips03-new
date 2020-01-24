import React from "react";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import {AppFrameAction} from "../appframe";

//datepicker
import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';


const stateOptions = [
    { key: '1', value: 'house', text: 'Hous' },
];

const stateOptionsSts =[
    { key: '1', value: 'owned', text: 'Owned' },
];

const stateOptionsKlh =[
    { key: '1', value: '', text: '' },
];

class FormAddress extends React.PureComponent{
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
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            As stated in the ID
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Ownership Status
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsSts} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Country
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Zip Code
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Province
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            City
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            District
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Street address
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            RT
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            RW
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Kelurahan
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-2 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Your current addres is different from ID address
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center ">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Home Phone
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Fax No
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Cell Phone
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Email Address
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Correspondent Address
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                            {/* <input type="text"/>                         */}
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default FormAddress;