import { routeTranslator, isTLDMarketSpecific } from "Utils";
import { ROUTE_IDS } from "Src/constants";
import { get as getFromStorage } from "Lib/storage";
import type { GameProviderModelProps } from "./types";
import { expandElementHeightToMatchItsParent } from "./utils";
import {
  GAME_ACTIVE_EVENT_NAME,
  GAME_IDLE_EVENT_NAME,
  GAME_ACTIVITY_STATUS_SOURCE,
  GAME_ELEMENT_ACTIVITY_STATUS_SOURCE_ATTRIBUTE,
} from "./constants";
import { NAVIGATION_BUBBLER_PATH } from "./config";

export class BaseGame {
  props: GameProviderModelProps;
  onGameActive: Event;
  onGameIdle: Event;
  isGameIdle: boolean = true;
  swipeUpToPlayPanelPossible: boolean = true;
  gameActivityStatusSource: string = GAME_ACTIVITY_STATUS_SOURCE.SIMULATED;
  urlPrefix: string;
  origin: string;
  onLaunchNotifications: Array<string> = [];

  constructor(props: GameProviderModelProps) {
    this.props = props;
    this.onGameActive = new Event(GAME_ACTIVE_EVENT_NAME);
    this.onGameIdle = new Event(GAME_IDLE_EVENT_NAME);
    this.urlPrefix =
      window.location.pathname.split("/")?.[1] || this.props.language;
    this.origin = this.props.origin || window.location.origin;
  }

  get lobbyUrl() {
    const { urlPrefix } = this.props;
    const getRoute = routeTranslator(this.props.language);
    const encodedTranslatedRoute = getRoute(
      getFromStorage("casumo-lastAccessedProduct") || ROUTE_IDS.TOP_LISTS
    );
    const tld = this.origin.split(".").pop(); // eslint-disable-line fp/no-mutating-methods

    if (isTLDMarketSpecific(tld)) {
      return `${this.origin}/${NAVIGATION_BUBBLER_PATH}?target=${encodedTranslatedRoute}`;
    }

    return `${this.origin}/${NAVIGATION_BUBBLER_PATH}?target=${urlPrefix}/${encodedTranslatedRoute}`;
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

  fitToParentSize = () => {
    if (this.props.gameRef) {
      expandElementHeightToMatchItsParent(this.props.gameRef);
    }
  };

  onMount() {
    const { current: gameElement } = this.props.gameRef;

    if (gameElement) {
      gameElement.setAttribute(
        GAME_ELEMENT_ACTIVITY_STATUS_SOURCE_ATTRIBUTE,
        this.gameActivityStatusSource
      );
    }
  }

  onUnmount() {}
}
