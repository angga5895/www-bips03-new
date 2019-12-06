import React from 'react';
import { AppFrameAction } from '../appframe.js';
import anychart from 'anychart';
import '../../node_modules/anychart/dist/css/anychart-ui.min.css';
import '../../node_modules/anychart/dist/js/anychart-ui.min.js';
import '../../node_modules/anychart/dist/fonts/css/anychart-font.min.css';
import '../../node_modules/anychart/dist/js/anychart-data-adapter.min.js'
/*import '../../node_modules/anychart/dist/js/dark_earth.min.js';*/
import '../../node_modules/anychart/dist/js/anychart-annotations.min.js';

import '../../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');

class StreamChart extends React.PureComponent {

    componentDidMount() {
        anychart.onDocumentReady(function () {

            /*
            An interval ticker and random number generators simulate incoming data.
                For the demonstration purposes the time is “accelerated”.
            */

            //create new point every 1 minute
            var period = 60000;
            //new price ticks come every 15 seconds
            var tickPeriod = 15000;

            var stage = anychart.graphics.create("container");

            // create and tune the chart
            var chart = anychart.stock();
            var plot = chart.plot();

            chart.grouping();

            //create OHLC series
            var ohlcSeries = plot.ohlc().name('OHLC');

            // create dataset
            var dataset = anychart.data.table();
            dataset.addData(getData());

            //map data
            var mapping = dataset.mapAs({
                x: 0,
                open: 1,
                high: 2,
                low: 3,
                close: 4
            });

            //set mapping to both series
            ohlcSeries.data(mapping);

            //render chart
            chart.container(stage).draw();

            /* --- simulation code --- */

            //create empty array for point data update
            var newDataRow = [];
            newDataRow[0] = new Array(5);
            //current price variable
            var price = null;

            //select the last point from existing datatable
            var selectable = mapping.createSelectable();
            selectable.selectAll();
            var iterator = selectable.getIterator();

            while (iterator.advance()) {
                //put data from the last exsiting point
                newDataRow[0][0] = iterator.get('x');
                newDataRow[0][1] = iterator.get('open');
                newDataRow[0][2] = iterator.get('high');
                newDataRow[0][3] = iterator.get('low');
                newDataRow[0][5] = iterator.get('close');
            }
            //timestamp variable for incoming ticks
            var newTimestamp = newDataRow[0][0];

            //simulate price ticker
            window.setInterval(stream, 500);

            //updating chart handler
            function stream() {
                //get new price
                price = randomPrice();
                //get timestamp of incoming price tick
                newTimestamp += tickPeriod;

                //current point update or create new point
                if (newTimestamp - newDataRow[0][0] <= period) {
                    //set price as close for existing point
                    newDataRow[0][4] = price;
                    //update min and max
                    if (newDataRow[0][2] < price) {
                        newDataRow[0][2] = price;
                    } else if (newDataRow[0][3] > price) {
                        newDataRow[0][3] = price;
                    }
                } else {
                    //erase update data array
                    newDataRow[0] = new Array(5);
                    //set data for the new point
                    newDataRow[0][0] = newTimestamp;
                    newDataRow[0][1] = price;
                    newDataRow[0][2] = price;
                    newDataRow[0][3] = price;
                    newDataRow[0][4] = price;
                }
                dataset.addData(newDataRow);
            }
        });

        function randomPrice() {
            return (Math.random() * (24 - 22) + 22).toFixed(2);
        }

        function getData() {
            return [[1508889600000, 18.23, 19.36, 18.18, 19.31, 116002], [1508889660000, 19.5, 19.89, 19, 19.29, 113146], [1508889720000, 19.13, 19.15, 18.43, 18.75, 88690], [1508889780000, 18.54, 18.76, 18.27, 18.76, 80909], [1508889840000, 18.76, 19.14, 18.63, 18.76, 94782], [1508889900000, 18.97, 19.62, 18.96, 19.19, 133294], [1508889960000, 19.45, 19.7, 19.22, 19.67, 136209], [1508890020000, 19.69, 19.85, 19.37, 19.59, 136739], [1508890080000, 19.44, 19.55, 19, 19.35, 45322], [1508890140000, 19.21, 19.25, 18.51, 18.83, 37537], [1508890200000, 19.16, 19.78, 18.99, 19.76, 37994], [1508890260000, 19.69, 19.69, 19, 19.2, 114186], [1508890320000, 18.89, 18.95, 18.57, 18.61, 61185], [1508890380000, 18.59, 19.08, 18.57, 18.97, 40558], [1508890440000, 18.76, 19.19, 18.7, 18.78, 54007], [1508890500000, 18.92, 18.94, 18.47, 18.92, 65713], [1508890560000, 19.82, 21.2, 19.5, 20.91, 114016], [1508890620000, 20.55, 20.82, 20.28, 20.4, 100002], [1508890680000, 20.25, 20.27, 19.79, 19.93, 112040], [1508890740000, 20.11, 20.89, 20.06, 20.25, 106204], [1508890800000, 20.6, 21.1, 20.01, 20.26, 43234], [1508890860000, 20.19, 20.35, 19.86, 20.24, 45577], [1508890920000, 20.37, 20.4, 19.98, 20.19, 138514], [1508890980000, 20.14, 20.24, 19.64, 19.79, 15961], [1508891040000, 20.06, 20.07, 19.61, 19.79, 4816], [1508891100000, 19.96, 19.99, 19.14, 19.32, 42609], [1508891160000, 19.46, 19.64, 19.14, 19.42, 100893], [1508891220000, 19.2, 19.73, 19.01, 19.32, 106489], [1508891280000, 19.51, 20.06, 19.47, 19.89, 86507], [1508891340000, 19.92, 20, 19.67, 19.75, 122805], [1508891400000, 19.83, 20.23, 19.8, 20.06, 38734], [1508891460000, 20.13, 20.5, 19.98, 20.22, 128804], [1508891520000, 20.36, 20.6, 20.24, 20.6, 30999], [1508891580000, 20.51, 20.74, 20.25, 20.31, 45246], [1508891640000, 20.41, 20.69, 20.22, 20.38, 101014], [1508891700000, 20.14, 20.23, 19.51, 19.82, 119823], [1508891760000, 19.93, 20.17, 19.47, 19.75, 73663], [1508891820000, 19.54, 20.45, 19.45, 20.34, 56848], [1508891880000, 20.25, 20.6, 20.07, 20.13, 133059], [1508891940000, 20.32, 20.63, 20.05, 20.45, 41431], [1508892000000, 20.56, 20.94, 20.3, 20.89, 30151], [1508892060000, 21, 21.5, 20.86, 21.4, 82553], [1508892120000, 21.36, 21.98, 21.2, 21.4, 81917], [1508892180000, 21.31, 21.76, 21.29, 21.73, 52368], [1508892240000, 21.77, 21.9, 21.58, 21.83, 20181], [1508892300000, 21.96, 22.31, 21.81, 22.14, 112622], [1508892360000, 21.98, 22.32, 21.63, 22.05, 99857], [1508892420000, 22.06, 22.32, 21.88, 22.08, 105763], [1508892480000, 22.17, 22.62, 22.12, 22.55, 118968], [1508892540000, 22.59, 23.26, 22.57, 22.83, 12246], [1508892600000, 22.9, 23.38, 22.74, 23.33, 134378], [1508892660000, 23.23, 23.54, 23.02, 23.42, 117356], [1508892720000, 23.47, 24.11, 23.44, 23.45, 71104], [1508892780000, 23.5, 23.82, 23.17, 23.68, 44932], [1508892840000, 23.62, 23.69, 23.3, 23.5, 87991], [1508892900000, 24.04, 24.34, 23.75, 24.07, 91442], [1508892960000, 23.95, 23.95, 23.25, 23.28, 34895], [1508893020000, 23.38, 23.66, 23.21, 23.34, 88422], [1508893080000, 23.45, 23.75, 23.36, 23.47, 65606], [1508893140000, 23.43, 23.92, 23.2, 23.79, 127863], [1508893200000, 23.57, 23.69, 23.32, 23.35, 81565], [1508893260000, 23.6, 24.03, 23.55, 23.86, 56219], [1508893320000, 23.97, 24.24, 23.63, 23.77, 89107], [1508893380000, 24.05, 24.3, 23.96, 24.04, 94978], [1508893440000, 23.76, 24.04, 23.21, 23.37, 83000]];
        }
    }

    render() {
        return (
            <div>
                <div id="container" className="mt-2 py-3 px-3 card-470"></div>
            </div>
        );

    }
}

export default StreamChart;
