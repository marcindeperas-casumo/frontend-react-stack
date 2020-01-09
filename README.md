# Casumo React Stack

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## Table of Contents

- [How it works](#how-it-works)
- [Development instructions](#development-instructions)
- [Error Handling](./docs/error-handling.md)
- [Tracking](./docs/tracking.md)
- [Imports](./docs/imports.md)
- [Porting modals from old codebase](./docs/porting-modals.md)
- [Mocking in Storybook](./docs/mocking-in-storybook.md)
- Modules
  - [CometD](./src/models/cometd/README.md)

## How it works

Casumo React Stack contains a couple of services that enable us to build React components and embed them in the current `casumo-frontend` app, for mobile and site, using [React Portals](https://reactjs.org/docs/portals.html).

It started with a `create-react-app` and evolved into what it is today. `casumo-frontend` is being deprecated and we are in the process of migrating to this new `react-stack`.

This service runs in dev mode (`yarn install` the first time running the `frontend-react-stack`, followed by `yarn start`), so every time a change in the source files is made, the target app will be hot reloaded.

## Development instructions

### Setup

- Required Node version: **>=10.14.2** (To update: `nvm install --lts`)
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

### Daily development

Development can be done within the casumo-frontend SPA or by using [Storybook](https://storybook.js.org). If the task consists of creating new components or making changes to existing components it is advised to start with [Storybook](#developing-with-storybook) then move to developing within the SPA.

#### Contributing

Please read the [contributing guidelines](CONTRIBUTING.md).

#### Developing within the SPA

- Within the `casumo-frontend` repository under `/web` run the following commands in order:
  - `casumo-proxy add-hosts` to add entries to host file
  - `casumo-proxy use local` in order to proxy to your local environment.
  - `casumo-proxy start` to start paused proxy, or create it if it does not exist.
  - `yarn mobile gulp dev` to run the mobile build
- Within the `frontend-react-stack` repository run `yarn start`.
- Go to [https://mobile.dev](https://mobile.dev)
- Make sure to login. The react-stack is only available when logged in.

#### Developing with Storybook

- Within the `frontend-react-stack` repository run `yarn storybook`
- Go to [https://localhost:6006](https://localhost:6006)

#### Testing

- Within the `frontend-react-stack` repository run `yarn test`
- TDD is heavily encouraged!

### Deploy to test

```sh
ssh <assigned-ssh-username>@test-release

deploy-service frontend-react-stack <branch-name>
```

### Deploy to production

```sh
ssh <assigned-ssh-username>@live-release

deploy-service frontend-react-stack master
```

## FAQ

### Can I link CUDL components?

Whilst developing CUDL components should generally be done within the storybook environment it can be useful to see your changes in place in the React Stack. This can be achieved by making use of npm/yarn link:

- Navigate to the [cudl-react](https://github.com/Casumo/cudl-react) checkout on your computer and run `yarn link-components`
- Run `lerna run --scope=@casumo/<name_of_component> build -- --watch` so changes you make to the component will cause the component to build.
- Return to the root of this repo and run `yarn link <name_of_component>` (e.g `yarn link @casumo/cmp-button`) to link it inside the react-stack.
- In the react-stack find the file that consumes the component you've linked and append `/dist` to its path.
- You can suppress a flow error on a specific line by prepending it with `// $FlowFixMe` so that webpack compiles.
- Any changes you make to the component will now flow through to the React Stack

### How can I debug production via React Devtools ?

In order to prevent people from looking into our React tree with the react DevTools extension, we disable the DevTools integration.
To bypass this and be able to use the Devtools, open the Chrome console and run:
`localStorage.setItem('isDebugMode', true);`
