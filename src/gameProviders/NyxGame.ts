import { BaseIframeGame } from "./BaseIframeGame";
import { appendToGameUrl } from "./utils";

export class NyxGame extends BaseIframeGame {
  get componentProps() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'url' does not exist on type 'GameLaunchD... Remove this comment to see the full error message
    const { url = null, isEmbedded } = this.props.gameData;
    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
        ...super.componentProps,
        src: !isEmbedded
          ? appendToGameUrl({
              url,
              paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
            })
          : "",
      };
    }

    // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
    return super.componentProps;
  }
}
