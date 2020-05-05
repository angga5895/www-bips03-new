import React, { Component } from 'react';

export default class CustomTooltip extends Component {
    getReactContainerClasses() {
        return ['custom-tooltip'];
    }

    render() {
        const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex)
            .data;
        return (
            <div
                className="custom-tooltip"
                style={{ backgroundColor: 'black' }}
            >
                <p>
                    <span>{data.remark}</span>
                </p>
            </div>
        );
    }
}