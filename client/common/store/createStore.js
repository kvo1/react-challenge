import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import { fromJS } from 'immutable';
// import logger from './middleware/logger';  // Uncomment this to show logs to browser console.
import rootReducer from '../reducers';
import { saveGlobalState } from './localStateStorage';

const middlewares = __DEV__ ?
  [apiMiddleware, routerMiddleware(history), /* logger */] :
  [apiMiddleware, routerMiddleware(history)];

const enhancers = [
  applyMiddleware(...middlewares),
];

export function injectAsyncReducer(store, name, asyncReducer) {
  if (store.asyncReducers[name]) return;

  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

function configureStore(initialState = {}) {
  const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    rootReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.subscribe(() => saveGlobalState(store.getState()));
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      import('../reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}

export default configureStore;
