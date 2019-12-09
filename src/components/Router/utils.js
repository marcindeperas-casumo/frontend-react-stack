// @flow

import { interpolate } from "Utils";
import { ROUTES, TRANSLATED_ROUTES } from "./constants";

export const routeTranslator = (language: string) => {
  const translatedRoutes = {
    games: TRANSLATED_ROUTES.GAMES[language] || TRANSLATED_ROUTES.GAMES.DEFAULT,
    play: TRANSLATED_ROUTES.PLAY[language] || TRANSLATED_ROUTES.GAMES.DEFAULT,
  };
  return (key: string) => interpolate(ROUTES[key], translatedRoutes);
};
