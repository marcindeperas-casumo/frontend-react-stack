// @flow
import logger from "Services/logger";
import { tryLaunchGame } from "./netentGameinclusionApi";
import { BaseGame } from "./BaseGame";

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
      liveCasinoHost = null,
      casinoId = null,
      staticServer = "",
      gameServer = "",
      lang = "",
    } = this.props.gameData;

    return {
      gameId,
      sessionId,
      liveCasinoHost,
      casinoId,
      staticServer: decodeURIComponent(staticServer),
      gameServerURL: decodeURIComponent(gameServer),
      lobbyURL: "#",
      language: lang,
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
    super.onMount();

    tryLaunchGame(
      this.props.environment,
      this.config,
      (extend: Extend) => {
        this.extend = extend;
        this.setupEvents(extend);
      },
      (error: {}) => {
        logger.error("Cannot load game", {
          provider: "NETENT",
          error,
          config: this.config,
        });
      }
    );
  }

  onUnmount() {
    super.onUnmount();

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
