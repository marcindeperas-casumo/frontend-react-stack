import { BaseIframeGame } from "./BaseIframeGame";

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
        src: `${url}&parentOrigin=${urlData.origin}`,
      };
    }

    return super.componentProps;
  }
}
