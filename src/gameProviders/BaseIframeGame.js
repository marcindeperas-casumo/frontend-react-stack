// @flow

import { equals } from "ramda";
import logger from "Services/logger";
import { BaseGame } from "./BaseGame";
import type { IframeGameApi } from "./types";

export const IFRAME_ID = "casumo-game";

export class BaseIframeGame extends BaseGame {
  targetDomain: string = "*";
  api: IframeGameApi = {
    commands: {
      pause: null,
      resume: null,
    },
    events: {
      onPauseEnded: null,
      onGameRoundStart: null,
      onGameRoundEnd: null,
    },
    features: {
      instantPause: false,
    },
  };

  get componentTag() {
    return "iframe";
  }

  get componentProps() {
    return {
      ...super.componentProps,
      allow: "autoplay",
      style: {
        width: "100%",
        height: "100%",
        border: 0,
      },
      src: this.props.gameData.url || "",
      title: IFRAME_ID,
      id: IFRAME_ID,
    };
  }

  pauseGame() {
    const { current: gameElement } = this.props.gameRef;
    const { pause: pauseCommand } = this.api.commands;
    const { onPauseEnded } = this.api.events;
    const { instantPause } = this.api.features;

    return new Promise<void>((resolve, reject) => {
      if (!pauseCommand) {
        reject();
      }

      const onPauseMessageHandler = (event: MessageEvent) => {
        if (equals(event.data, onPauseEnded)) {
          window.removeEventListener("message", onPauseMessageHandler);
          resolve();
        }
      };

      if (!instantPause) {
        window.addEventListener("message", onPauseMessageHandler);
      }

      if (gameElement instanceof HTMLIFrameElement) {
        gameElement.contentWindow.postMessage(pauseCommand, this.targetDomain);
        instantPause && resolve();
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
}
