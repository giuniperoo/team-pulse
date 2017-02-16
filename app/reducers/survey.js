// @flow
import Immutable from 'seamless-immutable';
import { keys } from 'lodash';
import { surveyActionTypes } from '../actions/survey';

const initialState = Immutable({
  surveyContent: {},
  userInput: [],
  anonymous: false,
  justSubmitted: false
});

const surveyReducer = (
  state: {
    /* eslint-disable flowtype/no-weak-types */
    set: Function,
    /* eslint-enable flowtype/no-weak-types */
    surveyContent: {},
    userInput: Array<*>,
    anonymous: boolean,
    justSubmitted: boolean
  } = initialState,
  action: {
    type: string,
    survey?: {},
    position?: number,
    value?: string,
    error?: {}
  }
) => {
  // lexical declarations for inside case blocks
  let arrayPos = null;
  let surveyKey = null;
  let userInputArray = [];

  switch (action.type) {
    case surveyActionTypes.FETCH_SURVEY_SUCCESS:
      return state.set('surveyContent', action.survey);

    case surveyActionTypes.SUBMIT_SURVEY_SUCCESS:
      // store key of submitted survey in local storage
      surveyKey = keys(state.surveyContent)[0];
      localStorage.setItem('lastSubmittedSurvey', surveyKey);

      return state.set('justSubmitted', true);

    case surveyActionTypes.SUBMIT_SURVEY_ERROR:
      console.error('submitSurveyError', action.error);
      return state;

    case surveyActionTypes.TOGGLE_ANONYMOUS:
      return state.set('anonymous', !state.anonymous);

    case surveyActionTypes.SET_USER_INPUT:
      if (!action.position) { return state; }

      // position is 1-based, so decrease
      arrayPos = action.position - 1;

      userInputArray = Immutable.asMutable(state.userInput);
      userInputArray[arrayPos] = action.value;
      return state.set('userInput', userInputArray);

    case surveyActionTypes.REMOVE_JUST_SUBMITTED:
      return state.set('justSubmitted', false);

    default:
      return state;
  }
};

export { surveyReducer as default };
