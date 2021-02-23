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
        // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd: [{ key: "parentOrigin", value: urlData.origin }],
        }),
      };
    }

    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    return super.componentProps;
  }
}
