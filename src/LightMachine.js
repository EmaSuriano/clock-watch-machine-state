import { Machine } from 'xstate';
import React from 'react';

const lightMachine = Machine({
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow',
      },
    },
    yellow: {
      on: {
        TIMER: 'red',
      },
    },
    red: {
      on: {
        TIMER: 'green',
      },
    },
  },
});

class LightMachine extends React.Component {
  state = {
    currentState: 'green',
  };

  changeState = () => {
    const newState = lightMachine.transition(this.state.currentState, 'TIMER')
      .value;
    this.setState({ currentState: newState });
  };

  render() {
    return (
      <div>
        <p>Light Machine state: {this.state.currentState}</p>
        <button onClick={this.changeState}>Change state</button>
      </div>
    );
  }
}

export default LightMachine;
