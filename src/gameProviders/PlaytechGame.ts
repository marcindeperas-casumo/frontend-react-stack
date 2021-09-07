import * as R from "ramda";
import type { GameProviderModelProps, IframeMessageEvent } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { appendToGameUrl } from "./utils";

type PLAYTECH_GAME_FEATURES =
  | "closegame"
  | "sound"
  | "pause"
  | "openpage"
  | "switchmode"
  | "balanceupdate"
  | "betupdate"
  | "errors"
  | "autoplay"
  | "displaystatus"
  | "switchgame"
  | "gamechange"
  | "gameround"
  | "loadingstatus"
  | "native_opensuite"
  | "balancerefresh";

const handledFeatures: Array<PLAYTECH_GAME_FEATURES> = [
  "pause",
  "gameround",
  "autoplay",
];
const SUPPORTED_API_VERSION = "1.0.0";
export const PLAYTECH_GAME_EVENT_TYPE = {
  INITIALIZATION_REQUEST: "ucip.basic.g2wInitializationRequest",
  INITIALIZATION_RESPONSE: "ucip.basic.w2gInitializationResponse",
  GAME_ROUND_STARTED: "ucip.gameround.g2wGameRoundStartNotification",
  GAME_ROUND_ENDED: "ucip.gameround.g2wGameRoundEndNotification",
  AUTOPLAY_STARTED: "ucip.autoplay.g2wAutoplayStartNotification",
  AUTOPLAY_ENDED: "ucip.autoplay.g2wAutoplayEndNotification",
  INTERRUPT_AUTOPLAY: "ucip.autoplay.w2gInterruptGameplayCommand",
  PAUSE: "ucip.basic.w2gPauseCommand",
  GO_TO_LOBBY: "ucip.basic.g2wCloseGameFrameCommand",
} as const;

/**
 * Integration was tested on blazing-bells and buffalo-blitz-2
 */
export class PlaytechGame extends BaseIframeGame {
  autoplayActive: boolean = false;

  constructor(props: GameProviderModelProps) {
    super(props);

    this.targetDomain = "*";
    this.api.events = {
      onGameRoundStart: { _type: PLAYTECH_GAME_EVENT_TYPE.GAME_ROUND_STARTED },
      onGameRoundEnd: { _type: PLAYTECH_GAME_EVENT_TYPE.GAME_ROUND_ENDED },
    };
    this.api.commands = {
      pause: { _type: PLAYTECH_GAME_EVENT_TYPE.PAUSE, pause: true },
      resume: { _type: PLAYTECH_GAME_EVENT_TYPE.PAUSE, pause: false },
    };
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd: [
            { key: "integration", value: "ucip" },
            { key: "lobbyUrl", value: encodedLobbyUrl },
          ],
        }),
      };
    }

    return super.componentProps;
  }

  messageGuard(event: IframeMessageEvent) {
    if (this.targetDomain === "*" || event.origin === this.targetDomain) {
      this.onMessageHandler(event);
    }
  }

  parseMessageData(data: any) {
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  }

  extractEventId(data: any) {
    return data?._type;
  }

  postMessage(data: any) {
    const { current: gameElement } = this.props.gameRef;

    if (gameElement instanceof HTMLIFrameElement) {
      gameElement.contentWindow.postMessage(data, this.targetDomain);
    }
  }

  setGameAsIdle() {
    if (!this.autoplayActive) {
      super.setGameAsIdle();
    }
  }

  pauseGame() {
    const { current: gameElement } = this.props.gameRef;

    if (this.autoplayActive) {
      return new Promise<void>((resolve, reject) => {
        this.postMessage({
          _type: PLAYTECH_GAME_EVENT_TYPE.INTERRUPT_AUTOPLAY,
        });

        if (this.isGameIdle) {
          resolve();
        } else if (gameElement instanceof HTMLIFrameElement) {
          this.resolveOnIdle(gameElement, resolve);
        } else {
          resolve();
        }
      });
    }

    return super.pauseGame();
  }

  onMessageHandler(message: {
    data: string; // stringified object
    origin: string;
  }) {
    const data = this.parseMessageData(message.data);
    const eventId = this.extractEventId(data);

    if (!eventId) {
      return;
    }

    // eslint-disable-next-line no-switch-statements/no-switch
    switch (eventId) {
      case PLAYTECH_GAME_EVENT_TYPE.INITIALIZATION_REQUEST: {
        return this.postMessage({
          _type: PLAYTECH_GAME_EVENT_TYPE.INITIALIZATION_RESPONSE,
          version: SUPPORTED_API_VERSION,
          features: R.intersection(handledFeatures, data.features),
        });
      }
      case PLAYTECH_GAME_EVENT_TYPE.AUTOPLAY_ENDED: {
        this.autoplayActive = false;
        break;
      }
      case PLAYTECH_GAME_EVENT_TYPE.AUTOPLAY_STARTED: {
        this.autoplayActive = true;
      }
      case PLAYTECH_GAME_EVENT_TYPE.GAME_ROUND_STARTED: { // eslint-disable-line no-fallthrough, prettier/prettier
        return this.setGameAsActive();
      }
      case PLAYTECH_GAME_EVENT_TYPE.GAME_ROUND_ENDED: {
        return this.setGameAsIdle();
      }
      case PLAYTECH_GAME_EVENT_TYPE.GO_TO_LOBBY: {
        return this.goToLobby();
      }
    }
  }
}
