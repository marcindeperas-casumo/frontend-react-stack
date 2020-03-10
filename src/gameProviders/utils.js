//@flow

import type { GameRef } from "./types";

export const expandIframeHeightToMatchItsParent = (iframeRef: GameRef) => {
  if (iframeRef.current) {
    /* eslint-disable fp/no-mutation */
    iframeRef.current.style.height = `${iframeRef.current.parentElement
      ?.clientHeight || 0}px`;
    iframeRef.current.style.width = `${iframeRef.current.parentElement
      ?.clientWidth || 0}px`;
    /* eslint-enable fp/no-mutation */
  }
};
