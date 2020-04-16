import looperStateMachine from './looperStateMachine'

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
  return looper
}

export default simple
