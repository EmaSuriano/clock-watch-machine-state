import { Machine } from 'xstate';

const clockWatchMachine = Machine({
  key: 'clock-watch',
  initial: 'stop',
  states: {
    stop: {
      on: {
        START: {
          counting: {
            actions: ['startTimer'],
          },
        },
        RESET: {
          stop: {
            actions: ['resetTimer'],
          },
        },
      },
    },
    counting: {
      on: {
        PAUSE: {
          stop: {
            actions: ['stopTimer'],
          },
        },
        NEW_LAP: {
          counting: {
            actions: ['createNewLap'],
          },
        },
      },
    },
  },
});

export default clockWatchMachine;
