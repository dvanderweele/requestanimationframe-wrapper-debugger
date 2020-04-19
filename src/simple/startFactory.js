const startFactory = (config, looper) => {
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
    window.requestAnimationFrame(this[syms[6]])
  }
  callback.bind(looper)
  let func
  if (config.limit) {
    // user defined limit
    if (config.position === 'first') {
      func = () => {
        this[syms[2]] = 0
        this[syms[6]] = timestamp => {
          if (!this[syms[1]]) this[syms[1]] = timestamp
          this[syms[4]] = timestamp - this[syms[1]]
          if (this[syms[2]] + this[syms[4]] < config.limit) {
            this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
          }
          config.loopFunction()
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'start',
          callback
        )
      }
    } else {
      func = () => {
        this[syms[2]] = 0
        this[syms[6]] = timestamp => {
          if (!this[syms[1]]) this[syms[1]] = timestamp
          this[syms[4]] = timestamp - this[syms[1]]
          config.loopFunction()
          if (this[syms[2]] + this[syms[4]] < config.limit) {
            this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
          }
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'start',
          callback
        )
      }
    }
  } else {
    // no user defined limit
    if (config.position === 'first') {
      func = () => {
        this[syms[2]] = 0
        this[syms[6]] = timestamp => {
          if (!this[syms[1]]) this[syms[1]] = timestamp
          this[syms[4]] = timestamp - this[syms[1]]
          this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
          config.loopFunction()
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'start',
          callback
        )
      }
    } else {
      func = () => {
        this[syms[2]] = 0
        this[syms[6]] = timestamp => {
          if (!this[syms[1]]) this[syms[1]] = timestamp
          this[syms[4]] = timestamp - this[syms[1]]
          config.loopFunction()
          this[syms[0]] = window.requestAnimationFrame(this[syms[6]])
        }
        this.prototype[Object.getOwnPropertySymbols(this.prototype)[3]](
          'start',
          callback
        )
      }
    }
  }
  func.bind(looper)
  return func
}

export default startFactory
