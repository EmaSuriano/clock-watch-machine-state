import { Machine } from 'xstate';
import React from 'react';
import MachineManager from '../ClockWatch/MachineManager';

function isObject(val) {
  return typeof val === 'object';
}
// const timerMachine = Machine({
//   key: 'timer',
//   initial: 'pause',
//   states: {
//     stopped: {
//       on: {
//         START_TIMER: '',
//       },
//     },
//   },
// });

const timerMachine = Machine({
  initial: 'stopped',
  states: {
    stopped: {
      on: {
        START_TIMER: {
          ticking: {
            actions: ['startTimer'],
          },
        },
      },
    },
    ticking: {
      on: {
        PAUSE: 'stopped',
        END_TIMER: 'end',
      },
      onExit: 'stopTimer',
    },
    end: {
      onEntry: 'endTimer',
    },
  },
});

const timerLightMachine = Machine({
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow',
      },
      ...timerMachine,
    },
    yellow: {
      on: {
        TIMER: 'red',
      },
      ...timerMachine,
    },
    red: {
      on: {
        TIMER: 'green',
      },
      ...timerMachine,
    },
  },
});

class TimerLight extends React.Component {
  // state = {
  //   currentState: 'green',
  // };

  // changeState = () => {
  //   const newState = timerLightMachine.transition(
  //     this.state.currentState,
  //     'TIMER',
  //   ).value;
  //   this.setState({ currentState: newState });
  // };

  actionsMap = {
    // endTimer: (event, transition) => {
    //   transition({ type: 'TIMER' });
    // },
  };

  render() {
    return (
      <MachineManager machine={timerLightMachine} actionsMap={this.actionsMap}>
        {({ currentState, isTransitionAvailable, transition }) => {
          // debugger;
          return (
            <div>
              <p>
                {isObject(currentState)
                  ? Object.entries(currentState).map(
                      ([key, value]) => `${key} - ${value}`,
                    )
                  : currentState}
              </p>
              <button onClick={() => transition({ type: 'START_TIMER' })}>
                Start timer
              </button>
              <button onClick={() => transition({ type: 'END_TIMER' })}>
                End timer timer
              </button>

              <button onClick={() => transition({ type: 'TIMER' })}>
                TIMER!
              </button>
            </div>
          );
        }}
      </MachineManager>
    );
  }
}

export default TimerLight;
