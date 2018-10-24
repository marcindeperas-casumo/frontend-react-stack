import { createSelector } from "reselect";
// import { defaultTo, compose, prop } from "ramda";
import { types } from "Reducers/curated";
// import { slugSelectorFactory } from "Reducers/cms";
import {
  cmsEntitiesSelector,
  gameEntitiesSelector,
} from "Reducers/schema/selector";

export const curatedSelector = () =>
  createSelector(
    cmsEntitiesSelector,
    gameEntitiesSelector,
    (cmsEntities, gameEntities) => {
      const page = cmsEntities && cmsEntities[types.CURATED_SLUG];
      const gameData =
        page && gameEntities && gameEntities[page.fields.game[0]];
      const fields = (page && page.fields) || {};
      return { ...fields, gameData };
    }
  );
