import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as firebase from 'firebase';

import routes from './routes';
import configureStore from './store/configureStore';
import './styles/global/app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const config = {
  apiKey: 'AIzaSyBgTMhh1ONCNi5leEy1DNz2TgQQX8M33og',
  authDomain: 'team-pulse-magic.firebaseapp.com',
  databaseURL: 'https://team-pulse-magic.firebaseio.com',
  storageBucket: 'team-pulse-magic.appspot.com',
  messagingSenderId: '114176198859'
};

firebase.initializeApp(config);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('teamPulse')
);
