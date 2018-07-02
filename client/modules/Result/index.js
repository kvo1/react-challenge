import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Cell, Grid } from 'react-md';
import { resetResult } from '../../common/actions/Result';
import { selectTotalScore, selectAllResult } from '../../common/selectors/Result';
import { selectTotalQuestions } from '../../common/selectors/Questions';
import ResultList from '../../common/components/ResultList';

class Result extends React.PureComponent {
  componentDidMount() {
    if (this.props.totalQuestions < 1) {
      this.props.history.push('/');
    }
  }

  _playAgain = async () => {
    this.props.onResetResult();
    this.props.history.push('/quiz');
  }

  render() {
    return (
      <Grid className='app-result-wrapper'>
        <Cell className='app-result-container' size={4} desktopOffset={4} tabletSize={4} tabletOffset={1}>
          <div className='result-main-wrapper'>
            <ResultList
              results={this.props.currentResult}
              score={this.props.totalScore}
              totalQuestions={this.props.totalQuestions}
            />
            <div className='result-control center'>
              <Button className='' raised swapTheming onClick={() => this._playAgain()}>Play Again?</Button>
            </div>
          </div>
        </Cell>
      </Grid>
    );
  }
}

Result.propTypes = {
  currentResult: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  totalScore: PropTypes.number,
  onResetResult: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetResult: () => dispatch(resetResult()),
  };
};

const mapStateToProps = createStructuredSelector({
  currentResult: selectAllResult(),
  totalScore: selectTotalScore(),
  totalQuestions: selectTotalQuestions(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result));
