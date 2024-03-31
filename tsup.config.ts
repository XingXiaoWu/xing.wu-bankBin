import type { Options } from 'tsup'
import fs from "fs-extra";

export const tsup: Options = {
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  clean: true,
  shims: true,
  async onSuccess() {
    console.log('拷贝');
    fs.copyFileSync('./src/bin.csv', './dist/bin.csv')
  },
  // minify: true,
  //noExternal: ['@nolyfill/es-aggregate-error']
}
