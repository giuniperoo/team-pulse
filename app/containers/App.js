// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import * as uiActions from '../actions/ui';
import App from '../components/App';


function mapStateToProps(state) {
  return {
    user: state.user,
    offline: state.ui.offline
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, authActions, uiActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
