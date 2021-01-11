// system libraries
import React from 'react';

// internal framework libraries
import { AppFrameProvider, AppFrame, AppModal } from './appframe.js';
import { NetAppProvider, WSConnection} from './appnetwork.js';

// application-logic libraries
import { BIPSAppProvider, BIPSAppContext } from './AppData.js';

// application-UI-pages goes here
import MainPage from './app_pages/mainPage.js';

import Landing, {CustomFrameHeaderLanding, LandingPage, StockCash, FundTransfer, InquryAccount, TradeListHistory, tcAndSoa, TradePLPage} from './app_pages/landingPage.js';
import PortfolioPage from './app_pages/portfolioPage.js';
import StockSummaryPage from './app_pages/stockSummary.js';
import FixedIncomePage from './app_pages/fixedIncome.js';
import Stocks, { CustomFrameHeaderStock, StockPage,
    StockWatchlist, StockHistoryPage, StockTradeSummaryPage,
    TableStockInfo, StockFinancialStatement,
    TableProfil,
    TableCorpAction
} from './app_pages/stockPage';
import AccountAPage from './app_pages/accountA.js';
import AccountBPage from './app_pages/accountB.js';

import MarketStatistikPage, { CustomFrameHeaderMarketStatistik, MarketStatistik,
    NewResearchMarketStatistikPage,TopBrokerMarketStatistikPage,IndiceMarketStatistikPage, IndiceMarketSecondStatistikPage,
    StatisticMarketStatistikPage, CurrenciesMarketStatistikPage, CurrencyCommodityMarketStatistikPage, GeneralNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage, StockNewResearchPage,
    NonSectoralStatistikPage, IntIndicesMarketStatistikPage}
    from './app_pages/marketstatistikPage';
