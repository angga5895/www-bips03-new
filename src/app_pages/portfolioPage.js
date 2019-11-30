import React from 'react';
import UISelectionTab from '../selectiontab.js';
import { AppFrameAction, AppFrame, AppModal } from '../appframe.js';

class PortfolioPage extends React.PureComponent {

  render () {
    return (
      <div>
        <div>
          <AppFrameAction ref="frameAction" />
          <h1>PORTFOLIO LIST GOES HERE</h1>
        </div>
        <br />
        <UISelectionTab treeName="/portfolioPage" linkTitles={
            {
              fixedIncomePage: 'Fixed income', 
              stockPage: 'Stock', 
            }
          } 
        />
        <AppFrame treeName="/portfolioPage" />
        <AppModal />
    </div>

    );
  }
}

export default PortfolioPage;
