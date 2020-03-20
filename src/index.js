import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './icons/fontawesome.css';
import './icons/ionicons.css';
import './icons/linearicons.css';
import './icons/open-iconic.css';
import './icons/pe-icon-7-stroke.css';
import './icons/icofont.css';
import './icons/bips-icon/css/bips-icon.css';
import './semantic-dist/semantic.min.css';
import './bootstrap-3.3.7/bootstrap/dist/css/bootstrap_node.css';

import './bootstrap-3.3.7/ag-grid-community/dist/styles/ag-grid.css';
import './bootstrap-3.3.7/ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import './App.css';
import anychart from 'anychart';

import {LicenseManager} from 'ag-grid-enterprise';

LicenseManager.setLicenseKey("CompanyName=PT Bahana Sekuritas,LicensedApplication=DX Trade,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=1,AssetReference=AG-007403,ExpiryDate=18_March_2021_[v2]_MTYxNjAyNTYwMDAwMA==5dc0e27ff88d68e1298c3b5e6765318b");
anychart.licenseKey("bahana.co.id-32cc970-3e0612a5");



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
