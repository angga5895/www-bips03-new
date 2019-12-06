import React from 'react';
import { AppFrameAction } from '../appframe.js';

class MutualFundPage extends React.PureComponent {

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <h1>WELCOME TO BIPS MUTUAL FUND PAGE</h1>
            </div>
        );
    }
}

export default MutualFundPage;
