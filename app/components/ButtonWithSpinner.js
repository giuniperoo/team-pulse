// @flow
import React, { Component, PropTypes } from 'react';
import ReactSpinner from 'react-spinjs';

export default class ButtonWithSpinner extends Component {

  static defaultProps = {
    label: '',
    classes: 'blueButton'
  }

  constructor() {
    super();
    this.spinnerOptions = {
      color: 'white',
      lines: 9,
      width: 2,
      length: 3,
      radius: 4,
      hwaccel: true
    };
  }

  spinnerOptions: {}

  render() {
    const label = this.props.label;
    const onClick = this.props.onClick;
    const classes = this.props.classes;
    const buttonSpinnerActive = this.props.buttonSpinnerActive;

    return (
      <button className={classes} onClick={onClick}>
        {buttonSpinnerActive ? <ReactSpinner config={this.spinnerOptions} /> : label}
      </button>
    );
  }
}

ButtonWithSpinner.propTypes = {
  label: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  buttonSpinnerActive: PropTypes.bool.isRequired
};
