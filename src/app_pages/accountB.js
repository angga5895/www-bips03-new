import React from 'react';
import { AppFrameAction } from '../appframe.js';

class AccountBPage extends React.PureComponent {

  render () {
    return (
      <div>
        <AppFrameAction ref="frameAction" />
        <h1>Account B</h1>
        <div>
          account type: margin <br />
          book value: xxx<br />
          last market value: xxx<br />
          profit: xxx <br />
          lorem ipsum<br />
        </div>
      </div>
    );
  }
}

export default AccountBPage;
