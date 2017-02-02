// @flow
import { surveyActionTypes } from '../actions/survey';

const initialState = {
  surveyContent: {}
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const reducer = (
  state: { surveyContent: {} } = initialState,
  action: { type: string, survey: {} | void }
) => {
  switch (action.type) {
    case surveyActionTypes.FETCH_SURVEY_SUCCESS:
      return Object.assign({}, state, {
        surveyContent: action.survey
      });
    default:
      return state;
  }
};

export { reducer as default };
