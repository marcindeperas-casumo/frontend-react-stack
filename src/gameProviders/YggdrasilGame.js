// @flow
import type { GameLaunchData, GameRef } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class YggdrasilGame extends BaseIframeGame {
  constructor(gameData: GameLaunchData, gameRef: GameRef) {
    super(gameData, gameRef);
    this.api.commands.pause = "game/pause";
    this.api.commands.resume = "game/resume";
    this.api.features.instantPause = true;
  }

  get props() {
    if (this.gameData && this.gameData.url) {
      return {
        ...super.props,
        src: `${this.gameData.url}&lobby=${super.lobbyUrl}`,
      };
    }

    return super.props;
  }
}
