// @flow
import React, { Component } from 'react';
import * as firebase from 'firebase';


export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBgTMhh1ONCNi5leEy1DNz2TgQQX8M33og',
      authDomain: 'team-pulse-magic.firebaseapp.com',
      databaseURL: 'https://team-pulse-magic.firebaseio.com',
      storageBucket: 'team-pulse-magic.appspot.com',
      messagingSenderId: '114176198859'
    };

    firebase.initializeApp(config);
  }

  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
