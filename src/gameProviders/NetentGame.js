// @flow
import logger from "Services/logger";
import { ENVIRONMENTS } from "Src/constants";
import { injectScript } from "Utils";
import { BaseGame } from "./BaseGame";

export const NETENT_SCRIPT_URL = {
  [ENVIRONMENTS.TEST]:
    "https://casumo-static-test.casinomodule.com/gameinclusion/library/gameinclusion.js",
  [ENVIRONMENTS.PRODUCTION]:
    "https://casumo-static.casinomodule.com/gameinclusion/library/gameinclusion.js",
};

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

const NETENT_EVENTS = {
  BACK_TO_LOBBY: "goToLobby",
  PAUSE_AUTOPLAY: "pauseAutoplay",
  RESUME_AUTOPLAY: "resumeAutoplay",
  GAME_ROUND_STARTED: "gameRoundStarted",
  GAME_ROUND_ENDED: "gameRoundEnded",
};

const ELEMENT_ID = "netent-game";

export class NetentGame extends BaseGame {
  extend: ?Extend = null;

  get componentProps() {
    return {
      id: ELEMENT_ID,
      ref: this.props.gameRef,
    };
  }

  get config() {
    const {
      gameId = null,
      sessionId = null,
      staticServer = "",
      gameServer = "",
    } = this.props.gameData;
    return {
      gameId: gameId,
      sessionId: sessionId,
      staticServer: decodeURIComponent(staticServer),
      gameServerURL: decodeURIComponent(gameServer),
      lobbyURL: "#",
      language: this.props.language,
      width: "100%",
      height: "100%",
      enforceRatio: false,
      targetElement: ELEMENT_ID,
      launchType: "iframe",
      applicationType: "browser",
    };
  }

  setupEvents(extend: Extend) {
    extend.addEventListener(
      NETENT_EVENTS.BACK_TO_LOBBY,
      this.goToLobby.bind(this)
    );
    extend.addEventListener(
      NETENT_EVENTS.GAME_ROUND_STARTED,
      this.setGameAsActive.bind(this)
    );
    extend.addEventListener(
      NETENT_EVENTS.GAME_ROUND_ENDED,
      this.setGameAsIdle.bind(this)
    );
  }

  teardownEvents(extend: Extend) {
    extend.removeEventListener(NETENT_EVENTS.BACK_TO_LOBBY);
    extend.removeEventListener(NETENT_EVENTS.GAME_ROUND_STARTED);
    extend.removeEventListener(NETENT_EVENTS.GAME_ROUND_ENDED);
  }

  onMount() {
    injectScript(NETENT_SCRIPT_URL[this.props.environment]).then(() => {
      netent.launch(
        this.config,
        (extend: Extend) => {
          this.extend = extend;
          this.setupEvents(extend);
        },
        (error: {}) => {
          logger.error("Cannot load game", { error });
        }
      );
    });
  }

  onUnmount() {
    if (this.extend) {
      this.teardownEvents(this.extend);
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
        this.extend.call(NETENT_EVENTS.PAUSE_AUTOPLAY, [], onSuccess, onError);
      } else {
        reject();
      }
    });
  }

  resumeGame() {
    const onSuccess = () => {};
    const onError = () => {};

    if (this.extend) {
      this.extend.call(NETENT_EVENTS.RESUME_AUTOPLAY, [], onSuccess, onError);
    }
  }
}
