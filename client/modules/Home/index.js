import React from 'react';
import { withRouter } from 'react-router';
import { Button, Cell, Grid } from 'react-md';

class Home extends React.PureComponent {
  _startQuiz = async () => {
    this.props.history.push('/quiz');
  }

  render() {
    return (
      <Grid className='app-home-wrapper'>
        <Cell className='app-home-container' size={4} desktopOffset={4} tabletOffset={2}>
          <div className='home-main-wrapper center'>
            <div className='home-title'>
              <h2>Welcome to the</h2>
              <h1>Trivia Challenge!</h1>
            </div>
            <div className='home-description center'>
              <p>You will be presented with 10 True or False questions.</p>
              <p>Can you score 100%?</p>
            </div>
            <div className='home-control center'>
              <Button iconClassName='fa fa-play-circle' raised swapTheming onClick={() => this._startQuiz()}>
                Begin
              </Button>
            </div>
          </div>
        </Cell>
      </Grid>
    );
  }
}

export default withRouter(Home);
