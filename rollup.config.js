// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/assets/js/app.js',
  output: {
    file: 'src/assets/js/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};