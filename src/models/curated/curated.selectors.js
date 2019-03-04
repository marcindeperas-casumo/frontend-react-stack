import { createSelector } from "reselect";
import { prop, compose, isEmpty } from "ramda";
import { getPage } from "Models/cms";
import { gameSelector } from "Models/schema";

export const curatedSelector = slug =>
  createSelector(
    getPage(slug),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);

      if (!gameId) {
        return fields;
      }

      const gameData = gameSelector(gameId)(state);
      const game = { gameId, gameData };

      return {
        ...fields,
        ...(!isEmpty(gameData) && game),
      };
    }
  );

export const isCuratedLoadedFactory = slug =>
  createSelector(
    getPage(slug),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);

      const isPromoCard = !gameId;

      return !isEmpty(fields) && isPromoCard
        ? true
        : !isEmpty(gameSelector(gameId)(state));
    }
  );
