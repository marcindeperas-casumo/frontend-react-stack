//@flow

import type { GameRef } from "./types";

// isNativeByUserAgent @lukasz.kowalski
// native app doesnt set window.native in game launch windows,
// untill we get it from there we need to check navigator.userAgent
// *to be removed and replaced with window.native check when we get it from the app*
export const isNativeByUserAgent = (): boolean =>
  navigator.userAgent.search("com.casumo") >= 0;

export const expandElementHeightToMatchItsParent = (iframeRef: GameRef) => {
  if (iframeRef.current) {
    /* eslint-disable fp/no-mutation */
    iframeRef.current.style.height = `${iframeRef.current.parentElement
      ?.clientHeight || 0}px`;
    iframeRef.current.style.width = `${iframeRef.current.parentElement
      ?.clientWidth || 0}px`;
    /* eslint-enable fp/no-mutation */
  }
};
