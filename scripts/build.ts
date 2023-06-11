import { execSync } from 'child_process'
import { buildSync } from 'esbuild'
import { rmSync, writeFileSync } from 'fs'
import { performance } from 'perf_hooks'
import glob from 'tiny-glob'
;(async () => {
  const startTime = performance.now()

  // Cleaning dist dir
  console.log('\x1b[32mCleaning dist directory\x1b[0m')
  rmSync('dist', {
    force: true,
    recursive: true,
  })

  // Generate entry-points for cjs compatibility
  const target = ['ESNext', 'node8.17']
  const entryPoints = await glob('./src/**/*.ts')

  console.log('\x1b[34mBuilding dist for node (cjs)...\x1b[0m')
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

  console.log('\x1b[34mBuilding dist for node type=module (esm)...\x1b[0m')
  buildSync({
    entryPoints: [
      './src/index.ts',
      './src/client/gi/index.ts',
      './src/client/hi/index.ts',
      './src/client/hoyolab/index.ts',
      './src/client/hsr/index.ts',
    ],
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

  console.log('\x1b[34mGenerating typescript declaration ...\x1b[0m')
  execSync(
    'tsc --declaration --emitDeclarationOnly --declarationDir ./dist/types/',
  )

  const endTime = performance.now()
  const executionTime = (endTime - startTime) / 1000
  console.log(
    `\x1b[32mBuild Success with execution time ${executionTime.toFixed(
      2,
    )} s\x1b[0m`,
  )
})()
