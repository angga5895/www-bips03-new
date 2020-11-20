import React from "react";
import {Input, Label} from 'semantic-ui-react';
import $ from "jquery";

class NumberInput extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const inputIdClassName = this.props.idclassname === null ?  "" :  this.props.idclassname;
        const inputdefaultValue = this.props.defaultValue === null ? "" :  this.props.defaultValue;

        // Constants
        var KEY_UP = 38,
            KEY_DOWN = 40;

        // Variables
        var min = 0,
            max = (this.props.max ? this.props.max : 999999999999),
            step = 1;

        $('.ui.icon.button.'+inputIdClassName).click(function () {
            var command = $(this).attr('command');
            HandleUpDown(command);
        });

        var getID = inputIdClassName;

        if(inputdefaultValue !== ''){
            if(inputdefaultValue > 0){
                var spValue = inputdefaultValue.replace(/,/g,"");
                $('#'+getID).val(uangFormat(spValue));
            } else {
                var edValue = inputdefaultValue+"@00"
                if (edValue.includes("@") > 0){
                    var spEDValue = edValue.split('@');
                    if (spEDValue[0].indexOf(",") >= 0) {

                        // get position of first decimal
                        // this prevents multiple decimals from
                        // being entered
                        var decimal_pos = spEDValue[0].indexOf(",");

                        // split number by decimal point
                        var left_side = spEDValue[0].substring(0, decimal_pos);
                        var right_side = spEDValue[0].substring(decimal_pos+1);

                        // add commas to left side of number
                        left_side = formatNumber(left_side);

                        // Limit decimal to only 2 digits
                        right_side = right_side.substring(0, 2);

                        // join number by .
                        //input_val = "$" + left_side + "." + right_side;
                        var newnominal = left_side + "." + right_side;

                    }
                    else {
                        // no decimal entered
                        // add commas to number
                        // remove all non-digits
                        var newnominal = formatNumber(spEDValue[0]);
                        //input_val = "$" + input_val;
                    }
                    $('#'+getID).val(newnominal);
                }
            }
        }

        $('#'+getID).keypress(function (e) {
            var code = e.keyCode;
            if (code != KEY_UP && code != KEY_DOWN) return;
            var command = code == KEY_UP ? 'Up' : code == KEY_DOWN ? 'Down' : '';
            HandleUpDown(command);
        });

        function HandleUpDown(command) {
            var val = $('#'+getID).val().trim();

            if(val.includes('.') > 0){
                var nodeval = val.split('.');
                if(nodeval[0].includes(',') > 0) {
                    var separates = nodeval[0].replace(/,/g,'');
                    var num = separates !== '' ? parseInt(separates) : 0;
                    var node = nodeval[1].toString();
                } else{
                    var num = nodeval[0] !== '' ? parseInt(nodeval[0]) : 0;
                    var node = nodeval[1].toString();
                }
            } else {
                if(val.includes(',') > 0) {
                    var separates = val.replace(/,/g,'');
                    var num = separates !== '' ? parseInt(separates) : 0;
                    var node = '';
                } else{
                    var num = val !== '' ? parseInt(val) : 0;
                    var node = '';
                }
            }

            switch (command) {
                case 'Up':
                    if (num < max) num += step;
                    break;
                case 'Down':
                    if (num > min) num -= step;
                    break;
            }

            if(node === ''){
                $('#'+getID).val(uangFormat(num))
            } else{
                $('#'+getID).val(uangFormat(num)+'.'+node);
            }
        }

        function formatNumber(n) {
            // format number 1000000 to 1,234,567
            return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }


        function uangFormat(bilangan) {
            if (bilangan == '0'){
                return rupiah = '0';
            } else {
                var uang = parseInt(bilangan);
                if(uang > 999) {
                    var number_string = uang.toString(),
                        sisa = number_string.length % 3,
                        rupiah = number_string.substr(0, sisa),
                        ribuan = number_string.substr(sisa).match(/\d{3}/g);

                    if (ribuan) {
                        var separator = sisa ? ',' : '';
                        return rupiah += separator + ribuan.join(',');
                    };
                } else {
                    return rupiah = uang;
                }
            }
        }

        function formatCurrency(input, blur) {
            // appends $ to value, validates decimal side
            // and puts cursor back in right position.

            // get input value
            var input_val = input.val();

            // don't validate empty input
            if (input_val === "") { return; }

            // original length
            var original_len = input_val.length;

            // initial caret position
            var caret_pos = input.prop("selectionStart");

            // check for decimal
            if (input_val.indexOf(".") >= 0) {

                // get position of first decimal
                // this prevents multiple decimals from
                // being entered
                var decimal_pos = input_val.indexOf(".");

                // split number by decimal point
                var left_side = input_val.substring(0, decimal_pos);
                var right_side = input_val.substring(decimal_pos);

                // add commas to left side of number
                left_side = formatNumber(left_side);

                // validate right side
                right_side = formatNumber(right_side);

                // On blur make sure 2 numbers after decimal
                if (blur === "blur") {
                    right_side += "00";
                }

                // Limit decimal to only 2 digits
                right_side = right_side.substring(0, 2);

                // join number by .
                //input_val = "$" + left_side + "." + right_side;
                input_val = left_side + "." + right_side;

            }
            else {
                // no decimal entered
                // add commas to number
                // remove all non-digits
                input_val = formatNumber(input_val);
                //input_val = "$" + input_val;

                // final formatting
                if (blur === "blur") {
                    input_val += ".00";
                }
            }

            // send updated string to input
            input.val(input_val);

            // put caret back in the right position
            var updated_len = input_val.length;
            caret_pos = updated_len - original_len + caret_pos;
            input[0].setSelectionRange(caret_pos, caret_pos);
        }

        $('#'+getID).on({
            keyup: function() {
                formatCurrency($(this));
            },
        });
    }

    render() {
        const inputSize = this.props.size === null ? "" : this.props.size;
        const inputIdClassName = this.props.idclassname === null ?  "" :  this.props.idclassname;
        const inputClassName =  this.props.className === null ? "" : this.props.className;
        const inputPlaceholder = this.props.placeholder === null ? "" :  this.props.placeholder;
        const inputName = this.props.name === null ? "" :  this.props.name;

        return (
            <>
                <div className={inputSize+" input-group "+inputClassName}>
                    <span className="input-group-btn">
                        <button type="button" disabled={this.props.status} className={"form-control ui icon button bg-grey px-2 d-border-left d-border-top d-border-bottom "+inputIdClassName} style={{"border-top-right-radius": "0px", "border-bottom-right-radius": "0px", "margin": "0px"}} command="Down">
                            <i className="icofont icofont-minus f-9"></i>
                        </button>
                    </span>
                    <input disabled={this.props.status}  type="text" id={inputIdClassName} name={inputName} maxlength={this.props.max ? this.props.max : 15} data-type="currency"
                           placeholder={inputPlaceholder}
                           style={{"border-radius": "0px", "text-align": "right", "border-right": "0", "border-left":"0"}} className="form-control f-12"/>
                    <span className="input-group-btn">
                        <button disabled={this.props.status}  type="button" className={"form-control ui icon button bg-grey px-2 d-border-right d-border-top d-border-bottom "+inputIdClassName} style={{"border-top-left-radius": "0px", "border-bottom-left-radius": "0px"}} command="Up">
                            <span className="icofont icofont-plus f-9"></span>
                        </button>
                    </span>
                </div>
            </>
        );
    }

}

export default NumberInput;