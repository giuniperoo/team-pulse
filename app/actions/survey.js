// @flow
import * as firebase from 'firebase';
import { toggleButtonSpinner } from '../actions/ui';

export const surveyActionTypes = {
  FETCH_SURVEY_SUCCESS: 'FETCH_SURVEY_SUCCESS',
  FETCH_SURVEY_ERROR: 'FETCH_SURVEY_ERROR',
  SUBMIT_SURVEY_SUCCESS: 'SUBMIT_SURVEY_SUCCESS',
  SUBMIT_SURVEY_ERROR: 'SUBMIT_SURVEY_ERROR',
  TOGGLE_ANONYMOUS: 'TOGGLE_ANONYMOUS',
  SET_USER_INPUT: 'SET_USER_INPUT'
};

export const toggleAnonymous = () => ({
  type: surveyActionTypes.TOGGLE_ANONYMOUS
});

export const setUserInput = (value: string | void, position: number) => ({
  type: surveyActionTypes.SET_USER_INPUT,
  value,
  position
});

export const fetchSurveySuccess = (survey: {}) => ({
  type: surveyActionTypes.FETCH_SURVEY_SUCCESS,
  survey
});

export const fetchSurveyError = (error: {}) => ({
  type: surveyActionTypes.FETCH_SURVEY_ERROR,
  error
});

// eslint-disable-next-line flowtype/no-weak-types
export const fetchSurvey = () => (dispatch: Function) => {
  const database = firebase.database();
  const survey = database.ref().child('v1/surveys').orderByChild('start').limitToLast(1);

  survey.once('value')
    .then(snapshot => dispatch(fetchSurveySuccess(snapshot.val())))
    .catch(error => dispatch(fetchSurveyError(error)));
};

export const submitSurveySuccess = (survey: {}) => ({
  type: surveyActionTypes.SUBMIT_SURVEY_SUCCESS,
  survey
});

export const submitSurveyError = (error: {}) => ({
  type: surveyActionTypes.SUBMIT_SURVEY_ERROR,
  error
});

// eslint-disable-next-line flowtype/no-weak-types
export const submitSurvey = (userInput: Array<*>) => (dispatch: Function) => {
  dispatch(toggleButtonSpinner());
  console.log(userInput);

  setTimeout(() => dispatch(toggleButtonSpinner()), 1000);

  // const database = firebase.database();
  // const survey = database.ref().child('v1/surveys').orderByChild('start').limitToLast(1);

  // survey.once('value')
  //   .then(snapshot => dispatch(submitSurveySuccess(snapshot.val())))
  //   .catch(error => dispatch(submitSurveyError(error)));
};
