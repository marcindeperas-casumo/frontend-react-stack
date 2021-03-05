import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";
import { appendToGameUrl } from "./utils";

export const COMMANDS = {
  PAUSE: "AUTOPLAYOFF:",
  RESUME: "AUTOPLAYTOGGLE:",
};

export const EVENTS = {
  GAME_ROUND_START: "GAME_MODE:SPINNING",
  GAME_ROUND_END: "GAME_MODE:READY",
};

export class GreentubeGame extends BaseIframeGame {
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
      return {
        // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
        ...super.componentProps,
        src: !isEmbedded
          ? appendToGameUrl({
              url,
              paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
            })
          : "",
        sandbox: "allow-scripts allow-same-origin allow-top-navigation",
      };
    }

    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    return super.componentProps;
  }
}
