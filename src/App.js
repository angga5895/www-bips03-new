// system libraries
import React from 'react';

// internal framework libraries
import { AppFrameProvider, AppFrame, AppModal } from './appframe.js';
import { NetAppProvider, WSConnection} from './appnetwork.js';

// application-logic libraries
import { BIPSAppProvider, BIPSAppContext } from './AppData.js';

// application-UI-pages goes here
import MainPage from './app_pages/mainPage.js';

import Landing, {CustomFrameHeaderLanding, LandingPage, StockCash, FundTransfer, InquryAccount, TradeListHistory, tcAndSoa} from './app_pages/landingPage.js';
import PortfolioPage from './app_pages/portfolioPage.js';
import StockSummaryPage from './app_pages/stockSummary.js';
import FixedIncomePage from './app_pages/fixedIncome.js';
import Stocks, { CustomFrameHeaderStock, StockPage,
    StockWatchlist, StockHistoryPage, StockTradeSummaryPage,
    TableStockInfo, TableProfil, TableCorpAction} from './app_pages/stockPage';
import AccountAPage from './app_pages/accountA.js';
import AccountBPage from './app_pages/accountB.js';

import MarketStatistikPage, { CustomFrameHeaderMarketStatistik, MarketStatistik,
    NewResearchMarketStatistikPage,TopBrokerMarketStatistikPage,IndiceMarketStatistikPage, IndiceMarketSecondStatistikPage,
    StatisticMarketStatistikPage,GeneralNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage, StockNewResearchPage} from './app_pages/marketstatistikPage';
import Stock from './app_pages/stockPage.js';
import { Trade, CustomFrameHeaderTrade, OrderbookPage,
    TradeWatchlist, TradePL, TradeOrderBookList,
    OrderSetting,SentOrder } from './app_pages/tradePage';
import AnalyticPage, { CustomFrameHeaderAnalytic, Analytic,
    StockAnalyticPage,
    IndiceAnalyticPage,
    RelativePerformanceAnalyticPage
} from './app_pages/analyticPage';
import LiveTradePage from './app_pages/livetradePage.js';
import EsbnPage from './app_pages/esbnPage.js';
import MutualFundPage from './app_pages/mutualfundPage.js';
import ChatSupportPage, { CustomFrameHeaderChatSupportPage,
    ChatUserPage, ChatSuppPage, ChatCommentPage
} from './app_pages/chatsupportPage';


class App extends React.Component {
  /*
    Important system components:

    WSConnection: web socket connection
  */
  
