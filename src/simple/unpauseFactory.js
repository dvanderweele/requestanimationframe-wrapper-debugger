const unpauseFactory = (config, looper) => {
  /*
    Looper Metadata

    - rAFID - will get refreshed when paused and unpaused
    - startTime - original starting timestamp, never refreshed
    - timeSum - sum of all progresses calculated on every pause
    - lastUnpause - timestamp from loop at last unpause
    - progress - time between start or lastUnpause and current frame
    - deltaTime - new each frame
    - loop - outer function called each rAF frame, recreated on unpause
  */
  const callback = () => {
    looper.rAFID = window.requestAnimationFrame(looper.loop)
  }
  let func
  if (config.limit) {
    // user defined limit
    func = () => {
      let lastUnpaused = false
      looper.loop = timestamp => {
        if (!lastUnpaused) {
          looper.lastUnpause = timestamp
          lastUnpaused = true
        }
        looper.progress = timestamp - looper.lastUnpause
        if (looper.timeSum + looper.progress < config.limit) {
          looper.rAFID = window.requestAnimationFrame(looper.loop)
        } else {
          window.cancelAnimationFrame(looper.rAFID)
        }
        config.loopFunction()
      }
      looper.prototype.dispatch('unpause', callback)
    }
  } else {
    // no user defined limit
    func = () => {
      looper.timeSum = 0
      looper.lastUnpause = looper.startTime
      let lastUnpaused = false
      looper.loop = timestamp => {
        if (!lastUnpaused) {
          looper.lastUnpause = timestamp
          lastUnpaused = true
        }
        looper.progress = timestamp - looper.lastUnpause
        looper.rAFID = window.requestAnimationFrame(looper.loop)
        config.loopFunction()
      }
      looper.prototype.dispatch('unpause', callback)
    }
  }
  return func
}

export default unpauseFactory
