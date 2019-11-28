// @flow
import logger from "Services/logger";
import { injectScript } from "Utils";
import { BaseGame } from "./BaseGame";

export const NETENT_SCRIPT_URL =
  "https://casumo-static.casinomodule.com/gameinclusion/library/gameinclusion.js";

declare var netent: { launch: Function };

type Extend = {
  addEventListener: (
    command: string,
    successCallback: () => void,
    errorCallback?: () => void
  ) => {},
  removeEventListener: (command: string) => {},
  call: (
    command: string,
    args: Array<string>,
    successCallback: () => void,
    errorCallback?: () => void
  ) => {},
};

export class NetentGame extends BaseGame {
  extend: ?Extend = null;

  get props() {
    return {
      id: "netent-game",
      ref: this.gameRef,
    };
  }

  get config() {
    return {
      gameId: this.gameData.gameId || null,
      sessionId: this.gameData.sessionId || null,
      staticServer: decodeURIComponent(this.gameData.staticServer || ""),
      gameServerURL: decodeURIComponent(this.gameData.gameServer || ""),
      lobbyURL: "#",
      language: "en",
      width: "100%",
      height: "100%",
      enforceRatio: false,
      targetElement: "netent-game",
      launchType: "iframe",
      applicationType: "browser",
    };
  }

  goToLobby() {
    window.location.replace(super.lobbyUrl);
  }

  onMount() {
    injectScript(NETENT_SCRIPT_URL).then(() => {
      netent.launch(
        this.config,
        (extend: Extend) => {
          this.extend = extend;
          this.extend.addEventListener("goToLobby", this.goToLobby);
        },
        (error: {}) => {
          logger.error("Cannot load game", { error });
        }
      );
    });
  }

  onUnmount() {
    if (this.extend) {
      this.extend.removeEventListener("goToLobby");
    }
  }

  pauseGame() {
    return new Promise<void>((resolve, reject) => {
      const onSuccess = () => {
        resolve();
      };
      const onError = () => {
        reject();
      };
      if (this.extend) {
        this.extend.call("pauseAutoplay", [], onSuccess, onError);
      } else {
        reject();
      }
    });
  }

  resumeGame() {
    const onSuccess = () => {};
    const onError = () => {};

    if (this.extend) {
      this.extend.call("resumeAutoplay", [], onSuccess, onError);
    }
  }
}
