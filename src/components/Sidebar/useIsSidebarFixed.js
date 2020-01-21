// @flow
import useMedia from "react-use/lib/useMedia";
import breakpoints from "Src/styles/_settings.breakpoints.scss";

export function useIsSidebarFixed() {
  const minWidth = parseInt(breakpoints.tablet) - 1;

  return useMedia(
    `screen and (min-width: ${minWidth}px) and (min-height: 500px)` // skips phablets landscape
  );
}
