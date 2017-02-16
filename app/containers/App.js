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

    firebase.auth().onAuthStateChanged((user) => {
      const router = this.props.router;
      const currentPathname = router.getCurrentLocation().pathname;

      if (user) {
        // user is logged in
        const defaultLoggedInRoute = '/survey';
        if (currentPathname !== defaultLoggedInRoute) {
          router.push(defaultLoggedInRoute);
        }
      } else {
        // user is logged out
        const defaultLoggedOutRoute = '/login';
        if (currentPathname !== defaultLoggedOutRoute) {
          router.push(defaultLoggedOutRoute);
        }
      }
    }, (error) => {
      console.error(error);
    });
  }

  props: {
    // eslint-disable-next-line flowtype/no-weak-types
    router: Object,
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
