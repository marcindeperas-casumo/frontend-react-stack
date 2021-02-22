// @flow
import { BaseIframeGame } from "./BaseIframeGame";
import { appendLobbyUrl } from "./utils";

export class NyxGame extends BaseIframeGame {
  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: !isEmbedded
          ? appendLobbyUrl({
              url,
              paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
            })
          : "",
      };
    }

    return super.componentProps;
  }
}
