// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import Header from './Header.js';
import Content from './Content.js';


export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}
