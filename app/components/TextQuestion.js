// @flow
import React, { Component } from 'react';
import styles from '../styles/TextQuestion.css';


export default class TextQuestion extends Component {
  render() {
    const title = this.props.title;

    return (
      <div className={styles.textQuestion}>
        <h3>{title}</h3>

        <textArea
          className={styles.userInput}
          maxLength="800"
          placeholder="Insert your thoughts here..."
        />
      </div>
    );
  }
}

TextQuestion.propTypes = {
  title: React.PropTypes.string.isRequired
};
