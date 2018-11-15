import { createSelector } from "reselect";
import { prop, compose, isEmpty } from "ramda";
import { slugSelectorFactory } from "Models/cms";
import { gameSelector } from "Models/schema/selector";

export const curatedSelector = slug =>
  createSelector(
    slugSelectorFactory(slug),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);

      if (!gameId) return fields;

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
    slugSelectorFactory(slug),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);

      return !isEmpty(fields) && !gameId
        ? true
        : !isEmpty(gameSelector(gameId)(state));
    }
  );
