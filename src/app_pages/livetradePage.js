import React from 'react';
import { AppFrameAction } from '../appframe.js';

class LiveTradePage extends React.PureComponent {

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <h1>WELCOME TO BIPS LIVE TRADE PAGE</h1>
            </div>
        );
    }
}

export default LiveTradePage;
