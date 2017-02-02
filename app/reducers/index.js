// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import survey from './survey';
import ui from './ui';

const rootReducer = combineReducers({
  survey,
  routing,
  ui
});

export default rootReducer;
