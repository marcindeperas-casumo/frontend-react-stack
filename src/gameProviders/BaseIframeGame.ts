import { equals } from "ramda";
import logger from "Services/logger";
import { BaseGame } from "./BaseGame";
import type {
  IframeGameApi,
  GameProviderModelProps,
  IframeMessageEvent,
} from "./types";
import { IFRAME_ID, GAME_IDLE_EVENT_NAME } from "./constants";
import { EVENT_BUBBLER_PATH } from "./config";

const DEFAULT_API = {
  commands: {
    pause: null,
    resume: null,
  },
  events: {
    onGameRoundStart: null,
    onGameRoundEnd: null,
  },
  features: {
    instantPause: false,
  },
};

export class BaseIframeGame extends BaseGame {
  scrolling: "no" | "yes" | "auto" = "no";
  targetDomain: string = window.location.origin || "*";
  api: IframeGameApi = DEFAULT_API;

  constructor(props: GameProviderModelProps) {
    super(props);
    const { url = null } = props.gameData;

    if (url) {
      const { origin } = new URL(url);
      this.targetDomain = origin;
    }
  }

  get eventBubblerUrl() {
    return `${this.origin}/${EVENT_BUBBLER_PATH}`;
  }

  get componentTag() {
    return "iframe";
  }

  get componentProps() {
    return {
      // @ts-expect-error ts-migrate(2340) FIXME: Only public and protected methods of the base clas... Remove this comment to see the full error message
      ...super.componentProps,
      allow: "autoplay",
      scrolling: this.scrolling,
      src: this.props.gameData.url || null,
      title: IFRAME_ID,
      id: IFRAME_ID,
    };
  }

  pauseGame() {
    const { current: gameElement } = this.props.gameRef;
    const { pause: pauseCommand } = this.api.commands;

    return new Promise<void>((resolve, reject) => {
      if (!pauseCommand) {
        resolve();
      }
      if (gameElement instanceof HTMLIFrameElement) {
        gameElement.contentWindow.postMessage(pauseCommand, this.targetDomain);

        if (this.api.features.instantPause || this.isGameIdle) {
          resolve();
        } else {
          this.resolveOnIdle(gameElement, resolve);
        }
      } else {
        logger.error("Iframe reference not provided. PostMessage disabled");
        reject();
      }
    });
  }

  resumeGame() {
    const { current: gameElement } = this.props.gameRef;
    const { resume: resumeCommand } = this.api.commands;

    if (resumeCommand && gameElement instanceof HTMLIFrameElement) {
      gameElement.contentWindow.postMessage(resumeCommand, this.targetDomain);
    }
  }

  resolveOnIdle(
    gameElement: HTMLIFrameElement,
    resolve: (result: void) => void
  ) {
    gameElement.addEventListener(GAME_IDLE_EVENT_NAME, function (e: Event) {
      gameElement.removeEventListener(GAME_IDLE_EVENT_NAME, this);
      resolve();
    });
  }

  messageGuard(event: IframeMessageEvent) {
    if (event.origin === this.targetDomain) {
      this.onMessageHandler(event);
    }
  }

  parseMessageData(data: any) {
    return data;
  }

  extractEventId(data: any) {
    return data;
  }

  onMessageHandler(event: IframeMessageEvent) {
    const { onGameRoundStart, onGameRoundEnd } = this.api.events;
    const parsedData = this.parseMessageData(event.data);
    const eventId = this.extractEventId(parsedData);

    if (!onGameRoundStart || !onGameRoundEnd) {
      return;
    }

    if (equals(eventId, this.extractEventId(onGameRoundStart))) {
      this.setGameAsActive();
    }

    if (equals(eventId, this.extractEventId(onGameRoundEnd))) {
      this.setGameAsIdle();
    }
  }

  onMount() {
    super.onMount();
    window.addEventListener("message", this.messageGuard.bind(this));
  }

  onUnmount() {
    super.onUnmount();
    if (this) {
      window.removeEventListener("message", this.messageGuard.bind(this));
    }
  }
}
