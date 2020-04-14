const prefix = 'dist/bundle.'

export default {
  input: 'src/index.js',
  output: [
    {
      file: `${prefix}cjs.js`,
      format: 'cjs'
    },
    {
      file: `${prefix}esm.js`,
      format: 'esm'
    },
    {
      name: 'YourAwesomePackageNameHere',
      file: `${prefix}umd.js`,
      format: 'umd'
    }
  ]
}
