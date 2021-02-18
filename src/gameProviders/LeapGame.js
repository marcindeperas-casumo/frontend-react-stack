// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";

export class LeapGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.targetDomain = window.location.origin;
    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${encodedLobbyUrl}`,
      };
    }

    return super.componentProps;
  }
}
