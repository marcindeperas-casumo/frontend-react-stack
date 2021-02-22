import { BaseIframeGame } from "./BaseIframeGame";
import { appendToGameUrl } from "./utils";

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
        src: appendToGameUrl({
          url,
          paramsToAdd: [{ key: "parentOrigin", value: urlData.origin }],
        }),
      };
    }

    return super.componentProps;
  }
}
