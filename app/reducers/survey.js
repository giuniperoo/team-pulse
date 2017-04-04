// @flow
import Immutable from 'seamless-immutable';
import { keys, isBoolean } from 'lodash';
import { surveyActionTypes } from '../actions/survey';

const initialState = Immutable({
  surveyContent: {},
  surveyKey: '',
  userInput: [],
  anonymous: null,
  justSubmitted: false,
  surveyBeingFetched: false
});

const surveyReducer = (
  state: {
    /* eslint-disable flowtype/no-weak-types */
    set: Function,
    merge: Function,
    /* eslint-enable flowtype/no-weak-types */
    surveyKey: string,
    surveyContent: {},
    userInput: Array<*>,
    anonymous?: boolean,
    justSubmitted: boolean,
    surveyBeingFetched: boolean
  } = initialState,
  action: {
    type: string,
    survey?: {},
    position?: number,
    value?: string,
    error?: {},
    toggle?: boolean
  }
) => {
  // lexical declarations for inside case blocks
  let arrayPos = null;
  let surveyKey = null;
  let surveyContent = null;
  let userInputArray = [];

  switch (action.type) {
    case surveyActionTypes.FETCHING_SURVEY:
      return state.set('surveyBeingFetched', true);

    case surveyActionTypes.FETCH_SURVEY_SUCCESS:
      surveyKey = keys(action.survey)[0];
      surveyContent = action.survey && action.survey[surveyKey];

      return state.merge({
        surveyKey,
        surveyContent,
        surveyBeingFetched: false
      });

    case surveyActionTypes.FETCH_SURVEY_ERROR:
      console.error('FETCH_SURVEY_ERROR', action.error);
      return state.set('surveyBeingFetched', false);

    case surveyActionTypes.SUBMIT_SURVEY_SUCCESS:
      // store key of submitted survey in local storage
      localStorage.setItem('lastSubmittedSurvey', state.surveyKey);

      return state.set('justSubmitted', true);

    case surveyActionTypes.SUBMIT_SURVEY_ERROR:
      console.error('SUBMIT_SURVEY_ERROR', action.error);
      return state;

    case surveyActionTypes.TOGGLE_ANONYMOUS:
      if (isBoolean(action.toggle)) {
        return state.set('anonymous', action.toggle);
      }
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
