// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_INDICATOR } from "./constants";

export const COMMANDS = {
  PAUSE: { eventid: "pausegame" },
  RESUME: { eventid: "resumegame" },
};

export const EVENTS = {
  GAME_ROUND_START: { eventid: "roundstarted" },
  GAME_ROUND_END: { eventid: "roundended" },
};

export class ThunderkickGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
    this.api.features.instantPause = true;

    this.gameActivityStatusIndicator = GAME_ACTIVITY_STATUS_INDICATOR.MANAGED;
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

  parseMessageData(data: any) {
    return JSON.parse(data);
  }

  extractEventId(data: any) {
    return data.eventid;
  }
}
