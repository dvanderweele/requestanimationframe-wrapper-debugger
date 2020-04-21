const looperStateMachine = {
  state: 'CREATED',
  transitions: {
    CREATED: {
      start: function (callback) {
        callback()
        this.setState('RUNNING')
      }
    },
    RUNNING: {
      pause: function (callback) {
        callback()
        this.setState('PAUSED')
      },
      stop: function (callback) {
        callback()
        this.setState('STOPPED')
      }
    },
    PAUSED: {
      unpause: function (callback) {
        callback()
        this.setState('RUNNING')
      },
      stop: function (callback) {
        callback()
        this.setState('STOPPED')
      }
    },
    STOPPED: {}
  },
  setState: newState => {
    if (
      Object.prototype.hasOwnProperty.call(
        looperStateMachine.transitions,
        newState
      )
    ) {
      looperStateMachine.state = newState
    } else {
      throw new Error(
        `The state "${newState}" passed to setState method of looperStateMachine is not a valid state.`
      )
    }
  },
  dispatch: (actionName, payload = () => {}) => {
    const action =
      looperStateMachine.transitions[looperStateMachine.state][actionName]
    if (action) {
      action.call(looperStateMachine, payload)
    } else {
      throw new Error(
        `Action "${actionName}" is not a valid action within the "${looperStateMachine.state}" state of the looperStateMachine.`
      )
    }
  }
}

export default looperStateMachine
