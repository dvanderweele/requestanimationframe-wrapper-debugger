const pauseFactory = looper => {
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
    window.cancelAnimationFrame(looper.rAFID)
  }
  const func = () => {
    looper.progress = performance.now() - looper.lastUnpause
    looper.timeSum += looper.progress
    looper.prototype.dispatch('pause', callback)
  }
  return func
}

export default pauseFactory
