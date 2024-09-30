import React, { Component } from 'react';

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ margin: '3em' }}>
        <h1>About the project EuProGigant</h1>
        EuProGigant stands for “European Production Giganet for calamity
        avoiding self-orchestration of value chain and learning ecosystems“, the
        binational research project for smart and sovereign use of data in the
        European manufacturing industry. The project is carried out by an
        Austrian-German project consortium led by the TU Wien and TU Darmstadt,
        the goal of building a multi-location, digitally networked production
        ecosystem. As a lightouse project for the Gaia-X initiative, which
        strives to build an open, European data infrastructure, EuProGigant
        advances a resilient, data-driven and sustainable industry in Europe. In
        the ecosystem, which consists of data and infrastructure ecosystems, we
        show how to practically realize added value for customers and
        manufacturing companies through value creation based on smart and
        sovereign use of data. This strengthens European industry and drives the
        contribution of industry to the sustainable development of Europe.
      </div>
    );
  }
}

export default AboutPage;
