// @flow
import { BaseIframeGame } from "./BaseIframeGame";

export class NyxGame extends BaseIframeGame {
  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${!isEmbedded ? `&lobbyurl=${encodedLobbyUrl}` : ""}`,
      };
    }

    return super.componentProps;
  }
}
