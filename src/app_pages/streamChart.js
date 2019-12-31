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
    constructor(props) {
        super(props);
        this.state = {
            newRow: 2000,
            seconds: 0,
        };
    }
    componentDidMount() {
        //create new point every 1 minute
        var period = 60000;
        //new price ticks come every 15 seconds
        var tickPeriod = 15000;

        var newTimestamp;

        var newDataRow = [];

        //current price variable
        var point = null;


        anychart.onDocumentReady(function () {

            var dataset = anychart.data.table();
            dataset.addData([
                [1508889600000, 100],
                [1508889660000, 200],
                [1508889720000, 15],
                [1508889780000, 130],
                [1508889840000, 153],
                [1508889900000, 120],
                [1508889960000, 151],
                [1508890020000, 58],
                [1508890080000, 19],
                [1508890140000, 135],
                [1508890200000, 170],
                [1508890260000, 195],
                [1508890320000, 22],
                [1508890380000, 175],
                [1508890440000, 120]
            ]);


            // map the data
            let mapping = dataset.mapAs({ x: 0, value: 1 });

            // set chart type
            let chart = anychart.stock();

            // set the series
            let series = chart.plot(0).line(mapping);
            series.name("Stock Streaming");

            chart.title('Stock Streaming Demo: Currency Rates');

            // set container and draw chart
            chart.container("container").draw();

            //create empty array for point data update
            newDataRow[0] = new Array(2);

            //select the last point from existing datatable
            var selectable = mapping.createSelectable();
            selectable.selectAll();
            var iterator = selectable.getIterator();

            while (iterator.advance()) {
                //put data from the last exsiting point
                newDataRow[0][0] = iterator.get('x');
                newDataRow[0][1] = iterator.get('value');
            }
            //timestamp variable for incoming ticks
            newTimestamp = newDataRow[0][0];

            function streamStart() {
                dataInteval = setInterval(
                    // data streaming itself
                    function () {

                        newTimestamp += tickPeriod;
                        point = document.getElementById("tempVal").value;

                        //current point update or create new point
                        if (newTimestamp - newDataRow[0][0] <= period) {
                            //set price as close for existing point
                            newDataRow[0][2] = point;
                        } else {
                            //erase update data array
                            newDataRow[0] = new Array(2);
                            //set data for the new point
                            newDataRow[0][0] = newTimestamp;
                            newDataRow[0][1] = point;
                        }

                        dataset.addData(newDataRow);
                    }, 500            // interval
                );
            }

            let streamButton = document.getElementById("streamButton");
            let streamState = 0;
            let dataInteval;

            streamButton.onclick = function () {
                streamButton.innerHTML = "Stop" + "\nstream";
                streamState++;

                if (streamState > 1) {
                    streamButton.innerHTML = "Start" + "\nstream";
                    streamState = 0;
                    clearInterval(dataInteval);
                } else {
                    streamStart();
                }

            };

        });
    }

    render() {
        return (
            <div>
                <button id="streamButton" className="btn btn-sm btn-grey py-3 px-3 d-border h-40 ml-3 mt-3">Start Stream</button>
                <input type="hidden" id={"tempVal"} value={this.state.newRow}/>
                <div id="container" className="mt-2 py-3 px-3 card-344"></div>
            </div>
        );

    }
}

export default StreamChart;
