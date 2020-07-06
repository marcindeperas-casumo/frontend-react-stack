// @flow
import { ENVIRONMENTS } from "Src/constants";
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export const TARGET_DOMAINS = {
  [ENVIRONMENTS.TEST]: "https://mobile32.gameassists.co.uk",
  [ENVIRONMENTS.PRODUCTION]: "https://mobile2.gameassists.co.uk",
};

export const COMMANDS = {
  PAUSE: "StopGamePlay",
};

export const EVENTS = {
  GAME_ROUND_START: { event: "gameBusy" },
  GAME_ROUND_END: { event: "gameNotBusy" },
};

export class MicrogamingGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
    this.targetDomain = TARGET_DOMAINS[this.props.environment];
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
    return data.event;
  }
}
