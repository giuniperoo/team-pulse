// @flow
import React, { Component, PropTypes } from 'react';
import { kebabCase } from 'lodash';
import classNames from 'classnames/bind';
import styles from '../styles/PictoralQuestion.scss';

const cx = classNames.bind(styles);

export default class PictoralQuestion extends Component {
  static defaultProps = {
    value: '',
    domRef: null
  }

  prepareButtons() {
    const buttons = [];
    const labels = ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'];

    /* eslint-disable react/no-array-index-key */
    labels.forEach((label, index) => {
      const className = cx(styles.pictoralButton, `icon-${kebabCase(label)}`, {
        active: this.props.value === (index + 1).toString()
      });

      buttons.push(
        <button
          key={index}
          value={index + 1}
          className={className}
          onClick={(evt) => {
            let value = evt.target.value;
            if (value === this.props.value) {
              value = null;
            }
            this.props.onClick(value, this.props.surveyPosition);
          }}
        >
          <span>{label}</span>
        </button>);
    });

    return buttons;
  }

  render() {
    const title = this.props.title;
    const domRef = this.props.domRef;

    return (
      <div ref={domRef} className={styles.pictoralQuestion}>
        <h3>{title}</h3>

        <div className={styles.buttonContainer}>
          {this.prepareButtons()}
        </div>
      </div>
    );
  }
}

PictoralQuestion.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  domRef: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  surveyPosition: PropTypes.number.isRequired
};
