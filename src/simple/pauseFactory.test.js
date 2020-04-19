import pauseFactory from './pauseFactory'

test('expect pauseFactory to export a function', () => {
  const fn = pauseFactory({
    [Symbol(0)]: null,
    [Symbol(1)]: null,
    [Symbol(2)]: null,
    [Symbol(3)]: null,
    [Symbol(4)]: null,
    [Symbol(5)]: null,
    [Symbol(6)]: null
  })
  expect(typeof fn).toBe('function')
})
