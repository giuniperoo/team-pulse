// @flow
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/TextQuestion.css';

const cx = classNames.bind(styles);

export default class TextQuestion extends Component {
  static defaultProps = {
    value: '',
    classes: ''
  }

  render() {
    const title = this.props.title;
    const classes = this.props.classes;

    return (
      <div className={cx('question', styles.textQuestion, classes)}>
        <h3>{title}</h3>

        <textArea
          onBlur={(evt) => {
            this.props.onBlur(evt.target.value, this.props.surveyPosition);
          }}
          defaultValue={this.props.value}
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
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  classes: PropTypes.string,
  surveyPosition: PropTypes.number.isRequired
};
