import { createSelector } from "reselect";
import { prop, compose } from "ramda";
import { slugSelectorFactory } from "Reducers/cms";
import { gameSelector } from "Reducers/schema/selector";

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

      const gameData = gameSelector(gameId)(state);
      const game = { gameId, gameData };

      return {
        ...fields,
        ...(gameId && game),
      };
    }
  );
