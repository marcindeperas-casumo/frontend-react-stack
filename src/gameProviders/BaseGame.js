// @flow
import { routeTranslator, redirectTo, ROUTE_IDS } from "Components/Router";
import type { GameProviderModelProps } from "./types";

export class BaseGame {
  props: GameProviderModelProps;

  constructor(props: GameProviderModelProps) {
    this.props = props;
  }

  get lobbyUrl() {
    const translateRoute = routeTranslator(this.props.language);

    return `${window.location.origin}/${translateRoute(ROUTE_IDS.TOP_LISTS)}`;
  }

  get componentTag() {
    return "div";
  }

  get componentProps() {
    return {
      ref: this.props.gameRef,
    };
  }

  goToLobby() {
    redirectTo(this.lobbyUrl);
  }

  onMount() {}

  onUnmount() {}

  pauseGame(): Promise<void> {
    return Promise.resolve();
  }

  resumeGame() {}
}
