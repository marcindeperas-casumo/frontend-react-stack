// @flow

import type { GameLaunchData, GameRef } from "./types";

const TOP_LISTS_URL = "";

export class BaseGame {
  gameRef: GameRef;
  gameData: GameLaunchData;

  constructor(gameData: GameLaunchData, gameRef: GameRef) {
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
