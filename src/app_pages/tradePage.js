import React from 'react';
import { AppFrameAction } from '../appframe.js';

class TradePage extends React.PureComponent {

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <h1>WELCOME TO BIPS TRADE PAGE</h1>
            </div>
        );
    }
}

export default TradePage;
