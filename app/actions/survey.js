// @flow
import * as firebase from 'firebase';
import { delay } from 'lodash';
import { toggleButtonSpinner } from '../actions/ui';

export const surveyActionTypes = {
  FETCHING_SURVEY: 'FETCHING_SURVEY',
  FETCH_SURVEY_SUCCESS: 'FETCH_SURVEY_SUCCESS',
  FETCH_SURVEY_ERROR: 'FETCH_SURVEY_ERROR',
  SUBMIT_SURVEY_SUCCESS: 'SUBMIT_SURVEY_SUCCESS',
  SUBMIT_SURVEY_ERROR: 'SUBMIT_SURVEY_ERROR',
  TOGGLE_ANONYMOUS: 'TOGGLE_ANONYMOUS',
  SET_USER_INPUT: 'SET_USER_INPUT',
  REMOVE_JUST_SUBMITTED: 'REMOVE_JUST_SUBMITTED'
};

export const toggleAnonymous = (toggle?: boolean) => ({
  type: surveyActionTypes.TOGGLE_ANONYMOUS,
  toggle
});

export const setUserInput = (value?: string, position: number) => ({
  type: surveyActionTypes.SET_USER_INPUT,
  value,
  position
});

const fetchingSurvey = () => ({
  type: surveyActionTypes.FETCHING_SURVEY
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
export const fetchSurvey = (organization: string) => (dispatch: Function) => {
  const database = firebase.database();
  const survey = database.ref('surveys')
    .orderByChild('organization')
    .equalTo(organization)
    .limitToLast(1);

  dispatch(fetchingSurvey());
  survey.once('value')
    .then(snapshot => dispatch(fetchSurveySuccess(snapshot.val())))
    .catch(error => dispatch(fetchSurveyError(error)));
};

export const submitSurveySuccess = () => ({
  type: surveyActionTypes.SUBMIT_SURVEY_SUCCESS
});

export const submitSurveyError = (error: {}) => ({
  type: surveyActionTypes.SUBMIT_SURVEY_ERROR,
  error
});

export const removeJustSubmitted = () => ({
  type: surveyActionTypes.REMOVE_JUST_SUBMITTED
});

export const submitSurvey = (
  surveyKey: string,
  userInput: Array<*>,
  userId?: string
// eslint-disable-next-line flowtype/no-weak-types
) => (dispatch: Function) => {
  dispatch(toggleButtonSpinner());

  // wait a little while ;)
  delay(() => _submitSurvey(), 1000);

  // eslint-disable-next-line no-underscore-dangle
  const _submitSurvey = () => {
    const database = firebase.database();
    const pushRef = database.ref(`answers/${surveyKey}`).push();

    const surveyData: { values: Array<number | string>, uid?: string } = { values: userInput };
    if (userId) { surveyData.uid = userId; }

    pushRef.set(surveyData)
      .then(() => {
        dispatch(submitSurveySuccess());
        return dispatch(toggleButtonSpinner());
      })
      .catch(error => {
        dispatch(submitSurveyError(error));
        return dispatch(toggleButtonSpinner());
      });
  };
};
