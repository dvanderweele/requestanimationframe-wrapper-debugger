import looperStateMachine from './looperStateMachine'

test('expect looperStateMachine to be an object', () => {
  expect(typeof looperStateMachine).toBe('object')
})

test("expect looperStateMachine's initial state to be the string CREATED", () => {
  expect(looperStateMachine.state).toBe('CREATED')
})

test('expect looperStateMachine.transitions to be an object', () => {
  expect(typeof looperStateMachine.transitions).toBe('object')
})

test('expect looperStateMachine to have four states', () => {
  expect(Object.keys(looperStateMachine.transitions).length).toBe(4)
})

test('expect transitions.CREATED to be an object', () => {
  expect(typeof looperStateMachine.transitions.CREATED).toBe('object')
})

test('expect transitions.RUNNING to be an object', () => {
  expect(typeof looperStateMachine.transitions.RUNNING).toBe('object')
})

test('expect transitions.PAUSED to be an object', () => {
  expect(typeof looperStateMachine.transitions.PAUSED).toBe('object')
})

test('expect transitions.STOPPED to be an object', () => {
  expect(typeof looperStateMachine.transitions.STOPPED).toBe('object')
})

test('expect setState to be a function', () => {
  expect(typeof looperStateMachine.setState).toBe('function')
})

test('expect setState to throw error if invalid state passed', () => {
  function trySetState () {
    looperStateMachine.setState('asdf')
  }
  expect(trySetState).toThrow(Error)
})

test('expect manual setState calls to transition between states correctly', () => {
  looperStateMachine.setState('RUNNING')
  expect(looperStateMachine.state).toBe('RUNNING')
  looperStateMachine.setState('PAUSED')
  expect(looperStateMachine.state).toBe('PAUSED')
  looperStateMachine.setState('STOPPED')
  expect(looperStateMachine.state).toBe('STOPPED')
})

test('expect dispatch to be a function', () => {
  expect(typeof looperStateMachine.dispatch).toBe('function')
})

test('expect dispatch to throw error when invalid actionNames passed', () => {
  expect(() => {
    looperStateMachine.dispatch('pause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('unpause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('stop')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('asdf')
  }).toThrow(Error)
  looperStateMachine.setState('RUNNING')
  expect(() => {
    looperStateMachine.dispatch('start')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('unpause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('asdf')
  }).toThrow(Error)
  looperStateMachine.setState('PAUSED')
  expect(() => {
    looperStateMachine.dispatch('start')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('pause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine.dispatch('asdf')
  }).toThrow(Error)
  looperStateMachine.setState('STOPPED')
  expect(() => {
    looperStateMachine.dispatch('asdf')
  }).toThrow(Error)
})

test('expect dispatch to cause appropriate state changes', () => {
  looperStateMachine.setState('CREATED')
  looperStateMachine.dispatch('start')
  expect(looperStateMachine.state).toBe('RUNNING')
  looperStateMachine.dispatch('pause')
  expect(looperStateMachine.state).toBe('PAUSED')
  looperStateMachine.dispatch('unpause')
  expect(looperStateMachine.state).toBe('RUNNING')
  looperStateMachine.dispatch('stop')
  expect(looperStateMachine.state).toBe('STOPPED')
  looperStateMachine.setState('PAUSED')
  looperStateMachine.dispatch('stop')
  expect(looperStateMachine.state).toBe('STOPPED')
})

test('callbacks passed to actions via dispatch run when passed', () => {
  let res = null
  looperStateMachine.setState('CREATED')
  looperStateMachine.dispatch('start', () => {
    res = 'dayo'
  })
  expect(res).toBe('dayo')
  looperStateMachine.dispatch('pause', () => {
    res = 'daayo'
  })
  expect(res).toBe('daayo')
  looperStateMachine.dispatch('unpause', () => {
    res = 'daaayo'
  })
  expect(res).toBe('daaayo')
  looperStateMachine.dispatch('stop', () => {
    res = 'daaaayo'
  })
  expect(res).toBe('daaaayo')
  looperStateMachine.setState('PAUSED')
  looperStateMachine.dispatch('stop', () => {
    res = 'daaaaayo'
  })
  expect(res).toBe('daaaaayo')
})
