# Casumo Mobile - React Stack Proof of Concept

## How it works

`mobile-react-stack-poc` contains a couple of services that showcases the proof
of concept that enable us to build react components and embed them in the
current mobile application.

### `mobile-react-stack`

In simple terms, this is just a `create-react-app` with a couple of components
in it. For the sake of the proof of concept most of the wiring is left untouched
as these are not crucial in proving that this concept could work, and all
these details can be revisited and refined later on.

This service runs in dev mode (`yarn start`), so every time a change in the
source files is made, the target app will be reloaded.

## Development instructions

### Development mode

- Make sure you are running [casumo-proxy](https://github.com/Casumo/casumo-frontend-proxy) 2.5.0+
- Add the following to your [.casumo-proxy-local](https://github.com/Casumo/casumo-frontend-proxy/blob/master/docs/CustomEnv.md) for casumo-frontend:

```json
"reactStackService": {
    "local": "host.docker.internal:3000"
}
```

- Within the `casumo-frontend` repository run `gulp dev`
- Within the `mobile-react-stack-poc` repository run `yarn start`
- Go to [https://mobile.dev](https://mobile.dev)

### Linking Dependencies

Whilst developing CUDL components should generally be done within the storybook environment it can be useful to
see your changes in place in the PoC. This can be achieved by making use of npm/yarn link:

- Navigate to the [cudl-react](https://github.com/Casumo/cudl-react) checkout on your computer and run `yarn link-components` then run `lerna run --scope=@casumo/<name_of_component> build -- --watch` so changes you make to the component will cause the component to build.
- Return to the root of this repo and run `yarn link <name_of_component>` (e.g `yarn link @casumo/cmp-button`) to link it inside the react-stack
- In the react-stack find the file that consumes the component you've linked and append /dist to its path.
- Should Flow complain add `// $FlowFixMe` on the line above so webpack compiles.
- Now any changes you make to the component will now flow through to the PoC

### Deploy to production

```sh
# ssh in to the deploy machine
deploy-service mobile-react-stack-poc master
```

---

### Resources

- [FAC Business Idea](https://docs.google.com/document/d/1VUJQ2RFFmRxU06dJRsL1vDy2QBPGjQUEJG8kr5qV3eQ/preview)
- [Project Board](https://github.com/Casumo/Home/projects/91)
