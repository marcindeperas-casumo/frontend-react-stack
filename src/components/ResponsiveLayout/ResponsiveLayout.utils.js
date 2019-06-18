import breakpoints from "Src/styles/_settings.breakpoints.scss";

export const mobileBreakpoint = {
  "max-width": `${parseInt(breakpoints.desktop) - 1}px`,
};

export const desktopBreakpoint = {
  "min-width": breakpoints.desktop,
};

export const getMediaQuery = mediaMap =>
  Object.keys(mediaMap)
    .reduce((acc, prop) => [...acc, `(${prop}: ${mediaMap[prop]})`], ["screen"])
    .join(" and ");
