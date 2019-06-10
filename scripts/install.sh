#!/usr/bin/env bash

# "git": {
#   "scripts": {
#     "pre-push": "./scripts/pre-push.sh"
#   }
# },

# hook=$(npx pkg-jq -r '.git.scripts."pre-push"')

# if [ 'null' == "$hook" ]; then
#   echo "@chatie/git-scripts: auto adding git pre-push hook to package.json..."
#   npx pkg-jq -i '.git.scripts."pre-push"="npx git-scripts-pre-push"'
#   echo "@chatie/git-scripts: done."
# fi

[ -f dist/bin/install.js ] && node dist/bin/install.js
