// system libraries
import React from 'react';
import './semantic-dist/semantic.min.css';

// internal framework libraries
import { AppFrameProvider, AppFrame, AppModal } from './appframe.js';
import { NetAppProvider, WSConnection} from './appnetwork.js';

// application-logic libraries
import { BIPSAppProvider, BIPSAppContext } from './AppData.js';

// application-UI-pages goes here
import MainPage from './app_pages/mainPage.js';

import LandingPage from './app_pages/landingPage.js';
import PortfolioPage from './app_pages/portfolioPage.js';
import StockSummaryPage from './app_pages/stockSummary.js';
import FixedIncomePage from './app_pages/fixedIncome.js';
import StockPage from './app_pages/stock.js';
import AccountAPage from './app_pages/accountA.js';
import AccountBPage from './app_pages/accountB.js';

class App extends React.Component {
  /*
    Important system components:

    WSConnection: web socket connection
  */
  
  render() {
    return (
      <AppFrameProvider 
        initialClasses={{LandingPage, PortfolioPage, StockSummaryPage, FixedIncomePage, StockPage, AccountAPage, AccountBPage}}
        initialFrames={
          [
            {className: 'LandingPage', title: 'LANDING PAGE', instanceName: 'landingPage'},
            {className: 'PortfolioPage', title: 'CLIENT PORTFOLIO', instanceName: 'portfolioPage'},
            {className: 'StockSummaryPage', title: 'STOCK SUMMARY', instanceName: 'stockSummaryPage'},
            {className: 'FixedIncomePage', title: 'FIXED INCOME', instanceName: 'fixedIncomePage'},
            {className: 'StockPage', title: 'STOCK', instanceName: 'stockPage'},
            {className: 'AccountAPage', title: 'ACCOUNT A', instanceName: 'accountAPage'},
            {className: 'AccountBPage', title: 'ACCOUNT B', instanceName: 'accountBPage'},
          ]
        }
        treeData={
          [
            'landingPage', 
            {
              name: 'portfolioPage', 
              pages: [
                'fixedIncomePage', 
                {
                  name: 'stockPage', 
                  pages: [
                    'accountAPage', 
                    'accountBPage'
                  ]
                }
              ], 
            },
            'stockSummaryPage'
          ]
        }
        // initActions={[
        //   ['switchPage', {instanceName: 'stockSummaryPage'}],
        // ]}
      >
        {
          /* 
          Remember that internal-framework Providers (like NetAppProvider) must be put FIRST before
          application-level Providers because the application-level providers may subscribe to the context of
          internal-framework Providers
          */
        }
        <NetAppProvider>
          <BIPSAppProvider>
            <WSConnection />
            <MainPage />
          </BIPSAppProvider> 
        </NetAppProvider>
      </AppFrameProvider>
    )
  }
}

export default App;
