// @flow
import type { GameProviderModelProps, IframeMessageEvent } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class PlayNGoGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = { req: "gameDisable" };
    this.api.commands.resume = { req: "gameEnable" };
    this.api.events.onGameRoundStart = { type: "roundStarted" };
    this.api.events.onGameRoundEnd = { type: "gameIdle" };
    this.targetDomain = window.location.origin;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);
    const encodedOrigin = encodeURIComponent(window.location.origin);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobby=${encodedLobbyUrl}&iframeoverlay=${encodedEventBubblerUrl}&origin=${encodedOrigin}`,
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
      gameElement.contentWindow.postMessage(
        {
          addEvent: "roundStarted",
        },
        "*"
      );
      gameElement.contentWindow.postMessage(
        {
          addEvent: "gameIdle",
        },
        "*"
      );
    }
  }

  extractEventId(data: any) {
    return data.type;
  }
}
