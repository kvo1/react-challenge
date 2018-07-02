import { ADD_ANSWER, ADD_TOTAL_SCORE, RESET_RESULT } from '../constants/ResultTypes';

export function addAnswer(payload) {
  return {
    type: ADD_ANSWER,
    payload,
  };
}

export function addTotalScore(payload) {
  return {
    type: ADD_TOTAL_SCORE,
    payload,
  };
}

export function resetResult() {
  return {
    type: RESET_RESULT,
  };
}
