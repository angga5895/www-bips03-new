import React from 'react';
import { AppFrameAction } from '../appframe.js';

class ChatSupportPage extends React.PureComponent {

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <h1>WELCOME TO BIPS CHAT SUPPORT PAGE</h1>
            </div>
        );
    }
}

export default ChatSupportPage;
