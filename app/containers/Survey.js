// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Survey from '../components/Survey';
import * as uiActions from '../actions/ui';
import * as surveyActions from '../actions/survey';


function mapStateToProps(state) {
  return {
    userInput: state.survey.userInput,
    anonymous: state.survey.anonymous,
    surveyKey: state.survey.surveyKey,
    surveyContent: state.survey.surveyContent,
    justSubmitted: state.survey.justSubmitted,

    user: state.user,

    offline: state.ui.offline,
    displayedTab: state.ui.displayedTab,
    buttonSpinnerActive: state.ui.buttonSpinnerActive
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, surveyActions, uiActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
