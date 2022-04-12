#!/usr/bin/env node
/**
 *
 * An example hook script to verify what is about to be committed.
 * Called by "git commit" with no arguments.  The hook should
 * exit with non-zero status after issuing an appropriate message if
 * it wants to stop the commit.
 *
 * To enable this hook, rename this file to "pre-commit".
 *
 */
import shell, { ShellString } from 'shelljs'
import path from 'path'

const NO_HOOK_VAR = 'NO_HOOK'
const INNER_PRE_HOOK = 'CHATIE_INNER_PRE_HOOK'

if (process.env[NO_HOOK_VAR]) {
  // user set NO_HOOK=1 to prevent this hook works
  process.exit(0)
}

if (process.env[INNER_PRE_HOOK]) {
  // http://stackoverflow.com/a/21334985/1123955
  process.exit(0)
}

const argv = process.argv.slice(2)
const remoteName = argv[0] || ''
// const remoteUrl = argv[1] || ''

interface RefInfo {
  localBranch: string
  localCommit: string
  remoteBranch: string
  remoteCommit: string
}

const refs: Array<RefInfo> = []

for (let i = 2; i + 4 <= argv.length;) {
  const ref: RefInfo = {
    localBranch : argv[i++] || '',
    localCommit : argv[i++] || '',
    remoteBranch : argv[i++] || '',
    remoteCommit : argv[i++] || '',
  }
  if (ref.localCommit.match(/^0+$/)) {
    ref.localBranch = ''
  }
  refs.push(ref)
}

if (refs?.[0]?.localCommit.match(/^0+$/)) {
  // delete remote branch
  process.exit(0)
}

console.info('[Step-1]', 'Checking last commit...', '\n')
const pkgFile = path.join(process.cwd(), 'package.json')
const packageVersion = require(pkgFile).version
const lastCommitMsg = checkReturn(shell.exec('git log --pretty=format:"%s" HEAD^0 -1', { silent : true })).stdout

if (packageVersion === lastCommitMsg) {
  console.info('[Step-1]', 'No need to bump the package version.', '\n')
  process.exit(0)
}

console.info('[Step-2]', 'Checking lint...', '\n')
checkReturn(shell.exec('npm run lint', { silent : true }))

console.info('[Step-3]', 'Bump the package version...', '\n')
checkReturn(shell.rm('-f', 'package-lock.json'))
checkReturn(shell.exec('npm version patch --no-package-lock', { silent : true }))
process.env[INNER_PRE_HOOK] = '1'

console.info('[Step-4]', 'Remove git tag...', '\n')
const version = checkReturn(shell.exec('git log --pretty=format:"%s" HEAD^0 -1', { silent : true })).stdout
checkReturn(shell.exec(`git tag -d v${version}`, { silent : true }))

console.info('[Step-5]', 'Push...', '\n')
const refMaps = refs.map(ref => ref.remoteBranch ? ref.localBranch + ':' + ref.remoteBranch : '')
const cmd = ['git push', remoteName, ...refMaps].join(' ')
checkReturn(shell.exec(cmd, { silent : true }))

console.info(String.raw`
____ _ _        ____            _
/ ___(_) |_     |  _ \ _   _ ___| |__
| |  _| | __|    | |_) | | | / __| '_ \
| |_| | | |_     |  __/| |_| \__ \ | | |
\____|_|\__|    |_|    \__,_|___/_| |_|

____                              _ _
/ ___| _   _  ___ ___ ___  ___  __| | |
\___ \| | | |/ __/ __/ _ \/ _ \/ _^ | |
___) | |_| | (_| (_|  __/  __/ (_| |_|
|____/ \__,_|\___\___\___|\___|\__,_(_)

`)

console.info(`



 ### Npm version bumped and pushed by inner push inside hook pre-push ###"
 -- vvvvvv outer push will be canceled, don't worry, not bug :) vvvvvv --"


`)

process.exit(42)

function checkReturn (ret: ShellString) {
  if (ret.code !== 0) {
    const line = '------------------------------------------'
    console.error(`Error:\n${line}\n\n${ret.stderr}\n\n${line}\n`)
    process.exit(1)
  }
  return ret
}
