import React from 'react';
import { AppFrameAction } from '../appframe.js';

class FixedIncomePage extends React.PureComponent {

  render () {
    return (
      <div>
        <AppFrameAction ref="frameAction" />
        <h1>THIS IS FIXED INCOME PORTOFOLIO</h1>
        <div>
          display here<br />
          bla <br />
          lorem ipsum<br />
        </div>
      </div>
    );
  }
}

export default FixedIncomePage;
