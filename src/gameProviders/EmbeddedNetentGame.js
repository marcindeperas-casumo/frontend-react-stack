import { BaseIframeGame } from "./BaseIframeGame";
import { appendLobbyUrl } from "./utils";

export class EmbeddedNetentGame extends BaseIframeGame {
  get componentProps() {
    const { url } = this.props.gameData;
    const urlData = new URL(url);

    window.addEventListener("message", message => {
      //todo: add message handler
    });

    if (url) {
      return {
        ...super.componentProps,
        src: appendLobbyUrl({
          url,
          paramsToAdd: [{ key: "parentOrigin", value: urlData.origin }],
        }),
      };
    }

    return super.componentProps;
  }
}
