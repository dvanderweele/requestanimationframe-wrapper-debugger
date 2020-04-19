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
      limit: 2000
    })
  }).not.toThrow()
  expect(() => {
    simple({
      loopFunction: () => {},
      position: 2000
    })
  }).toThrow(TypeError)
  expect(() => {
    simple({
      loopFunction: () => {},
      position: 'fubar'
    })
  }).toThrow(Error)
  expect(() => {
    simple({
      loopFunction: () => {},
      position: 'first'
    })
    simple({
      loopFunction: () => {},
      position: 'last'
    })
  }).not.toThrow()
})

test('returned looper object has 7 null Symbol properties', () => {
  const looper = simple({
    loopFunction: () => {},
    position: 'first'
  })
  expect(Object.getOwnPropertySymbols(looper).length).toBe(7)
  expect(looper[Object.getOwnPropertySymbols(looper)[0]]).toBe(null)
  expect(looper[Object.getOwnPropertySymbols(looper)[1]]).toBe(null)
  expect(looper[Object.getOwnPropertySymbols(looper)[2]]).toBe(null)
  expect(looper[Object.getOwnPropertySymbols(looper)[3]]).toBe(null)
  expect(looper[Object.getOwnPropertySymbols(looper)[4]]).toBe(null)
  expect(looper[Object.getOwnPropertySymbols(looper)[5]]).toBe(null)
  expect(looper[Object.getOwnPropertySymbols(looper)[6]]).toBe(null)
})
