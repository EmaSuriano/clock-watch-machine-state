import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from './utils';
import clockWatchMachine from './stateMachine';
import MachineManager from './MachineManager';

const INITIAL_STATE = {
  seconds: 0,
  laps: [],
  timer: 0,
};

class ClockWatchRefactor extends React.Component {
  state = INITIAL_STATE;

  countDown = () =>
    this.setState(state => ({
      seconds: state.seconds + 1,
    }));

  actionsMap = {
    startTimer: () => {
      const timer = setInterval(this.countDown, 100);
      this.setState({ timer });
    },

    stopTimer: () => clearInterval(this.state.timer),

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
    const { seconds, laps } = this.state;

    return (
      <MachineManager machine={clockWatchMachine} actionsMap={this.actionsMap}>
        {({ currentState, transition, isTransitionAvailabe }) => (
          <React.Fragment>
            <p>
              {currentState}: {formatTime(seconds)}
            </p>
            <ul>
              {laps.map(({ time, total }) => (
                <li>{`${formatTime(time)} / ${formatTime(total)}`}</li>
              ))}
            </ul>

            {isTransitionAvailabe('START') && (
              <button onClick={() => transition({ type: 'START' })}>
                Start
              </button>
            )}
            {isTransitionAvailabe('RESET') && (
              <button
                onClick={() => transition({ type: 'RESET' })}
                disabled={seconds === 0}
              >
                Reset
              </button>
            )}
            {isTransitionAvailabe('PAUSE') && (
              <button onClick={() => transition({ type: 'PAUSE' })}>
                Pause
              </button>
            )}
            {isTransitionAvailabe('NEW_LAP') && (
              <button
                onClick={() => transition({ type: 'NEW_LAP', time: seconds })}
              >
                New lap
              </button>
            )}
          </React.Fragment>
        )}
      </MachineManager>
    );
  }
}

// class ClockWatch extends React.Component {
//   state = {
//     currentState: clockWatchMachine.initial,
//     seconds: 0,
//   };

//   moveTransition = transition => () =>
//     this.setState({
//       currentState: this.moveTransition(this.state.currentState, transition),
//     });

//   command(action, event) {
//     console.log(action);
//     switch (action) {
//       case 'log':
//         console.log('123');
//         break;
//       default:
//         break;
//     }
//   }

//   transition = event => () => {
//     const { currentState } = this.state;
//     const nextGalleryState = clockWatchMachine.transition(
//       currentState,
//       event.type,
//     );

//     const nextState = nextGalleryState.actions.reduce(
//       (acc, action) => ({ ...acc, ...this.command(action, event) }),
//       {},
//     );

//     this.setState({
//       currentState: nextGalleryState.value,
//       ...nextState,
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { currentState } = this.state;
//     if (prevState.currentState === currentState) return;

//     if (currentState === 'counting') {
//       this.timer = setInterval(this.countDown, 100);
//     } else if (currentState === 'stop') {
//       clearInterval(this.timer);
//     }
//   }

//   countDown = () =>
//     this.setState(state => ({
//       seconds: state.seconds + 1,
//     }));

//   render() {
//     const { currentState, seconds } = this.state;
//     console.log(currentState);
//     return (
//       <div>
//         <p>
//           {currentState}: {seconds}
//         </p>
//         {isAvailableTransition(currentState, 'START') && (
//           <button onClick={this.transition({ type: 'START' })}>Start</button>
//         )}
//         {isAvailableTransition(currentState, 'PAUSE') && (
//           <button onClick={this.transition({ type: 'PAUSE' })}>Pause</button>
//         )}
//       </div>
//     );
//   }
// }

export default ClockWatchRefactor;
