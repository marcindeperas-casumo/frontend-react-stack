// @flow
import type { GameLaunchData, GameRef } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class YggdrasilGame extends BaseIframeGame {
  constructor(gameData: GameLaunchData, gameRef: GameRef) {
    super(gameData, gameRef);
    this.api.commands.pause = "game/pause";
    this.api.commands.resume = "game/resume";
    this.api.features.instantPause = true;
  }

  get props() {
    const superProps = super.props;

    return {
      ...superProps,
      src: `${superProps.src}&lobby=${super.lobbyUrl}`,
    };
  }
}
