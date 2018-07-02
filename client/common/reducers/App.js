import { Map } from 'immutable';
import {
  APP_ERROR,
  APP_LOADING,
} from '../constants/AppTypes';
import { loadGlobalState } from '../store/localStateStorage';

const localGlobalState = loadGlobalState();
const global = localGlobalState && localGlobalState.__rcstore;

const initialState = Map(global || {
  error: false,
  loading: false,
});

function appReducer(state = initialState, { type, payload = {} } = {}) {
  switch (type) {
    case APP_LOADING:
      return state.set('loading', payload);
    case APP_ERROR:
      return state.set('error', payload);
    default:
      return state;
  }
}

export default appReducer;
