// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class YggdrasilGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = "game/pause";
    this.api.commands.resume = "game/resume";
    this.api.features.instantPause = true;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobby=${super.lobbyUrl}`,
      };
    }

    return super.componentProps;
  }
}
