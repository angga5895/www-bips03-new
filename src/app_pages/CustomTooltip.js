import React, { Component } from 'react';
import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";

export default class CustomTooltip extends Component {
    getReactContainerClasses() {
        return ['custom-tooltip'];
    }

    render() {
        const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex).data;

        return (
            <div
                className="custom-tooltip bg-black-trading"
            >
                <p style={{display: this.props.type == "remark" ? "block" : "none"}}>
                    <span>{data.remark}</span>
                </p>
                <p style={{display: this.props.type == "remarksO" ? "block" : "none"}}>
                    <span>{data.remarksO}</span>
                </p>
                <p style={{display: this.props.type == "status" ? "block" : "none"}}>
                <span>{data.status}</span>
            </p>
            </div>
        );
    }
}