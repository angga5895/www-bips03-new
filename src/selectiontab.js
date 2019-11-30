import React from 'react';
import { ContextConnector } from './appcontext.js';
import { AppFrameContext } from './appframe.js';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import user_avatar from './img/man.png';

import { Table, Navbar, Collapse } from 'react-bootstrap';
import './selectiontab.css';

const UISelectionTab_Base = (props) => {
  // expected in props:
  // instances: array of pageInstance object
  // activeInstance: current pageInstance object
  // activateFrame: (instanceName) => {} hook to activate selected frame ID
  // linkTitles: object, mapping instanceName to link title
  return (
    <div style={{display: (props.frameActive ? "block" : "none")}}>
      <Menu>
        {
          Object.keys(props.instances).map((k) => {
              var e = props.instances[k];
              return (
                <Menu.Item
                  key={e.instanceName}
                  name={e.instanceName}
                  active={props.activeInstance === e}
                  onClick={
                    () => props.activateFrame(e.instanceName) 
                  }
                >
                {
                  props.linkTitles[e.instanceName] || e.title
                }
                </Menu.Item>
              )
            }
          )
        }
      </Menu>
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

const UISelectionTab = ContextConnector(AppFrameContext, 
  (v, act, props) => (
    v.useInstanceTree ? _connectFrameTree(v, act, props) : {
        frameActive: v.frameActive,
        instances: v.pageInstances,
        activeInstance: v.activeInstance,
        activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
      }
  )
)(UISelectionTab_Base);

export default UISelectionTab;