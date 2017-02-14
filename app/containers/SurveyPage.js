// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Survey from '../components/Survey';
import * as uiActions from '../actions/ui';
import * as surveyActions from '../actions/survey';


function mapStateToProps(state) {
  return {
    surveyContent: state.survey.surveyContent,
    userProfile: state.user.profile,
    userInput: state.survey.userInput,
    displayedTab: state.ui.displayedTab,
    buttonSpinnerActive: state.ui.buttonSpinnerActive,
    anonymous: state.survey.anonymous,
    submitted: state.survey.submitted
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, surveyActions, uiActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
