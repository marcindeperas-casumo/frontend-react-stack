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

- Make sure the `casumo-proxy` is running for [casumo-frontend](https://github.com/Casumo/casumo-frontend-proxy#install)
- Within the `casumo-frontend` repository run `gulp dev`
- Within the `mobile-react-stack-poc` repository run `yarn start`
- Go to [https://mobile.dev](https://mobile.dev)

### Deploy to production

```sh
# ssh in to the deploy machine
deploy-service mobile-react-stack-poc master
```

---

[Project Board](https://github.com/Casumo/Home/projects/91) - [Casumo Frontend Branch](https://github.com/Casumo/casumo-frontend/tree/mobile-react-stack-poc) - [Casumo Engine Branch](https://github.com/Casumo/Casumo-Engine/tree/mobile-react-stack-poc) - [Routing Configuration](https://github.com/Casumo/routing-configuration/compare/master...mobile-react-stack-poc)
