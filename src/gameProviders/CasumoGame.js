// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class CasumoGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.features.instantPause = true;
    this.api.commands.pause = {
      event: "game/pause",
      data: "",
    };
    this.api.commands.resume = {
      event: "game/resume",
      data: "",
    };
    this.api.events.onGameRoundStart = "game-action/started";
    this.api.events.onGameRoundEnd = "round/animation/ended";
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${encodedLobbyUrl}&iframeUrl=${encodedEventBubblerUrl}`,
      };
    }

    return super.componentProps;
  }

  extractEventId(data: any) {
    return data.event;
  }
}