import Stock from './app_pages/stockPage.js';
import { Trade, CustomFrameHeaderTrade, OrderbookPage,
    TradeWatchlist, TradePageAdv, TradeOrderBookList,
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

import BrokerPage, { CustomFrameHeaderBrokerPage,
    BrokerInfo, BrokerTradeSummary, BrokerTradeHistory, BrokerTopListPage
} from './app_pages/brokerPage';

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
            /*tree1*/ LandingPage, StockCash, TradeListHistory, FundTransfer, InquryAccount, tcAndSoa, TradePLPage,
            //MarketStatistik Page
            /*tree2*/ MarketStatistikPage, NewResearchMarketStatistikPage, IntIndicesMarketStatistikPage, TopBrokerMarketStatistikPage,IndiceMarketStatistikPage,
            IndiceMarketSecondStatistikPage, StatisticMarketStatistikPage, NonSectoralStatistikPage, CurrencyCommodityMarketStatistikPage,
            /*tree3*/ GeneralNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage, StockNewResearchPage,
            //StockPage
            /*tree2*/ StockPage, StockWatchlist, StockHistoryPage, StockTradeSummaryPage, StockFinancialStatement,
            /*tree3*/ TableStockInfo,
            TableProfil, TableCorpAction,
            //TradePage
            /*tree2*/
            OrderbookPage, TradeWatchlist,
            OrderSetting,SentOrder,TradePageAdv, TradeOrderBookList,
            //AnalyticPage
            /*tree1*/
            AnalyticPage, StockAnalyticPage, IndiceAnalyticPage, RelativePerformanceAnalyticPage,
            //ChatUserPage
            /*tree1*/
            ChatUserPage, ChatSuppPage, ChatCommentPage,
            BrokerPage, BrokerInfo, BrokerTradeSummary, BrokerTradeHistory, BrokerTopListPage,
        }}
        initialFrames={
          [
            { className: 'Landing', title: <CustomFrameHeaderLanding/>, instanceName: 'landingPage'},
            { className: 'MarketStatistik', title: <CustomFrameHeaderMarketStatistik/>, instanceName: 'marketstatistikPage' },
              { className: 'BrokerPage', title: <CustomFrameHeaderBrokerPage/>, instanceName: 'brokerPage' },
              { className: 'Stocks', title: <CustomFrameHeaderStock/>, instanceName: 'stockPage' },
            { className: 'Trade', title: <CustomFrameHeaderTrade />, instanceName: 'tradePage' },
            { className: 'Analytic', title: <CustomFrameHeaderAnalytic />, instanceName: 'analyticPage' },
            { className: 'LiveTradePage', title: '', instanceName: 'livetradePage' },
            { className: 'EsbnPage', title: '', instanceName: 'esbnPage' },
            { className: 'MutualFundPage', title: '', instanceName: 'mutualfundPage' },
            { className: 'ChatSupportPage', title: <CustomFrameHeaderChatSupportPage />, instanceName: 'chatsupportPage' },

            {className: 'PortfolioPage', title: '', instanceName: 'portfolioPage'},
            {className: 'StockSummaryPage', title: 'STOCK SUMMARY', instanceName: 'stockSummaryPage'},
            {className: 'StockFinancialStatement', title: 'FINANCIAL STATEMENT', instanceName: 'stockFinancialStatement'},
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
              {className: 'TradePLPage', title: '', instanceName: 'tradePLPageInvboard'},
            // {className: 'tcAndSoa', title: '', instanceName: 'InvboardTcAndSoa'},

            //tree 2 In MarketStatistik
            {className: 'MarketStatistikPage', title: '', instanceName: 'marketStatistikPage'},
            {className: 'StatisticMarketStatistikPage', title: '', instanceName: 'statisticMarketStatistikPage'},
              {className: 'IndiceMarketStatistikPage', title: '', instanceName: 'indiceMarketStatistikPage'},
              {className: 'NonSectoralStatistikPage', title: '', instanceName: 'nonSectoralStatistikPage'},
              {className: 'IndiceMarketSecondStatistikPage', title: '', instanceName: 'indiceMarketSecondStatistikPage'},
            {className: 'TopBrokerMarketStatistikPage', title: '', instanceName: 'topBrokerMarketStatistikPage'},
            {className: 'IntIndicesMarketStatistikPage', title: '', instanceName: 'intIndicesMarketStatistikPage'},
            {className: 'CurrencyCommodityMarketStatistikPage', title: '', instanceName: 'currencyCommodityMarketStatistikPage'},

            //tree 3 In MarketStatistik
            {className: 'GeneralNewResearchPage', title: '', instanceName: 'newsGeneral'},
            {className: 'StockNewResearchPage', title: '', instanceName: 'newsStock'},
            {className: 'MutualNewResearchPage', title: '', instanceName: 'newsMutualFund'},
            
            //tree 2 In Stock
              {className: 'StockPage', title: '', instanceName: 'stockInfoPage'},
              {className: 'StockFinancialStatement', title: '', instanceName: 'stockFinancialStatement'},
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
            {className: 'TradePageAdv', title: 'ADVERTISEMENT LIST', instanceName: 'tradePageAdv'},
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

              {className: 'BrokerInfo', title: 'Broker Info', instanceName: 'brokerInfo'},
              {className: 'BrokerTradeSummary', title: 'Broker Trade Summary', instanceName: 'brokerTradeSummary'},
              {className: 'BrokerTradeHistory', title: 'Broker Trade History', instanceName: 'brokerTradeHistory'},
              {className: 'BrokerTopListPage', title: 'TOP Broker', instanceName: 'brokerTopListPage'},
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
                        'tradePLPageInvboard',
                        // 'InvboardTcAndSoa'
                    ]
                },
                {
                    name: 'marketstatistikPage',
                    pages : [
                        'marketStatistikPage',
                        'statisticMarketStatistikPage',
                        'indiceMarketStatistikPage',
                        'nonSectoralStatistikPage',
                        /*'indiceMarketSecondStatistikPage',*/
                        'topBrokerMarketStatistikPage',
                        'intIndicesMarketStatistikPage',
                        'currencyCommodityMarketStatistikPage',
                    ]
                },
                {
                    name: 'brokerPage',
                    pages: [
                        'brokerInfo',
                        'brokerTradeSummary',
                        'brokerTradeHistory',
                        'brokerTopListPage',
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
                        'stockFinancialStatement',
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
                        'tradePageOrderBookList',
                        'tradePageAdv',
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
                  <WSConnection socketID="aux" />
                  <MainPage />
                  <AppModal />
              </BIPSAppProvider>
          </NetAppProvider>
      </AppFrameProvider>
    )
  }
}

export default App;