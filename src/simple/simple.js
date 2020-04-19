import looperStateMachine from '../looperStateMachine'
import startFactory from './startFactory'
import pauseFactory from './pauseFactory'
import unpauseFactory from './unpauseFactory'
import stopFactory from './stopFactory'

const simple = config => {
  // validate config object
  if (!config) throw Error('No config object passed to "simple" function.')
  if (typeof config !== 'object') {
    throw TypeError(
      `Function "simple" expects config object parameter. You passed ${typeof config}.`
    )
  }
  const configKeys = Object.keys(config)
  if (!configKeys.length) {
    throw Error('The config object passed to function "simple" was empty.')
  }
  if (configKeys.indexOf('loopFunction') === -1) {
    throw Error(
      'Config object passed to function "simple" requires a "loopFunction" key set to a function you want to run once per animation frame.'
    )
  }
  if (typeof config.loopFunction !== 'function') {
    throw TypeError(
      'The value for "loopFunction" key in config object (passed to "simple" function) must be of type "function".'
    )
  }
  if (configKeys.indexOf('limit') !== -1 && typeof config.limit !== 'number') {
    throw TypeError(
      `If you include a "limit" key in the config object you pass to function "simple", its value must be a number (i.e. the max number of milliseconds you want your "loopFunction" to run for). You provided a ${typeof config.limit} instead.`
    )
  }
  if (config.position && typeof config.position !== 'string') {
    throw TypeError(
      'If your config object for function "simple" includes a "position" key, it must be of type string.'
    )
  }
  if (
    config.position &&
    config.position !== 'first' &&
    config.position !== 'last'
  ) {
    throw Error(
      `If your config object for function "simple" includes a "position" key, its string value must be either "first" or "last". You passed "${config.position}".`
    )
  }
  if (configKeys.indexOf('position') === -1) {
    config.position = 'first'
  }
  // config looper object to return
  const looper = {}
  looper.prototype = looperStateMachine
  /*
    Metadata Symbols

    - rAF ID - will get refreshed when paused and unpaused
    - startTime - original starting timestamp, never refreshed
    - timeSum - sum of all progresses calculated on every pause
    - lastUnpause - timestamp from loop at last unpause
    - progress - time between start or lastUnpause and current frame
    - deltaTime - new each frame
    - loop - outer function called each rAF frame, recreated on unpause
  */
  const rAFID = Symbol('rAFID')
  const startTime = Symbol('startTime')
  const timeSum = Symbol('timeSum')
  const lastUnpause = Symbol('lastUnpause')
  const progress = Symbol('progress')
  const deltaTime = Symbol('deltaTime')
  const loop = Symbol('loop')
  looper[rAFID] = null
  looper[startTime] = null
  looper[timeSum] = null
  looper[lastUnpause] = null
  looper[progress] = null
  looper[deltaTime] = null
  looper[loop] = null
  looper.start = startFactory(config, looper)
  looper.pause = pauseFactory(looper)
  looper.unpause = unpauseFactory(config, looper)
  looper.stop = stopFactory(looper)
  return looper
}

export default simple
