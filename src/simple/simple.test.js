import simple from './simple'

test('expect "simple" to throw errors on invalid inputs', () => {
  expect(() => {
    simple()
  }).toThrow(Error)
  expect(() => {
    simple(1)
  }).toThrow(TypeError)
  expect(() => {
    simple('a')
  }).toThrow(TypeError)
  expect(() => {
    simple({})
  }).toThrow(Error)
  expect(() => {
    simple({
      foo: 'bar'
    })
  }).toThrow(Error)
  expect(() => {
    simple({
      loopFunction: () => {},
      scaleDelta: false
    })
  }).toThrow(TypeError)
  expect(() => {
    simple({
      loopFunction: 'fubar'
    })
  }).toThrow(TypeError)
  expect(() => {
    simple({
      loopFunction: () => {},
      limit: 'fubar'
    })
  }).toThrow(TypeError)
  expect(() => {
    simple({
      loopFunction: () => {},
      limit: 2000,
      scaleDelta: 1000
    })
  }).not.toThrow()
  expect(() => {
    simple({
      loopFunction: () => {},
      limit: 2000,
      scaleDelta: () => {}
    })
  }).not.toThrow()
})

test('returned looper object has 7 null properties and 4 functions and 1 prototype', () => {
  const looper = simple({
    loopFunction: () => {}
  })
  expect(Object.keys(looper).length).toBe(11)
  expect(looper.rAFID).toBe(null)
  expect(looper.startTime).toBe(null)
  expect(looper.timeSum).toBe(null)
  expect(looper.lastUnpause).toBe(null)
  expect(looper.progress).toBe(null)
  expect(looper.loop).toBe(null)
  expect(typeof looper.start).toBe('function')
  expect(typeof looper.stop).toBe('function')
  expect(typeof looper.pause).toBe('function')
  expect(typeof looper.unpause).toBe('function')
  expect(typeof looper.prototype).toBe('object')
})
