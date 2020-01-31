// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

// TODO:
// timing issue with round started event (to be addressed with provider)

export class RelaxGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = {
      method: "pauseGame",
      params: {
        callback: "gamePausedHandler",
      },
    };
    this.api.commands.resume = {
      method: "resumeGame",
      params: {},
    };
    this.api.events.onGameRoundStart = { method: "GameEvent_ROUND_STARTED" };
    this.api.events.onGameRoundEnd = { method: "GameEvent_ROUND_ENDED" };
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&homeurl=${encodedLobbyUrl}`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.method;
  }
}
