import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Board from './Board.jsx';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: 'ChordBoard',
    };
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <Board />
      </div>
    );
  }
}
export default AppContainer;

const wrapper = document.getElementById('container');
ReactDOM.render(<AppContainer />, wrapper);
