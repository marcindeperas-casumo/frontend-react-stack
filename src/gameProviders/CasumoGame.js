// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

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
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${encodedLobbyUrl}&iframeUrl=${encodedEventBubblerUrl}`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.event;
  }
}
