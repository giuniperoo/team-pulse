// @flow
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/NumericQuestion.css';

const cx = classNames.bind(styles);

export default class NumericQuestion extends Component {
  static defaultProps = {
    value: '',
    labelMin: 'Extremely Bad',
    labelMax: 'Extremely Good'
  }

  prepareButtons() {
    const buttons = [];

    for (let i = 1; i <= 10; i += 1) {
      const className = cx(styles.numericButton, {
        active: this.props.value === i.toString()
      });

      buttons.push(
        <button
          key={i}
          value={i}
          className={className}
          onClick={(evt) => {
            let value = evt.target.value;
            if (value === this.props.value) {
              value = null;
            }
            this.props.onClick(value, this.props.surveyPosition);
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
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  labelMin: PropTypes.string,
  labelMax: PropTypes.string,
  surveyPosition: PropTypes.number.isRequired
};
