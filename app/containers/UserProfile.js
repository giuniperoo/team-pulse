// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserProfile from '../components/UserProfile';
import * as uiActions from '../actions/ui';
import * as authActions from '../actions/auth';


function mapStateToProps(state) {
  return {
    displayedTab: state.ui.displayedTab,
    buttonSpinnerActive: state.ui.buttonSpinnerActive
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, authActions, uiActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
