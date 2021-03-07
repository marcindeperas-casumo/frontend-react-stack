// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Src/styles/_settings.breakpoin... Remove this comment to see the full error message
import breakpoints from "Src/styles/_settings.breakpoints.scss";

export const mobileBreakpoint = {
  "max-width": `${parseInt(breakpoints.tablet) - 1}px`,
};

export const mobileAndTabletBreakpoint = {
  "max-width": `${parseInt(breakpoints.desktop) - 1}px`,
};

export const tabletBreakpoint = {
  "min-width": breakpoints.tablet,
  "max-width": `${parseInt(breakpoints.desktop) - 1}px`,
};

export const tabletAndDesktopBreakpoint = {
  "min-width": breakpoints.tablet,
};

export const desktopBreakpoint = {
  "min-width": breakpoints.desktop,
};

export const getMediaQuery = mediaMap =>
  Object.keys(mediaMap)
    .reduce((acc, prop) => [...acc, `(${prop}: ${mediaMap[prop]})`], ["screen"])
    .join(" and ");
