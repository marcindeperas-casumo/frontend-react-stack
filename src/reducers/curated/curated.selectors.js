import { createSelector } from "reselect";
import { prop, compose, isEmpty } from "ramda";
import { CURATED_SLUG } from "Reducers/curated";
import { slugSelectorFactory } from "Reducers/cms";
import { gameSelector } from "Reducers/schema/selector";

export const curatedSelector = () =>
  createSelector(
    slugSelectorFactory(CURATED_SLUG),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);
      const gameData = gameSelector(gameId)(state);

      return isEmpty(gameData) ? { ...fields } : { ...fields, gameData };
    }
  );
