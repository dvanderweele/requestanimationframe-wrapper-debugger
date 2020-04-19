const unpauseFactory = (config, looper) => {
  /*
    SYMBOLS LEGEND for looper object

    0 - rAF ID - will get refreshed when paused and unpaused
    1 - startTime - original starting timestamp, never refreshed
    2 - timeSum - sum of all progresses calculated on every pause
    3 - lastUnpause - timestamp from loop at last unpause
    4 - progress - time between start or lastUnpause and current frame
    5 - deltaTime - new each frame
    6 - loop - outer function called each rAF frame, recreated on unpause
  */
  const syms = Object.getOwnPropertySymbols(looper)
  const callback = () => {
    this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
  }
  callback.bind(looper)
  let func
  if (config.limit) {
    // user defined limit
    if (config.position === 'first') {
      func = () => {
        let lastUnpaused = false
        this[syms[6]] = timestamp => {
          if (!lastUnpaused) {
            this[syms[3]] = timestamp
            lastUnpaused = true
          }
          this[syms[4]] = timestamp - this[syms[3]]
          if (this[syms[2]] + this[syms[4]] < config.limit) {
            this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
          } else {
            window.cancelAnimationFrame(this[syms[0]])
          }
          config.loopFunction()
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'unpause',
          callback
        )
      }
    } else {
      func = () => {
        this[syms[2]] = 0
        this[syms[3]] = this[syms[1]]
        let lastUnpaused = false
        this[syms[6]] = timestamp => {
          if (!lastUnpaused) {
            this[syms[3]] = timestamp
            lastUnpaused = true
          }
          this[syms[4]] = timestamp - this[syms[3]]
          config.loopFunction()
          if (this[syms[2]] + this[syms[4]] < config.limit) {
            this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
          } else {
            window.cancelAnimationFrame(this[syms[0]])
          }
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'unpause',
          callback
        )
      }
    }
  } else {
    // no user defined limit
    if (config.position === 'first') {
      func = () => {
        this[syms[2]] = 0
        this[syms[3]] = this[syms[1]]
        let lastUnpaused = false
        this[syms[6]] = timestamp => {
          if (!lastUnpaused) {
            this[syms[3]] = timestamp
            lastUnpaused = true
          }
          this[syms[4]] = timestamp - this[syms[3]]
          this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
          config.loopFunction()
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'unpause',
          callback
        )
      }
    } else {
      func = () => {
        this[syms[2]] = 0
        this[syms[3]] = this[syms[1]]
        let lastUnpaused = false
        this[syms[6]] = timestamp => {
          if (!lastUnpaused) {
            this[syms[3]] = timestamp
            lastUnpaused = true
          }
          this[syms[4]] = timestamp - this[syms[3]]
          config.loopFunction()
          this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'unpause',
          callback
        )
      }
    }
  }
  func.bind(looper)
  return func
}

export default unpauseFactory
