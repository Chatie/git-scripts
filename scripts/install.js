#!/usr/bin/env node
const fs = require('fs')
const { exec } = require('child_process')

const INSTALLJS = 'dist/bin/install.js'

function main () {
  if (fs.existsSync(INSTALLJS)) {
    exec(INSTALLJS, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.info(stdout)
      if (stderr) {
        console.error(stderr)
      }
    })
  } else {
    console.info(`@chatie/git-scripts postinstall ${INSTALLJS} not found`)
  }
}

main()
