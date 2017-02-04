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
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>10</button>
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
