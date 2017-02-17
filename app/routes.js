// @flow
import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Survey from './containers/Survey';
import Feedback from './containers/Feedback';
import UserProfile from './containers/UserProfile';

import Privacy from './components/Privacy';
import TermsOfService from './components/TermsOfService';


export default (
  <Route path="/" component={App}>
    <Route path="/survey" component={Survey} />
    <Route path="/feedback" component={Feedback} />
    <Route path="/user-profile" component={UserProfile} />
    <Route path="/login" component={Login} />
    <Route path="/tos" component={TermsOfService} />
    <Route path="/privacy" component={Privacy} />
  </Route>
);
