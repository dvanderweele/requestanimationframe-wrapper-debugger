import looperStateMachine from './looperStateMachine'

const symbols = Object.getOwnPropertySymbols(looperStateMachine)

test('expect looperStateMachine to be an object', () => {
  expect(typeof looperStateMachine).toBe('object')
})

test("expect looperStateMachine's initial state to be the string CREATED", () => {
  expect(looperStateMachine[symbols[0]]).toBe('CREATED')
})

test('expect looperStateMachine.transitions to be an object', () => {
  expect(typeof looperStateMachine[symbols[1]]).toBe('object')
})

test('expect looperStateMachine to have four states', () => {
  expect(symbols.length).toBe(4)
})

test('expect transitions.CREATED to be an object', () => {
  expect(typeof looperStateMachine[symbols[1]].CREATED).toBe('object')
})

test('expect transitions.RUNNING to be an object', () => {
  expect(typeof looperStateMachine[symbols[1]].RUNNING).toBe('object')
})

test('expect transitions.PAUSED to be an object', () => {
  expect(typeof looperStateMachine[symbols[1]].PAUSED).toBe('object')
})

test('expect transitions.STOPPED to be an object', () => {
  expect(typeof looperStateMachine[symbols[1]].STOPPED).toBe('object')
})

test('expect setState to be a function', () => {
  expect(typeof looperStateMachine[symbols[2]]).toBe('function')
})

test('expect setState to throw error if invalid state passed', () => {
  function trySetState () {
    looperStateMachine[symbols[2]]('asdf')
  }
  expect(trySetState).toThrow(Error)
})

test('expect manual setState calls to transition between states correctly', () => {
  looperStateMachine[symbols[2]]('RUNNING')
  expect(looperStateMachine[symbols[0]]).toBe('RUNNING')
  looperStateMachine[symbols[2]]('PAUSED')
  expect(looperStateMachine[symbols[0]]).toBe('PAUSED')
  looperStateMachine[symbols[2]]('STOPPED')
  expect(looperStateMachine[symbols[0]]).toBe('STOPPED')
})

test('expect dispatch to be a function', () => {
  expect(typeof looperStateMachine[symbols[3]]).toBe('function')
})

test('expect dispatch to throw error when invalid actionNames passed', () => {
  expect(() => {
    looperStateMachine[symbols[3]]('pause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('unpause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('stop')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('asdf')
  }).toThrow(Error)
  looperStateMachine[symbols[2]]('RUNNING')
  expect(() => {
    looperStateMachine[symbols[3]]('start')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('unpause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('asdf')
  }).toThrow(Error)
  looperStateMachine[symbols[2]]('PAUSED')
  expect(() => {
    looperStateMachine[symbols[3]]('start')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('pause')
  }).toThrow(Error)
  expect(() => {
    looperStateMachine[symbols[3]]('asdf')
  }).toThrow(Error)
  looperStateMachine[symbols[2]]('STOPPED')
  expect(() => {
    looperStateMachine[symbols[3]]('asdf')
  }).toThrow(Error)
})

test('expect dispatch to cause appropriate state changes', () => {
  looperStateMachine[symbols[2]]('CREATED')
  looperStateMachine[symbols[3]]('start')
  expect(looperStateMachine[symbols[0]]).toBe('RUNNING')
  looperStateMachine[symbols[3]]('pause')
  expect(looperStateMachine[symbols[0]]).toBe('PAUSED')
  looperStateMachine[symbols[3]]('unpause')
  expect(looperStateMachine[symbols[0]]).toBe('RUNNING')
  looperStateMachine[symbols[3]]('stop')
  expect(looperStateMachine[symbols[0]]).toBe('STOPPED')
  looperStateMachine[symbols[2]]('PAUSED')
  looperStateMachine[symbols[3]]('stop')
  expect(looperStateMachine[symbols[0]]).toBe('STOPPED')
})
