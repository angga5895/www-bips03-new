import React, { Component } from 'react';
import { AppFrameAction } from '../appframe.js';
import anychart from 'anychart';
import AnyChart from '../../node_modules/anychart-react/dist/anychart-react.min.js'
import '../../node_modules/anychart/dist/css/anychart-ui.min.css';
import '../../node_modules/anychart/dist/js/anychart-ui.min.js';
import '../../node_modules/anychart/dist/fonts/css/anychart-font.min.css';
import '../../node_modules/anychart/dist/js/anychart-data-adapter.min.js'
import '../../node_modules/anychart/dist/js/anychart-annotations.min.js';

import '../../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');

class StockChart extends Component {

    componentDidMount() {
        $('#chart-container').css('height', '100%');
    }

    render() {

        anychart.onDocumentReady(function () {
            // The data used in this sample can be obtained from the CDN
            anychart.data.loadCsvFile('aapl-daily.csv', function (data) {
                // create data table on loaded data
                createChart(data);
            });

        });

        var chart = anychart.stock();

        function createChart(data) {
            var dataTable = anychart.data.table();
            dataTable.addData(data);

            // map loaded data
            var mapping = dataTable.mapAs({
                open: 1,
                high: 2,
                low: 3,
                close: 4,
                value: {
                    column: 6,
                    type: 'sum'
                }
            });

            // create stock chart
            // var chart = anychart.stock();
            // set chart padding
            chart.padding().right(60);

            // create plot on the chart
            var plot = chart.plot(0);

            // enabled x-grid/y-grid
            plot.xGrid(true).yGrid(true);

            // set orientation y-axis to the right side
            plot.yAxis().orientation('right');

            // create candlestick series on the plot
            var aaplSeries = plot.candlestick(mapping);
            // set series settings
            aaplSeries.name('AAPL').zIndex(50);
            aaplSeries.risingFill('green', 0.5).fallingFill('red', 0.5).risingStroke('green', 0.5).fallingStroke('red', 0.5);

            // create EMA indicators with period 50 on the plot
            // var ema = plot.ema(dataTable.mapAs({
            //     'value': 4
            // }));
            // ema.series().stroke('1.5 #5FB1EE');

            // create volume series on the plot
            var volumeSeries = plot.column(mapping);
            // set series settings
            volumeSeries.name('Volume').zIndex(100).maxHeight('20%').bottom(0);
            volumeSeries.legendItem({
                iconEnabled: false,
                textOverflow: ''
            });

            // create a logarithmic scale
            var customScale = anychart.scales.log();
            // sets y-scale
            volumeSeries.yScale(customScale);

            // set volume rising and falling stroke settings
            volumeSeries.risingStroke('red');
            volumeSeries.fallingStroke('green');

            // set volume rising and falling fill settings
            volumeSeries.risingFill('red .5');
            volumeSeries.fallingFill('green .5');

            // set chart selected date/time range
            chart.selectRange('2016-07-01', '2016-12-30');

            chart.background().fill("none");

            // set container id for the chart
            // chart.container(container);

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
        }

        return (
            // <div id="container" style={chartDisplay}></div>
            <AnyChart instance={chart} id="chart-container" title="Stock Info" />
        );
    }
}

export default StockChart;
