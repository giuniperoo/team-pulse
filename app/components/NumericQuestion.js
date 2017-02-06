// @flow
import React, { Component } from 'react';
import styles from '../styles/NumericQuestion.css';


export default class NumericQuestion extends Component {
  render() {
    const title = this.props.title;

    return (
      <div className={styles.numericQuestion}>
        <h3>{title}</h3>

        <div className={styles.buttonContainer}>
          <button className={styles.numericButton}>1</button>
          <button className={`${styles.numericButton} active`}>2</button>
          <button className={styles.numericButton}>3</button>
          <button className={styles.numericButton}>4</button>
          <button className={styles.numericButton}>5</button>
          <button className={styles.numericButton}>6</button>
          <button className={styles.numericButton}>7</button>
          <button className={styles.numericButton}>8</button>
          <button className={styles.numericButton}>9</button>
          <button className={styles.numericButton}>10</button>
        </div>

        <span>Extremely Bad</span>
        <span className={styles.right}>Extremely Good</span>
      </div>
    );
  }
}

NumericQuestion.propTypes = {
  title: React.PropTypes.string.isRequired
};
