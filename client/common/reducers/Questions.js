import { fromJS } from 'immutable';
import { ADD_QUESTIONS, ADD_CURRENT_QUESTION, NEXT_QUESTION, TOTAL_QUESTIONS } from '../constants/QuestionTypes';

const initialState = fromJS({
  allQuestions: [],
  currentQuestion: {},
  currentCounter: 0,
  totalQuestions: 0,
});

function questionsReducer(state = initialState, { type, payload = {} } = {}) {
  switch (type) {
    case ADD_QUESTIONS:
      return state.set('allQuestions', payload);
    case ADD_CURRENT_QUESTION:
      return state.set('currentQuestion', payload);
    case NEXT_QUESTION:
      const counter = payload + 1;
      return state.set('currentCounter', counter);
    case TOTAL_QUESTIONS:
      return state.set('totalQuestions', payload);
    default:
      return state;
  }
}

export default questionsReducer;
