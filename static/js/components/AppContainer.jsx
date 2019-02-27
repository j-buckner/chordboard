import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Test',
    };
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}
export default AppContainer;

const wrapper = document.getElementById('container');
ReactDOM.render(<AppContainer />, wrapper);
