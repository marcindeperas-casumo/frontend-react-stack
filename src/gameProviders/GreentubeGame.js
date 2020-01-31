// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

// TODO:
// back to lobby hardcoded in backend

export class GreentubeGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = "AUTOPLAYOFF:";
    this.api.commands.resume = "AUTOPLAYTOGGLE:";
    this.api.events.onGameRoundStart = "GAME_MODE:SPINNING";
    this.api.events.onGameRoundEnd = "GAME_MODE:READY";
  }
}
