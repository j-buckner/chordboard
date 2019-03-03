import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Board from './Board.jsx';

class AppContainer extends Component {
  render() {
    return (
      <div>
        <div className="app-wrapper">
          <div className="board-wrapper">
            <Board />
          </div>
        </div>
      </div>
    );
  }
}
export default AppContainer;

const wrapper = document.getElementById('container');
ReactDOM.render(<AppContainer />, wrapper);
