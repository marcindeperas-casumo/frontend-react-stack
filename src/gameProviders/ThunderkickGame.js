// @flow

import type { GameLaunchData, GameRef } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class ThunderkickGame extends BaseIframeGame {
  constructor(gameData: GameLaunchData, gameRef: GameRef) {
    super(gameData, gameRef);
    this.api.commands.pause = { eventid: "pausegame" };
    this.api.commands.resume = { eventid: "resumegame" };
    this.api.features.instantPause = true;
  }

  get props() {
    if (this.gameData && this.gameData.url) {
      return {
        ...super.props,
        src: `${this.gameData.url}&lobbyUrl=${super.lobbyUrl}`,
      };
    }

    return super.props;
  }
}
