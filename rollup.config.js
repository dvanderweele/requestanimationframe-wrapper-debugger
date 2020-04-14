import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

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
      name: 'RequestanimationframeWrapperDebugger',
      globals: {
        rwd: 'RafWD'
      },
      file: `${prefix}umd.js`,
      format: 'umd'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    production && terser()
  ]
}
