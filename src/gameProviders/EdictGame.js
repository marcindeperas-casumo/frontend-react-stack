// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";

export const COMMANDS = {
  PAUSE: "pauseGame",
  RESUME: "resumeGame",
};

export const EVENTS = {
  GAME_ROUND_START: "gameRoundStarted",
  GAME_ROUND_END: "gameRoundEnded",
};

export class EdictGame extends BaseIframeGame {
  gameWrapperClasses = ["u-safe-area-inset-left"];

  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.features.instantPause = true;
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;

    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.MANAGED;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}${!isEmbedded ? `&referrerUrl=${encodedLobbyUrl}` : ""}`,
      };
    }

    return super.componentProps;
  }
}
