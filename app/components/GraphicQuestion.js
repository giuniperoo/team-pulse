// @flow
import React, { Component } from 'react';


export default class GraphicQuestion extends Component {
  render() {
    const title = this.props.title;

    return (
      <div>{title}</div>
    );
  }
}

GraphicQuestion.propTypes = {
  title: React.PropTypes.string.isRequired
};
