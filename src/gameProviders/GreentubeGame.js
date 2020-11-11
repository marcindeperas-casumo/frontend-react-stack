// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_INDICATOR } from "./constants";

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

    this.gameActivityStatusIndicator = GAME_ACTIVITY_STATUS_INDICATOR.MANAGED;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${!isEmbedded ? `&lobbyUrl=${encodedLobbyUrl}` : ""}`,
        sandbox: "allow-scripts allow-same-origin allow-top-navigation",
      };
    }

    return super.componentProps;
  }
}
