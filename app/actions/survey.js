// @flow
import * as firebase from 'firebase';

export const surveyActionTypes = {
  FETCH_SURVEY_SUCCESS: 'FETCH_SURVEY_SUCCESS',
  FETCH_SURVEY_ERROR: 'FETCH_SURVEY_ERROR'
};

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
  const survey = database.ref().child('test').orderByChild('start').limitToLast(1);

  survey.once('value')
    .then(snapshot => dispatch(fetchSurveySuccess(snapshot.val())))
    .catch(error => dispatch(fetchSurveyError(error)));
};
