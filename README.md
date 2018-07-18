# Casumo Mobile - React Stack Proof of Concept

## How it works

`mobile-react-stack-poc` contains a couple of services that showcases the proof
of concept that enable us to build react components and embed them in the
current mobile application.

### `mobile-react-stack`

In simple terms, this is just a `create-react-app` with a couple of components
in it. For the sake of the proof of concept most of the wiring is left untouched
as this these are not crucial in proving that this concept could work, and all
these details can be revisited and refined later on.

This service runs in dev mode (`yarn start`), so every time a change in the
source files is made, the target app will be reloaded.

### `sumo-proxy`

This service is an nginx which is very similar to the `casumo-proxy`. There are
some shortcuts here, it assumes that at least once you have ran the casumo-proxy
(therefore you should have the SSL certificates generated). This service mounts
a couple of config folders from the casumo-proxy and also overrides the
`http_mobile.conf` config with the new settings needed.

### `api-gw`

Ditching this concept for now since it was causing some latency issues and we can get away with anything we need through an nginx proxy.

~~This is a simple node service that services as frontend API gateway. We could
easily get away with just using nginx for this, at the same time if we need a
minor change, merge between multiple endpoints in a single api, all these
changes can be done at this layer, without depending on any backend resources.~~

## Development instructions

### Prerequisites

- In your `HOME` directory create a symbolic link to your casumo frontend repo.
  This is needed by the docker-compose.yml so it can be mounted in nginx for
  development purposes.

```shell
cd casumo-frontend;
mkdir -p ~/tmp;
ln -s $(pwd)/ ~/tmp/casumo-frontend;
```

- switch to `mobile-react-stack-poc` branch on casumo-frontend

### Development mode

- Turn off the `casumo-proxy` (a similar service will be initialised by the `mobile-react-stack-poc` repository)
- Within the `casumo-frontent` repository run `gulp dev` (make sure you are on the `mobile-react-stack-poc` branch)
- Within the `mobile-react-stack-poc` repository run `yarn env:up` to start all the service needed
- Run `yarn env:down` in case you want to cleanup the docker services
- Goto [https://mobile.dev](https://mobile.dev)

### Deploy to production

```sh
# ssh in to the deploy machine
deploy-service mobile-react-stack-poc master
```

---

[Project Board](https://github.com/Casumo/Home/projects/91) - [Casumo Frontend Branch](https://github.com/Casumo/casumo-frontend/tree/mobile-react-stack-poc) - [Casumo Engine Branch](https://github.com/Casumo/Casumo-Engine/tree/mobile-react-stack-poc) - [Routing Configuration](https://github.com/Casumo/routing-configuration/compare/master...mobile-react-stack-poc)
