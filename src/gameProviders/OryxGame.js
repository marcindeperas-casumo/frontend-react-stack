// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export const COMMANDS = {
  PAUSE: { wpgaction: "doGamePause" },
  RESUME: { wpgaction: "doGameResume" },
};

export const EVENTS = {
  GAME_ROUND_START: { wpgaction: "gameSpinStart" },
  GAME_ROUND_END: { wpgaction: "gameSpinEnd" },
};

const ORYX_EVENTS = {
  BACK_TO_LOBBY: "close",
};

type OryxMessage = {
  data: {
    wpgaction: string,
  },
  origin: string,
};

export class OryxGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
    this.targetDomain = "https://cdn.oryxgaming.com";
  }

  onMessageHandler(message: OryxMessage) {
    super.onMessageHandler(message);

    if (message.data.wpgaction === ORYX_EVENTS.BACK_TO_LOBBY) {
      this.goToLobby();
    }
  }

  extractEventId(data: any) {
    return data.wpgaction;
  }
}
