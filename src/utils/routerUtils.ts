import { navigate } from "@reach/router";
import * as R from "ramda";
import { interpolate, canBeInterpolated } from "Utils";
import { ROUTES, TRANSLATED_ROUTES } from "Src/constants";

const pickRouteTranslation = (
  language: string,
  languageToVariantMap: { [lang: string]: string }
) =>
  R.ifElse(
    R.has(language),
    R.prop(language),
    R.prop("DEFAULT")
  )(languageToVariantMap);

export const routeTranslator = (language: string) => {
  const translatedRoutes = {
    promotions: pickRouteTranslation(language, TRANSLATED_ROUTES.PROMOTIONS),
    games: pickRouteTranslation(language, TRANSLATED_ROUTES.GAMES),
    play: pickRouteTranslation(language, TRANSLATED_ROUTES.PLAY),
    casinoGames: pickRouteTranslation(language, TRANSLATED_ROUTES.CASINO_GAMES),
    playOkay: pickRouteTranslation(language, TRANSLATED_ROUTES.PLAY_OKAY),
  };

  return (key: string) => {
    const path = ROUTES[key];

    if (canBeInterpolated(path)) {
      // @ts-expect-error: apply fix if you know the context
      return interpolate(path, translatedRoutes);
    }

    return path;
  };
};

export const getUrlSearchParam = (
  searchString: string,
  paramName: string
): string | undefined => {
  const params = new URLSearchParams(searchString);

  return params.get(paramName);
};

export const navigateToRerender = () => {
  navigate(window.location.pathname);
};

export const navigateToRootWithReload = () => window.location.assign("/");
