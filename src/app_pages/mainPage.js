import React from 'react';

// internal framework libraries
import { AppFrame, AppModal } from '../appframe.js';

// application-logic libraries
import { BIPSAppContext } from '../AppData.js';
import { AlertProvider, AlertWrapper } from "react-alerts-plus";

// application-common-UI libraries goes here
import UISelectionTab from '../selectiontab.js';
import { ContextConnector } from '../appcontext.js';

import SideBar from "../SideBar";
import './../bootstrap-3.3.7/dark_chart_style.min';
import LoginUserPage from './loginPage';
import $ from 'jquery';
window.$ = window.jQuery = $;

const CustomFrameHeader = (props) => {
  return (
    <div className="bg-black-trading f-12">
        <h2>
            {props.title}
        </h2>
    </div>
  );
}

const ResizeResponsive = () => {
    var marquee = $('html').width();
    marquee = marquee + 20;
    $('.runningText p').css('width', (marquee));
    $('.runningText').css('width', (marquee));

    var height695 = $('html').height();
    $('.card-695').css('min-height', (height695));
    var plogin = ($('html').height()-$('.p-login').height())/2;
    // $('.p-login').css('padding-top', (plogin));
    // $('.p-login').css('padding-bottom', (plogin));

    var height575 = $('html').height()-84-32-5;
    $('.card-575').css('min-height', (height575));
    var height527 = height575-$('.tabheaderfill').height()-3;
    $('.card-527').css('min-height', (height527));

    var height520 = height527-7;
    $('.card-520').css('min-height', (height520));
    var height467 = height520-53;
    $('.card-467').css('min-height', (height467));

    var height482 = height527-45;
    $('.card-482').css('min-height', (height482));

    var height514 = height520-4.5+2;
    $('.card-514').css('minHeight', (height514));

    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        // Do Firefox-related activities
        var height112 = (115/474)*(height520-46);
        $('.card-112').css('minHeight', (height112));
        var height362 = (358.9/474)*(height520-46);
        $('.card-362').css('minHeight', (height362));

        var height356 = ((358.9/474)*(height520-46))-7+2;
        $('.card-356').css('minHeight', (height356));

        if($('html').height() > 1099 && $('html').height() < 1200)    {
            var height283 = (279/482)*(height482);
            var height283a = (279/482)*(height482)-6;
            $('.card-283').css('minHeight', (height283a));
        } else if(($('html').height() > 768 && $('html').height() < 900) ||
            ($('html').height() > 899 && $('html').height() < 1000)){
            var height283 = (279/482)*(height482);
            var height283a = (279/482)*(height482)-3;
            $('.card-283').css('minHeight', (height283a));
        } else if(($('html').height() > 999 && $('html').height() < 1100)){
            var height283 = (279/482)*(height482);
            var height283a = (279/482)*(height482)-4;
            $('.card-283').css('minHeight', (height283a));
        } else if(($('html').height() > 1199)&& ($('html').height() < 2000)){
            var height283 = (279/482)*(height482);
            var height283a = (279/482)*(height482)-7;
            $('.card-283').css('minHeight', (height283a));
        } else if(($('html').height() > 2001)){
            var height283 = (279/482)*(height482);
            var height283a = (279/482)*(height482)-10;
            $('.card-283').css('minHeight', (height283a));
        } else{
            var height283 = (279/482)*(height482);
            $('.card-283').css('minHeight', (height283));
        }

        var height191 = (197/199)*(height482-height283)-4;
        $('.card-191').css('minHeight', (height191));
        var height161 = (169/169)*(height482-height283)-4-30-4-1;
        $('.card-161').css('minHeight', (height161));
        var height1611 = (167/169)*(height482-height283)-4-30-4-1;
        $('.card-161-1').css('minHeight', (height1611));
        var height1612 = (167/169)*(height482-height283)-4-30-4-2;
        $('.card-161-2').css('minHeight', (height1612));

        var height323 = (321/324)*(height482-46-height112)-2;
        $('.card-323').css('minHeight', (height323));

        var height310 = (310/520)*(height520);
        $('.card-310').css('minHeight', (height310));
        var height176 = (175/176)*(height520-height310-30);
        $('.card-176').css('minHeight', (height176));
        var height177 = (176/177)*(height520-height310-30+1);
        $('.card-177').css('minHeight', (height177));
    }else{
        var height112 = (112/474)*(height520-46);
        $('.card-112').css('minHeight', (height112));
        var height362 = (361.9/474)*(height520-46);
        $('.card-362').css('minHeight', (height362));

        var height356 = ((361.9/474)*(height520-46))-5.382+0.764+2;
        $('.card-356').css('minHeight', (height356));

        var height283 = (283/482)*(height482);
        $('.card-283').css('minHeight', (height283));
        var height191 = (199/199)*(height482-height283)-4;
        $('.card-191').css('minHeight', (height191));
        var height161 = (169/169)*(height482-height283)-4-30-4;
        $('.card-161').css('minHeight', (height161));
        var height1611 = (169/169)*(height482-height283)-4-30-4-1;
        $('.card-161-1').css('minHeight', (height1611));
        var height1612 = (169/169)*(height482-height283)-4-30-4-2;
        $('.card-161-2').css('minHeight', (height1612));

        var height323 = (324/324)*(height482-46-height112);
        $('.card-323').css('minHeight', (height323));

        var height310 = (310/520)*(height520);
        $('.card-310').css('minHeight', (height310));
        var height176 = (175/176)*(height520-height310-30);
        $('.card-176').css('minHeight', (height176));
        var height177 = (176/177)*(height520-height310-30+1);
        $('.card-177').css('minHeight', (height177));
    }

    if($('html').height() > 2200){
        var height234 = height527-$('.grid-294').height()-40;
        $('.card-234').css('min-height', (height234));
    } else{
        var height234 = height527-$('.grid-294').height();
        $('.card-234').css('min-height', (height234));
    }

    var height399 = height520-121;
    $('.card-399').css('min-height', (height399));
    var height344 = height399-40-15;
    $('.card-344').css('min-height', (height344));
    var height220 = ((height520-20)/2)-40-0.5;
    $('.card-220').css('min-height', (height220));

    var height452 = height527-31-37-6;
    $('.card-452').css('min-height', (height452));
    var height487 = height527-40;
    $('.card-487').css('min-height', (height487));
    var height305 = height527/1.728;
    $('.card-305').css('min-height', (height305));
    var height221 = height527/2.385;
    $('.card-221').css('min-height', (height221));
    var height194 = height221-17-10;
    $('.card-194').css('min-height', (height194));
    var height448 = height527-77-2;
    $('.card-448').css('min-height', (height448));
    var height57 = (height448/8)+1;
    $('.list-group-item-portofolio').css('min-height', (height57));
    var height392 = height527-62-11-25-20-17;
    $('.card-392').css('min-height', (height392));
    var height478 = height527-49-1.5;
    $('.card-478').css('min-height', (height478));
    var height472 = height527-45-10;
    $('.card-472').css('min-height', (height472));
    var height381 = height472-62-29;
    $('.card-381').css('min-height', (height381));
    var height155 = (height472-62-30-10-40-20)/2;
    $('.card-155').css('min-height', (height155));
    var height233 = height527-$('.grid-294').height()-0.5;
    $('.card-233').css('min-height', (height233));
    var height202 = height527-$('.grid-294').height()-30-0.5;
    $('.card-202').css('min-height', (height202));
    var height515 = height527-12.5;
    $('.card-515').css('min-height', (height515));
    var height334 = height515-121-40-20-20-1;
    $('.card-334').css('min-height', (height334));
    var height230 = (height515-40-15)/2;
    $('.card-230').css('min-height', (height230));
    var height175 = (height527/3)-0.833;
    $('.card-175').css('min-height', (height175));
    var height138 = height175-37;
    $('.card-138').css('min-height', (height138));

    var height479 = height527-25-20-3-1;
    $('.card-479').css('min-height', (height479));
    var height406 = height479-73;
    $('.card-406').css('min-height', (height406));
    var height282 = ((height527-40)/1.727)+0.298;
    $('.card-282').css('min-height', (height282));
    var height190 = ((height527-40)/2.563)+0.183;
    $('.card-190').css('min-height', (height190));
    var height160 = height190-30;
    $('.card-160').css('min-height', (height160));
    var height156 = height160-4;
    $('.card-156').css('min-height', (height156));
    var height111 = ((height527-40-30)/4.117)+0.118;
    $('.card-111').css('min-height', (height111));
    var height158 = height156+2;
    $('.card-158').css('min-height', (height158));
    var height324 = ((height527-40-30)/1.410)+2.241;
    $('.card-324').css('min-height', (height324));
    var height372 = (height527-40-40-30-45)+0.5;
    $('.card-372').css('min-height', (height372));
    var height129 = (height372+15)/3;
    $('.card-129').css('min-height', (height129));
    var height257 = height515/2;
    $('.card-257').css('min-height', (height257));
    var height475 = height515-40;
    $('.card-475').css('min-height', (height475));
    var height169 = height472/2.792;
    $('.card-169').css('min-height', (height169));
    var height113 = height472/4.176;
    $('.card-113').css('min-height', (height113));
    var height281 = height472/1.679;
    $('.card-281').css('min-height', (height281));


    var rsccontainer = height527;
    $('.rsc-container').css('min-height', (rsccontainer));
    var rsccontent = height527-133;
    $('.rsc-content').css('min-height', (rsccontent));
    var rscscroll = height527-40;
    $('.rsc-scroll').css('min-height', (rscscroll));

    //Zoom Live Trade
    if($('html').height() > 2601)  {
        var liveTrade = 4.4;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if ($('html').height() > 2201 && $('html').height() < 2600) {
        var liveTrade = 3.5;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 2049 && $('html').height() < 2200) {
        var liveTrade = 3.1;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 1533 && $('html').height() < 2050) {
        var liveTrade = 2.3;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 1319 && $('html').height() < 1534) {
        var liveTrade = 2.1;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 1100 && $('html').height() < 1320) {
        var liveTrade = 1.63;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 1042 && $('html').height() < 1099) {
        var liveTrade = 1.5;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 1023 && $('html').height() < 1043) {
        var liveTrade = 1.4;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 951 && $('html').height() < 1024) {
        var liveTrade = 1.31;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 875 && $('html').height() < 950) {
        var liveTrade = 1.29;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else if($('html').height() > 772 && $('html').height() < 876) {
        var liveTrade = 1.14;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    } else{
        var liveTrade = 1;
        $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
    }
}

class MainPage_Base extends React.Component {
    constructor (props) {
        super(props);
        this.state ={
              fullscreenmode:false,
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);

        var setElementHeightWeb = function () {
            var marquee = $('html').width();
            marquee = marquee + 20;
            $('.runningText p').css('width', (marquee));
            $('.runningText').css('width', (marquee));

            var height695 = $('html').height();
            $('.card-695').css('min-height', (height695));
            var plogin = ($('html').height()-$('.p-login').height())/2;
            // $('.p-login').css('padding-top', (plogin));
            // $('.p-login').css('padding-bottom', (plogin));

            var height575 = $('html').height()-84-32-5;
            $('.card-575').css('min-height', (height575));
            var height527 = height575-$('.tabheaderfill').height()-3;
            $('.card-527').css('min-height', (height527));

            var height520 = height527-7;
            $('.card-520').css('minHeight', (height520));
            var height467 = height520-53;
            $('.card-467').css('minHeight', (height467));

            var height482 = height527-45;
            $('.card-482').css('min-height', (height482));

            var height514 = height520-4.5+2;
            $('.card-514').css('minHeight', (height514));

            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                // Do Firefox-related activities
                var height112 = (115/474)*(height520-46);
                $('.card-112').css('minHeight', (height112));
                var height362 = (358.9/474)*(height520-46);
                $('.card-362').css('minHeight', (height362));

                var height356 = ((358.9/474)*(height520-46))-7+2;
                $('.card-356').css('minHeight', (height356));

                if($('html').height() > 1099 && $('html').height() < 1200)    {
                    var height283 = (279/482)*(height482);
                    var height283a = (279/482)*(height482)-6;
                    $('.card-283').css('minHeight', (height283a));
                } else if(($('html').height() > 768 && $('html').height() < 900) ||
                    ($('html').height() > 899 && $('html').height() < 1000)){
                    var height283 = (279/482)*(height482);
                    var height283a = (279/482)*(height482)-3;
                    $('.card-283').css('minHeight', (height283a));
                } else if(($('html').height() > 999 && $('html').height() < 1100)){
                    var height283 = (279/482)*(height482);
                    var height283a = (279/482)*(height482)-4;
                    $('.card-283').css('minHeight', (height283a));
                } else if(($('html').height() > 1199)&& ($('html').height() < 2000)){
                    var height283 = (279/482)*(height482);
                    var height283a = (279/482)*(height482)-7;
                    $('.card-283').css('minHeight', (height283a));
                } else if(($('html').height() > 2001)){
                    var height283 = (279/482)*(height482);
                    var height283a = (279/482)*(height482)-10;
                    $('.card-283').css('minHeight', (height283a));
                } else{
                    var height283 = (279/482)*(height482);
                    $('.card-283').css('minHeight', (height283));
                }

                var height191 = (197/199)*(height482-height283)-4;
                $('.card-191').css('minHeight', (height191));
                var height161 = (169/169)*(height482-height283)-4-30-4-1;
                $('.card-161').css('minHeight', (height161));
                var height1611 = (167/169)*(height482-height283)-4-30-4-1;
                $('.card-161-1').css('minHeight', (height1611));
                var height1612 = (167/169)*(height482-height283)-4-30-4-2;
                $('.card-161-2').css('minHeight', (height1612));

                var height323 = (321/324)*(height482-46-height112)-2;
                $('.card-323').css('minHeight', (height323));

                var height310 = (310/520)*(height520);
                $('.card-310').css('minHeight', (height310));
                var height176 = (175/176)*(height520-height310-30);
                $('.card-176').css('minHeight', (height176));
                var height177 = (176/177)*(height520-height310-30+1);
                $('.card-177').css('minHeight', (height177));
            }else{
                var height112 = (112/474)*(height520-46);
                $('.card-112').css('minHeight', (height112));
                var height362 = (361.9/474)*(height520-46);
                $('.card-362').css('minHeight', (height362));

                var height356 = ((361.9/474)*(height520-46))-5.382+0.764+2;
                $('.card-356').css('minHeight', (height356));
                var height283 = (283/482)*(height482);
                $('.card-283').css('minHeight', (height283));
                var height191 = (199/199)*(height482-height283)-4;
                $('.card-191').css('minHeight', (height191));
                var height161 = (169/169)*(height482-height283)-4-30-4;
                $('.card-161').css('minHeight', (height161));
                var height1611 = (169/169)*(height482-height283)-4-30-4-1;
                $('.card-161-1').css('minHeight', (height1611));
                var height1612 = (169/169)*(height482-height283)-4-30-4-2;
                $('.card-161-2').css('minHeight', (height1612));

                var height323 = (324/324)*(height482-46-height112);
                $('.card-323').css('minHeight', (height323));

                var height310 = (310/520)*(height520);
                $('.card-310').css('minHeight', (height310));
                var height176 = (175/176)*(height520-height310-30);
                $('.card-176').css('minHeight', (height176));
                var height177 = (176/177)*(height520-height310-30+1);
                $('.card-177').css('minHeight', (height177));
            }

            if($('html').height() > 2200){
                var height234 = height527-$('.grid-294').height()-40;
                $('.card-234').css('min-height', (height234));
            } else{
                var height234 = height527-$('.grid-294').height();
                $('.card-234').css('min-height', (height234));
            }

            var height399 = height520-121;
            $('.card-399').css('min-height', (height399));
            var height344 = height399-40-15;
            $('.card-344').css('min-height', (height344));
            var height220 = ((height520-20)/2)-40-0.5;
            $('.card-220').css('min-height', (height220));

            var height452 = height527-31-37-6;
            $('.card-452').css('min-height', (height452));
            var height487 = height527-40;
            $('.card-487').css('min-height', (height487));
            var height305 = height527/1.728;
            $('.card-305').css('min-height', (height305));
            var height221 = height527/2.385;
            $('.card-221').css('min-height', (height221));
            var height194 = height221-17-10;
            $('.card-194').css('min-height', (height194));
            var height448 = height527-77-2;
            $('.card-448').css('min-height', (height448));
            var height57 = (height448/8)+1;
            $('.list-group-item-portofolio').css('min-height', (height57));
            var height392 = height527-62-11-25-20-17;
            $('.card-392').css('min-height', (height392));
            var height478 = height527-49-1.5;
            $('.card-478').css('min-height', (height478));
            var height472 = height527-45-10;
            $('.card-472').css('min-height', (height472));
            var height381 = height472-62-29;
            $('.card-381').css('min-height', (height381));
            var height155 = (height472-62-30-10-40-20)/2;
            $('.card-155').css('min-height', (height155));
            var height233 = height527-$('.grid-294').height()-0.5;
            $('.card-233').css('min-height', (height233));
            var height202 = height527-$('.grid-294').height()-30-0.5;
            $('.card-202').css('min-height', (height202));
            var height515 = height527-12.5;
            $('.card-515').css('min-height', (height515));
            var height334 = height515-121-40-20-20-1;
            $('.card-334').css('min-height', (height334));
            var height230 = (height515-40-15)/2;
            $('.card-230').css('min-height', (height230));
            var height175 = (height527/3)-0.833;
            $('.card-175').css('min-height', (height175));
            var height138 = height175-37;
            $('.card-138').css('min-height', (height138));

            var height479 = height527-25-20-3-1;
            $('.card-479').css('min-height', (height479));
            var height406 = height479-73;
            $('.card-406').css('min-height', (height406));
            var height282 = ((height527-40)/1.727)+0.298;
            $('.card-282').css('min-height', (height282));
            var height190 = ((height527-40)/2.563)+0.183;
            $('.card-190').css('min-height', (height190));
            var height160 = height190-30;
            $('.card-160').css('min-height', (height160));
            var height156 = height160-4;
            $('.card-156').css('min-height', (height156));
            var height111 = ((height527-40-30)/4.117)+0.118;
            $('.card-111').css('min-height', (height111));
            var height158 = height156+2;
            $('.card-158').css('min-height', (height158));
            var height324 = ((height527-40-30)/1.410)+2.241;
            $('.card-324').css('min-height', (height324));
            var height372 = (height527-40-40-30-45)+0.5;
            $('.card-372').css('min-height', (height372));
            var height129 = (height372+15)/3;
            $('.card-129').css('min-height', (height129));
            var height257 = height515/2;
            $('.card-257').css('min-height', (height257));
            var height475 = height515-40;
            $('.card-475').css('min-height', (height475));
            var height169 = height472/2.792;
            $('.card-169').css('min-height', (height169));
            var height113 = height472/4.176;
            $('.card-113').css('min-height', (height113));
            var height281 = height472/1.679;
            $('.card-281').css('min-height', (height281));


            var rsccontainer = height527;
            $('.rsc-container').css('min-height', (rsccontainer));
            var rsccontent = height527-133;
            $('.rsc-content').css('min-height', (rsccontent));
            var rscscroll = height527-40;
            $('.rsc-scroll').css('min-height', (rscscroll));
        };

        var setElementLiveZoom = function () {
            if($('html').height() > 2601)  {
                var liveTrade = 4.4;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if ($('html').height() > 2201 && $('html').height() < 2600) {
                var liveTrade = 3.5;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 2049 && $('html').height() < 2200) {
                var liveTrade = 3.1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1533 && $('html').height() < 2050) {
                var liveTrade = 2.3;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1319 && $('html').height() < 1534) {
                var liveTrade = 2.1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1100 && $('html').height() < 1320) {
                var liveTrade = 1.63;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1042 && $('html').height() < 1099) {
                var liveTrade = 1.5;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 1023 && $('html').height() < 1043) {
                var liveTrade = 1.4;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 951 && $('html').height() < 1024) {
                var liveTrade = 1.31;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 875 && $('html').height() < 950) {
                var liveTrade = 1.29;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else if($('html').height() > 772 && $('html').height() < 876) {
                var liveTrade = 1.14;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            } else{
                var liveTrade = 1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
            }
        };

        var ElementStockHistory = function(){
            var height575 = $('html').height()-84-32-5;
            var height527 = height575-$('.tabheaderfill').height()-3;
            var height372 = (height527-40-40-30-45)+0.5;
            $('.card-372').css('min-height', (height372));

            var height520 = height527-7;
            $('.card-520').css('min-height', (height520));
            var height467 = height520-53;
            $('.card-467').css('min-height', (height467));
        };

        $(document).ready(function () {
            setElementHeightWeb();
            setElementLiveZoom();
        }).resize();

        $(window).on("resize", function () {
            setElementHeightWeb();
            setElementLiveZoom();
        }).resize();

        $(window).on("click", function () {
            ElementStockHistory();
        }).resize();

        // $(window).on("click", function () {
        //     setElementHeightWeb();
        //     setElementLiveZoom();
        // }).resize();
    }

    doLogin = (userID, password) => {
        this.props.doLogin(userID, password);
    }

    openContentFullscreen = () => {
        /* let elem = document.querySelector('.content'); */
        /* Access the element of "full screen" div: */
        /*const elem = this.fullscreenModal.current;*/
        var elem = document.getElementById("bipsFullscreen");

        /* Interact with it as a normal DOM element: */
        if (elem.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { //IE/Edge
            document.documentElement.msRequestFullscreen();
        }

        ResizeResponsive();

        this.setState({
            fullscreenmode : true
        })
    }

    closeContentFullscreen = () => {
        /* let elem = document.querySelector('.content'); */
        /* Access the element of "full screen" div: */
        /*const elem = this.fullscreenModal.current;*/

        /* Interact with it as a normal DOM element: */
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement) {
            // can use exitFullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            ResizeResponsive();
            this.setState({
                fullscreenmode : false
            })
        } else {
            var elem = document.getElementById("bipsFullscreen");

            /* Interact with it as a normal DOM element: */
            if (elem.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { //IE/Edge
                document.documentElement.msRequestFullscreen();
            }

            ResizeResponsive();
            this.setState({
                fullscreenmode : true
            })
        }

    }
    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));

        if(this.state.seconds === 199){
            this.setState({seconds: 100});
            this.setState({timeChange: 110});
        }

        //inisalisasi
        if(this.state.seconds === 1){
            let s = this.state.spanData.slice();
            s[0] = this.state.rowData[0];
            s[1] = this.state.rowData[1];
            s[2] = this.state.rowData[2];
            s[3] = this.state.rowData[3];
            s[4] = this.state.rowData[4];
            s[5] = this.state.rowData[5];
            s[6] = this.state.rowData[6];
            s[7] = this.state.rowData[7];
            s[8] = this.state.rowData[8];
            s[9] = this.state.rowData[9];
            this.setState({
                spanData: s,
            })
        }
        //merubah data
        if(this.state.seconds === this.state.timeChange){
            this.setState({indexData: (this.state.indexData + 1) % this.state.rowData.length });
            let s = this.state.spanData.slice();
            s[this.state.indexMarquee] = this.state.rowData[this.state.indexData];
            this.setState({spanData: s,})
            this.setState({indexMarquee: (this.state.indexMarquee + 1) % 10});
            this.setState({timeChange: (this.state.timeChange + 10)});
        }


    }
    //zaky
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        document.body.style.setProperty('--warna-dasar', this.props.thememode === true  ? "#010101" : "#FCFCFC");
        document.body.style.setProperty('--warna-header-card', this.props.thememode === true  ? "#181818" : "#E7E8E8");
        document.body.style.setProperty('--warna-text-basic', this.props.thememode === true  ? "#FFFFFF" : "#272727");
        document.body.style.setProperty('--warna-text-header', this.props.thememode === true  ? "#FEFEFE" : "#282828");
        document.body.style.setProperty('--warna-black-white', this.props.thememode === true  ? "#000000" : "#FCFCFC");
        document.body.style.setProperty('--warna-black-white-gradient', this.props.thememode === true  ? "#212121" : "#dcddde");
        document.body.style.setProperty('--warna-cssmenu', this.props.thememode === true  ? "#F7F7F7" : "#878787");

        document.body.style.setProperty('--warna-gray', this.props.thememode === true  ? "#4D4E4E" : "#999999");
        document.body.style.setProperty('--warna-inactive-gradient', this.props.thememode === true  ? "#0F0F10" : "#F9FAFB");
        document.body.style.setProperty('--warna-btn-dark', this.props.thememode === true  ? "#3D3E3F" : "#CDCDCE");
        document.body.style.setProperty('--warna-btn-dark-hover', this.props.thememode === true  ? "#333332" : "#CDCDDD");
        document.body.style.setProperty('--warna-scroll', this.props.thememode === true  ? "#676767" : "#B3B4B4");
        document.body.style.setProperty('--warna-black-white-semantic', this.props.thememode === true  ? "#FFFFFF" : "#010101");
        document.body.style.setProperty('--warna-background-semantic', this.props.thememode === true  ? "#333332" : "#FEFEFE");
        document.body.style.setProperty('--warna-background-semantic-gradient', this.props.thememode === true  ? "#010101" : "#FFFFFF");
        document.body.style.setProperty('--warna-d-border', this.props.thememode === true  ? "#565252" : "#999999");
        document.body.style.setProperty('--warna-d-border-bold', this.props.thememode === true  ? "#FFFFFF" : "#999999");
        document.body.style.setProperty('--warna-d-border-black', this.props.thememode === true  ? "#010101" : "#E7E7E7");
        document.body.style.setProperty('--warna-bg-dark-grey', this.props.thememode === true  ? "#1A1A1A" : "#E9E9E9");
        document.body.style.setProperty('--warna-bg-trading-gray', this.props.thememode === true  ? "#262626" : "#E3E3E3");
        document.body.style.setProperty('--warna-text-menu', this.props.thememode === true  ? "#FFFFFF" : "#E7E7E7");
        document.body.style.setProperty('--warna-hover-menu', this.props.thememode === true  ? "#111111" : "#f4f4f4");
        document.body.style.setProperty('--warna-table-striped', this.props.thememode === true  ? "#272727" : "#E7E8E8");

        document.body.style.setProperty('--warna-navy-odd', this.props.thememode === true  ? "#0E0E20" : "#ABACAC");
        document.body.style.setProperty('--warna-navy-even', this.props.thememode === true  ? "#2E3354" : "#CBCBCA");
        document.body.style.setProperty('--warna-text-danger', this.props.thememode === true  ? "#eb2720" : "#ea0500");
        document.body.style.setProperty('--warna-text-success', this.props.thememode === true  ? "#05FE01" : "#449b52");
        document.body.style.setProperty('--warna-text-warning', this.props.thememode === true  ? "#ffe222" : "#f59100");

        document.body.style.setProperty('--warna-text-jam', this.props.thememode === true  ? "#6DCCDC" : "#09549A");
        document.body.style.setProperty('--warna-navy-headermenu-odd', this.props.thememode === true  ? "#0E0E20" : "#F4F5F6");
        document.body.style.setProperty('--warna-navy-headermenu-even', this.props.thememode === true  ? "#2E3354" : "#DFDFDE");
        document.body.style.setProperty('--warna-shadow', this.props.thememode === true  ? "#000000" : "#ACACAC");
        document.body.style.setProperty('--warna-border-headermenu', this.props.thememode === true  ? "#5f68ad" : "#F9F9F9");
        document.body.style.setProperty('--warna-bg-data-orange', this.props.thememode === true  ? "#e68c27" : "#e6e027");

        var props = this.props;
        return (
            <>
                {
                      <div id="login-state" style={{display: !props.loginState ? "block" : "none"}}>
                          <LoginUserPage onLogin={this.doLogin}/>
                      </div>

                }
                {
                    <div style={{display: props.loginState ? "block" : "none"}}>
                        <AlertProvider>
                        <UISelectionTab treeName="/" linkTitles={
                            {
                                landingPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-investment-board fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips">MY ACCOUNT</span>
                                    </div>,
                                marketstatistikPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-market-statistic fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 6.5px"}}>MARKET &</span><br/>
                                        <span className="fs-text-bips">STATISTIC</span>
                                    </div>,
                                stockPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-stock-page fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 15.3px"}}>
                                  STOCK
                                </span>
                                    </div>,
                                tradePage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-trade-page fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 15.3px"}}>
                                  TRADE
                                </span>
                                    </div>,
                                analyticPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-analytic_page fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 7.8px"}}>ANALYTIC</span>
                                    </div>,
                                livetradePage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-live-trade fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 21.09px"}}>LIVE</span><br/>
                                        <span className="fs-text-bips">TRADE</span>
                                    </div>,
                                esbnPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-fund fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 15.3px"}}>
                                        E-SBN
                                      </span>
                                    </div>,
                                mutualfundPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-inquiry fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 11.1px"}}>MUTUAL</span><br/>
                                        <span className="fs-text-bips">FUND</span>
                                    </div>,
                                chatsupportPage:
                                    <div className="text-align-center">
                                        <i className="icon-icon-chat-support fs-icon-bips"></i> <br/><br/>
                                        <span className="fs-text-bips" style={{padding: "0px 11.1px"}}>CHATS &</span><br/>
                                        <span className="fs-text-bips">SUPPORT</span>
                                    </div>
                            }
                        }/>

                        <div className="d-sidebar-landscape">
                            <MarqueePage />
                        </div>
                        <div className="col-sm-12 px-0 mx-0 card-575">
                            <SideBar/>
                            <div className="col-sm-contentbar px-0 mx-0 d-border-top d-border-bottom card-575">
                                <AppFrame treeName="/" headerComponent={CustomFrameHeader}/>
                            </div>
                        </div>
                        <div className="d-sidebar-potrait">
                            <MarqueePage />
                        </div>
                        <i onClick={this.state.fullscreenmode == false ? this.openContentFullscreen : this.closeContentFullscreen}
                           className={this.state.fullscreenmode == false ? "icon-icon-fullscreen-in myBtn" : "icon-exit-fullscreen myBtn"}></i>
                        {props.loginState ? <AlertBips/> : ''}
                        {/*<AppModal/>*/}
                        </AlertProvider>
                    </div>
                }
            </>
        );
    }
}
class AlertBips extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            alertMessage : "Default Message"
        }
    }

    alertclick(){
        $("#btn-alert").click();
    }

    componentDidMount(){
        this.alertInterval = setInterval(() => this.alertclick(), 99000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.alertInterval);
    }

    render() {
        const offset = "25px";
        const { alertMessage } = this.state;

        const topRight = {
            message: alertMessage,
            style: {
                borderColor: "navy",
                borderRadius: 0
            },
            position: "top right",
            offset,
            duration: 5000,
            showProgressBar: false
        };

        return (
            <>
                <AlertWrapper>
                    {({ show, close }) => (
                        <div>
                            <button
                                id="btn-alert"
                                className="btn btn-primary d-none"
                                onClick={() => show(topRight)}>
                                Alert
                            </button>
                        </div>
                    )}
                </AlertWrapper>
            </>
        );
    }
}

