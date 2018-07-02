import { fromJS } from 'immutable';
import { ADD_ANSWER, ADD_TOTAL_SCORE, RESET_RESULT } from '../constants/ResultTypes';

const initialState = fromJS({
  allAnswers: [],
  totalScore: 0,
});

function resultReducer(state = initialState, { type, payload = {} } = {}) {
  switch (type) {
    case ADD_ANSWER:
      const currentAllAnswer = state.get('allAnswers');
      const allAnswers = [...currentAllAnswer, payload];

      return state.set('allAnswers', allAnswers);
    case ADD_TOTAL_SCORE:
      const score = payload + 1;

      return state.set('totalScore', score);
    case RESET_RESULT:
      return initialState;
    default:
      return state;
  }
}

export default resultReducer;
