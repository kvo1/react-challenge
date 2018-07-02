import React from 'react';
import PropTypes from 'prop-types';

class ResultList extends React.PureComponent {
  render() {
    const renderQuestion = (rawHTML) => React.createElement('p', { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
      <div>
        <div className='result-title center'>
          <h2>Your Score</h2>
          <h1>{this.props.score}/{this.props.totalQuestions}</h1>
        </div>
        <div className='result-description'>
          {
            this.props.results.map((item, index) => {
              const resultIcon = item.isCorrectAnswer ? <i className='fa fa-check result-icon green'></i> : <i className='fa fa-times result-icon red'></i>;

              return (
                <div className='result-item' key={index}>
                  {resultIcon}
                  { renderQuestion(`${item.question}`) }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

ResultList.propTypes = {
  results: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  score: PropTypes.number,
  totalQuestions: PropTypes.number,
};

export default ResultList;
