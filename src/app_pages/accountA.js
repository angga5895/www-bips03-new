import React from 'react';
import { AppFrameAction } from '../appframe.js';

class AccountAPage extends React.PureComponent {

  render () {
    return (
      <div>
        <AppFrameAction ref="frameAction" />
        <h1>Account A</h1>
        <div>
          account type: cash <br />
          book value: xxx<br />
          last market value: xxx<br />
          profit: xxx <br />
          lorem ipsum<br />
        </div>
      </div>
    );
  }
}

export default AccountAPage;
