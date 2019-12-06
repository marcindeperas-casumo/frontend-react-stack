// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class RedTigerGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = { type: "popupDisplayed" };
    this.api.commands.resume = { type: "popupClosed" };
    this.api.features.instantPause = true;
  }
}
