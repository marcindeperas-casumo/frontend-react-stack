// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class MahjongGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.targetDomain = window.location.origin;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${encodedLobbyUrl}`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.method;
  }
}
