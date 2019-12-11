// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class EdictGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.features.instantPause = true;
    this.api.commands.pause = "pauseGame";
    this.api.commands.resume = "resumeGame";
    this.api.events.onGameRoundStart = "gameRoundStarted";
    this.api.events.onGameRoundEnd = "gameRoundEnded";
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&referrerUrl=${encodedLobbyUrl}`,
      };
    }

    return super.componentProps;
  }
}
