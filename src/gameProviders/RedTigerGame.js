// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export const COMMANDS = {
  PAUSE: { type: "popupDisplayed" },
  RESUME: { type: "popupClosed" },
};

export const EVENTS = {
  GAME_ROUND_START: { type: "playStart" },
  GAME_ROUND_END: { type: "playEnd" },
};

// TODO:
// hardcoded back to lobby in backend
// handle event queue

export class RedTigerGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
    this.api.features.instantPause = true;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${!isEmbedded ? `&lobbyUrl=${encodedLobbyUrl}` : ""}`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.type;
  }
}
