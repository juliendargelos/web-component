import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import cleaner from 'rollup-plugin-cleaner'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'

import pkg from './package.json'
import tsconfig from './tsconfig.json'

const config = {
  input: `src/index.ts`,
  output: { sourcemap: true },
  plugins: [
    typescript({ clean: true }),
    alias({
      resolve: ['.ts'],
      entries: Object
        .entries(tsconfig.compilerOptions.paths)
        .map(([find, [replacement]]) => ({ find, replacement }))
    })
  ]
}

export default [
  {
    ...config,
    output: [
      { ...config.output, file: pkg.main, format: 'cjs' },
      { ...config.output, file: pkg.module, format: 'es' }
    ],
    plugins: [
      cleaner({ targets: [pkg.main.replace(/\/[^\/]+$/, '')] }),
      eslint(),
      ...config.plugins
    ]
  },
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.browser,
      format: 'umd',
      name: 'WebComponent',
    },
    plugins: [
      ...config.plugins,
      nodeResolve({ extensions: ['.ts'] }),
      commonjs(),
      terser()
    ]
  }
]
