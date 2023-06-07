import { execSync } from 'child_process'
import { buildSync } from 'esbuild'
import { rmSync, writeFileSync } from 'fs'
import glob from 'tiny-glob'
;(async () => {
  // Cleaning dist dir
  console.log('Cleaning dist directory')
  rmSync('dist', {
    force: true,
    recursive: true,
  })

  // Generate entry-points for cjs compatibility
  const target = ['ESNext', 'node8.17']
  const entryPoints = await glob('./src/**/*.ts')

  console.log('Building dist for node (cjs)...')
  buildSync({
    entryPoints,
    outdir: './dist/cjs',
    bundle: false,
    sourcemap: false,
    minify: false,
    format: 'cjs',
    platform: 'node',
    target,
  })
  writeFileSync('./dist/cjs/package.json', '{"type": "commonjs"}', {
    flag: 'w',
  })

  console.log('Building dist for node type=module (esm)...')
  buildSync({
    entryPoints: ['./src/index.ts'],
    outdir: './dist/esm',
    bundle: true,
    sourcemap: false,
    minify: false,
    splitting: true,
    format: 'esm',
    target,
    platform: 'node',
    outExtension: {
      '.js': '.mjs',
    },
  })
  writeFileSync('./dist/esm/package.json', '{"type": "module"}', {
    flag: 'w',
  })

  console.log('Generating typescript declaration ...')
  execSync(
    'tsc --declaration --emitDeclarationOnly --declarationDir ./dist/types/',
  )
})()
