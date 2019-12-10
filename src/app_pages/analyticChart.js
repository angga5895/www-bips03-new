import React from 'react';
import { AppFrameAction } from '../appframe.js';
import anychart from 'anychart';
import '../../node_modules/anychart/dist/css/anychart-ui.min.css';
import '../../node_modules/anychart/dist/js/anychart-ui.min.js';
import '../../node_modules/anychart/dist/fonts/css/anychart-font.min.css';
import '../../node_modules/anychart/dist/js/anychart-data-adapter.min.js';
import { ContextConnector } from '../appcontext.js';
import { BIPSAppContext } from '../AppData.js';

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

const stockOptions = [
    { value: 'aali', label: 'AALI' },
    { value: 'adhi', label: 'ADHI' },
    { value: 'antm', label: 'ANTM' },
    { value: 'asii', label: 'ASII' },
    { value: 'tlkm', label: 'TLKM' },
    { value: 'wskt', label: 'WSKT' },
    { value: 'indf', label: 'INDF' },
    { value: 'bbca', label: 'BBCA' },
    { value: 'smgr', label: 'SMGR' },
    { value: 'bbri', label: 'BBRI' }
]

var $valueAnalyticChart = "";

class AnalyticChart_Base extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stockType: props.charVal,
            stockData: props.chartData,
            stockAlias: props.chartAlias,
            stockKey: props.key,
            modeView: props.viewMode,
            sessID: props.sessId,
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
        const sessID = this.state.sessID;

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

        function GetRangeDate(type,data){
            if(data.length){
                if(type === 'start'){
                    var start = data[0]
                    return start[0]
                }else if(type === 'finish'){
                    var finish = data[data.length-1]
                    return finish[0]
                }
            }
        }

        (function () {
            var $chartDataSelect = $('#chartDataSelect' + stockName);
            var $seriesTypeSelect = $('#seriesTypeSelect' + stockName);
            var $themeSelect = $('#themeSelect' + stockName);
            var $indicatorTypeSelect = $('#indicatorTypeSelect' + stockName);
            var $indicatorSettingsModal = $('#indicatorSettingsModal' + stockName);
            var $resetBtn = $('#resetButton' + stockName);
            var $addIndicatorBtn = $('#addIndicatorButton' + stockName);
            var $indicatorNavPanel = $('#indicatorNavPanel' + stockName);
            var $indicatorForm = $('#indicatorForm' + stockName);
            var $loader = $('#loader' + stockName);
            var $annotationType = $('#typeSelect' + stockName);
            var firstDate = '';
            var lastDate = '';
            var appSettingsCache = {};
            appSettingsCache['data'] = {};
            appSettingsCache['chartType'] = $seriesTypeSelect.val();
            appSettingsCache['scale'] = 'linear';
            appSettingsCache['theme'] = $themeSelect.val();
            appSettingsCache['indicators'] = {};
            appSettingsCache['annotations'] = $annotationType.val();

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

            anychart.onDocumentReady(function () {
                // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
                // (https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js)
                // Load JSON data and create a chart by JSON data.

                firstDate = GetRangeDate('start', '');
                lastDate = GetRangeDate('finish', '');
                //perubahan menjadi single data ===========================
                // anychart.data.loadJsonFile($chartDataSelect.data().json, function (data) {
                    appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] = [[]];
                    // init, create chart
                    app.createChart(chartContainer);
                // });


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
                    $seriesTypeSelect.val('candlestick').selectpicker('refresh');
                    // reset indicators select
                    $indicatorTypeSelect.val('').selectpicker('refresh');
                    // select chart theme
                    $themeSelect.val('defaultTheme').selectpicker('refresh');

                    // init, create chart
                    app.createChart(chartContainer);

                    appSettingsCache['annotation'] = 'remove';
                });

                //Zaky ampe end
                $("#stockoptionchrtStock").change(function() {
                    getStock($valueAnalyticChart,'analytic stock');
                });

                $("#stockoptionchart1").change(function() {
                    getStock($valueAnalyticChart,'chart 1');
                });

                $("#stockoptionchart2").change(function() {
                    getStock($valueAnalyticChart,'chart 2');
                });

                $("#stockoptionchart3").change(function() {
                    getStock($valueAnalyticChart,'chart 3');
                });

                $("#stockoptionchart4").change(function() {
                    getStock($valueAnalyticChart,'chart 4');
                });
                $("#stockoptionchrtIndice").change(function() {
                    getStock($valueAnalyticChart,'indice stock');
                });

                //Zaky end

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

                function getStock(stok,to){
                    var sessidbaru = $("#sessIdAhay").val();
                    $.ajax({
                        type: "GET",
                        url: "http://bahana.ihsansolusi.co.id:5050/chart/"+stok,
                        contentType: "application/json; charset=utf-8",
                        headers: {
                            "Authorization": sessidbaru,
                        },
                        dataType: 'json',
                        success: function (result) {
                            app.removeChart();
                            appSettingsCache['indicators'] = {};
                            appSettingsCache['scale'] = 'linear';
                            appSettingsCache['chartType'] = 'line';
                            appSettingsCache['annotation'] = 'remove';
                            appSettingsCache['theme'] = 'defaultTheme';
                            appSettingsCache['data'][to] = JSON.parse(result.data.data);
                            $annotationType.val('default').selectpicker('refresh');

                            // select series type
                            $seriesTypeSelect.val('candlestick').selectpicker('refresh');
                            // reset indicators select
                            $indicatorTypeSelect.val('').selectpicker('refresh');
                            // select chart theme
                            $themeSelect.val('defaultTheme').selectpicker('refresh');
                            // init, create chart
                            app.createChart(chartContainer);

                            appSettingsCache['annotation'] = 'remove';
                        }
                    });
                }

            });

            function initHeightChart() {
                var creditsHeight = 10;
                var heightView = (viewMode) ? 452 : 295;

                // ganti 440 dengan $(window).height() untuk tinggi otomatis
                $('#chart-container' + stockName).height(heightView - $indicatorNavPanel.outerHeight() - creditsHeight);
            }

            function createChart(container, updateChart) {
                var dataName = $chartDataSelect.val().trim();

                var seriesType = $seriesTypeSelect.val();

                // create data table on loaded data
                dataTable = anychart.data.table();

                if (appSettingsCache['theme'] == 'defaultTheme') {
                    anychart.theme(anychart.themes.darkEarth);
                } else {
                    anychart.theme(appSettingsCache['theme']);
                }

                var series;

                // map loaded data
                var mapping = dataTable.mapAs({ 'value': 1, 'volume': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });

                // create stock chart
                chart = anychart.stock();

                // create plot on the chart
                var plot = chart.plot(0);

                dataTable.addData(appSettingsCache['data'][dataName.toLowerCase()]);

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
                    series = plot[seriesType](mapping);
                    series.name(dataName.toUpperCase());

                    // create volume series on the plot
                    var volumeSeries1 = plot.volumeMa(mapping, 5, "sma", "column", "line");
                    volumeSeries1.volumeSeries().stroke(null);
                    volumeSeries1.volumeSeries().fill("#455a64 0.4");
                    volumeSeries1.volumeSeries().maxHeight('30%');
                    volumeSeries1.volumeSeries().bottom(0);
                    volumeSeries1.maSeries().stroke("1.5 #ff6d00");
                    volumeSeries1.maSeries().maxHeight('30%');
                    volumeSeries1.maSeries().bottom(0);
                }

                series.stroke('2px #64b5f6');

                // adding extra Y axis to the right side
                var yAxis = plot.yAxis(1);
                yAxis.orientation('right');
                // setting chart padding to fit both Y axes
                chart.padding(10, 50, 20, 50);

                // create scroller series with mapped data
                chart.scroller().line(mapping);

                // set chart selected date/time range
                chart.selectRange(firstDate, lastDate);

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

    changelist(e){
        // $("#stockoption "+selop).change();
        // console.log(e.target.id);
        if(e.target.value.length > 0) {
            $valueAnalyticChart = e.target.value;
            $("#" + (e.target.id)).change();
        }else{
            return false;
        }
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
                height: '34px',
                'min-height': '34px',
            }),
        };

        let elemWidthIndicator = (this.props.chartMode) ? 350 : 180;
        let elemWidthanotation = (this.props.chartMode) ? 250 : 147;

        if (this.props.chartMode === true){
            if(this.state.stockType === 'chrtStock' || this.state.stockType === 'chrtIndice'){
                var classChart = 'card-452';
            } else {
                var classChart = 'card-452';
            }
        } else {
            if(this.state.stockType === 'chrtStock' || this.state.stockType === 'chrtIndice'){
                var classChart = 'card-452';
            } else {
                var classChart = 'card-190';
            }
        }

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
                                        target="_blank">https://github.com/anychart-solutions/technical-indicators</a> to learn
