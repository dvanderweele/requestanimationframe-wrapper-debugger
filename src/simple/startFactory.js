const startFactory = (config, looper) => {
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
    if (config.scaleDelta && typeof config.scaleDelta === 'number') {
      let lastFrame = performance.now()
      let deltaTime
      func = () => {
        looper.timeSum = 0
        looper.loop = timestamp => {
          if (!looper.startTime) {
            looper.startTime = timestamp
            looper.lastUnpause = looper.startTime
          }
          looper.progress = timestamp - looper.lastUnpause
          deltaTime = (timestamp - lastFrame) / config.scaleDelta
          if (looper.timeSum + looper.progress < config.limit) {
            looper.rAFID = window.requestAnimationFrame(looper.loop)
          } else {
            window.cancelAnimationFrame(looper.rAFID)
          }
          config.loopFunction(deltaTime)
          lastFrame = performance.now()
        }
        looper.prototype.dispatch('start', callback)
      }
    } else if (config.scaleDelta && typeof config.scaleDelta === 'function') {
      let lastFrame = performance.now()
      let deltaTime
      func = () => {
        looper.timeSum = 0
        looper.loop = timestamp => {
          if (!looper.startTime) {
            looper.startTime = timestamp
            looper.lastUnpause = looper.startTime
          }
          looper.progress = timestamp - looper.lastUnpause
          deltaTime = config.scaleDelta(timestamp - lastFrame)
          if (looper.timeSum + looper.progress < config.limit) {
            looper.rAFID = window.requestAnimationFrame(looper.loop)
          } else {
            window.cancelAnimationFrame(looper.rAFID)
          }
          config.loopFunction(deltaTime)
          lastFrame = performance.now()
        }
        looper.prototype.dispatch('start', callback)
      }
    } else {
      let lastFrame = performance.now()
      let deltaTime
      func = () => {
        looper.timeSum = 0
        looper.loop = timestamp => {
          if (!looper.startTime) {
            looper.startTime = timestamp
            looper.lastUnpause = looper.startTime
          }
          looper.progress = timestamp - looper.lastUnpause
          deltaTime = timestamp - lastFrame
          if (looper.timeSum + looper.progress < config.limit) {
            looper.rAFID = window.requestAnimationFrame(looper.loop)
          } else {
            window.cancelAnimationFrame(looper.rAFID)
          }
          config.loopFunction(deltaTime)
          lastFrame = performance.now()
        }
        looper.prototype.dispatch('start', callback)
      }
    }
  } else {
    // no user defined limit
    if (config.scaleDelta && typeof config.scaleDelta === 'number') {
      let lastFrame = performance.now()
      let deltaTime
      func = () => {
        looper.timeSum = 0
        looper.lastUnpause = looper.startTime
        looper.loop = timestamp => {
          if (!looper.startTime) {
            looper.startTime = timestamp
            looper.lastUnpause = looper.startTime
          }
          looper.progress = timestamp - looper.lastUnpause
          deltaTime = (timestamp - lastFrame) / config.scaleDelta
          looper.rAFID = window.requestAnimationFrame(looper.loop)
          config.loopFunction(deltaTime)
          lastFrame = performance.now()
        }
        looper.prototype.dispatch('start', callback)
      }
    } else if (config.scaleDelta && typeof config.scaleDelta === 'function') {
      let lastFrame = performance.now()
      let deltaTime
      func = () => {
        looper.timeSum = 0
        looper.lastUnpause = looper.startTime
        looper.loop = timestamp => {
          if (!looper.startTime) {
            looper.startTime = timestamp
            looper.lastUnpause = looper.startTime
          }
          looper.progress = timestamp - looper.lastUnpause
          deltaTime = config.scaleDelta(timestamp - lastFrame)
          looper.rAFID = window.requestAnimationFrame(looper.loop)
          config.loopFunction(deltaTime)
          lastFrame = performance.now()
        }
        looper.prototype.dispatch('start', callback)
      }
    } else {
      let lastFrame = performance.now()
      let deltaTime
      func = () => {
        looper.timeSum = 0
        looper.lastUnpause = looper.startTime
        looper.loop = timestamp => {
          if (!looper.startTime) {
            looper.startTime = timestamp
            looper.lastUnpause = looper.startTime
          }
          looper.progress = timestamp - looper.lastUnpause
          deltaTime = timestamp - lastFrame
          looper.rAFID = window.requestAnimationFrame(looper.loop)
          config.loopFunction(deltaTime)
          lastFrame = performance.now()
        }
        looper.prototype.dispatch('start', callback)
      }
    }
  }
  return func
}

export default startFactory
