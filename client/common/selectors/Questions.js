import { createSelector } from 'reselect';

const getQuestions = () => (state) => state.get('questions');

const selectAllQuestions = () => createSelector(
  getQuestions(),
  (state) => state.get('allQuestions')
);

const selectCurrentQuestion = () => createSelector(
  getQuestions(),
  (state) => state.get('currentQuestion')
);

const selectCounter = () => createSelector(
  getQuestions(),
  (state) => state.get('currentCounter')
);

const selectTotalQuestions = () => createSelector(
  getQuestions(),
  (state) => state.get('totalQuestions')
);

export {
  selectAllQuestions,
  selectCurrentQuestion,
  selectCounter,
  selectTotalQuestions,
};
