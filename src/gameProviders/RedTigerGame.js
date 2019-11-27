// @flow
import type { GameLaunchData, GameRef } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class RedTigerGame extends BaseIframeGame {
  constructor(gameData: GameLaunchData, gameRef: GameRef) {
    super(gameData, gameRef);
    this.api.commands.pause = { type: "popupDisplayed" };
    this.api.commands.resume = { type: "popupClosed" };
    this.api.features.instantPause = true;
  }
}
