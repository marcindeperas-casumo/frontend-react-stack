// @flow
import { BaseIframeGame } from "./BaseIframeGame";
import { appendToGameUrl } from "./utils";

export class NyxGame extends BaseIframeGame {
  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: !isEmbedded
          ? appendToGameUrl({
              url,
              paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
            })
          : "",
      };
    }

    return super.componentProps;
  }
}
