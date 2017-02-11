// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as uiActions from '../actions/ui';
import * as userActions from '../actions/user';


function mapStateToProps(state) {
  return {
    user: state.user,
    displayedTab: state.ui.displayedTab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, userActions, uiActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
