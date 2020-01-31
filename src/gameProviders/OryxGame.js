// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

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
    this.api.commands.pause = { wpgaction: "doGamePause" };
    this.api.commands.resume = { wpgaction: "doGameResume" };
    this.api.events.onGameRoundStart = { wpgaction: "gameSpinStart" };
    this.api.events.onGameRoundEnd = { wpgaction: "gameSpinEnd" };
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
