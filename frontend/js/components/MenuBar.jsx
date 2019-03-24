/* eslint-disable */
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnState: 'start',
      currProgression: -1
    };

    autoBind(this);
  }

  start(e) {
    const { btnState } = this.state;
    const { play } = this.props;

    e.target.style.background = "url('../img/stop.svg') no-repeat;";
    this.setState({ btnState: btnState === 'start' ? 'stop' : 'start' });

    play();
  }

  renderProgressions() {
    const { progressions, loadProgression } = this.props;
    const { currProgression } = this.state;
    console.log('progs', progressions);
    const rows = [];
    progressions.forEach((e, i) => {
      rows.push(
        <li key={i + 1} onClick={() => { this.setState({ currProgression: i}); loadProgression(i+1); }}><a href="javascript:;" onClick={(e) => e.preventDefault()}>{e.display.join('-')}</a></li>,
      );
    });

    const selected = currProgression > -1 ? progressions[this.state.currProgression].display.join('-') : 'Select Progression';

    return (
      <div className="dropdown">
        <label className="dropdown--label">
        <input id="progDropdown" type="checkbox" className="dropdown--checkbox" />
        <span className="dropdown--text">
          {selected}
          <span className="dropdown--arrow"></span>
        </span>
      
        <div className="dropdown--list">
          <ul>
            {rows}
          </ul>
        </div>
      </label>
      </div>
    );
  }

  render() {
    const { btnState } = this.state;

    const className = `start-btn ${btnState}`;
    return (
      <div className="menu-bar-wrapper">
        <button type="button" className={className} onClick={this.start} />
        {this.renderProgressions()}
      </div>
    );
  }
}

MenuBar.propTypes = {
  play: PropTypes.func,
  progressions: PropTypes.array,
  loadProgression: PropTypes.func,
};

MenuBar.defaultProps = {
  play: null,
  progressions: [],
  loadProgression: null,
};

export default MenuBar;
