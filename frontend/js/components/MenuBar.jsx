import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnState: 'start',
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

    const rows = [];
    rows.push(<option value="0" key="0">Select Progression</option>);
    progressions.forEach((e, i) => {
      rows.push(
        <option value={i + 1} key={i + 1}>{e.display.join('-')}</option>,
      );
    });

    return (
      <select onChange={loadProgression}>
        {rows}
      </select>
    );
  }

  render() {
    const { btnState } = this.state;

    const className = `start-btn ${btnState}`;
    return (
      <div>
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
