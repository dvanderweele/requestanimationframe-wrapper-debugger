const pauseFactory = looper => {
  /*
    SYMBOLS LEGEND for looper object

    0 - rAF ID - will get refreshed when paused and unpaused
    1 - startTime - original starting timestamp, never refreshed
    2 - timeSum - sum of all progresses calculated on every pause
    3 - lastUnpause - timestamp from loop at last unpause
    4 - progress - time between lastUnpause and current frame
    5 - deltaTime - new each frame
    6 - loop - outer function called each rAF frame, recreated on unpause
  */
  const syms = Object.getOwnPropertySymbols(looper)
  const callback = () => {
    window.cancelAnimationFrame(this[syms[0]])
  }
  callback.bind(looper)
  const func = () => {
    this[syms[4]] = performance.now() - this[syms[3]]
    this[syms[2]] += this[syms[4]]
    this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
      'pause',
      callback
    )
  }
  func.bind(looper)
  return func
}

export default pauseFactory
