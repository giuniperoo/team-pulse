// @flow
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/CardContainer.css';

const cx = classNames.bind(styles);

export default class CardContainer extends Component {
  static defaultProps = {
    header: '',
    icon: '',
    startDate: '',
    children: ''
  }

  render() {
    const header = this.props.header;
    const startDate = this.props.startDate;
    const iconClassName = cx(styles.icon, `icon-${this.props.icon}`);
    const titleClassName = cx(styles.title, {
      withDate: !!startDate
    });

    return (
      <div className="cardContainer">
        {header && <header className={styles.header}>
          <div className={iconClassName} />
          <div className={titleClassName}>{header}</div>
          {startDate && <div className={styles.startDate}>{startDate}</div>}
        </header>}
        {this.props.children}
      </div>
    );
  }
}

CardContainer.propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  startDate: PropTypes.string,
  children: PropTypes.node
};
