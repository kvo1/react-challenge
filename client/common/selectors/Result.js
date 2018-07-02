import { createSelector } from 'reselect';

const getResult = () => (state) => state.get('result');

const selectAllResult = () => createSelector(
  getResult(),
  (state) => state.get('allAnswers')
);

const selectTotalScore = () => createSelector(
  getResult(),
  (state) => state.get('totalScore')
);

export {
  selectAllResult,
  selectTotalScore,
};
