// @flow
import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import SurveyPage from './containers/SurveyPage';
import FeedbackPage from './containers/FeedbackPage';
import UserProfilePage from './containers/UserProfilePage';


export default (
  <Route path="/" component={App}>
    <Route path="/survey" component={SurveyPage} />
    <Route path="/feedback" component={FeedbackPage} />
    <Route path="/user-profile" component={UserProfilePage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);
