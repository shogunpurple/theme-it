import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';

export default {
  input: 'src/theme-it.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'es',
      file: pkg.module
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};
