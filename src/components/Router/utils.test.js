// @flow

import { interpolate } from "Utils";
import { routeTranslator } from "./utils";
import { TRANSLATED_ROUTES, ROUTE_IDS, ROUTES } from "./constants";

describe("<Router /> utils", () => {
  const testLanguage = "en";
  const unknownLanguage = "casumo";

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
});
