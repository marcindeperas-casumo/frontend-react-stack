// @flow

import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class ThunderkickGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = { eventid: "pausegame" };
    this.api.commands.resume = { eventid: "resumegame" };
    this.api.features.instantPause = true;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${super.lobbyUrl}`,
      };
    }

    return super.componentProps;
  }
}
