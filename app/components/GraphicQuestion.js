// @flow
import React, { Component, PropTypes } from 'react';
import styles from '../styles/GraphicQuestion.css';

export default class GraphicQuestion extends Component {
  render() {
    const title = this.props.title;

    return (
      <div className={styles.graphicQuestion}>
        <h3>{title}</h3>

        <div className={styles.buttonContainer}>
          <button className={`icon-very-unsatisfied ${styles.graphicButton}`}>
            <span>Very Unsatisfied</span>
          </button>
          <button className={`icon-unsatisfied ${styles.graphicButton}`}>
            <span>Unsatisfied</span>
          </button>
          <button className={`icon-neutral active ${styles.graphicButton}`}>
            <span>Neutral</span>
          </button>
          <button className={`icon-satisfied ${styles.graphicButton}`}>
            <span>Satisfied</span>
          </button>
          <button className={`icon-very-satisfied ${styles.graphicButton}`}>
            <span>Very Satisfied</span>
          </button>
        </div>
      </div>
    );
  }
}

GraphicQuestion.propTypes = {
  title: PropTypes.string.isRequired
};
