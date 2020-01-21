import React from 'react';

// internal framework libraries
import { WSConnectionAction } from './appnetwork.js';
import { AppFrameAction } from './appframe.js';

import {Progress, Dimmer, Loader, Image, Segment} from 'semantic-ui-react';

class Disconnect extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bg-navy-gradient f-12">
                <AppFrameAction ref="frameAction"/>
                <WSConnectionAction ref="wsAction"/>
                <main>
                    <div className="container-fluid p-disconnect text-center">
                        <div className="card card-body d-border-active row bg-box-gradient mx-0">
                            <div className="w-100 text-center">
                                <div className="ui big active centered inline loader mb-3"></div>
                                <p className="f-12 text-white">Please wait a few moments...</p>
                            </div>
                            <Progress className="w-100 my-0" percent={100} active/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

}

export default Disconnect;