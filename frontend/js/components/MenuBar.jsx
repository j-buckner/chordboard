import React, { Component } from 'react';
import autoBind from 'react-autobind';

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnState: 'start',
    };

    autoBind(this);
  }

  start(e) {
    // e.preventDefault();
    const { btnState } = this.state;

    e.target.style.background = "url('../img/stop.svg') no-repeat;";
    this.setState({ btnState: btnState === 'start' ? 'stop' : 'start' });

    this.props.play();
  }

  render() {
    const { btnState } = this.state;

    const className = `start-btn ${btnState}`;
    return (
      <button type="button" className={className} onClick={this.start} />
    );
  }
}

export default MenuBar;
