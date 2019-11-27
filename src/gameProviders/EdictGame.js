// @flow

import type { GameLaunchData, GameRef } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class EdictGame extends BaseIframeGame {
  constructor(gameData: GameLaunchData, gameRef: GameRef) {
    super(gameData, gameRef);
    this.api.features.instantPause = true;
    this.api.commands.pause = "pauseGame";
    this.api.commands.resume = "resumeGame";
  }

  get props() {
    if (this.gameData && this.gameData.url) {
      return {
        ...super.props,
        src: `${this.gameData.url}&referrerUrl=${super.lobbyUrl}`,
      };
    }

    return super.props;
  }
}
