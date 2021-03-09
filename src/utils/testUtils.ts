/* eslint-disable fp/no-mutation */
import {
  mobileBreakpoint,
  tabletBreakpoint,
  desktopBreakpoint,
  getMediaQuery,
} from "Components/ResponsiveLayout/ResponsiveLayout.utils";

/*
    We need to mock the matchMedia method as this is not implemented in jsdom
    https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
*/

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

export const setTabletViewport = () =>
  (window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query === getMediaQuery(tabletBreakpoint) ? true : false,
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
