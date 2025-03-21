#!/usr/bin/env bash

# Alternative entrypoint for GitHub Action
# We embed this in our image to avoid rebuilding it at action runtime

usage() {
  echo "Usage: $0 [-c <sha>] [-x <bool>] [-m <string>] [-f <bool>]" 1>&2
  exit 1
}

while getopts ":c:m:x:f:" opt; do
  case "${opt}" in
    c)
      commit="$OPTARG"
      ;;
    m)
      message="$OPTARG"
      ;;
    x)
      relaxed="$OPTARG"
      ;;
    f)
      format="$OPTARG"
      ;;
    *)
      usage
      ;;
  esac
done

export FORMAT_CHECK="${format:-false}"

if [ -d /github/workspace ]; then
  git config --global --add safe.directory /github/workspace
fi

if [ -n "$message" ]; then
  echo "$message" | exec /usr/local/bin/commitlint
elif [ -n "$commit" ]; then
  if [ "$relaxed" == "true" ]; then
    # Relaxed validation. Only check if this is a single commit.
    if [ "$(git rev-parse "$commit")" == "$(git rev-parse HEAD)" ]; then
      echo "commitlint HEAD"
      exec /usr/local/bin/commitlint --from "$commit"
    else
      echo "commitlint relaxed, not linting $commit...HEAD"
    fi
  else
    echo "commitlint $commit...HEAD"
    exec /usr/local/bin/commitlint --from "$commit"
  fi
fi
