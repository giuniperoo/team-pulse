// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import MainPage from './containers/MainPage';
import SurveyPage from './containers/SurveyPage';
import FeedbackPage from './containers/FeedbackPage';
import UserProfilePage from './containers/UserProfilePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="/survey" component={SurveyPage} />
    <Route path="/feedback" component={FeedbackPage} />
    <Route path="/user-profile" component={UserProfilePage} />
  </Route>
);
