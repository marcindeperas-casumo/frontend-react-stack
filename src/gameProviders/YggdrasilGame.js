// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";

// ISSUES:
// back to lobby and other urls are coming from backend

export class YggdrasilGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = "game/pause";
    this.api.commands.resume = "game/resume";
    this.api.events.onGameRoundStart = "gameRound/start";
    this.api.events.onGameRoundEnd = "gameRound/end";
    this.api.features.instantPause = true;

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.MANAGED;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${!isEmbedded ? `&lobby=${encodedLobbyUrl}` : ""}`,
      };
    }

    return super.componentProps;
  }
}
