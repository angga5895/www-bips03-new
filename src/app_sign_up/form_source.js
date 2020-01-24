import React from "react";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import {AppFrameAction} from "../appframe";

//datepicker
import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';


const stateOptions = [
    { key: '1', value: 'house', text: 'House' },
    { key: '2', value: 'rent', text: 'Rent' },

];

const stateOptionsSts =[
    { key: '1', value: 'owned', text: 'Owned' },
];

const stateOptionsKlh =[
    { key: '1', value: '', text: '' },
];

class FormSource extends React.PureComponent{
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
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Occupation
                        </div>
                    </div>
                    <div className="col-sm-7 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Field of work
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
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsSts} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Company Name
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Position
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Job function/Division
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                    <div className="col-sm-3 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>                             */}
                            <input type="text" className="black"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Years of service
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Phone No
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Extention
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <div className="ui small input col-sm-3 f-12 text-center align-self-center black pr-1 pl-0">
                                <input type="text" className="black"/>
                            </div>

                            <div className="ui small input col-sm-3 f-12 text-center align-self-center black pr-2 pl-0">
                                <input type="text" className="black"/>
                                {/* <span> Year</span>                */}
                            </div>

                            {/* <div className="ui small input col-sm-3 f-12 text-center align-self-center black pr-0 pl-0"></div> */}
                            <div className="ui small input col-sm-3 f-12 text-center align-self-center black pr-1 pl-0">
                                <input type="text" className="black"/>
                            </div>

                            <div className="ui small input col-sm-3 f-12 text-center align-self-center black pr-2 pl-0">
                                <input type="text" className="black"/>
                                {/* <span> Month</span>                */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <input type="text" className="black"/>
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
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <div className="ui small input col-sm-3 f-9 text-center align-self-center black pr-1 pl-0 text-white pull-right"></div>
                            <div className="ui small input col-sm-3 f-9 text-center align-self-center black pr-1 pl-0 pt-0 text-white text-right">
                                Year
                            </div>
                            <div className="ui small input col-sm-3 f-9 text-center align-self-center black pr-1 pl-0 text-white pull-right"></div>
                            <div className="ui small input col-sm-3 f-9 text-center align-self-center black pr-2 pl-0 pt-0 text-white text-right">
                                Month
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Company Address
                        </div>
                    </div>
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Source of fund
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                            <textarea className="black-textarea" cols="50" rows="5"/>
                        </div>
                    </div>
                    <div className="col-sm-6 mx-0 mb-2 ">
                        <div className="form-group row mb-0">
                            <div className="col-sm-12 mx-0 mb-2 ">
                                <div className="ui small input col-sm-6 f-12 text-center align-self-center black">
                                    {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                                    <input type="text "className="black"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-0">
                            <div className="col-sm-12 mx-0 mb-2 ">
                                <div className="ui small input col-sm-12 f-12 text-left align-self-center text-white">
                                    Annual Income (in Rupiah)
                                </div>
                                <div className="ui small input col-sm-6 f-12 text-center align-self-center black">
                                    {/* <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12"/>                                                         */}
                                    <input type="text "className="black"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Investment purpose
                        </div>
                    </div>
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Investment experience
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center ">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                            {/* <input type="text"/>                         */}
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center black">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                            {/* <input type="text"/>                         */}
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Monhly Securities Transaction Estimation
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center ">
                            <Dropdown placeholder='Choose' search selection options={stateOptionsKlh} className="col-sm-12 f-12 black-dropdown"/>
                            {/* <input type="text"/>                         */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormSource;