// @flow

import type { GameLaunchData, GameRef } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class CasumoGame extends BaseIframeGame {
  constructor(gameData: GameLaunchData, gameRef: GameRef) {
    super(gameData, gameRef);
    this.api.features.instantPause = true;
    this.api.commands.pause = {
      event: "game/pause",
      data: "",
    };
    this.api.commands.resume = {
      event: "game/resume",
      data: "",
    };
  }

  get props() {
    if (this.gameData && this.gameData.url) {
      return {
        ...super.props,
        src: `${this.gameData.url}&lobbyUrl=${
          super.lobbyUrl
        }&iframeUrl=http://mobile.dev/en/games/top`,
      };
    }

    return super.props;
  }
}
