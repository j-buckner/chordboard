import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
    };

    autoBind(this);
  }

  hitCell(e) {
    const {
      enabled: hitEnabled,
      note,
      measure,
      setNote,
    } = this.props;

    const { enabled } = this.state;

    if (!hitEnabled) {
      return;
    }

    e.target.style.backgroundColor = enabled ? '#363c4f' : '#41e8f4';

    setNote(note, measure);
    this.setState({ enabled: !enabled });
  }

  render() {
    const { style, text } = this.props;

    return (
      <div role="button" className="cell" style={style} onClick={this.hitCell} onKeyDown={this.hitCell}>
        <div className="cell-text">
          {text}
        </div>
      </div>
    );
  }
}

Cell.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  enabled: PropTypes.bool,
  measure: PropTypes.number,
  note: PropTypes.string,
  setNote: PropTypes.func,
};

Cell.defaultProps = {
  style: {},
  text: '',
  enabled: false,
  measure: 0,
  note: '',
  setNote: null,
};

export default Cell;
