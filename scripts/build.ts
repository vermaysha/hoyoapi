import { exec } from 'child_process'
import { mkdirSync, rmSync, writeFileSync } from 'fs'

;(async () => {
  rmSync('dist', {
    force: true,
    recursive: true,
  })
  mkdirSync('dist/cjs', {
    recursive: true
  })
  mkdirSync('dist/esm', {
    recursive: true
  })

  exec('tsc --module commonjs --outDir ./dist/cjs/', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    }

    if (stderr) {
      console.error(stderr)
    }

    console.info('CJS Build: Successfully')
  })

  exec('tsc --module esnext --outDir ./dist/esm/', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    }

    if (stderr) {
      console.error(stderr)
    }

    console.info('ESM Build: Successfully')
  })

  exec(
    'tsc --declaration --emitDeclarationOnly --declarationDir ./dist/types/',
    (err, stdout, stderr) => {
      if (err) {
        console.error(err)
      }

      if (stderr) {
        console.error(stderr)
      }

      console.info('Declaration Build: Successfully')
    },
  )

  writeFileSync('./dist/cjs/package.json', '{"type": "commonjs"}', {
    flag: 'w',
  })

  writeFileSync('./dist/esm/package.json', '{"type": "module"}', {
    flag: 'w',
  })
})()
