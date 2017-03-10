// @flow
import React, { Component } from 'react';
import Header from './Header';
import CardContainer from './CardContainer';


export default class Admin extends Component {
  render() {
    return (
      <section>
        <Header activeTab="feedback" {...this.props} />
        <div className="tabContainer">
          <CardContainer />
        </div>
      </section>
    );
  }
}
