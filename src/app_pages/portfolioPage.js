import React from 'react';
import UISelectionTab from '../selectiontab.js';
import FillHeaderTab from '../tabheaderfill.js';
import { AppFrameAction, AppFrame, AppModal } from '../appframe.js';

class PortfolioPage extends React.PureComponent {

  render () {
    return (
      <div className="bg-black-trading d-border-top f-12">
        <div className="col-sm-12 px-0 mx-0 d-border-bottom">
          <AppFrameAction ref="frameAction" />
          <FillHeaderTab tradeMode="atas" treeName="/portfolioPage" linkTitles={
            {
              stockPage: 'Stock',
              marketstatistikPage : 'Market'
            }
          }
          />
        </div>
        <FillHeaderTab tradeMode="bawah" treeName="/portfolioPage" linkTitles={
            {
              fixedIncomePage: 'Fixed income',
              marketstatistikPage : 'Market'
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
