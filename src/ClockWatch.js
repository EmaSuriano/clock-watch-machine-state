import { Machine } from 'xstate';
import React from 'react';

const clockWatchMachine = Machine({
  key: 'clock-watch',
  initial: 'stop',
  states: {
    stop: {
      on: {
        START: 'counting',
      },
    },
    counting: {
      on: {
        PAUSE: 'stop',
      },
    },
  },
});

const isAvailableTransition = (currentState, transition) =>
  clockWatchMachine.states[currentState].on[transition];

const moveTransition = (currentState, transition) =>
  clockWatchMachine.transition(currentState, transition).value;

class ClockWatch extends React.Component {
  state = {
    currentState: clockWatchMachine.initial,
    seconds: 0,
  };

  moveTransition = transition => () =>
    this.setState({
      currentState: moveTransition(this.state.currentState, transition),
    });

  componentDidUpdate(prevProps, prevState) {
    const { currentState } = this.state;
    if (prevState.currentState === currentState) return;

    if (currentState === 'counting') {
      this.timer = setInterval(this.countDown, 100);
    } else if (currentState === 'stop') {
      clearInterval(this.timer);
    }
  }

  countDown = () =>
    this.setState(state => ({
      seconds: state.seconds + 1,
    }));

  render() {
    const { currentState, seconds } = this.state;
    return (
      <div>
        <p>
          {currentState}: {seconds}
        </p>
        {isAvailableTransition(currentState, 'START') && (
          <button onClick={this.moveTransition('START')}>Start</button>
        )}
        {isAvailableTransition(currentState, 'PAUSE') && (
          <button onClick={this.moveTransition('PAUSE')}>Pause</button>
        )}
      </div>
    );
  }
}

export default ClockWatch;
