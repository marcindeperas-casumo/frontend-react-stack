import breakpoints from "Src/styles/_settings.breakpoints.scss";

export const mobileBreakpoint = {
  "max-width": `${parseInt(breakpoints.tablet) - 1}px`,
};

export const mobileAndTabletBreakpoint = {
  "max-width": `${parseInt(breakpoints.desktop) - 1}px`,
};

export const tabletBreakpoint = {
  "min-device-width": breakpoints.tablet,
  "max-device-width": `${parseInt(breakpoints.desktop) - 1}px`,
};

export const tabletAndDesktopBreakpoint = {
  "min-device-width": breakpoints.tablet,
};

export const desktopBreakpoint = {
  "min-width": breakpoints.desktop,
};

export const getMediaQuery = mediaMap =>
  Object.keys(mediaMap)
    .reduce((acc, prop) => [...acc, `(${prop}: ${mediaMap[prop]})`], ["screen"])
    .join(" and ");
