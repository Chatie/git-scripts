# @chatie/git-scripts

[![NPM Version](https://badge.fury.io/js/%40chatie%2Fgit-scripts.svg)](https://www.npmjs.com/package/@chatie/git-scripts)
[![npm (tag)](https://img.shields.io/npm/v/%40chatie/git-scripts/next.svg)](https://www.npmjs.com/package/@chatie/git-scripts?activeTab=versions)
[![Build Status](https://travis-ci.com/Chatie/git-scripts.svg?branch=master)](https://travis-ci.com/Chatie/git-scripts)

![Git Hooks](https://chatie.github.io/git-scripts/images/git-hook.gif)
> Source: [Git Hooks - Git](https://www.seekpng.com/ipng/u2w7o0i1u2w7o0e6_git-hooks-git/)

Git Hooks Integration for Chatie Projects

## USAGE

This module is a wrapper of the NPM module [git-scripts](https://www.npmjs.com/package/git-scripts), it provide following additional features:

1. `pre-push` hook had been set to run `npm run lint` and then `npm version patch` before `git push` for better code quality and version management.

Learn more about the original `git-scripts` from its GitHub homepage: [git-scripts](https://github.com/nkzawa/git-scripts)

## Preview

- Fail

![image](https://user-images.githubusercontent.com/5285894/163552995-87d0e331-568d-430c-b323-a076279e637a.png)

- Success

![image](https://user-images.githubusercontent.com/5285894/163553127-23538ade-c321-4028-b0e5-806097cae2a8.png)

## Use

Frist push:

- `git push -u origin branch`

If you don't want to need to add the -u parameter every time, you can modify default settings for git.

- `git config --global push.default current`

After that just use:

- `git push`

## DISABLE THE HOOK

You can skip git hook for `pre-push` if you want.

### 1. Temporary

To temporary disable the `pre-push` git hook, you can set `NO_HOOK=1` before do `git push`:

```shell
# for Linux & Mac
NO_HOOK=1 git push

# for Windows

set NO_HOOK=1 git push
```

### 2. Permanent

To permanent disable the `pre-push` git hook, you can delete the related settings in `package.json`:

```diff
-  "git": {
-    "scripts": {
-      "pre-push": "npx git-scripts-pre-push"
-    }
-  }
```

## Upgrade from old version

In the v0.7 version, we have improved the user experience. Solve the problem of push blocking and improve the readability of output information.
All projects using @chatie/scripts are highly recommended to upgrade.

Link to [Issue #27](https://github.com/Chatie/git-scripts/issues/27)

### Upgrade guide

Update steps:

1. `npm i -D @chatie/scripts@next`
2. `npx git-scripts install`
3. Enjoy push

## CHANGELOG

### master

### v0.7.11 (29 Sept 2022)

1. fix: 🐛 unknown revision

### v0.7.8 (12 Apr 2022)

1. fix ts-node not found bug

### v0.7.6 (12 Apr 2022)

1. Improve readability of output messages

### v0.7.4 (10 Apr 2022)

1. Remove git tag

### v0.7 (08 Apr 2022)

1. Fix re-push produces meaningless version when push fails after

### v0.2 (10 Jun 2019)

1. Install hook to `package.json` automatically

### v0.0.1 (08 Jun 2019)

1. Wrap `git-scripts`

## AUTHOR

[Huan LI (李卓桓)](http://linkedin.com/in/zixia) zixia@zixia.net

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## COPYRIGHT & LICENSE

- Code & Docs © 2019 - now Huan LI zixia@zixia.net
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
