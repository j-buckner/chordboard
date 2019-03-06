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

  render() {
    const { btnState } = this.state;

    const className = `start-btn ${btnState}`;
    return (
      <button type="button" className={className} onClick={this.start} />
    );
  }
}

MenuBar.propTypes = {
  play: PropTypes.func,
};

MenuBar.defaultProps = {
  play: null,
};

export default MenuBar;
