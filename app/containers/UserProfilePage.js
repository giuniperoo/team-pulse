import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserProfile from '../components/UserProfile';
// import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    // counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators(CounterActions, dispatch);
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
