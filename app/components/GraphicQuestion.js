// @flow
import React, { Component, PropTypes } from 'react';
import { kebabCase } from 'lodash';
import styles from '../styles/GraphicQuestion.css';

export default class GraphicQuestion extends Component {
  prepareButtons() {
    const buttons = [];
    const labels = ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'];

    /* eslint-disable react/no-array-index-key */
    labels.forEach((label, index) => {
      buttons.push(
        <button
          key={index}
          value={index + 1}
          className={`icon-${kebabCase(label)} ${styles.graphicButton}`}
          onClick={(evt) => {
            this.props.onClick(evt.target.value, this.props.surveyPosition);
          }}
        >
          <span>{label}</span>
        </button>);
    });

    return buttons;
  }

  render() {
    const title = this.props.title;

    return (
      <div className={styles.graphicQuestion}>
        <h3>{title}</h3>

        <div className={styles.buttonContainer}>
          {this.prepareButtons()}
        </div>
      </div>
    );
  }
}

GraphicQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  surveyPosition: PropTypes.number.isRequired
};
