import React from 'react';
import { ContextConnector } from './appcontext.js';
import { AppFrameContext } from './appframe.js';


const MenuOfContent_Base = (props) => {
    // expected in props:
    // instances: array of pageInstance object
    // activeInstance: current pageInstance object
    // activateFrame: (instanceName) => {} hook to activate selected frame ID
    // linkTitles: object, mapping instanceName to link title
    return (
        /*<Menu pointing secondary>*/
        <div className="align-self-center ui-menu-padding py-1">
            <ul className="ul-menu h-25">
                {
                    Object.keys(props.instances).map((k) => {
                        var e = props.instances[k];
                        return (
                            <li key={e.instanceName}
                                name={e.instanceName}
                                active={props.activeInstance === e}
                                className={e.instanceName.search('news') >= 0 ? "li-menu-news" : e.instanceName.search('autoPage') >= 0 ? "li-menu-trade" : e.instanceName.search('Table') >= 0 ? "li-menu-table" : e.instanceName.search('stockWatchlist') >= 0 ? "li-menu-watchlist" : "li-menu"}
                                onClick={
                                    () => props.activateFrame(e.instanceName)
                                }
                            >
                                <a className={
                                    props.activeInstance === e ?
                                        e.instanceName.search('autoPage') >= 0 ? "li-trade-active click-pointer text-center li-menu-a-trade py-2 f-12" :
                                            e.instanceName.search('news') >= 0 ? "li-news-active click-pointer text-center li-menu-a-news py-2 f-12" :
                                                e.instanceName.search('Table') >= 0 ?
                                                    'li-table-active click-pointer text-center li-menu-a py-2 f-12' :
                                                    'li-active click-pointer text-center li-menu-a py-2 f-12'
                                        : 'click-pointer text-center li-menu-a py-2 f-12'

                                }>
                                        {
                                            props.linkTitles[e.instanceName] || e.title
                                        }
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
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

const MenuOfContent = ContextConnector(AppFrameContext,
    (v, act, props) => (
        v.useInstanceTree ? _connectFrameTree(v, act, props) : {
            frameActive: v.frameActive,
            instances: v.pageInstances,
            activeInstance: v.activeInstance,
            activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
        }
    )
)(MenuOfContent_Base);

export default MenuOfContent;