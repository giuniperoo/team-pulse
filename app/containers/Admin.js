// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Admin from '../components/Admin';
import * as uiActions from '../actions/ui';


function mapStateToProps(state) {
  return {
    displayedTab: state.ui.displayedTab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(uiActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
