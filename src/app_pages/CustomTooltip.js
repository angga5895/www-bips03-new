import React, { Component } from 'react';

export default class CustomTooltip extends Component {
    getReactContainerClasses() {
        return ['custom-tooltip'];
    }

    render() {
        const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex).data;
        return (
            <div
                className="custom-tooltip"
                style={{ backgroundColor: 'black' }}
            >
                <p style={{display: this.props.type == "remark" ? "block" : "none"}}>
                    <span>{data.remark}</span>
                </p>
                <p style={{display: this.props.type == "status" ? "block" : "none"}}>
                <span>{data.status}</span>
            </p>
            </div>
        );
    }
}