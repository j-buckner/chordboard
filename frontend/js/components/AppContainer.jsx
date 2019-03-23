
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import { BeatLoader } from 'react-spinners';

import Board from './Board.jsx';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      progressions: [],
    };

    autoBind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    fetch('/api/progressions')
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if ((contentType && contentType.indexOf('application/json') !== -1) && response.ok) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        this.setState({ loading: false, progressions: data });
      });
  }

  render() {
    const { loading, progressions } = this.state;
    return (
      <div className="app-wrapper">
        <div className="board-wrapper">
          {loading ? (
            <div style={{ display: 'block', margin: '0 auto', width: '45px' }}>
              <BeatLoader
                sizeUnit="px"
                size={20}
                color="#123abc"
                loading={loading}
              />
            </div>
          ) : (
            <Board progressions={progressions} />
          )}
        </div>
      </div>
    );
  }
}
export default AppContainer;

const wrapper = document.getElementById('container');
ReactDOM.render(<AppContainer />, wrapper);
