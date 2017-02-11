// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import survey from './survey';
import user from './user';
import ui from './ui';

const rootReducer = combineReducers({
  routing,
  survey,
  user,
  ui
});

export default rootReducer;
