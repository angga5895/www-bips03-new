import React from 'react';
import { ContextConnector } from './appcontext.js';
import { AppFrameContext } from './appframe.js';
import { Menu } from 'semantic-ui-react';

const FillHeaderTab_Base = (props) => {
    // expected in props:
    // instances: array of pageInstance object
    // activeInstance: current pageInstance object
    // activateFrame: (instanceName) => {} hook to activate selected frame ID
    // linkTitles: object, mapping instanceName to link title
    return (
        /*<Menu pointing secondary>*/
        <div style={{display: (props.frameActive ? "block" : "none")}}>
            <div className="cssmenu tabheaderfill">
                <ul>
                    {
                        Object.keys(props.instances).map((k) => {
                            var e = props.instances[k];
                            var trademore = props.tradeMode;

                            return (
                                <li key={e.instanceName}
                                    className=
                                        {
                                            props.activeInstance === e ?

                                                e.instanceName.search('Invboard') >= 0 ?
                                                    e.instanceName.search('tradePL') >= 0?
                                                        'active col-sm-2 click-pointer text-center'
                                                        :
                                                        'active col-sm-2 click-pointer d-border-right text-center bg-blue-white'
                                                    :

                                                    e.instanceName.search('stock') >= 0 ?
                                                        e.instanceName.search('stockTradeSummary') >= 0?
                                                            'active col-mn-5 click-pointer text-center bg-blue-white'
                                                            :
                                                            'active col-mn-5 click-pointer d-border-right text-center bg-blue-white'
                                                        :
                                                        e.instanceName.search('broker') >= 0 ?
                                                            e.instanceName.search('brokerTopListPage') >= 0?
                                                                'active col-md-4 click-pointer text-center bg-blue-white'
                                                                :
                                                                'active col-md-4 click-pointer d-border-right text-center bg-blue-white'
                                                            :

                                                        e.instanceName.search('StatistikPage') >= 0 ?
                                                            e.instanceName.search('newResearch') >= 0?
                                                                // 'active col-sm-4 click-pointer text-center bg-blue-white'
                                                                'active col-md-2 click-pointer text-center bg-blue-white'
                                                                :
                                                                // 'active col-sm-4 click-pointer d-border-right text-center bg-blue-white'
                                                                'active col-md-2 click-pointer d-border-right text-center bg-blue-white'
                                                            :

                                                            e.instanceName.search('Chat') >= 0 ?
                                                                e.instanceName.search('ChatCommentPage') >= 0?
                                                                    'active col-sm-4 click-pointer text-center bg-blue-white'
                                                                    :
                                                                    'active col-sm-4 click-pointer text-center d-border-right bg-blue-white'
                                                                :

                                                                e.instanceName.search('automaticO') >= 0 ?
                                                                    e.instanceName.search('automaticODailyTrade') >= 0?
                                                                        'active col-sm-4 click-pointer text-center bg-blue-white'
                                                                        :
                                                                        'active col-sm-4 click-pointer text-center d-border-right bg-blue-white'
                                                                    :

                                                                    e.instanceName.search('AnalyticPage') >= 0 ?
                                                                        e.instanceName.search('RelativePerformanceAnalyticPage') >= 0 ?
                                                                            'active col-sm-3 click-pointer text-center bg-blue-white'
                                                                            :
                                                                            'active col-sm-3 click-pointer text-center d-border-right bg-blue-white'
                                                                        :

                                                                        trademore !== '' ?
                                                                            trademore === 'manual' ?
                                                                                e.instanceName.search('tradePage') >= 0 ?
                                                                                    e.instanceName.search('tradePageAdv') >= 0?
                                                                                        'active col-sm-3 bg-blue-white click-pointer text-center bg-blue-white'
                                                                                        :
                                                                                        'active col-sm-3 bg-blue-white click-pointer text-center d-border-right bg-blue-white'
                                                                                    :
                                                                                    'd-none'
                                                                                :
                                                                                e.instanceName.search('Aut') >= 0 ?
                                                                                    e.instanceName.search('AutSentOrder') >= 0?
                                                                                        'active col-sm-4 bg-blue-white click-pointer text-center bg-blue-white'
                                                                                        :
                                                                                        'active col-sm-4 bg-blue-white click-pointer text-center d-border-right bg-blue-white'
                                                                                    :
                                                                                    'd-none'
                                                                            :

                                                                            'active click-pointer d-border-right text-center bg-blue-white'
                                                :

                                                e.instanceName.search('Invboard') >= 0 ?
                                                    e.instanceName.search('tradePL') >= 0?
                                                        'col-sm-2 click-pointer text-center'
                                                        :
                                                        'col-sm-2 click-pointer d-border-right text-center'

                                                    :

                                                    e.instanceName.search('stock') >= 0 ?
                                                        e.instanceName.search('stockTradeSummary') >= 0?
                                                            'col-mn-5 click-pointer text-center'
                                                            :
                                                            'col-mn-5 click-pointer d-border-right text-center'

                                                        :
                                                        e.instanceName.search('broker') >= 0 ?
                                                            e.instanceName.search('brokerTopListPage') >= 0?
                                                                'col-md-4 click-pointer text-center'
                                                                :
                                                                'col-md-4 click-pointer d-border-right text-center'

                                                            :

                                                        e.instanceName.search('StatistikPage') >= 0 ?
                                                            e.instanceName.search('newResearch') >= 0?
                                                                // 'col-mn-5 click-pointer text-center'
                                                                'col-md-2 click-pointer text-center'
                                                                :
                                                                // 'col-sm-4 click-pointer d-border-right text-center'
                                                                'col-md-2 click-pointer d-border-right text-center'

                                                            :

                                                            e.instanceName.search('orderSetting') >= 0 ?
                                                                e.instanceName.search('sentOrder') >= 0?
                                                                    'active col-sm-6 bg-blue-white click-pointer text-center'
                                                                    :
                                                                    'active col-sm-6 bg-blue-white click-pointer text-center d-border-right'
                                                                :

                                                                e.instanceName.search('Chat') >= 0 ?
                                                                    e.instanceName.search('ChatCommentPage') >= 0?
                                                                        'col-sm-4 click-pointer text-center'
                                                                        :
                                                                        'col-sm-4 click-pointer text-center d-border-right'
                                                                    :

                                                                    e.instanceName.search('automaticO') >= 0 ?
                                                                        e.instanceName.search('automaticODailyTrade') >= 0?
                                                                            'col-sm-4 click-pointer text-center'
                                                                            :
                                                                            'col-sm-4 click-pointer text-center d-border-right'
                                                                        :

                                                                        e.instanceName.search('AnalyticPage') >= 0 ?
                                                                            e.instanceName.search('RelativePerformanceAnalyticPage') >= 0 ?
                                                                                'col-sm-3 click-pointer text-center'
                                                                                :
                                                                                'col-sm-3 click-pointer text-center d-border-right'
                                                                            :

                                                                            trademore !== '' ?
                                                                                trademore === 'manual' ?
                                                                                    e.instanceName.search('tradePage') >= 0 ?
                                                                                        e.instanceName.search('tradePageAdv') >= 0?
                                                                                            'col-sm-3 click-pointer text-center'
                                                                                            :
                                                                                            'col-sm-3 click-pointer text-center d-border-right'
                                                                                        :
                                                                                        'd-none'
                                                                                    :
                                                                                    e.instanceName.search('Aut') >= 0 ?
                                                                                        e.instanceName.search('AutSentOrder') >= 0?
                                                                                            'col-sm-4 click-pointer text-center'
                                                                                            :
                                                                                            'col-sm-4 click-pointer text-center d-border-right'

                                                                                        :
                                                                                        'd-none'
                                                                                :

                                                                                'click-pointer d-border-right text-center'

                                        }
                                    name={e.instanceName}
                                    active={props.activeInstance === e}
                                    onClick={
                                        () => props.activateFrame(e.instanceName)
                                    }
                                >
                                    <a>
                                    <span className="f-12">
                                        {
                                            props.linkTitles[e.instanceName] || e.title
                                        }
                                    </span>
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

function _connectFrameTree(vars, actions, ownProps) {
    var tree = vars.instanceTreeIndexes[ownProps.treeName]
    if (!tree) {
        return {
            frameActive: false,
            instances: {},
            activeInstance: null,
            activateFrame: (instanceName) => actions.sendAction('switchPage', {treeName: ownProps.treeName, instanceName})
        }
    } else {
        return {
            frameActive: tree.frameActive,
            instances: tree.pageInstances,
            activeInstance: tree.activeInstance,
            activateFrame: (instanceName) => actions.sendAction('switchPage', {treeName: ownProps.treeName, instanceName})
        }
    }
}

const FillHeaderTab = ContextConnector(AppFrameContext,
    (v, act, props) => (
        v.useInstanceTree ? _connectFrameTree(v, act, props) : {
            frameActive: v.frameActive,
            instances: v.pageInstances,
            activeInstance: v.activeInstance,
            activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
        }
    )
)(FillHeaderTab_Base);

export default FillHeaderTab;