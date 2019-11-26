// @flow

import { equals } from "ramda";
import logger from "Services/logger";
import { BaseGame } from "./BaseGame";

type IframeGameAPI = {
  commands: {
    pause: ?string | ?{},
    resume: ?string | ?{},
  },
  events: {
    onPauseEnded: ?string | ?{},
  },
  features: {
    instantPause: boolean,
  },
};

export class BaseIframeGame extends BaseGame {
  targetDomain: string = "*";
  api: IframeGameAPI = {
    commands: {
      pause: null,
      resume: null,
    },
    events: {
      onPauseEnded: null,
    },
    features: {
      instantPause: false,
    },
  };

  get element() {
    return "iframe";
  }

  get props() {
    return {
      ...super.props,
      allow: "autoplay",
      style: {
        width: "100%",
        height: "100%",
        border: 0,
      },
      src: this.gameData.url || "",
      title: "casumo-game",
    };
  }

  pauseGame() {
    return new Promise<void>((resolve, reject) => {
      if (!this.api.commands.pause) {
        reject();
      }

      const onPauseMessageHandler = (event: MessageEvent) => {
        if (equals(event.data, this.api.events.onPauseEnded)) {
          window.removeEventListener("message", onPauseMessageHandler);
          resolve();
        }
      };

      if (!this.api.features.instantPause) {
        window.addEventListener("message", onPauseMessageHandler);
      }

      if (
        this.gameRef.current &&
        this.gameRef.current instanceof HTMLIFrameElement
      ) {
        this.gameRef.current.contentWindow.postMessage(
          this.api.commands.pause,
          this.targetDomain
        );
        this.api.features.instantPause && resolve();
      } else {
        logger.error("Iframe reference not provided. PostMessage disabled");
        reject();
      }
    });
  }

  resumeGame() {
    if (
      this.api.commands.resume &&
      this.gameRef.current &&
      this.gameRef.current instanceof HTMLIFrameElement
    ) {
      this.gameRef.current.contentWindow.postMessage(
        this.api.commands.resume,
        this.targetDomain
      );
    }
  }
}
