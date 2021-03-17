import logger from "Services/logger";
import type { GameProviderModelProps } from "./types";
import { tryLaunchGame } from "./netentGameinclusionApi";
import { BaseGame } from "./BaseGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";

declare const netent: { launch: Function }; // eslint-disable-line no-unused-vars

type Extend = {
  addEventListener: (
    command: string,
    successCallback: () => void,
    errorCallback?: () => void
  ) => void;
  removeEventListener: (command: string) => void;
  call: (
    command: string,
    args: Array<string>,
    successCallback: () => void,
    errorCallback?: () => void
  ) => void;
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
  extend: Extend | null = null;

  constructor(props: GameProviderModelProps) {
    super(props);

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    return {
      id: ELEMENT_ID,
      ref: this.props.gameRef,
    };
  }

  get config() {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'gameId' does not exist on type 'GameLaun... Remove this comment to see the full error message
      gameId = null,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sessionId' does not exist on type 'GameL... Remove this comment to see the full error message
      sessionId = null,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'liveCasinoHost' does not exist on type '... Remove this comment to see the full error message
      liveCasinoHost = null,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'casinoId' does not exist on type 'GameLa... Remove this comment to see the full error message
      casinoId = null,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'staticServer' does not exist on type 'Ga... Remove this comment to see the full error message
      staticServer = "",
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'gameServer' does not exist on type 'Game... Remove this comment to see the full error message
      gameServer = "",
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'lang' does not exist on type 'GameLaunch... Remove this comment to see the full error message
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

    if (this && this.extend) {
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
      if (this && this.extend) {
        this.extend.call(NETENT_EVENTS.PAUSE_AUTOPLAY, [], onSuccess, onError);
      } else {
        reject();
      }
    });
  }

  resumeGame() {
    const onSuccess = () => {};
    const onError = () => {};

    if (this && this.extend) {
      this.extend.call(NETENT_EVENTS.RESUME_AUTOPLAY, [], onSuccess, onError);
    }
  }
}
