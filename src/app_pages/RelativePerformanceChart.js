import React from 'react';
import { AppFrameAction } from '../appframe.js';
import anychart from 'anychart';
import '../../node_modules/anychart/dist/css/anychart-ui.min.css';
import '../../node_modules/anychart/dist/js/anychart-ui.min.js';
import '../../node_modules/anychart/dist/fonts/css/anychart-font.min.css';
import '../../node_modules/anychart/dist/js/anychart-data-adapter.min.js';
import { ContextConnector } from '../appcontext.js';
import { BIPSAppContext, dataAnalitic, GroupList } from '../AppData.js';

// import '../../node_modules/anychart/dist/js/dark_earth.min.js';
import '../../node_modules/anychart/dist/js/coffee.min.js';
import '../../node_modules/anychart/dist/js/dark_blue.min.js';
import '../../node_modules/anychart/dist/js/dark_glamour.min.js';
import '../../node_modules/anychart/dist/js/dark_provence.min.js';
import '../../node_modules/anychart/dist/js/dark_turquoise.min.js';
import '../../node_modules/anychart/dist/js/light_blue.min.js';
import '../../node_modules/anychart/dist/js/light_earth.min.js';
import '../../node_modules/anychart/dist/js/light_glamour.min.js';
import '../../node_modules/anychart/dist/js/light_provence.min.js';
import '../../node_modules/anychart/dist/js/light_turquoise.min.js';
import '../../node_modules/anychart/dist/js/monochrome.min.js';
import '../../node_modules/anychart/dist/js/morning.min.js';
import '../../node_modules/anychart/dist/js/pastel.min.js';
import '../../node_modules/anychart/dist/js/sea.min.js';
import '../../node_modules/anychart/dist/js/wines.min.js';

import '../../node_modules/anychart/dist/js/anychart-annotations.min.js';
import Select from 'react-select';

import '../../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');

var $valueAnalyticChart = "";
var $valueAnalyticChart2 = "";
var $valueType = "";
var $valueType2 = "";


