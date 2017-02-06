// @flow
import Immutable from 'seamless-immutable';
import { surveyActionTypes } from '../actions/survey';

const initialState = Immutable({
  surveyContent: {}
});

const surveyReducer = (
  // eslint-disable-next-line flowtype/no-weak-types
  state: { set: Function, surveyContent: {} } = initialState,
  action: { type: string, survey: {} | void }
) => {
  switch (action.type) {
    case surveyActionTypes.FETCH_SURVEY_SUCCESS:
      return state.set('surveyContent', action.survey);
    default:
      return state;
  }
};

export { surveyReducer as default };
