import type { GameProviderModelProps, IframeMessageEvent } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { COMMANDS, EVENTS } from "./PlayNGoGame.constants";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";
import { appendToGameUrl } from "./utils";

export class PlayNGoMobileGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.ON_GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.ON_GAME_ROUND_END;
    this.targetDomain = props.origin || window.location.origin;

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);
    const encodedOrigin = encodeURIComponent(this.targetDomain);

    if (url) {
      const paramsToAdd = [
        { key: "iframeoverlay", value: encodedEventBubblerUrl },
        { key: "origin", value: encodedOrigin },
      ];
      if (!isEmbedded) {
        // eslint-disable-next-line fp/no-mutating-methods
        paramsToAdd.push({ key: "lobby", value: encodedLobbyUrl });
      }
      return {
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd,
        }),
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
