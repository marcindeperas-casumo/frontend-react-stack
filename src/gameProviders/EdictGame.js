// @flow

import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class EdictGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.features.instantPause = true;
    this.api.commands.pause = "pauseGame";
    this.api.commands.resume = "resumeGame";
  }

  get componentProps() {
    // url contains &realityCheckLinkUrl=https://casumo.com/assets/return-from-3rd-party.html?destinationUrl%3D%252Fcash%252Fhistory%252Fbets
    const { url = null } = this.props.gameData;

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&referrerUrl=${super.lobbyUrl}`,
      };
    }

    return super.componentProps;
  }
}
