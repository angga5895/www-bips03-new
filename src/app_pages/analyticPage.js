import React from 'react';
import { AppFrameAction } from '../appframe.js';
import { AppFrame, AppFrameProvider, AppModal } from "../appframe";
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
import FillHeaderTab from "../tabheaderfill";
import AnalyticChart from './analyticChart.js';
import RelativePerfomanceChart from './RelativePerformanceChart.js';
import { WSConnectionAction } from "./../appnetwork";
import $ from 'jquery';
window.$ = window.jQuery = $;


const AnalyticFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

const CustomFrameHeaderAnalytic = (props) => {
    return (
        <div>
            {/*<BIPSAppProvider>*/}
            <WSConnectionAction />
            <div className="row col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab treeName="/analyticPage" linkTitles={
                        {
                            StockAnalyticPage: 'Stock Chart',
                            AnalyticPage: 'Multi Chart',
                            IndiceAnalyticPage: 'Indice Chart',
                            RelativePerformanceAnalyticPage: 'Relative Performance'
                        }
                    } />
                </div>
            </div>
            <AppFrame treeName="/analyticPage" headerComponent={AnalyticFrameHeader} />
            {/*<AppModal />*/}
            {/*</BIPSAppProvider>*/}
        </div>
    );
}

// default view analytic stock chart
class AnalyticPage_Base extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    state = {
        tabLabel: true,
        indexChart: 0,
        colMd: 6,
        expnView: false,
        stockSource: [
            { stockName: 'chart1', srcData: 'msft.json', dataAlias: 'CHART 1', expandView: false },
            { stockName: 'chart2', srcData: 'csco.json', dataAlias: 'CHART 2', expandView: false },
            { stockName: 'chart3', srcData: 'ibm.json', dataAlias: 'CHART 3', expandView: false },
            { stockName: 'chart4', srcData: 'orcl.json', dataAlias: 'CHART 4', expandView: false }
        ]
    }

    //inisiasi active tab

    expandView = (chartIndex) => {
        let chartContainerId = '';
        let chartView = [];

        // constructing chart id to be hidden
        this.state.stockSource.map((charx, index) => {
            if (chartIndex != charx.stockName) {
                chartView.push('#chartContent' + charx.stockName);
            }
        })
        chartContainerId = chartView.join(",");

        // change flag for view mode (expand/condense)
        const index = this.state.stockSource.findIndex(emp => emp.stockName === chartIndex);
        const updateStockSource = [...this.state.stockSource];
        updateStockSource[index].expandView = this.state.colMd == 6 ? true : false;

        if (this.state.colMd == 6) {
            this.setState({ stockSource: updateStockSource, colMd: 12, expnView: true });
            this.props.changeChartMode(true);
            $(chartContainerId).hide();
        } else {
            this.props.changeChartMode(false);
            this.setState({ stockSource: updateStockSource, colMd: 6, expnView: false });
            $(chartContainerId).show();
        }
    }

    render() {
        let classChart = (this.state.expnView) ? 'card-515 bg-dark-grey' : 'card-257 bg-dark-grey';

        let boxScroll = {
            overflowX: 'hidden'
        }

        let btnExpPost = {
            position: 'absolute',
            zIndex: '1010',
            cursor: 'pointer',
            background: '#696969',
            opacity: '0.5',
            right: 0,
            marginRight: '5px'
        }

        let gridChartView = (
            <div className="bg-black-trading f-12" id="gridChartView">
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            {this.state.stockSource.map((charx, index) => {
                                return (
                                    <div className={"col-md-" + this.state.colMd + " px-1 pt-2 pb-0"} id={"chartContent" + charx.stockName}>
                                        <div className={"d-border-inactive card " + classChart} style={boxScroll} id={"chartBox" + charx.stockName}>
                                            <i onClick={() => this.expandView(charx.stockName)} className="icon-icon-fullscreen-in pull-right" style={btnExpPost} data-toggle="tooltip" data-placement="left" title="Expand/Condense chart"></i>
                                            <AnalyticChart viewMode={charx.expandView} key={index.stockName} charVal={charx.stockName} chartData={charx.srcData} chartAlias={charx.dataAlias} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div >
        );

        return (
            <div>
                {gridChartView}
            </div>);
    }
}

class Analytic extends React.PureComponent {

    render() {
        return (
            //hanya memanggil headernya saja
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

class StockAnalyticPage extends React.PureComponent {

    render() {

        let classChart = 'card-515 bg-dark-grey';

        let boxScroll = {
            overflowX: 'hidden'
        }

        let tabChartView = (
            <div className="bg-black-trading f-12" id="tabChrtStock">
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            <div className={"col-md-12 px-1 py-2"} id="chartContentStock1">
                                <div className={"d-border-inactive card " + classChart} style={boxScroll} id="chartBoxStock1">
                                    <AnalyticChart viewMode={true} key="chrtStock" charVal="chrtStock" chartData="orcl.json" chartAlias="Analytic Stock" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        );

        return (
            <div>
                {tabChartView}
            </div>);
    }
}

class IndiceAnalyticPage extends React.PureComponent {

    render() {

        let classChart = 'card-515 bg-dark-grey';

        let boxScroll = {
            overflowX: 'hidden'
        }

        let tabChartView = (
            <div className="bg-black-trading f-12" id="indiceChrt">
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            <div className={"col-md-12 px-1 py-2"} id="chartContentIndice">
                                <div className={"d-border-inactive card " + classChart} style={boxScroll} id="chartBoxIndice">
                                    <AnalyticChart viewMode={true} key="chrtIndice" charVal="chrtIndice" chartData="ibm.json" chartAlias="Indice Stock" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        );

        return (
            <div>
                {tabChartView}
            </div>);
    }
}

class RelativePerformanceAnalyticPage extends React.PureComponent {

    render() {

        let classChart = 'card-515 bg-dark-grey';

        let boxScroll = {
            overflowX: 'hidden'
        }

        let tabChartView = (
            <div className="bg-black-trading f-12" id="relativeChrt">
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            <div className={"col-md-12 px-1 py-2"} id="chartContentRelative">
                                <div className={"d-border-inactive card " + classChart} style={boxScroll} id="chartBoxRelative">
                                    <RelativePerfomanceChart viewMode={true} key="chrtRelative" charVal="chrtRelative" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        );

        return (
            <div>
                {tabChartView}
            </div>);
    }
}

const AnalyticPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        changeChartMode: (chartMode) => { actions.sendAction('changeChartMode', { chartMode }) }
    }),
)(AnalyticPage_Base);

export default AnalyticPage;
export { CustomFrameHeaderAnalytic, Analytic,
    StockAnalyticPage,
    AnalyticPage,
    IndiceAnalyticPage,
    RelativePerformanceAnalyticPage
};
