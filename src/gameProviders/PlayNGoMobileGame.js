// @flow
import type { GameProviderModelProps, IframeMessageEvent } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { COMMANDS, EVENTS } from "./PlayNGoGame.constants";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";

export class PlayNGoMobileGame extends BaseIframeGame {
  swipeUpToPlayPanelPossible = false;

  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.ON_GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.ON_GAME_ROUND_END;
    this.targetDomain = window.location.origin;

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.MANAGED;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);
    const encodedOrigin = encodeURIComponent(window.location.origin);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${
          !isEmbedded ? `&lobby=${encodedLobbyUrl}` : ""
        }&iframeoverlay=${encodedEventBubblerUrl}&origin=${encodedOrigin}`,
      };
    }

    return super.componentProps;
  }

  onMessageHandler(event: IframeMessageEvent) {
    super.onMessageHandler(event);

    const { current: gameElement } = this.props.gameRef;

    if (
      gameElement instanceof HTMLIFrameElement &&
      event.data.type === "initialized"
    ) {
      gameElement.contentWindow.postMessage({ addEvent: "roundStarted" }, "*");
      gameElement.contentWindow.postMessage({ addEvent: "gameIdle" }, "*");
      gameElement.contentWindow.postMessage({ addEvent: "backToLobby" }, "*");
    }

    if (
      gameElement instanceof HTMLIFrameElement &&
      event.data.type === "backToLobby"
    ) {
      this.goToLobby();
    }
  }

  extractEventId(data: any) {
    return data.type;
  }
}
