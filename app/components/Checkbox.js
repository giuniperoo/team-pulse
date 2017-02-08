// @flow
import React, { Component, PropTypes } from 'react';


export default class Checkbox extends Component {
  static defaultProps = {
    label: '',
    classes: '',
    isChecked: false
  }

  render() {
    return (
      <span className={`checkbox ${this.props.classes}`}>
        <input
          type="checkbox"
          id={this.props.id}
          checked={this.props.isChecked && 'checked'}
          onClick={() => this.props.onClick()}
        />
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </span>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool
};
