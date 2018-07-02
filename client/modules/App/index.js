import React from 'react';
import { withRouter } from 'react-router';
import { IndexRoutes } from '../../routes';

class App extends React.PureComponent {
  render() {
    return (
      <div className='app-root'>
        <IndexRoutes />
      </div>
    );
  }
}

export default withRouter(App);
