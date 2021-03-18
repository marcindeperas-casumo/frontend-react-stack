import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";
import { appendToGameUrl } from "./utils";

export class MahjongGame extends BaseIframeGame {
  onLaunchNotifications: Array<string> = ["game_not_under_mga_message"];

  constructor(props: GameProviderModelProps) {
    super(props);
    this.scrolling = "auto";
    this.targetDomain = props.origin || window.location.origin;
    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
        }),
      };
    }

    return super.componentProps;
  }
}
