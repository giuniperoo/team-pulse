// @flow
import Immutable from 'seamless-immutable';
import { surveyActionTypes } from '../actions/survey';

const initialState = Immutable({
  surveyContent: {},
  userInput: [],
  anonymous: false
});

const surveyReducer = (
  state: {
    // eslint-disable-next-line flowtype/no-weak-types
    set: Function,
    // eslint-disable-next-line flowtype/no-weak-types
    merge: Function,
    surveyContent: {},
    userInput: Array<*>,
    anonymous: boolean
  } = initialState,
  action: {
    type: string,
    survey: {} | void,
    position: number | void,
    value: string | void
  }
) => {
  let userInputArray = [];
  let arrayPos = null;
  switch (action.type) {
    case surveyActionTypes.FETCH_SURVEY_SUCCESS:
      return state.set('surveyContent', action.survey);

    case surveyActionTypes.TOGGLE_ANONYMOUS:
      return state.set('anonymous', !state.anonymous);

    case surveyActionTypes.SET_USER_INPUT:
      if (!action.position) { return state; }

      // position is 1-based, so decrease
      arrayPos = action.position - 1;

      userInputArray = Immutable.asMutable(state.userInput);
      userInputArray[arrayPos] = action.value;
      return state.set('userInput', userInputArray);

    default:
      return state;
  }
};

export { surveyReducer as default };
