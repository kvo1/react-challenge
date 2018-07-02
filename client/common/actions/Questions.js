import { ADD_QUESTIONS, ADD_CURRENT_QUESTION, NEXT_QUESTION, TOTAL_QUESTIONS } from '../constants/QuestionTypes';

export function addQuestions(payload) {
  return {
    type: ADD_QUESTIONS,
    payload,
  };
}

export function addCurrentQuestion(payload) {
  return {
    type: ADD_CURRENT_QUESTION,
    payload,
  };
}

export function addTotalQuestions(payload) {
  return {
    type: TOTAL_QUESTIONS,
    payload,
  };
}

export function moveNextQuestion(payload) {
  return {
    type: NEXT_QUESTION,
    payload,
  };
}
