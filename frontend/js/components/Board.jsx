import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import MenuBar from './MenuBar.jsx';
import Cell from './Cell.jsx';

import { noteLookup, noteLookupDisplay } from '../constants.js';

const Tone = require('tone');

Tone.Transport.bpm.value = 120;
Tone.Transport.loopEnd = '4m';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      measures: 4,
      notes: [[], [], [], []],
      playing: false,
    };

    autoBind(this);
  }

  setNote(note, measure) {
    const { notes, measures } = this.state;
    const notesUpdated = [...notes];
    if (notes[measure].includes(note)) {
      notesUpdated[measure] = notesUpdated[measure].filter(currNote => currNote !== note);
      this.setState({
        notes: notesUpdated,
      });
      return;
    }

    notesUpdated[measure] = [...notesUpdated[measure], note];
    this.setState({
      notes: [...notesUpdated],
    });
  }

  getCellData() {
    const { measures, notes } = this.state;

    return [...Array(14 * (measures + 1))].map((v, i) => {
      let text = '';
      let note = '';
      let row = 0;
      let enabled = false;
      let styles = { border: 'solid 1px #2A324B' };
      const measure = (i % (measures + 1)) - 1;

      // Hacky logic to set styles and props
      if (i % (measures + 1) === 0 && i > 0) {
        text = noteLookupDisplay[12 - ((i / (measures + 1)) - 1)];
        enabled = false;
      } else if (i === 0) {
        enabled = false;
      } else if (i < (measures + 1)) {
        enabled = false;
        styles = {
          border: 'solid 1px #2A324B',
          borderBottom: 'solid 0.5px grey',
          borderWidth: 'thin',
        };
      } else {
        enabled = true;
        row = 12 - Math.floor((i / (measures + 1)) - 1);
        note = noteLookup[row];
      }

      const active = measure > -1 ? notes[measure].includes(note) : false;
      styles.backgroundColor = active ? '#41e8f4' : '#363c4f';

      return (
        <Cell
          id={`${measure}-${note}`}
          style={styles}
          key={i}
          text={text}
          enabled={enabled}
          note={note}
          active={active}
          measure={measure}
          setNote={this.setNote}
        />
      );
    });
  }

  setTransport(notes) {
    const { measures } = this.state;

    const synth = new Tone.PolySynth(12, Tone.Synth).toMaster();
    synth.set({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.5,
        decay: 1,
        sustain: 0.5,
        release: 0.4,
      },
    });

    Tone.Transport.cancel();
    Tone.Transport.clear();

    // repeated event every 8th note
    for (let i = 0; i < measures + 1; i++) {
      Tone.Transport.schedule((time) => {
        Tone.Draw.schedule(() => {
          if (i === 4) {
            Tone.Transport.stop();
            notes[i - 1].forEach((note, j) => {
              document.getElementById(`${i - 1}-${notes[i - 1][j]}`).style.backgroundColor = '#41e8f4';
            });
          } else {
            notes[i].forEach((note, j) => {
              document.getElementById(`${i}-${note}`).style.backgroundColor = 'yellow';
            });
            if (i > 0) {
              notes[i - 1].forEach((note, j) => {
                document.getElementById(`${i - 1}-${notes[i - 1][j]}`).style.backgroundColor = '#41e8f4';
              });
            }
          }
        }, time);

        synth.triggerAttackRelease(notes[i], '1m');
      }, `${i}m`);
    }
  }

  colorNotes(newNotes) {
    const { notes, measures } = this.state;

    // Clear out notes and color in new ones
    [...Array(measures)].forEach((e, i) => {
      notes[i].forEach((note) => {
        document.getElementById(`${i}-${note}`).style.backgroundColor = '#363c4f';
      });

      newNotes[i].forEach((note) => {
        document.getElementById(`${i}-${note}`).style.backgroundColor = '#41e8f4';
      });
    });
  }

  play() {
    const { playing, measures, notes } = this.state;

    if (playing) {
      Tone.Transport.stop();
      this.setState({
        playing: !playing,
      });

      notes.forEach((noteMeasure, i) => {
        noteMeasure.forEach((note) => {
          const color = document.getElementById(`${i}-${note}`).style.backgroundColor;
          if (color === 'yellow') {
            document.getElementById(`${i}-${note}`).style.backgroundColor = '#41e8f4';
          }
        });
      });

      return;
    }

    this.setTransport(notes);

    Tone.Transport.start();

    this.setState({
      playing: !playing,
    });
  }

  loadProgression(e) {
    const { progressions } = this.props;

    const progressionIndex = parseInt(e.target.value, 10) - 1;
    if (progressionIndex === -1) return;

    const { notes } = progressions[progressionIndex];
    this.setTransport(notes);
    this.colorNotes(notes);
    this.setState({ notes });
  }

  render() {
    const cells = this.getCellData();
    const { progressions } = this.props;
    return (
      <div>
        <MenuBar
          play={this.play}
          progressions={progressions}
          loadProgression={this.loadProgression}
        />
        <hr />
        <div className="board">
          {cells}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  progressions: PropTypes.array,
};

Board.defaultProps = {
  progressions: [],
};

export default Board;
