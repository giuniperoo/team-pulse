// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Feedback from '../components/Feedback';
import * as uiActions from '../actions/ui';


function mapStateToProps(state) {
  return {
    displayedTab: state.ui.displayedTab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(uiActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
