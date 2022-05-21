import nodeResolve from '@rollup/plugin-node-resolve';
import html from '@open-wc/rollup-plugin-html';
import styles from 'rollup-plugin-styles';
import browsersync from 'rollup-plugin-browsersync';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.html',
  output: { dir: 'dist', format: 'esm' },
  plugins: [
    nodeResolve(),
    typescript(),
    styles(),
    html(),
    browsersync({ server: 'dist' })
  ]
};
