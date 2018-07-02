import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.PureComponent {
  render() {
    const renderQuestion = (rawHTML) => React.createElement('p', { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
      <div question-id={this.props.questionId}>
        <div className='question-title'>
          <h1>{this.props.category}</h1>
        </div>
        <div className='question-description center'>
          <i className='fa fa-question'></i>
          <h4>Question: {this.props.questionCounter}/{this.props.totalQuestions}</h4>
          { renderQuestion(`${this.props.question}`) }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  questionCounter: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired
};

export default Question;
