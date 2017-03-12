# Arkenstone Node.js API Boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/Nebo15/arc-boilerplates-api-node.svg)](https://greenkeeper.io/)

Node.js (Express.js + MongoDB boilerplate) for Arkenstone "arc" cli tool.

## What is this?

In Nebo #15 we use use [Arkenstone](https://github.com/Nebo15/arkenstone.api) to confiure and deploy our projects. It's have it's cli tool called ```arc```, and whenever you use ```arc init --type node.js``` it should use this repo as refference folder structure.

It works very similary to Yeoman generators, but doesn't have such configurability and this doesn't bring unnececary for us overhead.

Why unnececary? Because freedom to choose project structure is beatiful, but we have our very-own best practices and we are trying to follow them everywhere we can.

## Quick install

See install instructions for ```arc``` cli tool.

## Whats included?

- Express.js as API framework.
- Babel.js for ES2015 support.
- ```.travis.yaml``` to run tests on [Travis-CI](https://travis-ci.org/).
- JSCS, ESLint (with [Babel-ESLint](https://github.com/babel/babel-eslint)) and Istanbul to control code quality.
- Mocha for tests.
- Pre-commit hook with code quality tools and tests.
- Vagrantfile to run pojects locally.
- Puppet configuration for production server and Vagrant box.
- Node.js recommended project structure.
- A set of useful node-scipts in ```package.json```.
- Some other common Node.js dependencies (database drivers, http client, etc.)
- http://nodemon.io/
- https://github.com/node-inspector/node-inspector
- ```.gitignore```
