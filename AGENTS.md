# Setup Typescript Project

Setup new NodeJS Typescript Project.  
Process below instructions one-by-one.  
Confirm before executing each step.  
Use [this public GIST](https://gist.github.com/sepo27/41ff6efa06f5384c098f438743eb651e) to get template files for different stages.

## Setup repo

- copy `.gitignore` from public git above

## Add Tooling

- Initialize `.nvmrc` with latest stable LTS version of NodeJS

- Initialize PNPM project
  - install PNPM if missing
  - initialize PNPM project using `pacakge.json` template file from gist above
  - update project name from folder name (but strip `.git` if present)
  - update project description from prompt
  - update package keywords from prompt
  - install node modules

- Setup Typescript
  - install latest version as dev dependency
  - initialize configs from public gist above

- Setup Eslint
  - install latest version as dev dependency
  - use `eslint.config.js` from public gist above
  - make sure to install all required dependent packages from the config

- Initialize dummy `indes.ts`
  - add `/src/index.ts`
  - with dummy content: "console.log("=== Index"")"

- Setup GIT Hooks
  - setup husky
  - setup precommit hooks using `precommit.sh` from public gist above
    - copy `precommit.sh` into `/hooks/precommit.sh`
    - reference this file from husky

## Incorporate Packaging & Release

- Setup changelog
  - use `conventional-changelog` package
  - use `.versionrc.js` config from public gist above

