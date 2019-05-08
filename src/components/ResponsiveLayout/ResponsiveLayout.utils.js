import breakpoints from "../../styles/_settings.breakpoints.scss";

export const mobileBreakpoint = {
  "max-width": `${parseInt(breakpoints.desktop) - 1}px`,
};

export const desktopBreakpoint = {
  "min-width": breakpoints.desktop,
};

/* eslint-disable fp/no-mutating-methods */
export const getMediaQuery = mediaMap =>
  Object.keys(mediaMap)
    .reduce((acc, prop, idx) => {
      if (idx === 0) {
        acc.push("screen");
      }
      acc.push(`(${prop}: ${mediaMap[prop]})`);
      return acc;
    }, [])
    .join(" and ");
/* eslint-enable fp/no-mutating-methods */
