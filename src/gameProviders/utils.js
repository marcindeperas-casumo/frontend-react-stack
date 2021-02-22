//@flow

import type { GameRef, GameUrlProps } from "./types";

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

export const appendLobbyUrl = ({ url, paramsToAdd }: GameUrlProps): string => {
  const urlObject = new URL(url);
  const urlParams = new URLSearchParams(urlObject.search);
  paramsToAdd.forEach(param => urlParams.set(param.key, param.value));
  const urlTrimmedHost = urlObject.toString().replace(urlObject.search, "");

  return `${urlTrimmedHost}?${urlParams.toString()}`;
};
