import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Survey from '../components/Survey';
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

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
