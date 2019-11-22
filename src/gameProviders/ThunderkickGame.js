// @flow

import {
  type IframeGameLaunchData,
  type NetentGameLaunchData,
  type GameRef,
} from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class ThunderkickGame extends BaseIframeGame {
  constructor(
    gameData: IframeGameLaunchData | NetentGameLaunchData,
    gameRef: GameRef
  ) {
    super(gameData, gameRef);
    this.api.commands.pause = { eventid: "pausegame" };
    this.api.commands.resume = { eventid: "resumegame" };
    this.api.features.instantPause = true;
  }

  get props() {
    const baseProps = super.props;

    return {
      ...baseProps,
      src: `${baseProps.src}&lobbyUrl=${super.lobbyUrl}`,
    };
  }
}
