// @flow
import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Survey from './containers/Survey';
import UserProfile from './containers/UserProfile';


export default (
  <Route path="/" component={App}>
    <Route path="/survey" component={Survey} />
    <Route path="/user-profile" component={UserProfile} />
    <Route path="/login" component={Login} />
  </Route>
);
