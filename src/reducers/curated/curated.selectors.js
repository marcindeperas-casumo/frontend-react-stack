import { createSelector } from "reselect";
import { prop, compose } from "ramda";
import { CURATED_SLUG } from "Reducers/curated";
import { slugSelectorFactory } from "Reducers/cms";
import { gameSelector } from "Reducers/schema/selector";

export const curatedSelector = () =>
  createSelector(
    slugSelectorFactory(CURATED_SLUG),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const game = compose(
        prop(0),
        prop("game")
      )(fields);
      const gameData = gameSelector(game)(state);

      return {
        ...fields,
        game,
        gameData,
      };
    }
  );
