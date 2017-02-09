// @flow
import React, { Component } from 'react';
import Header from './Header';
import CardContainer from './CardContainer';


export default class Feedback extends Component {
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
