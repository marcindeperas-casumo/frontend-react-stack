/* eslint-disable fp/no-mutation */
import {
  mobileBreakpoint,
  desktopBreakpoint,
  getMediaQuery,
} from "Components/ResponsiveLayout/ResponsiveLayout.utils";

export const setDesktopViewport = () =>
  (window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query === getMediaQuery(desktopBreakpoint) ? true : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  }));

export const setMobileViewport = () =>
  (window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query === getMediaQuery(mobileBreakpoint) ? true : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  }));
/* eslint-enable fp/no-mutation */
