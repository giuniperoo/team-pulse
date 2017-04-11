// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserProfile from '../components/UserProfile';
import * as uiActions from '../actions/ui';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';


function mapStateToProps(state) {
  return {
    user: state.user,
    offline: state.ui.offline,
    alertText: state.ui.alertText,
    alertActive: state.ui.alertActive,
    displayedTab: state.ui.displayedTab,
    avatarImageLoaded: state.ui.avatarImageLoaded,
    buttonSpinnerActive: state.ui.buttonSpinnerActive
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, authActions, userActions, uiActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile); // eslint-disable-line
