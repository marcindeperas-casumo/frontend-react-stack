// @flow
import * as R from "ramda";
import type { GameCategory } from "Api/api.casinoPlayerGames";

export function isSlotGame(categories: Array<GameCategory>) {
  // slotCategories should be the same as on the backend! see: https://github.com/Casumo/es-slot-sessions/blob/master/domain/src/main/kotlin/com/casumo/es/slotsessions/domain/services/CasinoGamesPort.kt#L12
  const slotCategories: Array<GameCategory> = [
    "BINGO",
    "SLOT_MACHINE",
    "VIDEO_POKER",
  ];

  return R.any(R.anyPass(R.map(R.equals, slotCategories)), categories);
}

export function getSlugFromGamePage(): ?string {
  return (window.location.pathname.match(/\/play\/(.*?)\/launch/) || [])[1];
}
