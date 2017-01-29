// @flow
import React, { Component } from 'react';

export default class EntryPage extends Component {
  // TODO: The entry page will be rewritten to handle authentication.
  //       For now, just reroute to the "default" tab (feedback).
  componentWillReceiveProps() {
    this.props.router.push('/feedback');
  }

  render() {
    return (
      <div />
    );
  }
}
