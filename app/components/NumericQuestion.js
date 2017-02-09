// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/NumericQuestion.css';


export default class NumericQuestion extends Component {
  static defaultProps = {
    labelMin: 'Extremely Bad',
    labelMax: 'Extremely Good'
  }

  propagateClick(evt: Proxy<*>) {
    this.props.onClick(evt);
  }

  prepareButtons() {
    const buttons = [];

    for (let i = 1; i <= 10; i += 1) {
      buttons.push(
        <button
          key={i}
          value={i}
          className={styles.numericButton}
          onClick={(evt) => {
            this.props.onClick(evt.target.value, this.props.surveyPosition);
          }}
        >{i}</button>);
    }

    return buttons;
  }

  render() {
    const title = this.props.title;
    const labelMin = this.props.labelMin;
    const labelMax = this.props.labelMax;

    return (
      <div className={styles.numericQuestion}>
        <h3>{title}</h3>

        <div className={styles.buttonContainer}>
          {this.prepareButtons()}
        </div>

        <span>{labelMin}</span>
        <span className={styles.right}>{labelMax}</span>
      </div>
    );
  }
}

NumericQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  labelMin: PropTypes.string,
  labelMax: PropTypes.string,
  surveyPosition: PropTypes.number.isRequired
};
