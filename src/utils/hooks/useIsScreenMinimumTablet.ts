// @flow
import useMedia from "react-use/lib/useMedia";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Src/styles/_settings.breakpoin... Remove this comment to see the full error message
import breakpoints from "Src/styles/_settings.breakpoints.scss";

export function useIsScreenMinimumTablet(): boolean {
  const minWidth = parseInt(breakpoints.tablet) - 1;
  // skips phablets landscape
  const media = `screen and (min-width: ${minWidth}px) and (min-height: 500px)`;

  return useMedia(media);
}
