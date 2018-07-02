import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import registerServiceWorker from './registerServiceWorker';
import createStore from './common/store/createStore';
import { selectLocationState } from './common/selectors/App';
import App from './modules/App';

const history = createHistory();
const initialState = {};
const store = createStore(initialState, browserHistory, {
  selectLocationState: selectLocationState(),
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  onUpdated: () => {
    window.swUpdate = true;
  },
});

registerServiceWorker();
