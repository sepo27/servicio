#!/usr/bin/env bash

### Input ###

version="$1"

if [[ -z "$version" ]]; then
  echo "Missing version argument"
  exit 1
fi

### Main ###

echo "=== Versioning: $version"

pnpm version "$version"

echo "=== Pushing (code * tags)"

git push && git push --tags

echo "==== Publishing"

pnpm publish
