# Casumo React Stack

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## Table of Contents

- [How it works](#how-it-works)
- [Development instructions](#development-instructions)
- [Error Handling](./docs/error-handling.md)
- [Tracking](./docs/tracking.md)
- Modules
  - [CometD](./src/models/cometd/README.md)

## How it works

Casumo React Stack contains a couple of services that enable us to build React components and embed them in the current `casumo-frontend` app, for mobile and site, using [React Portals](https://reactjs.org/docs/portals.html).

It started with a `create-react-app` and evolved into what it is today. `casumo-frontend` is being deprecated and we are in the process of migrating to this new `react-stack`.

This service runs in dev mode (`yarn start`), so every time a change in the source files is made, the target app will be hot reloaded.

## Development instructions

### Setup

- Required Node version: **>=10.14.2**
- Required Docker version: **>=18.03**
- Install [casumo-frontend-proxy](https://github.com/Casumo/casumo-frontend-proxy#install) (2.5.0+) along with [certificate](https://github.com/Casumo/casumo-frontend-proxy/blob/master/docs/HTTPS.md).
- Clone [casumo-frontend](https://github.com/Casumo/casumo-frontend) repo and create file `.casumo-proxy-local` under `/web` with this snippet:

```json
{
  "reactStackService": {
    "local": "host.docker.internal:3000"
  }
}
```

- Within the `casumo-frontend` repository under `/web` run `casumo-proxy use local` in order to proxy to your local environment.

### Daily development

Development can be done within the casumo-frontend SPA or by using [Storybook](https://storybook.js.org). If the task consists of creating new components or making changes to existing components it is advised to start with [Storybook](#developing-with-storybook) then move to developing within the SPA.

#### Contributing

Please read the [contributing guidelines](CONTRIBUTING.md).

#### Developing within the SPA

- Within the `casumo-frontend` repository under `/web` run `casumo-proxy start`
- Within the `casumo-frontend` repository under `/web` run `yarn mobile gulp dev`.
- Within the `mobile-react-stack-poc` repository run `yarn start`.
- Go to [https://mobile.dev](https://mobile.dev)
- Make sure to login. The react-stack is only available when logged in.

#### Developing with Storybook

- Within the `mobile-react-stack-poc` respository run `yarn storybook`
- Go to [https://localhost:6006](https://localhost:6006)

#### Testing

- Within the `mobile-react-stack-poc` respository run `yarn test`
- TDD is heavily encouraged!

### Deploy to test

```sh
ssh <assigned-ssh-username>@test-release

deploy-service mobile-react-stack-poc <branch-name>
```

### Deploy to production

```sh
ssh <assigned-ssh-username>@live-release

deploy-service mobile-react-stack-poc master
```
