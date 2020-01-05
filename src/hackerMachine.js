import { Machine, assign } from 'xstate';

// states
const idle = '@state/IDLE';
const loading = '@state/LOADING';
const success = '@state/SUCCESS';
const error = '@state/ERROR';

export const hackerMachine = Machine({
  id: 'hacker-machine',
  initial: idle,
  context: {
    posts: []
  },
  states: {
    [idle]: {
      on: {
        CLICK: loading
      }
    },
    [loading]: {
      invoke: {
        id: 'fetch-articles-list',
        src: 'fetchArticlesList',
        onDone: {
          target: success,
          actions: assign({ posts: (_, event) => event.data })
        },
        onError: {
          target: error,
          actions: (_, e) => console.error(e.data)
        }
      }
    },
    [error]: {
      on: {
        CLICK: loading
      }
    },
    [success]: {
      type: 'final'
    }
  }
});
