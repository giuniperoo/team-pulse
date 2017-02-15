// @flow
import React, { Component } from 'react';
import styles from '../styles/Haiku.css';
import haikus from '../utils/haikus.json';


export default class Haiku extends Component {
  componentWillMount() {
    const randomInt = Math.floor(Math.random() * haikus.length) + 1;
    this.randomHaiku = haikus[randomInt];
  }

  randomHaiku: {
    line1?: string,
    line2?: string,
    line3?: string,
    author?: string
  } = {};

  render() {
    const randomHaiku = this.randomHaiku;

    return (
      <aside className={styles.haiku} style={{ transform: 'translateX(200%)' }} >
        <p>{randomHaiku.line1}</p>
        <p>{randomHaiku.line2}</p>
        <p>{randomHaiku.line3}</p>
        {randomHaiku.author && <p className={styles.author}>&ndash; {randomHaiku.author}</p>}
      </aside>
    );
  }
}
