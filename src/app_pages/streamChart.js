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
            newRow: 100,
            seconds: 0,
        };
    }

    componentDidMount() {

        //create new point every 1 minute
        var period = 4;
        //new price ticks come every 15 seconds
        var tickPeriod = 15000;

        var newTimestamp;

        var newDataRow = [];

        //current price variable
        var point = null;


        anychart.onDocumentReady(function () {

            var dataset = anychart.data.table();
            dataset.addData([
                [1569986691452, 100],
            ]);

                // map the data
            let mapping = dataset.mapAs({x: 0, value: 1});

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
            function reset(){
                dataset.remove(1509986691452,9508889600000);
            }
            function streamStart() {
                var ahay = document.getElementById('propsluar').value;
                if(ahay.length < 1){
                    alert('data kosong');
                }else{
                    document.getElementById("hello").click();
                }

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
            let resetButton = document.getElementById("resetButton");

            let streamState = 0;
            let dataInteval;

            resetButton.onclick = function(){
                reset();
            }
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
    test = () => {
        alert('oke');
    }
    render() {
        return (
            <div>
                <button id="streamButton" className="btn btn-sm btn-grey py-3 px-3 d-border h-40 ml-3 mt-3">Start Stream</button>
                <button id="resetButton" className="btn btn-sm btn-grey py-3 px-3 d-border h-40 ml-3 mt-3">reset Stream</button>
                <input type="hidden" id={"tempVal"} value={this.state.newRow}/>
                <input type="hidden" id={"propsluar"} value=""/>
                <span onClick={this.test} id={"hello"}></span>
                <div id="container" className="mt-2 py-3 px-3 card-344"></div>
            </div>
        );

    }
}

export default StreamChart;
