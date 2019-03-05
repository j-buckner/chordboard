import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';

function AppContainer() {
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
export default AppContainer;

const wrapper = document.getElementById('container');
ReactDOM.render(<AppContainer />, wrapper);