class RelativePerfomanceChart_Base extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stockType: props.charVal,
            stockKey: props.key,
            modeView: props.viewMode,
            sessId: props.sessId,
            defaultStock: '',
            defaultStock2: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.viewMode !== state.modeView) {
            return { modeView: props.viewMode };
        }
        return null;
    }


    dismissModal = () => {
        const modalDialog = document.getElementById("indicatorSettingsModal" + this.state.stockType);
        if (modalDialog.style.display === "none") {
            modalDialog.style.display = "block";
        } else {
            modalDialog.style.display = "none";
            $('#chart-container' + this.state.stockType).show();
        }

        const chartView = document.getElementById("allwrap" + this.state.stockType);
        if (chartView.style.display === "none") {
            chartView.style.display = "block";
        } else {
            chartView.style.display = "none";
            $('#chart-container' + this.state.stockType).show();
        }
    }

    componentDidMount() {
        $('.stockOps').css({
            'color': '#000000',
            'width': '100px'
        });

        const stockName = this.state.stockType;
        const viewMode = this.state.modeView;
        const sessID = this.state.sessId;

        function setColClass($el) {
            // column count for row
            var ROW_COUNT = 12;
            var COLUMN_COUNT = 3;
            var index = $el.find('.col-sm-4').length;
            var lastIndex = $el.find('.col-sm-4').last().index();
            var colClass;

            if (index === COLUMN_COUNT) {
                return
            }

            if (index > COLUMN_COUNT) {
                while (index > COLUMN_COUNT) {
                    index -= COLUMN_COUNT;
                }
            }

            colClass = ROW_COUNT / index;

            while (index) {
                --index;
                $el.find($("[class*='col-sm-']"))
                    .eq(lastIndex - index)
                    .removeClass('col-sm-4')
                    .addClass('col-sm-' + colClass);
            }
        }

        function getInputLabelText(keyText) {
            var text = '';
            var result = [];

            keyText.split(/(?=[A-Z])/).filter(function (item) {
                if (item.length === 1) {
                    text += item;
                } else {
                    text += ' ';
                    text += item;
                }
            });
            text = text.trim();
            text = text[0].toUpperCase() + text.substr(1);

            text.split(' ').filter(function (item, index) {
                if (item.length === 1 && index !== text.split(' ').length - 1) {
                    result.push(item + '-');
                } else {
                    result.push(item);
                }
            });

            return result.join(' ').replace(/-\s/, '-');
        }

        function updateTextForIndicatorTypeSelect($select) {
            if ($select.val()) {
                if ($select.val().length > 1) {
                    $select.find('option:selected').each(function () {
                        $(this).text($(this).attr('data-abbr'))
                    });
                } else {
                    $select.find('option:selected').each(function () {
                        $(this).text($(this).attr('data-full-text'))
                    });
                }

                $select.selectpicker('refresh').closest('.bootstrap-select').find('.dropdown-menu.inner').find('span.text').each(function (index) {
                    $(this).text($select.find('option').eq(index).attr('data-full-text'));
                });
            }
        }

        var zoomLevel = 0.8;
        $('#indicatorSettingsModal' + stockName).css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });
        $('#formInputIndicators' + stockName).css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });

        (function () {
            var $chartDataSelect = $('#chartDataSelect' + stockName);
            var $chartDataSelect2 = $('#chartDataSelect2' + stockName);
            var $seriesTypeSelect = $('#seriesTypeSelect' + stockName);
            var $themeSelect = $('#themeSelect' + stockName);
            var $indicatorTypeSelect = $('#indicatorTypeSelect' + stockName);
            var $indicatorSettingsModal = $('#indicatorSettingsModal' + stockName);
            var $resetBtn = $('#resetButton' + stockName);
            var $showBtn = $('#showButton');
            var $addIndicatorBtn = $('#addIndicatorButton' + stockName);
            var $indicatorNavPanel = $('#indicatorNavPanel' + stockName);
            var $indicatorForm = $('#indicatorForm' + stockName);
            var $loader = $('#loader' + stockName);
            var $annotationType = $('#typeSelect' + stockName);

            var appSettingsCache = {};
            appSettingsCache['data'] = {};
            appSettingsCache['data2'] = {};
            appSettingsCache['chartType'] = 'line';
            appSettingsCache['scale'] = 'linear';
            appSettingsCache['theme'] = $themeSelect.val();
            appSettingsCache['indicators'] = {};
            appSettingsCache['annotations'] = $annotationType.val();

            var dataBaruDariServer = {};
            var dataBaru2DariServer = {};

            var chartContainer = 'chart-container' + stockName;

            var indicatorsSettings = {
                name: '',
                plotIndex: 0,
                defaultSettings: {},
                seriesType: [
                    'area',
                    'column',
                    'jump-line',
                    'line',
                    'marker',
                    'spline',
                    'spline-area',
                    'step-area',
                    'step-line',
                    'stick'
                ]
            };

            var chart;
            var dataTable;
            var dataTable2;

            var inputHtml =
                '<div class="col-sm-4">' +
                '<div class="form-group" id="indicatorFormGroup' + stockName + '">' +
                '<label for="" class="control-label"></label>' +
                '<input type="number" class="form-control" id="">' +
                '</div>' +
                '</div>';

            var selectHtml =
                '<div class="col-sm-4">' +
                '<div class="form-group" id="indicatorFormGroup' + stockName + '">' +
                '<label for="" class="control-label"></label>' +
                '<select class="form-control select show-tick" id=""></select>' +
                '</div>' +
                '</div>';

            var app = {
                createChart: createChart,
                removeChart: removeChart
            };

            // this Sample will properly work only if upload it to a server and access via http or https
            if (window.location.protocol === 'file:') {
                $loader.hide();
                $('.wrapper').hide();
                $('#warning' + stockName).modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }

            // get indicators from file indicators.xml
            $.get("indicators.xml", function (data) {
                $(data).find('indicator').each(function (index, item) {
                    var indicatorName = $(this).attr('type');
                    var description;
                    var $option = $('<option></option>');

                    // create option and append to indicator type select
                    $option.attr({
                        'value': indicatorName,
                        'data-abbr': $(this).find('abbreviation').text(),
                        'data-full-text': $(this).find('title').text()
                    }).text($(this).find('title').text());

                    if ($(this).find('[name="plotIndex"]').length) {
                        $option.attr('data-plot-index', $(this).find('[name="plotIndex"]').attr('value'));
                    }

                    $indicatorTypeSelect.append($option);

                    indicatorsSettings['defaultSettings'][indicatorName] = {};

                    // set indicator settings to indicator object
                    $(item).find('defaults').children().each(function () {
                        var prop = $(this).attr('name');
                        var value = $(this).attr('value');

                        switch ($(this).attr('type')) {
                            case 'number':
                                value = +value;
                                break;
                            case 'array':
                                value = JSON.parse(value);
                                break;
                        }

                        indicatorsSettings['defaultSettings'][indicatorName][prop] = value;
                    });

                    // description from xml
                    description = $(item).find('description').text();

                    // save indicator overview
                    indicatorsSettings['defaultSettings'][indicatorName]['overview'] = {};
                    indicatorsSettings['defaultSettings'][indicatorName]['overview']['title'] = $(item).find('title').text();
                    indicatorsSettings['defaultSettings'][indicatorName]['overview']['description'] = description;
                });

                // sort option in select
                var options = $indicatorTypeSelect.find('option').sort(function (a, b) {
                    return a.value.toUpperCase().localeCompare(b.value.toUpperCase())
                });
                $indicatorTypeSelect.append(options);

                // init selectpicker
                $indicatorTypeSelect.selectpicker();
            });

            $(window).on('resize', initHeightChart);

            $("#rc").change(function() {
                getStock2("select1",$valueAnalyticChart,$valueType);
                // getStock($valueAnalyticChart,$valueAnalyticChart2);
            });
            $("#rc2").change(function() {
                getStock2("select2",$valueAnalyticChart2,$valueType2);
                // getStock($valueAnalyticChart,$valueAnalyticChart2);
            });

            // tess uji coba
            function getStock2(selecType,stok,type){
                var sessidbaru = $("#sessIdAhay").val();
                appSettingsCache['indicators'] = {};
                appSettingsCache['scale'] = 'linear';
                appSettingsCache['chartType'] = 'line';
                appSettingsCache['annotation'] = 'remove';
                appSettingsCache['theme'] = 'defaultTheme';

                // if(stok === 'undefined'){
                //     appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] = [[]];
                // }else {
                if(type == ("stock" || "index")){
                    // kalo pakai fetch
                    fetch('https://bahana.ihsansolusi.co.id:5050/'+type+'/chart/'+stok,
                    // fetch('http://10.1.9.10:5050/chart/'+stok, 
                    // fetch('http://10.1.9.12:5050/chart/'+stok, 
                    {
                        method: 'GET',
                        headers: {
                        "Authorization": sessidbaru,
                    }})
                    .then(data=>{
                        if(data.ok){
                            data.json() 
                            .then(res=>{
                                if(selecType === "select1"){
                                    $('#chartDataSelectchrtRelative').val(stok);
                                    appSettingsCache['data'] = {};
                                    appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] = res.data;
                                    console.log(res.data,"yaa bambang");

                                }else{
                                    $('#chartDataSelect2chrtRelative').val(stok);
                                    appSettingsCache['data2'] = {};
                                    appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = res.data;
                                    console.log(res.data,"yaa bambang");
                                }
                            })
                        }
                    })
                

                    // kalo pakai ajax
                    // $.ajax({
                    //     type: "GET",
                    //     url: "https://bahana.ihsansolusi.co.id:5050/chart/" + stok,
                    //     // url: "http://10.1.9.10:5050/chart/" + stok,
                    //     // url: "http://10.1.9.12:5050/chart/" + stok,
                    //     contentType: "application/json; charset=utf-8",
                    //     headers: {
                    //         "Authorization": sessIdbaru,
                    //     },
                    //     dataType: 'json',
                    //     success: function (result) {                           
                    //         if(selecType === "select1"){
                    //             $('#chartDataSelectchrtRelative').val(stok);
                    //             appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] =result.data.data;
                    //         }else{
                    //             $('#chartDataSelect2chrtRelative').val(stok);
                    //             appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = result.data.data;
                    //         }
                    //     }
                    // });
                }else{
                    alert("apaniiii", stok)
                }
                // if(typeof stok2 == 'undefined'){
                //     appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = [[]];
                // }else {
                // if(stok2 !== 'undefined'){
                //     $.ajax({
                //         type: "GET",
                //         url: "https://bahana.ihsansolusi.co.id:5050/chart/" + stok2,
                //         // url: "http://10.1.9.10:5050/chart/" + stok2,
                //         // url: "http://10.1.9.12:5050/chart/" + stok2,
                //         contentType: "application/json; charset=utf-8",
                //         headers: {
                //             "Authorization": sessIdbaru,
                //         },
                //         dataType: 'json',
                //         success: function (result2) {
                //             $('#chartDataSelect2chrtRelative').val(stok2);
                //             appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = result2.data.data;
                //         }
                //     });
                // }

                $annotationType.val('default').selectpicker('refresh');
                // select series type
                $seriesTypeSelect.val('line').selectpicker('refresh');
                // reset indicators select
                $indicatorTypeSelect.val('').selectpicker('refresh');
                // select chart theme
                $themeSelect.val('defaultTheme').selectpicker('refresh');

                // init, create chart
                app.removeChart();

                app.createChart(chartContainer);

                appSettingsCache['annotation'] = 'remove';

            }

            // ini betul
            function getStock(stok,stok2){
                var sessIdbaru = $("#sessIdAhay").val();
                app.removeChart();
                appSettingsCache['indicators'] = {};
                appSettingsCache['scale'] = 'linear';
                appSettingsCache['chartType'] = 'line';
                appSettingsCache['annotation'] = 'remove';
                appSettingsCache['theme'] = 'defaultTheme';

                // if(stok === 'undefined'){
                //     appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] = [[]];
                // }else {
                if(stok !== 'undefined'){
                    $.ajax({
                        type: "GET",
                        url: "https://bahana.ihsansolusi.co.id:5050/chart/" + stok,
                        // url: "http://10.1.9.10:5050/chart/" + stok,
                        // url: "http://10.1.9.12:5050/chart/" + stok,
                        contentType: "application/json; charset=utf-8",
                        headers: {
                            "Authorization": sessIdbaru,
                        },
                        dataType: 'json',
                        success: function (result) {                           
                            $('#chartDataSelectchrtRelative').val(stok);
                            appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] =result.data.data;
                        }
                    });
                }
                // if(typeof stok2 == 'undefined'){
                //     appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = [[]];
                // }else {
                if(stok2 !== 'undefined'){
                    $.ajax({
                        type: "GET",
                        url: "https://bahana.ihsansolusi.co.id:5050/chart/" + stok2,
                        // url: "http://10.1.9.10:5050/chart/" + stok2,
                        // url: "http://10.1.9.12:5050/chart/" + stok2,
                        contentType: "application/json; charset=utf-8",
                        headers: {
                            "Authorization": sessIdbaru,
                        },
                        dataType: 'json',
                        success: function (result2) {
                            $('#chartDataSelect2chrtRelative').val(stok2);
                            appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = result2.data.data;
                        }
                    });
                }

                $annotationType.val('default').selectpicker('refresh');
                // select series type
                $seriesTypeSelect.val('line').selectpicker('refresh');
                // reset indicators select
                $indicatorTypeSelect.val('').selectpicker('refresh');
                // select chart theme
                $themeSelect.val('defaultTheme').selectpicker('refresh');

                // init, create chart
                app.createChart(chartContainer);

                appSettingsCache['annotation'] = 'remove';

            }

            anychart.onDocumentReady(function () {
                // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
                // (https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js)
                // Load JSON data and create a chart by JSON data.

                var dataInit = [
                    ["2018-03-05", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-06", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-07", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-08", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-09", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-10", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-11", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-12", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-13", 4050, 4060, 4000, 4020, 56394900],
                    ["2018-03-14", 4050, 4060, 4000, 4020, 56394900],
                ];

                //multiple data load ===========================
                anychart.data.loadJsonFile($chartDataSelect.data().json, function (data) {
                    appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] = dataInit;
                });

                anychart.data.loadJsonFile($chartDataSelect2.data().json, function (data2) {
                    appSettingsCache['data2'][$chartDataSelect2.val().toLowerCase().trim()] = dataInit;

                    // init, create chart
                    app.createChart(chartContainer);
                });


                // event to set data to chart
                $annotationType.on('change', function () {

                    let annotationsSelected = $(this).val();
                    appSettingsCache['annotation'] = annotationsSelected;

                    chart.plot().annotations().startDrawing(annotationsSelected);

                    appSettingsCache['annotation'] = annotationsSelected;

                    chart.listen("annotationDrawingFinish", function () {
                        $('#typeSelect' + stockName).val('default').trigger('change');
                        chart.plot().annotations().cancelDrawing();
                    });
                });

                // event to set chart type
                $seriesTypeSelect.on('change', function () {
                    var type = $(this).val();

                    // set chart type
                    chart.plot().getSeries(0).seriesType(type);
                    // save chart type
                    appSettingsCache['chartType'] = type;
                });

                // event to show modal indicator settings
                $indicatorTypeSelect.on('change', function () {

                    if ($(this).val()) {
                        if ($(this).val().length === 1) {
                            updateTextForIndicatorTypeSelect($indicatorTypeSelect);
                        }
                    }

                    if ($(this).val() === null || $(this).val().length < Object.keys(appSettingsCache.indicators).length) {

                        app.removeChart();

                        if ($(this).val() !== null) {
                            for (var keyIndicator in appSettingsCache.indicators) {
                                if (!~$(this).val().indexOf(keyIndicator)) {
                                    delete appSettingsCache.indicators[keyIndicator]
                                }
                            }
                        } else {
                            appSettingsCache.indicators = {};
                        }

                        app.createChart(chartContainer, true);

                        return
                    }

                    for (var i = 0; i < $(this).val().length; i++) {
                        if (!~Object.keys(appSettingsCache.indicators).indexOf($(this).val()[i])) {
                            // set indicator name
                            indicatorsSettings.name = $(this).val()[i];
                            break;
                        }
                    }

                    // set plot index
                    indicatorsSettings.plotIndex = $(this).find('option[value="' + indicatorsSettings.name + '"]').data().plotIndex;

                    if (indicatorsSettings.plotIndex !== 0) {
                        indicatorsSettings.plotIndex = chart.getPlotsCount();
                    }

                    // create html if form (input/select)
                    createHtmlToIndicatorForm();
                    // set default indicator settings to input/select
                    setDefaultIndicatorSettings();

                    $indicatorSettingsModal.show();

                    $('#allwrap' + stockName).hide();
                    $('#chart-container' + stockName).hide();
                    // hide dropdown menu, select
                    $indicatorNavPanel.find('.select.open').removeClass('open');
                });

                // event to change theme
                $themeSelect.on('change', function () {
                    app.removeChart();

                    // save scale type
                    appSettingsCache['theme'] = $(this).val();
                    app.createChart(chartContainer);
                });

                // remove selected class, if indicator not selected
                $indicatorSettingsModal.on('hidden.bs.modal-b', function () {
                    var lastAddedIndicator;

                    for (var i = 0; i < $indicatorTypeSelect.val().length; i++) {
                        if (!~Object.keys(appSettingsCache.indicators).indexOf($indicatorTypeSelect.val()[i])) {
                            // set indicator name
                            lastAddedIndicator = $indicatorTypeSelect.val()[i];
                            break;
                        }
                    }

                    if (!lastAddedIndicator) {
                        // update select text/title
                        updateTextForIndicatorTypeSelect($indicatorTypeSelect);
                        return false
                    }

                    var indexOption = $indicatorTypeSelect.find('[value="' + lastAddedIndicator + '"]').index();

                    // unselect option
                    $indicatorTypeSelect.find('[value="' + lastAddedIndicator + '"]').removeAttr('selected');
                    // remove selected class
                    $indicatorTypeSelect.prev('.dropdown-menu').find('li[data-original-index="' + indexOption + '"]').removeClass('selected');
                    // update select text/title
                    updateTextForIndicatorTypeSelect($indicatorTypeSelect);
                });

                // init selectpicker to all select in indicator settings modal
                $indicatorSettingsModal.on('show.bs.modal-b', function () {
                    $indicatorForm.find('.select').selectpicker();
                });
                $showBtn.on('click', function (e) {
                    e.preventDefault();
                    var resultData = {};
                    var resultData2 = {};
                    if($valueType.length < 1 || $valueType2.length < 1){
                        alert('Mohon isi dulu kedua pilihan');
                        return false;
                    }
                    app.removeChart();

                    $('#chartDataSelectchrtRelative').val($valueAnalyticChart);
                    $('#chartDataSelect2chrtRelative').val($valueAnalyticChart2);

                    $annotationType.val('default').selectpicker('refresh');
                    // select series type
                    $seriesTypeSelect.val('line').selectpicker('refresh');
                    // reset indicators select
                    $indicatorTypeSelect.val('').selectpicker('refresh');
                    // select chart theme
                    $themeSelect.val('defaultTheme').selectpicker('refresh');
                    app.createChart(chartContainer);

                        var sessidbaru = $("#sessIdAhay").val();
                        appSettingsCache['indicators'] = {};
                        appSettingsCache['scale'] = 'linear';
                        appSettingsCache['chartType'] = 'line';
                        appSettingsCache['annotation'] = 'remove';
                        appSettingsCache['theme'] = 'defaultTheme';

                        fetch('https://bahana.ihsansolusi.co.id:5050/'+$valueType+'/chart/'+$valueAnalyticChart,
                            // fetch('http://10.1.9.10:5050/chart/'+stok,
                            // fetch('http://10.1.9.12:5050/chart/'+stok,
                            {
                                method: 'GET',
                                headers: {
                                    "Authorization": sessidbaru,
                                }})
                            .then(data=>{
                                if(data.ok){
                                    data.json()
                                        .then(res=>{
                                               dataTable.addData(res.data);

                                        })
                                }
                            })

                    fetch('https://bahana.ihsansolusi.co.id:5050/'+$valueType2+'/chart/'+$valueAnalyticChart2,
                        // fetch('http://10.1.9.10:5050/chart/'+stok,
                        // fetch('http://10.1.9.12:5050/chart/'+stok,
                        {
                            method: 'GET',
                            headers: {
                                "Authorization": sessidbaru,
                            }})
                        .then(data=>{
                            if(data.ok){
                                data.json()
                                    .then(res=>{
                                       dataTable2.addData(res.data);
                                    })
                            }
                        })



                        // init, create chart





                });

                // reset all settings
                $resetBtn.on('click', function (e) {
                    e.preventDefault();

                    app.removeChart();
                    // reset saved settings
                    appSettingsCache['indicators'] = {};
                    appSettingsCache['scale'] = 'linear';
                    appSettingsCache['chartType'] = 'line';
                    appSettingsCache['annotation'] = 'remove';
                    appSettingsCache['theme'] = 'defaultTheme';

                    $annotationType.val('default').selectpicker('refresh');

                    // select series type
                    $seriesTypeSelect.val('line').selectpicker('refresh');
                    // reset indicators select
                    $indicatorTypeSelect.val('').selectpicker('refresh');
                    // select chart theme
                    $themeSelect.val('defaultTheme').selectpicker('refresh');

                    // init, create chart
                    app.createChart(chartContainer);

                    appSettingsCache['annotation'] = 'remove';
                });

                // event to add indicator
                $addIndicatorBtn.on('click', function () {
                    var mapping = dataTable.mapAs({ 'value': 1, 'volume': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
                    var indicator = indicatorsSettings.defaultSettings[indicatorsSettings.name];
                    var settings = [mapping];
                    var indicatorName = indicatorsSettings.name;

                    // for slow/fast stochastic
                    if (~indicatorName.toLowerCase().indexOf('stochastic')) {
                        indicatorName = 'stochastic';
                    }

                    for (var key in indicator) {
                        if (key !== 'overview' && key !== 'plotIndex') {
                            var val = $('#' + key).val();
                            val = val == 'true' || val == 'false' ? val == 'true' : val;
                            settings.push(val);
                        }
                    }

                    // save settings for indicator
                    appSettingsCache['indicators'][indicatorsSettings.name] = {};
                    appSettingsCache['indicators'][indicatorsSettings.name]['settings'] = settings;
                    appSettingsCache['indicators'][indicatorsSettings.name]['plotIndex'] = indicatorsSettings.plotIndex;

                    var plot = chart.plot(indicatorsSettings.plotIndex);
                    plot[indicatorName].apply(plot, settings);
                    // adding extra Y axis to the right side
                    plot.yAxis(1).orientation('right');

                    // hide indicator settings modal
                    $indicatorSettingsModal.hide();

                    $('#allwrap' + stockName).show();
                    $('#chart-container' + stockName).show();
                });

            });

            function initHeightChart() {
                var creditsHeight = 10;
                var heightView = (viewMode) ? 600 : 295;

                // ganti 440 dengan $(window).height() untuk tinggi otomatis
                $('#chart-container' + stockName).height(heightView - $indicatorNavPanel.outerHeight() - creditsHeight);
            }

            function createChart(container, updateChart) {
                var dataName = $chartDataSelect.val().trim();
                var dataName2 = $chartDataSelect2.val().trim();

                var seriesType = $seriesTypeSelect.val();

                // create data table on loaded data
                dataTable = anychart.data.table();
                dataTable2 = anychart.data.table();

                if (appSettingsCache['theme'] == 'defaultTheme') {
                    anychart.theme(anychart.themes.darkEarth);
                } else {
                    anychart.theme(appSettingsCache['theme']);
                }

                var series;
                var series2;

                // map loaded data
                var mapping = dataTable.mapAs({ 'value': 1, 'volume': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
                var mapping2 = dataTable2.mapAs({ 'value': 1, 'volume': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });

                // console.log('ini data pertama'+appSettingsCache['data'][dataName.toLowerCase()]);


                // create stock chart

                chart = anychart.stock();

                // create plot on the chart
                var plot = chart.plot(0);
                plot.yScale().comparisonMode('percent');
                plot.yAxis().labels().format('{%Value}%');
                plot.yGrid(true)
                    .yMinorGrid(true);

                dataTable.addData(appSettingsCache['data'][dataName.toLowerCase()]);
                dataTable2.addData(appSettingsCache['data2'][dataName2.toLowerCase()]);

                if (updateChart) {
                    var indicatorName;
                    var indicatorPlot;
                    var indicatorSettings = [];

                    if (appSettingsCache['annotation'] == 'remove') {
                        plot.annotations().removeAllAnnotations();
                    }

                    // create line series
                    series = plot[appSettingsCache['chartType']](mapping);
                    series.name(dataName.toUpperCase());

                    plot.yScale(appSettingsCache['scale']);

                    for (var keyIndicator in appSettingsCache['indicators']) {
                        indicatorName = keyIndicator;

                        if (appSettingsCache['indicators'].hasOwnProperty(keyIndicator)) {
                            indicatorSettings = appSettingsCache['indicators'][keyIndicator]['settings'];
                            indicatorSettings[0] = mapping;
                        }

                        // for slow/fast stochastic
                        if (~indicatorName.toLowerCase().indexOf('stochastic')) {
                            indicatorName = 'stochastic';
                        }

                        if (appSettingsCache['indicators'].hasOwnProperty(keyIndicator)) {
                            indicatorPlot = chart.plot(appSettingsCache['indicators'][keyIndicator]['plotIndex']);
                            indicatorPlot[indicatorName].apply(indicatorPlot, indicatorSettings);
                            // adding extra Y axis to the right side
                            indicatorPlot.yAxis(1).orientation('right');
                        }
                    }

                } else {
                    // create line series
                    series = plot['line'](mapping);
                    series.name(dataName.toUpperCase());

                    series2 = plot['line'](mapping2);
                    series2.name(dataName2.toUpperCase());
                }

                series.stroke('2px #64b5f6');

                // setting chart padding to fit both Y axes
                chart.padding(10, 50, 20, 50);

                // create scroller series with mapped data
                chart.scroller().line(mapping);

                // set container id for the chart
                chart.container(container);

                // initiate chart drawing
                chart.draw();

                // create range picker
                var rangePicker = anychart.ui.rangePicker();
                // init range picker
                rangePicker.render(chart);

                // create range selector
                var rangeSelector = anychart.ui.rangeSelector();
                // init range selector
                rangeSelector.render(chart);

                chart.listen('chartDraw', function () {
                    initHeightChart();
                    setTimeout(function () {
                        $loader.hide();
                    }, 100);
                });

                // dataTable2.addData(appSettingsCache['data2'][dataName2.toLowerCase()]);
            }

            function removeChart() {
                if (chart) {
                    chart.dispose();
                    chart = null;
                }
            }

            function createHtmlToIndicatorForm() {
                var $indicatorFormGroup;
                var indicatorSettings = indicatorsSettings.defaultSettings[indicatorsSettings.name];
                var $option;
                var i = 0;

                $('#indicatorSettingsModalTitle' + stockName).text(indicatorsSettings.defaultSettings[indicatorsSettings.name].overview.title);

                // empty form
                $indicatorForm.empty();
                // create row
                $indicatorForm.append('<div class="row"></div>');
                var $indicatorFormRow = $indicatorForm.find('.row');

                for (var key in indicatorSettings) {
                    if (indicatorSettings.hasOwnProperty(key) && key !== 'overview' && key !== 'plotIndex') {

                        if (typeof indicatorSettings[key] === 'string') {
                            $indicatorFormRow.append(selectHtml);
                            $indicatorFormGroup = $('#indicatorFormGroup' + stockName);
                            $indicatorFormGroup.find('select').attr('id', key);
                            $indicatorFormGroup.find('label').attr('for', key).text(getInputLabelText(key));

                            for (i = 0; i < indicatorsSettings.seriesType.length; i++) {
                                $option = $('<option></option>');
                                $option.val(indicatorsSettings.seriesType[i].toLowerCase());
                                $option.text(getInputLabelText(indicatorsSettings.seriesType[i]));
                                $indicatorFormGroup.find('select').append($option);
                            }

                            $indicatorFormGroup.removeAttr('id');

                        } else if (typeof indicatorSettings[key] === 'number') {
                            $indicatorFormRow.append(inputHtml);
                            $indicatorFormGroup = $('#indicatorFormGroup' + stockName);
                            $indicatorFormGroup.find('input').attr('id', key);

                            $indicatorFormGroup.removeAttr('id').find('label').attr('for', key).text(getInputLabelText(key));

                        } else if (typeof indicatorSettings[key] === 'object') {
                            $indicatorFormRow.append(selectHtml);
                            $indicatorFormGroup = $('#indicatorFormGroup' + stockName);
                            $indicatorFormGroup.find('select').attr('id', key);
                            $indicatorFormGroup.find('label').attr('for', key).text(getInputLabelText(key));

                            for (i = 0; i < indicatorSettings[key].length; i++) {
                                $option = $('<option></option>');
                                $option.val(indicatorSettings[key][i].toLowerCase());
                                $option.text(indicatorSettings[key][i]);
                                $indicatorFormGroup.find('select').append($option);
                            }

                            $indicatorFormGroup.removeAttr('id');
                        }
                    }
                }

                // col class to form el
                setColClass($indicatorForm);
                // indicator overview text
                $indicatorForm.find($("[class*='col-sm-']")).last().after('<div class="col-xs-12" id="overviewText"></div>');
                $indicatorForm.find('#overviewText').append(indicatorsSettings.defaultSettings[indicatorsSettings.name].overview.description);
            }

            function setDefaultIndicatorSettings() {

                var indicatorSettings = indicatorsSettings.defaultSettings[indicatorsSettings.name];

                for (var key in indicatorSettings) {
                    if (indicatorSettings.hasOwnProperty(key) && key !== 'overview' && key !== 'plotIndex') {
                        $('#' + key).val(indicatorSettings[key]);
                    }
                }
            }
        })();

    }

    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#3D3E3F' : '#CDCDCE',
            neutral20: this.props.thememode === true ? '#333332' : '#E9E9E9',
            neutral30: this.props.thememode === true ? '#333332' : '#E9E9E9',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#878787',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#4D4D4E' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#202020' : '#ece9ea',
            primary: '#0071BC',
        },
    });

    changelist = event => {
        $valueAnalyticChart = event.value;
        $valueType = event.desc;
        // $("#rc").change();
    }
    changelist2 = event => {
        $valueAnalyticChart2 = event.value;
        $valueType2 = event.desc;
        // $("#rc2").change();
    }

    render() {

        let styleses = {
            display: 'flex',
            padding: '5px 10px 0px 10px',
            marginTop: '5px'
        };

        let containerStyle = {
            padding: '0px 10px',
        }

        let marginSelection = {
            marginLeft: '2px'
        }

        let modalColor = {
            backgroundColor: '#383e44'
        }

        let formButton = {
            position: 'relative',
            zIndex: '999'
        }

        let customStylesBtn = {
            marginLeft: '1px'
        }

        const customStyles = {
            control: (base, state) => ({
                ...base,
                height: '33px',
                'min-height': '33px',
            }),
        };

        const customFilter  = (option, searchText) => {
            var code = option.data.code.toLowerCase().includes(searchText.toLowerCase());
            var saham = option.data.saham.toLowerCase().includes(searchText.toLowerCase());

            if(searchText.toLowerCase().includes(' ')){
                if(saham){
                    return true;
                }
            } else {
                if (code) {
                    return true;
                }
            }
        };
        const stockOptions = [
            { value:'BMPT', code: 'BMPT', saham: 'Bumi Mega Pertama ' , id: this.state.stockType, desc: 'stock'},
            { value:'BNMPT-PPT', code: 'BNMP-PPT', saham: 'Bumi Nusa Putra ' , id: this.state.stockType, desc: 'stock'},
            { value:'BUMI', code: 'BUMI', saham: 'Bumi Resource ' , id: this.state.stockType, desc: 'stock'},
            { value:'ASII', code: 'ASII', saham: 'Argo Astra Lestari ' , id: this.state.stockType, desc: 'stock'},
            { value:'TLKM', code: 'TLKM', saham: 'Telekomunikasi Indonesia ' , id: this.state.stockType, desc: 'stock'},
            { value:'WSKT', code: 'WSKT', saham: 'Waskita ' , id: this.state.stockType, desc: 'stock'},
            { value:'INDF', code: 'INDF', saham: 'Indofood ' , id: this.state.stockType, desc: 'stock'},
            { value:'BBCA', code: 'BBCA', saham: 'Bank BCA ' , id: this.state.stockType, desc: 'stock'},
            { value:'SMRG', code: 'SMGR', saham: 'Semen Indonesia ' , id: this.state.stockType, desc: 'stock'},
            { value:'BBRI', code: 'BBRI', saham: 'Bank BRI ' , id: this.state.stockType, desc: 'stock'}
        ];

        const { selectedStock } = this.state.defaultStock;
        const { selectedStock2 } = this.state.defaultStock2;

        let elemWidthIndicator = (this.props.chartMode) ? 350 : 180;
        let elemWidthanotation = (this.props.chartMode) ? 250 : 147;
        return (
            <div>
                < div id={"loader" + this.state.stockType} className="anychart-loader" >
                    <div className="rotating-cover">
                        <div className="rotating-plane">
                            <div className="chart-row">
                                <span className="chart-col green"></span>
                                <span className="chart-col orange"></span>
                                <span className="chart-col red"></span>
                            </div>
                        </div>
                    </div>
                </div >

                {/* <!-- modal alert --> */}
                < div className="modal-b fade" id={"warning" + this.state.stockType} tabindex="-1" role="dialog" >
                    <div className="modal-dialog-b" role="document">
                        <div className="modal-content-b">
                            <div className="modal-header-b">
                                <h4 className="modal-title-b">Attention</h4>
                            </div>
                            <div className="modal-body-b">
                                <div className="alert alert-danger"><strong>XHR Fail: </strong>
                                    This Sample will properly work only if upload it to a server and access via http or https.
						Please see <a href="https://github.com/anychart-solutions/technical-indicators"
                                        target="_blank">https://github.com/anychart-solutions/technical-indicators</a> to learn more.
					</div>
                            </div>
                        </div>
                    </div>
                </div >

                {/* <!-- modal indicator settings --> */}
                < div className="modal-indicator-b" id={"indicatorSettingsModal" + this.state.stockType} tabindex="-1" role="dialog" hidden >
                    <div className="modal-dialog-b" role="document">
                        <div className="modal-content-b" style={modalColor} >
                            <div className="modal-header-b">
                                <button type="button" className="close" onClick={this.dismissModal} data-dismiss="modal-b" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title-b" id={"indicatorSettingsModalTitle" + this.state.stockType}>Indicator Settings</h4>
                            </div>
                            <div className="modal-body-b">
                                <form id={"indicatorForm" + this.state.stockType} className="form"></form>
                            </div>
                            <div className="modal-footer-b">
                                <button type="button" className="btn btn-default" onClick={this.dismissModal} data-dismiss="modal-b">Close</button>
                                <button type="button" className="btn btn-primary" id={"addIndicatorButton" + this.state.stockType}>Add Indicator</button>
                            </div>
                        </div>
                    </div>
                </div >

                <div id={"allwrap" + this.state.stockType} className="f-12" style={formButton}>
                    <div className="row" id={"formInputIndicators" + this.state.stockType}>
                        <div className="col-xs-12 col-sm-6 col-md-12">
                            <ul className="list list-unstyled list-nav" id={"indicatorNavPanel" + this.state.stockType} style={styleses}>
                                <div className="form-group col-sm-2 px-0 pt-1 mb-0">
                                    <li style={marginSelection}>
                                        <Select
                                            maxMenuHeight={200}
                                            maxMenuWidth={300}
                                            styles={customStyles}
                                            placeholder={<div>Search..</div>}
                                            // options={this.props.relativelistOptions}
                                            options={stockOptions}
                                            getOptionLabel={(stockOptions) => `${stockOptions.code} - ${stockOptions.saham}`}
                                            id={"rc"}
                                            className="stockPageSelect text-left"
                                            theme={this.selectSelectionTab}
                                            onChange={this.changelist}
                                            filterOption={customFilter}
                                            value={selectedStock}
                                        />
                                    </li>
                                </div>
                                <div className="form-group col-sm-2 px-0 pt-1 mb-0">
                                    <li style={marginSelection}>
                                        <Select
                                            maxMenuHeight={200}
                                            maxMenuWidth={300}
                                            styles={customStyles}
                                            placeholder={<div>Search..</div>}
                                            // options={this.props.relativelistOptions}
                                            options={stockOptions}
                                            getOptionLabel={(stockOptions) => `${stockOptions.code} - ${stockOptions.saham}`}
                                            id={"rc2"}
                                            className="stockPageSelect text-left"
                                            theme={this.selectSelectionTab}
                                            onChange={this.changelist2}
                                            filterOption={customFilter}
                                            value={selectedStock2}
                                        />
                                    </li>
                                </div>

                                <div className="form-inline">
                                    <div className="form-group">
                                        <input type="hidden" id={"chartDataSelect" + this.state.stockType} value="" data-json="./msft.json" />
                                        <input type="hidden" id={"chartDataSelect2" + this.state.stockType} value="" data-json="./ibm.json" />

                                        <li style={marginSelection}>
                                            <select data-width={elemWidthanotation} data-size="10" data-dropup-auto="false" data-style="btn-dark" defaultValue={'default'} id={"typeSelect" + this.state.stockType} onclick="create()" className="select selectpicker show-tick form-control" title="Select Annotation Type">
                                                <option value="default" selected>Annotation Type</option>
                                                <option value="andrews-pitchfork">Andrews' Pitchfork</option>
                                                <option value="ellipse">Ellipse</option>
                                                <option value="fibonacci-arc">Fibonacci Arc</option>
                                                <option value="fibonacci-fan">Fibonacci Fan</option>
                                                <option value="fibonacci-retracement">Fibonacci Retracement</option>
                                                <option value="fibonacci-timezones">Fibonacci Time Zones</option>
                                                <option value="horizontal-line">Horizontal Line</option>
                                                <option value="infinite-line">Infinite Line</option>
                                                <option value="line">Line Segment</option>
                                                <option value="marker">Marker</option>
                                                <option value="ray">Ray</option>
                                                <option value="rectangle">Rectangle</option>
                                                <option value="trend-channel">Trend Channel</option>
                                                <option value="triangle">Triangle</option>
                                                <option value="vertical-line">Vertical Line</option>
                                            </select>
                                        </li>
                                    </div>
                                    <div className="form-group">
                                        <li style={marginSelection}>
                                            <select className="select show-tick form-control" data-size="10" data-dropup-auto="false" data-style="btn-dark" multiple name="" data-width={elemWidthIndicator} id={"indicatorTypeSelect" + this.state.stockType}
                                                title="Add Indicator">
                                            </select>
                                        </li>
                                    </div>
                                    <div className="form-group">
                                        <li style={marginSelection}>
                                            <select id={"themeSelect" + this.state.stockType} data-size="10" data-dropup-auto="false" data-width="81" data-style="btn-dark" className="select selectpicker show-tick form-control" title="Theme">
                                                <option value="defaultTheme" selected>Theme</option>
                                                <option value="lightBlue">Light Blue</option>
                                                <option value="lightEarth">Light Earth</option>
                                                <option value="darkGlamour">Dark Glamour</option>
                                                <option value="lightGlamour">Light Glamour</option>
                                                <option value="darkProvence">Dark Provence</option>
                                                <option value="lightProvence">Light Provence</option>
                                                <option value="darkTurquoise">Dark Turquoise</option>
                                                <option value="lightTurquoise">Light Turquoise</option>
                                                <option value="coffee">Coffee</option>
                                                <option value="monochrome">Monochrome</option>
                                                <option value="morning">Morning</option>
                                                <option value="pastel">Pastel</option>
                                                <option value="sea">Sea</option>
                                                <option value="wines">Wines</option>
                                            </select>
                                        </li>
                                    </div>
                                    <div className="form-group">
                                        <li style={marginSelection}><a className="btn btn-danger" style={customStylesBtn} href="" id={"resetButton" + this.state.stockType}>Reset</a></li>
                                    </div>
                                    <div className="form-group">
                                        <li style={marginSelection}><a className="btn btn-primary" style={customStylesBtn} id={"showButton"}>Show Graph</a></li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <input type="hidden" value={this.props.sessId} id={"sessIdAhay"}/>
                <div id={"chart-container" + this.state.stockType} className="card-452" style={containerStyle}></div>
            </div>
        );
    }
}
const RelativePerfomanceChart = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        chartMode: vars.chartMode,
        sessId: vars.sessionID,
        // stocklistOptions:vars.stocklistOptions,
        relativelistOptions:vars.relativelistOptions,
    }),
)(RelativePerfomanceChart_Base);
export default RelativePerfomanceChart;