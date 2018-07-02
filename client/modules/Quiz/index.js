import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Cell, Grid } from 'react-md';
import { selectAllQuestions, selectCurrentQuestion, selectCounter, selectTotalQuestions } from '../../common/selectors/Questions';
import { selectTotalScore, selectAllResult } from '../../common/selectors/Result';
import { addQuestions, addCurrentQuestion, moveNextQuestion, addTotalQuestions } from '../../common/actions/Questions';
import { addAnswer, addTotalScore } from '../../common/actions/Result';
import api from '../../common/api';
import Question from '../../common/components/Question';

class Quiz extends React.PureComponent {
  componentWillMount() {
    api().getQuestions().then((questions) => {
      this.props.onAllQuestionsLoaded(questions);
      this.props.onQuestionLoaded(questions[this.props.currentCounter]);
      this.props.onAddTotalQuestions(questions.length);
      this.props.onAddTotalScore(-1);
    }).catch((error) => {
        console.log(error);
    });
  }

  _saveAnswer = async (answer) => {
    const { currentCounter, currentTotalScore } = this.props;
    const questions = this.props.allQuestions;
    const currentQuestion = questions[currentCounter];

    // Check if the answer is correct
    const isCorrectAnswer = this.isCorrectAnswer(currentQuestion, answer);
    isCorrectAnswer && await this.props.onAddTotalScore(currentTotalScore);

    // Add the answer to the result list
    await this.addAnswerToResultList(currentQuestion, isCorrectAnswer);

    // Move to next question
    await this.props.onNextQuestionMoved(currentCounter);
    await this.props.onQuestionLoaded(questions[this.props.currentCounter]);

    this.forceUpdate();

    if (currentCounter === (this.props.totalQuestions - 1)) {
      this.props.onNextQuestionMoved(-1);
      this.props.history.push('/result');
    }
  }

  isCorrectAnswer = (question, answer) => {
    return question.correct_answer === answer;
  }

  addAnswerToResultList = (question, isCorrectAnswer) => {
    const currentResult = {
      question: question.question,
      isCorrectAnswer
    };

    this.props.onAddAnswer(currentResult);
  }

  render() {
    const currentQuestion = !_.isUndefined(this.props.currentQuestion) ? this.props.currentQuestion : null;
    const { currentCounter, totalQuestions } = this.props;
    const isDataLoaded = totalQuestions > 0 && currentQuestion;

    return (
      <Grid className='app-question-wrapper'>
        <Cell className='app-question-container' size={4} desktopOffset={4} tabletSize={4} tabletOffset={1}>
          <div className='question-main-wrapper center' question-id={this.props.questionId}>
            {
              isDataLoaded && (
                <Question
                  totalQuestions={totalQuestions}
                  questionCounter={currentCounter + 1}
                  category={currentQuestion.category || ''}
                  questionId={currentCounter}
                  question={currentQuestion.question || ''}
                />
              )
            }
            <div className='question-control center'>
              <Button iconClassName='fa fa-times' className='question-button-false' floating swapTheming tooltipLabel='False' onClick={() => this._saveAnswer('False')} />
              <Button iconClassName='fa fa-check' className='question-button-true' floating swapTheming tooltipLabel='True' onClick={() => this._saveAnswer('True')} />
            </div>
          </div>
        </Cell>
      </Grid>
    );
  }
}

Quiz.propTypes = {
  onAllQuestionsLoaded: PropTypes.func,
  onQuestionLoaded: PropTypes.func,
  onNextQuestionMoved: PropTypes.func,
  onAddTotalQuestions: PropTypes.func,
  onAddAnswer: PropTypes.func,
  onAddTotalScore: PropTypes.func,
  allQuestions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentQuestion: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentCounter: PropTypes.number,
  currentTotalScore: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAllQuestionsLoaded: (questions) => dispatch(addQuestions(questions)),
    onQuestionLoaded: (question) => dispatch(addCurrentQuestion(question)),
    onNextQuestionMoved: (counter) => dispatch(moveNextQuestion(counter)),
    onAddTotalQuestions: (total) => dispatch(addTotalQuestions(total)),
    onAddAnswer: (answer) => dispatch(addAnswer(answer)),
    onAddTotalScore: (score) => dispatch(addTotalScore(score)),
  };
};

const mapStateToProps = createStructuredSelector({
  allQuestions: selectAllQuestions(),
  currentQuestion: selectCurrentQuestion(),
  currentCounter: selectCounter(),
  totalQuestions: selectTotalQuestions(),
  currentResultList: selectAllResult(),
  currentTotalScore: selectTotalScore(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz));
