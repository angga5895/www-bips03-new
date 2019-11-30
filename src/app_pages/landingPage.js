import React from 'react';
import { AppFrameAction } from '../appframe.js';

class LandingPage extends React.PureComponent {

  render () {
    return (
      <div>
        <AppFrameAction ref="frameAction" />
        <h1>WELCOME TO BIPS LANDING PAGE</h1>
      </div>
    );
  }
}

export default LandingPage;
