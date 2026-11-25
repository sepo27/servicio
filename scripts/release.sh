#!/usr/bin/env bash

### Functions ###

RED='\033[31m'
GREEN='\033[32m'
RESET='\033[0m'

function info() {
  local msg="$1"
  printf '%b\n' "${GREEN}${msg}${RESET}"
}

function error() {
  local msg="$1"
  printf '%b\n' "${RED}${msg}${RESET}"
  exit 1
}

### Input ###

version="$1"

if [[ -z "$version" ]]; then
  error "Missing version argument"
fi

### Main ###

info "=== Versioning: $version" && echo

pnpm version "$version"

echo

info "=== Pushing (code + tags)" && echo

git push && git push --tags

echo

info "==== Publishing" && echo

pnpm publish

echo

info "=== Done."
