// system libraries
import React from 'react';

// internal framework libraries
import { AppFrameProvider, AppFrame, AppModal } from './appframe.js';
import { NetAppProvider, WSConnection} from './appnetwork.js';

// application-logic libraries
import { BIPSAppProvider, BIPSAppContext } from './AppData.js';

// application-UI-pages goes here
import MainPage from './app_pages/mainPage.js';

import Landing, {CustomFrameHeaderLanding, LandingPage, StockCash, FundTransfer, InquryAccount, TradeListHistory, tcAndSoe} from './app_pages/landingPage.js';
import PortfolioPage from './app_pages/portfolioPage.js';
import StockSummaryPage from './app_pages/stockSummary.js';
import FixedIncomePage from './app_pages/fixedIncome.js';
import Stocks, { CustomFrameHeaderStock, StockPage,
    StockWatchlist, StockHistoryPage,
    TableStockInfo, TableProfil, TableCorpAction} from './app_pages/stockPage';
import AccountAPage from './app_pages/accountA.js';
import AccountBPage from './app_pages/accountB.js';

import MarketStatistikPage, { CustomFrameHeaderMarketStatistik, MarketStatistik,
    NewResearchMarketStatistikPage,TopBrokerMarketStatistikPage,IndiceMarketStatistikPage,StatisticMarketStatistikPage,
    GeneralNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage, StockNewResearchPage} from './app_pages/marketstatistikPage';
import Stock from './app_pages/stockPage.js';
import TradePage from './app_pages/tradePage.js';
import AnalyticPage from './app_pages/analyticPage.js';
import LiveTradePage from './app_pages/livetradePage.js';
import EsbnPage from './app_pages/esbnPage.js';
import MutualFundPage from './app_pages/mutualfundPage.js';
import ChatSupportPage from './app_pages/chatsupportPage.js';


class App extends React.Component {
  /*
    Important system components:

    WSConnection: web socket connection
  */
  
