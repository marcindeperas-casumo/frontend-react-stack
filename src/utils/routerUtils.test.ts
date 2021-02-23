// @flow
import { navigate } from "@reach/router";
import {
  interpolate,
  routeTranslator,
  navigateToRerender,
  navigateToRootWithReload,
} from "Utils";
import { TRANSLATED_ROUTES, ROUTE_IDS, ROUTES } from "Src/constants";

jest.mock("@reach/router", () => ({
  navigate: jest.fn(),
}));

describe("<Router /> utils", () => {
  const testLanguage = "en";
  const unknownLanguage = "casumo";
  const pathname = "SOME PATH";

  beforeEach(() => {
    jest.resetAllMocks();

    // eslint-disable-next-line fp/no-delete
    delete window.location;

    window.location = {
      pathname,
      assign: jest.fn(),
    };
  });

  test("calling routeTranslator with a language should return a function", () => {
    const translateRoute = routeTranslator(testLanguage);
    expect(typeof translateRoute).toBe("function");
  });

  test("passing an unknown language to routeTranslator should return default values", () => {
    const translateRoute = routeTranslator(unknownLanguage);
    const testRouteId = ROUTE_IDS.TOP_LISTS;
    const route = ROUTES[testRouteId];
    const translatedRoute = translateRoute(testRouteId);
    const expectedResult = interpolate(route, {
      games: TRANSLATED_ROUTES.GAMES.DEFAULT,
    });

    expect(translatedRoute).toBe(expectedResult);
  });

  test("navigateToRerender calls router's navigate with current pathname", () => {
    navigateToRerender();

    expect(navigate).toHaveBeenCalledWith(pathname);
  });

  test("navigateToRootWithReload calls location's assign with '/' argument", () => {
    navigateToRootWithReload();

    expect(window.location.assign).toHaveBeenCalledWith("/");
  });
});
