// @flow
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/TextQuestion.css';

const cx = classNames.bind(styles);

export default class TextQuestion extends Component {
  static defaultProps = {
    classes: ''
  }

  render() {
    const title = this.props.title;
    const classes = this.props.classes;

    return (
      <div className={cx(styles.textQuestion, classes)}>
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
  title: PropTypes.string.isRequired,
  classes: PropTypes.string
};
