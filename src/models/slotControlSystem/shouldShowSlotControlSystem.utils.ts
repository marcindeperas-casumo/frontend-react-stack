// @flow
import * as R from "ramda";

export function isSlotGame(category: ?string): boolean {
  // slotCategories should be the same as on the backend! see: https://github.com/Casumo/es-slot-sessions/blob/master/domain/src/main/kotlin/com/casumo/es/slotsessions/domain/services/CasinoGamesPort.kt#L12
  const slotCategories = ["BINGO", "SLOT_MACHINE", "VIDEO_POKER"];

  return R.includes(category, slotCategories);
}

export function getSlugFromGamePage(): ?string {
  return (window.location.pathname.match(/\/play\/(.*?)\/launch/) || [])[1];
}
