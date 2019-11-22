// @flow

import {
  type IframeGameLaunchData,
  type NetentGameLaunchData,
  type GameRef,
} from "./types";

const TOP_LISTS_URL = "";

export class BaseGame {
  gameRef: GameRef;
  gameData: IframeGameLaunchData | NetentGameLaunchData;

  constructor(
    gameData: IframeGameLaunchData | NetentGameLaunchData,
    gameRef: GameRef
  ) {
    this.gameData = gameData;
    this.gameRef = gameRef;
  }

  get lobbyUrl() {
    const { protocol, host } = window.top.location;

    return `${protocol}//${host}/${TOP_LISTS_URL}`;
  }

  get element() {
    return "div";
  }

  get props() {
    return {
      ref: this.gameRef,
    };
  }

  onMount() {}

  onUnmount() {}

  pauseGame(): Promise<void> {
    return Promise.resolve();
  }

  resumeGame() {}
}
