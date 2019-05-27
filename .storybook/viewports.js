// @flow
import { map } from "ramda";

const breakpoints = {
  mobile: 420,
  phablet: 480,
  tablet: 768,
  desktop: 1280,
};

const devices = {
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
