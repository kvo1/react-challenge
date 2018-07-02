import { Map } from 'immutable';
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import globalReducer from './App';
import questionReducer from './Questions';
import resultReducer from './Result';

const routeInitialState = Map({
  location: null,
  action: null
});

function routeReducer(state = routeInitialState, { type, payload = {} } = {}) {
  switch (type) {
    case LOCATION_CHANGE:
      const location = payload.location || payload;

      return state
        .set('location', location)
        .set('action', payload.action);
    default:
      return state;
  }
}

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    questions: questionReducer,
    result: resultReducer,
    form,
    ...asyncReducers,
  });
}
