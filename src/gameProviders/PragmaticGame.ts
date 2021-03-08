import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";
import { appendToGameUrl } from "./utils";

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

export type PragmaticGameEventTypeLiteral = ValueOf<
  typeof PRAGMATIC_GAME_EVENT_TYPE
>;

type PragmaticGameMessage = {
  data: {
    name?: PragmaticGameEventTypeLiteral;
    data?: { type?: string };
  };
  origin: string;
};

export class PragmaticGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.events.onGameRoundStart =
      PRAGMATIC_GAME_EVENT_TYPE.GAME_ROUND_STARTED;
    this.api.events.onGameRoundEnd = PRAGMATIC_GAME_EVENT_TYPE.RESULT_SHOWN;
    this.api.features.instantPause = false;

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type 'GameLaunchD... Remove this comment to see the full error message
    const { url = null } = this.props.gameData;
    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
        }),
      };
    }

    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    return super.componentProps;
  }

  onMessageHandler(message: PragmaticGameMessage) {
    super.onMessageHandler(message);

    if (message.data.name) {
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
    return data.name;
  }
}
