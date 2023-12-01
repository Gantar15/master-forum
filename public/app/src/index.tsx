import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './shared/infra/redux/configureStore';
import { initialReduxStartupScript } from './shared/infra/redux/startupScript';

const store = configureStore();

//@ts-ignore
initialReduxStartupScript(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
