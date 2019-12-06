// @flow

import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class CasumoGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
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

  get componentProps() {
    const { url = null } = this.props.gameData;

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${
          super.lobbyUrl
        }&iframeUrl=http://mobile.dev/en/games/top`,
      };
    }

    return super.componentProps;
  }
}
