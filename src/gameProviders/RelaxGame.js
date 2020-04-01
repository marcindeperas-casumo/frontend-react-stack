// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export const COMMANDS = {
  PAUSE: {
    method: "pauseGame",
    params: {
      callback: "gamePausedHandler",
    },
  },
  RESUME: {
    method: "resumeGame",
    params: {},
  },
};

export const EVENTS = {
  GAME_ROUND_START: { method: "GameEvent_ROUND_STARTED" },
  GAME_ROUND_END: { method: "GameEvent_ROUND_ENDED" },
};

// TODO:
// timing issue with round started event (to be addressed with provider)

export class RelaxGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&homeurl=${encodedLobbyUrl}&fullscreen=false&rcenable=true`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.method;
  }
}
