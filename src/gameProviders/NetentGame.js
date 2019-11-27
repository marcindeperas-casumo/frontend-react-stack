// @flow
import logger from "Services/logger";
import { BaseGame } from "./BaseGame";

export const NETENT_SCRIPT_URL =
  "https://casumo-static.casinomodule.com/gameinclusion/library/gameinclusion.js";

declare var netent: { launch: Function };

type Extend = {
  addEventListener: Function,
  removeEventListener: Function,
  call: Function,
};

const addScript = (src: string, callback: Function) => {
  const script = document.createElement("script");
  script.setAttribute("src", src);
  // eslint-disable-next-line fp/no-mutation
  script.onload = callback;
  document.body && document.body.appendChild(script);
};

export class NetentGame extends BaseGame {
  extend: ?Extend = null;
  addScript = addScript;

  get props() {
    return {
      id: "netent-game",
      ref: this.gameRef,
    };
  }

  get config() {
    return {
      gameId: this.gameData.gameId || "",
      sessionId: this.gameData.sessionId || "",
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
    this.addScript(NETENT_SCRIPT_URL, () => {
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
    this.extend && this.extend.removeEventListener("goToLobby");
  }

  pauseGame() {
    this.extend && this.extend.call("pauseAutoplay", [], () => {}, () => {});
    return Promise.resolve();
  }

  resumeGame() {
    this.extend && this.extend.call("resumeAutoplay", [], () => {}, () => {});
  }
}