  render() {
    return (
      <AppFrameProvider 
        initialClasses={{Landing, MarketStatistik, Stocks, TradePage, AnalyticPage, LiveTradePage, EsbnPage, MutualFundPage, ChatSupportPage,
            PortfolioPage, StockSummaryPage, FixedIncomePage, AccountAPage, AccountBPage,
            //Landing Page
            /*tree1*/ LandingPage, StockCash, TradeListHistory, FundTransfer, InquryAccount, tcAndSoe,
            //MarketStatistik Page
            /*tree2*/ MarketStatistikPage, NewResearchMarketStatistikPage,TopBrokerMarketStatistikPage,IndiceMarketStatistikPage,StatisticMarketStatistikPage,
            /*tree3*/ GeneralNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage, StockNewResearchPage,
            //StockPage
            /*tree2*/ StockPage, StockWatchlist, StockHistoryPage,
            /*tree3*/ TableStockInfo, TableProfil, TableCorpAction,
        }}
        initialFrames={
          [
            { className: 'Landing', title: <CustomFrameHeaderLanding/>, instanceName: 'landingPage'},
            { className: 'MarketStatistik', title: <CustomFrameHeaderMarketStatistik/>, instanceName: 'marketstatistikPage' },
            { className: 'Stocks', title: <CustomFrameHeaderStock/>, instanceName: 'stockPage' },
            { className: 'TradePage', title: '', instanceName: 'tradePage' },
            { className: 'AnalyticPage', title: '', instanceName: 'analyticPage' },
            { className: 'LiveTradePage', title: '', instanceName: 'livetradePage' },
            { className: 'EsbnPage', title: '', instanceName: 'esbnPage' },
            { className: 'MutualFundPage', title: '', instanceName: 'mutualfundPage' },
            { className: 'ChatSupportPage', title: '', instanceName: 'chatsupportPage' },

            {className: 'PortfolioPage', title: '', instanceName: 'portfolioPage'},
            {className: 'StockSummaryPage', title: 'STOCK SUMMARY', instanceName: 'stockSummaryPage'},
            {className: 'FixedIncomePage', title: 'FIXED INCOME', instanceName: 'fixedIncomePage'},
            {className: 'StockPage', title: 'STOCK', instanceName: 'stockAPage'},
            {className: 'AccountAPage', title: 'ACCOUNT A', instanceName: 'accountAPage'},
            {className: 'AccountBPage', title: 'ACCOUNT B', instanceName: 'accountBPage'},

            //tree 2 In Landing
            {className: 'LandingPage', title: '', instanceName: 'landingPageInvboard'},
            {className: 'StockCash', title: '', instanceName: 'stockCashPageInvboard'},
            {className: 'TradeListHistory', title: '', instanceName: 'tradeListHistoryPageInvboard'},
            {className: 'FundTransfer', title: '', instanceName: 'fundTransferPageInvboard'},
            {className: 'InquryAccount', title: '', instanceName: 'inquryAccountPageInvboard'},
            {className: 'tcAndSoe', title: '', instanceName: 'InvboardTcAndSoe'},

            //tree 2 In MarketStatistik
            {className: 'MarketStatistikPage', title: '', instanceName: 'marketStatistikPage'},
            {className: 'StatisticMarketStatistikPage', title: '', instanceName: 'statisticMarketStatistikPage'},
            {className: 'IndiceMarketStatistikPage', title: '', instanceName: 'indiceMarketStatistikPage'},
            {className: 'TopBrokerMarketStatistikPage', title: '', instanceName: 'topBrokerMarketStatistikPage'},
            {className: 'NewResearchMarketStatistikPage', title: '', instanceName: 'newResearchMarketStatistikPage'},

            //tree 3 In MarketStatistik
            {className: 'GeneralNewResearchPage', title: '', instanceName: 'newsGeneral'},
            {className: 'StockNewResearchPage', title: '', instanceName: 'newsStock'},
            {className: 'MutualNewResearchPage', title: '', instanceName: 'newsMutualFund'},
            {className: 'ReseacrhNewResearchPage', title: '', instanceName: 'newsResearch'},

            //tree 2 In Stock
            {className: 'StockPage', title: '', instanceName: 'stockInfoPage'},
            {className: 'StockWatchlist', title: '', instanceName: 'stockWatchlistPage'},
            {className: 'StockHistoryPage', title: '', instanceName: 'stockHistoryPage'},

            //tree 3 In Stock
            {className: 'TableStockInfo', title: '', instanceName: 'stockInfoTable'},
            {className: 'TableProfil', title: '', instanceName: 'profilTable'},
            {className: 'TableCorpAction', title: '', instanceName: 'corpActionTable'},
          ]
        }
        treeData={
          /*[
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
          ]*/
            [
                {
                    name: 'landingPage',
                    pages : [
                        'landingPageInvboard',
                        'stockCashPageInvboard',
                        'tradeListHistoryPageInvboard',
                        'fundTransferPageInvboard',
                        'inquryAccountPageInvboard',
                        'InvboardTcAndSoe'
                    ]
                },
                {
                    name: 'marketstatistikPage',
                    pages : [
                        'marketStatistikPage',
                        'statisticMarketStatistikPage',
                        'indiceMarketStatistikPage',
                        'topBrokerMarketStatistikPage',
                        {
                            name: 'newResearchMarketStatistikPage',
                            pages : [
                                'newsGeneral',
                                'newsStock',
                                'newsMutualFund',
                                'newsResearch'
                            ]
                        }
                    ]
                },
                {
                    name: 'stockPage',
                    pages : [
                        {
                            name: 'stockInfoPage',
                            pages : [
                                'stockInfoTable',
                                'profilTable',
                                'corpActionTable'
                            ]
                        },
                        'stockWatchlistPage',
                        'stockHistoryPage'
                    ]
                },
                'tradePage',
                'analyticPage',
                'livetradePage',
                'esbnPage',
                'mutualfundPage',
                'chatsupportPage'
            ]
        }
        initActions={[
           ['switchPage', {instanceName: 'landingPage'}],
        ]}
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