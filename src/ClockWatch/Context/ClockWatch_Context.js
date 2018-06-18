import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay';
import ClockWatchKeypad from './ClockWatchKeypad';
import MachineManager from './MachineManager';
import clockWatchMachine from './stateMachine';
import ReactInterval from 'react-interval';

const INITIAL_STATE = {
  seconds: 0,
  laps: [],
  timerId: 0,
};

export class ClockWatch extends Component {
  state = INITIAL_STATE;

  countDown = () =>
    this.setState(state => ({
      seconds: state.seconds + 1,
    }));

  actionsMap = {
    startTimer: () => {
      const timerId = setInterval(this.countDown, 100);
      this.setState({ timerId });
    },

    stopTimer: () => clearInterval(this.state.timerId),

    resetTimer: () => this.setState(INITIAL_STATE),

    createNewLap: ({ time }) => {
      const { laps, seconds } = this.state;
      const timeOfLastLap = laps.length > 0 ? laps[laps.length - 1].total : 0;
      const newLap = {
        time: seconds - timeOfLastLap,
        total: seconds,
      };
      this.setState({ laps: [...laps, newLap] });
    },
  };

  render() {
    return (
      <MachineManager.Provider
        machine={clockWatchMachine}
        actionsMap={this.actionsMap}
      >
        <ReactInterval timeout={100} />
        <TimeDisplay />
        <ClockWatchKeypad />
      </MachineManager.Provider>
    );
  }
}

export default ClockWatch;
