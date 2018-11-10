import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { App } from './containers/App';
import { getStore } from './state/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={getStore()}>
    <App/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
