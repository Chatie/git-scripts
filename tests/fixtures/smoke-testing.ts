#!/usr/bin/env ts-node

import { test } from 'tstest'

import shell from 'shelljs'

test('NO_HOOK=1', async (t: test.Test) => {
  const result = shell.exec('NO_HOOK=1 node_modules/.bin/git-scripts-pre-push')
  t.equal(result.code, 0, 'should exit 0')
  t.false(result.stdout, 'should no stdout')
  t.false(result.stderr, 'should no stderr')
})
