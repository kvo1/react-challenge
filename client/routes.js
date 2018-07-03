import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoadableVisibility from 'react-loadable-visibility/react-loadable';
import Loading from './common/components/Loading';

const HomeComponent = LoadableVisibility({
  loader: () => import('./modules/Home/index'),
  loading: Loading,
});

const QuizComponent = LoadableVisibility({
  loader: () => import('./modules/Quiz/index'),
  loading: Loading,
});

const ResultComponent = LoadableVisibility({
  loader: () => import('./modules/Result/index'),
  loading: Loading,
});

const IndexRoutes = ({ childProps }) => (
  <Switch>
    <Route exec path='/home' component={HomeComponent} key={Math.random()} props={childProps} />
    <Route exec path='/quiz' component={QuizComponent} key={Math.random()} props={childProps} />
    <Route exec path='/result' component={ResultComponent} key={Math.random()} props={childProps} />
    <Route exec path='/' render={() => <Redirect to='/home' />} props={childProps} />
  </Switch>
);
export {
  IndexRoutes,
};