class MarqueePage extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state={
            seconds: 0,
            indexMarquee:0,
            indexData:10,
            timeChange:100,
            spanData: [
                { code: "AALI",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ANTM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TLKM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "BBRI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "ASII",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "WSKT",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AGII",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ADHI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMGR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "EMTK",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "MREI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "PTSP",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TCPI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BRAM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "INDF",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JECC",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "RDTX",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "DUTI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "FASW",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "IBST",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMMA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TKIM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JSMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SONA",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AMFG",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SCCO",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BYAN",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "UNTR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "GGRM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "UNVR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
            ],
            rowData: [
                {
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },{
                    code: "",
                    price: "",
                    change: "",
                    persen: "",
                    tvol: ""
                },
            ],
        };
    }

    render() {
        return (
            <div className="h-32 runningText">
                <p className="marquee">
                                  <span>
                                      <kbd>{this.state.spanData[0].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[0].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[0].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[0].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[0].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[0].change}&nbsp;({this.state.spanData[0].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee2">
                                  <span>
                                      <kbd>{this.state.spanData[1].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[1].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[1].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[1].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[1].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[1].change}&nbsp;({this.state.spanData[1].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee3">
                                  <span>
                                      <kbd>{this.state.spanData[2].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[2].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[2].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[2].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[2].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[2].change}&nbsp;({this.state.spanData[2].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee4">
                                  <span>
                                      <kbd>{this.state.spanData[3].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[3].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[3].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[3].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[3].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[3].change}&nbsp;({this.state.spanData[3].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee5">
                                  <span>
                                      <kbd>{this.state.spanData[4].code}</kbd>
                                       <text
                                           className={(this.state.spanData[4].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[4].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[4].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[4].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[4].change}&nbsp;({this.state.spanData[4].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee6">
                                  <span>
                                      <kbd>{this.state.spanData[5].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[5].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[5].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[5].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[5].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[5].change}&nbsp;({this.state.spanData[5].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee7">
                                  <span>
                                      <kbd>{this.state.spanData[6].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[6].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[6].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[6].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[6].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[6].change}&nbsp;({this.state.spanData[6].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee8">
                                  <span>
                                      <kbd>{this.state.spanData[7].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[7].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[7].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[7].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[7].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[7].change}&nbsp;({this.state.spanData[7].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee9">
                                  <span>
                                      <kbd>{this.state.spanData[8].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[8].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[8].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[8].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[8].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[8].change}&nbsp;({this.state.spanData[8].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
                <p className="marquee marquee10">
                                  <span>
                                      <kbd>{this.state.spanData[9].code}</kbd>&nbsp;
                                      <text
                                          className={(this.state.spanData[9].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[9].price}&nbsp;
                                      </text>
                                      <i
                                          className={(this.state.spanData[9].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[9].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[9].change}&nbsp;({this.state.spanData[9].persen}%) &nbsp;
                                      </text>
                                  </span>
                </p>
            </div>
        );
    }
}

const MainPage = ContextConnector(BIPSAppContext, 
  (vars, actions) => ({
    loginState: vars.loginState,
    networkState: vars.networkState,
    doLogin: (userID, password) => {actions.sendAction('doLogin', {userID, password})},
     thememode : vars.thememode,
  }), 
  ["doLogin"]
)(MainPage_Base);

export default MainPage;
export {ResizeResponsive};