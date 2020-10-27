// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export const COMMANDS = {
  PAUSE: '{ "type": "Tilt" }',
  RESUME: '{ type: "" }',
};

export const PRAGMATIC_GAME_EVENT_TYPE = Object.freeze({
  GAME_READY: {
    name: "gameLoadingEnded",
  },
  GAME_ROUND_STARTED: {
    name: "gameRoundStarted",
  },
  GAME_ROUND_ENDED: {
    name: "gameRoundEnded",
  },
  GAME_LOADING_STARTED: {
    name: "gameLoadingStarted",
  },
  GAME_LOADING_COMPLETE: {
    name: "gameLoadingEnded",
  },
  GAME_STOP_AUTO_PLAY: {
    name: "Tilt",
  },
  GAME_CLOSED: {
    name: "notifyCloseContainer",
  },
  GAME_QUIT: {
    name: "gameQuit",
  },
  RESULT_SHOWN: {
    name: "resultShown",
  },
  BONUS_GAME_ENDED: {
    name: "bonusGameEnded",
  },
  FREE_SPIN_ENDED: {
    name: "freeSpinEnded",
  },
  BALANCE_TOO_LOW: {
    name: "balanceTooLow",
  },
});

export type PragmaticGameEventTypeLiteral = $Values<
  typeof PRAGMATIC_GAME_EVENT_TYPE
>;

export interface PragmaticGameEvent {
  method: PragmaticGameEventTypeLiteral;
}

export const PUSH_GAME_EVENTS = {
  GAME_ROUND_START: PRAGMATIC_GAME_EVENT_TYPE.GAME_ROUND_STARTED,
  GAME_ROUND_END: PRAGMATIC_GAME_EVENT_TYPE.RESULT_SHOWN,
};

type PragmaticGameMessage = {
  data: {
    name?: PragmaticGameEventTypeLiteral,
    data?: { type?: string },
  },
  origin: string,
};

export class PragmaticGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.events.onGameRoundStart = PUSH_GAME_EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = PUSH_GAME_EVENTS.GAME_ROUND_END;
    this.api.features.instantPause = false;
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

  onMessageHandler(message: PragmaticGameMessage) {
    super.onMessageHandler(message);

    if (Boolean(message.data.name)) {
      return;
    }

    if (
      [
        PRAGMATIC_GAME_EVENT_TYPE.GAME_CLOSED,
        PRAGMATIC_GAME_EVENT_TYPE.GAME_QUIT,
      ].includes(message.data.name)
    ) {
      this.goToLobby();
    } else if (message.data.name === PRAGMATIC_GAME_EVENT_TYPE.RESULT_SHOWN) {
      // Animation complete and spin result shown to the user - opportune to update balance now
      return;
    }
  }

  extractEventId(data: any) {
    return data.method;
  }
}
