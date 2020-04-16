const state = Symbol('state')
const transitions = Symbol('transitions')
const setState = Symbol('setState')
const dispatch = Symbol('dispatch')

const looperStateMachine = {
  [state]: 'CREATED',
  [transitions]: {
    CREATED: {
      start: function () {
        this.setState('RUNNING')
      }
    },
    RUNNING: {
      pause: function () {
        this.setState('PAUSED')
      },
      stop: function () {
        this.setState('STOPPED')
      }
    },
    PAUSED: {
      unpause: function () {
        this.setState('RUNNING')
      },
      stop: function () {
        this.setState('STOPPED')
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
    const action = this.transitions[this.state][actionName]
    if (action) {
      action.apply(looperStateMachine, ...payload)
    } else {
      throw new Error(
        `Action "${actionName}" is not a valid action within the "${this.state}" state of the looperStateMachine.`
      )
    }
  }
}

export default looperStateMachine
