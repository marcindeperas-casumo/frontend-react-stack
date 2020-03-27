// @flow
import { routeTranslator, isTLDMarketSpecific } from "Utils";
import { ROUTE_IDS } from "Src/constants";
import type { GameProviderModelProps } from "./types";
import { GAME_ACTIVE_EVENT_NAME, GAME_IDLE_EVENT_NAME } from "./constants";
import { NAVIGATION_BUBBLER_PATH } from "./config";

export class BaseGame {
  props: GameProviderModelProps;
  onGameActive: Event;
  onGameIdle: Event;
  isGameIdle: boolean = true;

  constructor(props: GameProviderModelProps) {
    this.props = props;
    this.onGameActive = new Event(GAME_ACTIVE_EVENT_NAME);
    this.onGameIdle = new Event(GAME_IDLE_EVENT_NAME);
  }

  get lobbyUrl() {
    const getRoute = routeTranslator(this.props.language);
    const encodedTranslatedRoute = getRoute(ROUTE_IDS.TOP_LISTS);
    const tld = window.location.origin.split(".").pop(); // eslint-disable-line fp/no-mutating-methods

    if (isTLDMarketSpecific(tld)) {
      return `${window.location.origin}/${NAVIGATION_BUBBLER_PATH}?target=${encodedTranslatedRoute}`;
    }

    return `${window.location.origin}/${NAVIGATION_BUBBLER_PATH}?target=${this.props.language}/${encodedTranslatedRoute}`;
  }

  goToLobby() {
    window.location.replace(this.lobbyUrl);
  }

  get componentTag() {
    return "div";
  }

  get componentProps() {
    return {
      ref: this.props.gameRef,
    };
  }

  setGameAsActive() {
    const { current: gameElement } = this.props.gameRef;

    this.isGameIdle = false;

    if (gameElement) {
      gameElement.dispatchEvent(this.onGameActive);
    }
  }

  setGameAsIdle() {
    const { current: gameElement } = this.props.gameRef;

    this.isGameIdle = true;

    if (gameElement) {
      gameElement.dispatchEvent(this.onGameIdle);
    }
  }

  onMount() {}

  onUnmount() {}
}
