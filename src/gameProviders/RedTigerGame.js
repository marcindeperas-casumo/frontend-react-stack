// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

// TODO:
// hardcoded back to lobby in backend
// handle event queue

export class RedTigerGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = { type: "popupDisplayed" };
    this.api.commands.resume = { type: "popupClosed" };
    this.api.events.onGameRoundStart = { type: "playStart" };
    this.api.events.onGameRoundEnd = { type: "playEnd" };
    this.api.features.instantPause = true;
  }

  extractEventId(data: any) {
    return data.type;
  }
}