  render() {
    return (
      <AppFrameProvider 
        initialClasses={{Landing, MarketStatistik, Stocks, Trade, Analytic, LiveTradePage, EsbnPage, MutualFundPage, ChatSupportPage,
            PortfolioPage, StockSummaryPage, FixedIncomePage, AccountAPage, AccountBPage,
            //Landing Page
            /*tree1*/ LandingPage, StockCash, TradeListHistory, FundTransfer, InquryAccount, tcAndSoa,
            //MarketStatistik Page
            /*tree2*/ MarketStatistikPage, NewResearchMarketStatistikPage,TopBrokerMarketStatistikPage,IndiceMarketStatistikPage,
            IndiceMarketSecondStatistikPage, StatisticMarketStatistikPage,
            /*tree3*/ GeneralNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage, StockNewResearchPage,
            //StockPage
            /*tree2*/ StockPage, StockWatchlist, StockHistoryPage, StockTradeSummaryPage,
            /*tree3*/ TableStockInfo, TableProfil, TableCorpAction,
            //TradePage
            /*tree2*/
            OrderbookPage, TradeWatchlist,
            OrderSetting,SentOrder,TradePL, TradeOrderBookList,
            //AnalyticPage
            /*tree1*/
            AnalyticPage, StockAnalyticPage, IndiceAnalyticPage, RelativePerformanceAnalyticPage,
            //ChatUserPage
            /*tree1*/
            ChatUserPage, ChatSuppPage, ChatCommentPage
        }}
        initialFrames={
          [
            { className: 'Landing', title: <CustomFrameHeaderLanding/>, instanceName: 'landingPage'},
            { className: 'MarketStatistik', title: <CustomFrameHeaderMarketStatistik/>, instanceName: 'marketstatistikPage' },
            { className: 'Stocks', title: <CustomFrameHeaderStock/>, instanceName: 'stockPage' },
            { className: 'Trade', title: <CustomFrameHeaderTrade />, instanceName: 'tradePage' },
            { className: 'Analytic', title: <CustomFrameHeaderAnalytic />, instanceName: 'analyticPage' },
            { className: 'LiveTradePage', title: '', instanceName: 'livetradePage' },
            { className: 'EsbnPage', title: '', instanceName: 'esbnPage' },
            { className: 'MutualFundPage', title: '', instanceName: 'mutualfundPage' },
            { className: 'ChatSupportPage', title: <CustomFrameHeaderChatSupportPage />, instanceName: 'chatsupportPage' },

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
            // {className: 'tcAndSoa', title: '', instanceName: 'InvboardTcAndSoa'},

            //tree 2 In MarketStatistik
            {className: 'MarketStatistikPage', title: '', instanceName: 'marketStatistikPage'},
            {className: 'StatisticMarketStatistikPage', title: '', instanceName: 'statisticMarketStatistikPage'},
              {className: 'IndiceMarketStatistikPage', title: '', instanceName: 'indiceMarketStatistikPage'},
              {className: 'IndiceMarketSecondStatistikPage', title: '', instanceName: 'indiceMarketSecondStatistikPage'},
            {className: 'TopBrokerMarketStatistikPage', title: '', instanceName: 'topBrokerMarketStatistikPage'},
            {className: 'NewResearchMarketStatistikPage', title: '', instanceName: 'newResearchMarketStatistikPage'},

            //tree 3 In MarketStatistik
            {className: 'GeneralNewResearchPage', title: '', instanceName: 'newsGeneral'},
            {className: 'StockNewResearchPage', title: '', instanceName: 'newsStock'},
            {className: 'MutualNewResearchPage', title: '', instanceName: 'newsMutualFund'},
            
            //tree 2 In Stock
            {className: 'StockPage', title: '', instanceName: 'stockInfoPage'},
            {className: 'StockWatchlist', title: '', instanceName: 'stockWatchlistPage'},
              {className: 'StockHistoryPage', title: '', instanceName: 'stockHistoryPage'},
              {className: 'StockTradeSummaryPage', title: '', instanceName: 'stockTradeSummaryPage'},


            //tree 3 In Stock
            {className: 'TableStockInfo', title: '', instanceName: 'stockInfoTable'},
            {className: 'TableProfil', title: '', instanceName: 'profilTable'},
            {className: 'TableCorpAction', title: '', instanceName: 'corpActionTable'},

            //tree 2 In Trade
            {className: 'TradeWatchlist', title: 'WATCHLIST PAGES', instanceName: 'tradePageManOrderbook'},
            {className: 'OrderbookPage', title: 'ORDERBOOK PAGE', instanceName: 'tradePageManWatchlist'},
            {className: 'TradePL', title: 'TRADE P/L', instanceName: 'tradePagePL'},
            {className: 'TradeOrderBookList', title: 'ORDER BOOKING LIST', instanceName: 'tradePageOrderBookList'},

            {className: 'OrderSetting', title: 'ORDER SETTING', instanceName: 'AutOrderSetting'},
            {className: 'SentOrder', title: 'SEND ORDER', instanceName: 'AutSentOrder'},

            //tree 2 In Analytic
            { className: 'StockAnalyticPage', title: 'STOCK CHART PAGE', instanceName: 'StockAnalyticPage' },
            { className: 'AnalyticPage', title: 'MULTI CHART PAGE', instanceName: 'AnalyticPage' },
            { className: 'IndiceAnalyticPage', title: 'INDICE CHART PAGE', instanceName: 'IndiceAnalyticPage' },
            { className: 'RelativePerformanceAnalyticPage', title: 'RELATIVE PERFORMANCE PAGE', instanceName: 'RelativePerformanceAnalyticPage' },

            //tree 2 In ChatSupport
            {className: 'ChatUserPage', title: 'Chat User', instanceName: 'ChatUserPage'},
            {className: 'ChatSuppPage', title: 'Chat Support', instanceName: 'ChatSuppPage'},
            {className: 'ChatCommentPage', title: 'Chat Comment', instanceName: 'ChatCommentPage'},
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
                        // 'InvboardTcAndSoa'
                    ]
                },
                {
                    name: 'marketstatistikPage',
                    pages : [
                        'marketStatistikPage',
                        'statisticMarketStatistikPage',
                        'indiceMarketStatistikPage',
                        /*'indiceMarketSecondStatistikPage',*/
                        'topBrokerMarketStatistikPage',
                        {
                            name: 'newResearchMarketStatistikPage',
                            pages : [
                                'newsGeneral',
                                'newsStock',
                                'newsMutualFund',
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
                        'stockHistoryPage',
                        'stockTradeSummaryPage',
                    ]
                },
                {
                    name: 'tradePage',
                    pages : [
                        'tradePageManOrderbook',
                        'tradePageManWatchlist',
                        'tradePagePL',
                        'tradePageOrderBookList',
                        'AutOrderSetting',
                        'AutSentOrder'
                    ]
                },
                {
                    name: 'analyticPage',
                    pages : [
                        'StockAnalyticPage',
                        'AnalyticPage',
                        'IndiceAnalyticPage',
                        'RelativePerformanceAnalyticPage'
                    ]
                },
                'livetradePage',
                'esbnPage',
                'mutualfundPage',
                /*{
                    name: 'chatsupportPage',
                    pages : [
                        'ChatUserPage',
                        'ChatSuppPage',
                        'ChatCommentPage'
                    ]
                }*/
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
                  <AppModal />
              </BIPSAppProvider>
          </NetAppProvider>
      </AppFrameProvider>
    )
  }
}

export default App;