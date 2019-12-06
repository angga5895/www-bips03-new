import React from 'react';
import { AppFrameAction } from '../appframe.js';

class EsbnPage extends React.PureComponent {

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <h1>WELCOME TO BIPS ESBN PAGE</h1>
            </div>
        );
    }
}

export default EsbnPage;
