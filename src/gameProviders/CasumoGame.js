// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY } from "./constants";

export const COMMANDS = {
  PAUSE: {
    event: "game/pause",
    data: "",
  },
  RESUME: {
    event: "game/resume",
    data: "",
  },
};

export const EVENTS = {
  GAME_ROUND_START: "game-action/started",
  GAME_ROUND_END: "round/animation/ended",
};

export class CasumoGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.features.instantPause = true;
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;

    this.gameActivity = GAME_ACTIVITY.MANAGED;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${
          !isEmbedded ? `&lobbyUrl=${encodedLobbyUrl}` : ""
        }&iframeUrl=${encodedEventBubblerUrl}`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.event;
  }
}