more.
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
                                <div className="form-inline">
                                    <div className="form-group">
                                        <li style={marginSelection}>
                                            <input type="hidden" id={"chartDataSelect" + this.state.stockType} value={this.state.stockAlias} data-json={"./" + this.state.stockData} />
                                            <div className="input-group mr-1 stockOptionInputGroup">
                                                <input id={"stockoption"+this.state.stockType} style={{borderRight:'none'}} list="brow" className="select selectpicker show-tick stockOptionInput n-border-right form-control"
                                                       onChange={this.changelist} placeholder="Search"/>
                                                <datalist id="brow" className="text-basic listOpt">
                                                    <option value="AALI"/>
                                                    <option value="ADHI"/>
                                                    <option value="ANTM"/>
                                                    <option value="ASII"/>
                                                    <option value="TLKM"/>
                                                    <option value="WSKT"/>
                                                    <option value="INDF"/>
                                                    <option value="BBCA"/>
                                                    <option value="SMGR"/>
                                                    <option value="BBRI"/>
                                                </datalist>
                                                <span
                                                    className="input-group-addon ml-0 pl-1 n-border-left"><i className="fa fa-search"></i></span>
                                            </div>
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
                                            <select name="" id={"seriesTypeSelect" + this.state.stockType} data-width={elemWidthanotation} data-size="10" data-dropup-auto="false" data-style="btn-dark" className="select selectpicker show-tick form-control">
                                                {/* <!--series constructors--> */}
                                                <option value="area">Area Chart</option>
                                                <option value="candlestick" selected>Candlestick Chart</option>
                                                <option value="column">Column Chart</option>
                                                <option value="jumpLine">Jump Line Chart</option>
                                                <option value="line">Line Chart</option>
                                                <option value="marker">Marker Chart</option>
                                                <option value="ohlc">OHLC Chart</option>
                                                <option value="rangeArea">Range Area Chart</option>
                                                <option value="rangeColumn">Range Column Chart</option>
                                                <option value="rangeSplineArea">Range Spline Area Chart</option>
                                                <option value="rangeStepArea">Range Step Area Chart</option>
                                                <option value="spline">Spline Chart</option>
                                                <option value="splineArea">Spline Area Chart</option>
                                                <option value="stepArea">Step Area Chart</option>
                                                <option value="stepLine">Step Line Chart</option>
                                                <option value="stick">Stick Chart</option>
                                                {/* <!----> */}
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
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <input type="hidden" value={this.props.sessId} id={"sessIdAhay"}/>
                <div id={"chart-container" + this.state.stockType} className={classChart} style={containerStyle}></div>
            </div>
        );
    }
}

const AnalyticChart = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        chartMode: vars.chartMode,
        sessId: vars.sessionID,

    }),
)(AnalyticChart_Base);

export default AnalyticChart;
