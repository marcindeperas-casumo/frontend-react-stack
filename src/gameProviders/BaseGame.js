// @flow
import { routeTranslator } from "Utils";
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

    return `${window.location.origin}/${NAVIGATION_BUBBLER_PATH}?target=${encodedTranslatedRoute}`;
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

  onResize = () => {
    // Reference to app's host element
    const hostElement = document.querySelector("#root");

    if (hostElement) {
      // setting temporarily to large amount
      // to cater for ios issue on rotation
      // https://jira.casumocave.com/browse/PRCA-424
      // eslint-disable-next-line fp/no-mutation
      hostElement.style.height = "2000px";

      setTimeout(() => {
        // Removing the effect created above shortly after
        // as only needed till brower settles after rotation
        // eslint-disable-next-line fp/no-mutation
        hostElement.style.height = "";
      }, 500);
    }
  };

  onMount() {
    window.addEventListener("resize", this.onResize);
  }

  onUnmount() {
    window.removeEventListener("resize", this.onResize);
  }
}
