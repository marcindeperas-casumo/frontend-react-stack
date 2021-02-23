// @flow
import useMedia from "react-use/lib/useMedia";
import breakpoints from "Src/styles/_settings.breakpoints.scss";

export function useIsScreenMinimumTablet(): boolean {
  const minWidth = parseInt(breakpoints.tablet) - 1;
  // skips phablets landscape
  const media = `screen and (min-width: ${minWidth}px) and (min-height: 500px)`;

  return useMedia(media);
}
