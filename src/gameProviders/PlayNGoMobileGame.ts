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
    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);
    const encodedEventBubblerUrl = encodeURIComponent(super.eventBubblerUrl);
    const encodedOrigin = encodeURIComponent(this.origin);

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

    if (
      this.extractEventId(event.data) ===
      this.extractEventId(EVENTS.ON_BACK_TO_LOBBY)
    ) {
      // When you press the lobby button in the game, the game will logout and
      // be destroyed but not redirected, we have to handle this on mobile
      this.goToLobby();
    }
  }

  extractEventId(data: any) {
    return data.type;
  }

  onMount() {
    super.onMount();
    const { current: gameElement } = this.props.gameRef;

    gameElement?.addEventListener("load", event => {
      if (!(gameElement instanceof HTMLIFrameElement)) {
        return;
      }

      [
        EVENTS.ON_GAME_ROUND_START,
        EVENTS.ON_GAME_ROUND_END,
        EVENTS.ON_BACK_TO_LOBBY,
      ].forEach(({ type }) => {
        gameElement.contentWindow.postMessage(
          {
            messageType: "addEventListener",
            eventType: type,
          },
          this.targetDomain
        );
      });
    });
  }
}
