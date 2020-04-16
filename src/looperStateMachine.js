const state = Symbol('state')
const transitions = Symbol('transitions')
const setState = Symbol('setState')
const dispatch = Symbol('dispatch')

const looperStateMachine = {
  [state]: 'CREATED',
  [transitions]: {
    CREATED: {
      start: function () {
        looperStateMachine[setState]('RUNNING')
      }
    },
    RUNNING: {
      pause: function () {
        looperStateMachine[setState]('PAUSED')
      },
      stop: function () {
        looperStateMachine[setState]('STOPPED')
      }
    },
    PAUSED: {
      unpause: function () {
        looperStateMachine[setState]('RUNNING')
      },
      stop: function () {
        looperStateMachine[setState]('STOPPED')
      }
    },
    STOPPED: {}
  },
  [setState]: newState => {
    if (
      Object.prototype.hasOwnProperty.call(
        looperStateMachine[transitions],
        newState
      )
    ) {
      looperStateMachine[state] = newState
    } else {
      throw new Error(
        `The state "${newState}" passed to setState method of looperStateMachine is not a valid state.`
      )
    }
  },
  [dispatch]: (actionName, ...payload) => {
    const action =
      looperStateMachine[transitions][looperStateMachine[state]][actionName]
    if (action) {
      action.apply(looperStateMachine, ...payload)
    } else {
      throw new Error(
        `Action "${actionName}" is not a valid action within the "${looperStateMachine[state]}" state of the looperStateMachine.`
      )
    }
  }
}

export default looperStateMachine
