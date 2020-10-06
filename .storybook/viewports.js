// @flow
import { map, pipe, replace } from "ramda";
import breakpointsWithPx from "Src/styles/_settings.breakpoints.scss";

const CHROMATIC_MIN_VIEWPORT_WIDTH = 320;

const stripPx = pipe(
  replace("px", ""),
  parseInt,
  breakpoint => breakpoint || CHROMATIC_MIN_VIEWPORT_WIDTH
);

export const breakpoints = map(stripPx, breakpointsWithPx);

export const devices = {
  [breakpoints.mobile]: "iphone6",
  [breakpoints.phablet]: "pixelxl",
  [breakpoints.tablet]: "ipad",
  [breakpoints.desktop]: "responsive",
};

const makeConfig = (size: number) => ({
  chromatic: {
    viewports: [size],
  },
  viewport: {
    defaultViewport: devices[size],
  },
});

export const viewports = map(makeConfig, breakpoints);
