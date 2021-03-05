import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";
import { appendToGameUrl } from "./utils";

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

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type 'GameLaunchD... Remove this comment to see the full error message
    const { url = null, isEmbedded } = this.props.gameData;
    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      const paramsToAdd = [
        { key: "fullscreen", value: "false" },
        { key: "rcenable", value: "true" },
      ];
      if (!isEmbedded) {
        // eslint-disable-next-line fp/no-mutating-methods
        paramsToAdd.push({
          key: "homeurl",
          value: encodedLobbyUrl,
        });
      }
      return {
        // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
        ...super.componentProps,
        src: !isEmbedded
          ? appendToGameUrl({
              url,
              paramsToAdd,
            })
          : "",
      };
    }

    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.method;
  }
}
