// @flow
import { navigate } from "@reach/router";
import { interpolate, canBeInterpolated } from "Utils";
import { ROUTES, TRANSLATED_ROUTES } from "Src/constants";

export const routeTranslator = (language: string) => {
  const translatedRoutes = {
    games: TRANSLATED_ROUTES.GAMES[language] || TRANSLATED_ROUTES.GAMES.DEFAULT,
    play: TRANSLATED_ROUTES.PLAY[language] || TRANSLATED_ROUTES.PLAY.DEFAULT,
    casinoGames:
      TRANSLATED_ROUTES.CASINO_GAMES[language] ||
      TRANSLATED_ROUTES.CASINO_GAMES.DEFAULT,
  };

  return (key: string) => {
    const path = ROUTES[key];

    if (canBeInterpolated(path)) {
      return interpolate(path, translatedRoutes);
    }

    return path;
  };
};

export const getUrlSearchParam = (
  searchString: string,
  paramName: string
// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
): ?string => {
  const params = new URLSearchParams(searchString);

  return params.get(paramName);
};

export const navigateToRerender = () => {
  navigate(window.location.pathname);
};

export const navigateToRootWithReload = () => window.location.assign("/");
