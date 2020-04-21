import startFactory from './startFactory'

test('expect startFactory to output function bound to looper', () => {
  const fn = startFactory(
    {
      loopFunction: () => {}
    },
    {
      [Symbol(0)]: null,
      [Symbol(1)]: null,
      [Symbol(2)]: null,
      [Symbol(3)]: null,
      [Symbol(4)]: null,
      [Symbol(5)]: null,
      [Symbol(6)]: null
    }
  )
  expect(typeof fn).toBe('function')
})
