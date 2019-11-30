import React from 'react';
import { AppFrameAction, AppFrame, AppModal } from '../appframe.js';
import UISelectionTab from '../selectiontab.js';

class Stock extends React.PureComponent {

  render () {
    return (
      <div>
        <AppFrameAction ref="frameAction" />
        <h1>THIS IS STOCK PORTOFOLIO</h1>
        <div>
          display here<br />
          bla <br />
          lorem ipsum<br />
        </div>
        <br />
        <UISelectionTab treeName="/portfolioPage/stockPage" linkTitles={
            {
              accountAPage: 'Account A', 
              accountBPage: 'Account B', 
            }
          } 
        />
        <AppFrame treeName="/portfolioPage/stockPage" />
        <AppModal />
      </div>
    );
  }
}

export default Stock;
