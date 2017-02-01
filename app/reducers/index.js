// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import ui from './ui';

const rootReducer = combineReducers({
  counter,
  routing,
  ui
});

export default rootReducer;
