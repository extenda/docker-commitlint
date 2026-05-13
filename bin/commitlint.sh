#!/usr/bin/env bash

ARGS="--config /work/commitlint.config.js"

if [[ "$1" == *COMMIT_EDITMSG ]]; then
  # Running from pre-commit hook. Git passes a relative path from the main
  # checkout (.git/COMMIT_EDITMSG) and an absolute path from a worktree
  # (.../.git/worktrees/<name>/COMMIT_EDITMSG).
  ARGS="$ARGS --edit $1"
else
  # Use whatever args we were passed.
  ARGS="$ARGS $*"
fi

# shellcheck disable=SC2086

exec /work/node_modules/.bin/commitlint $ARGS
