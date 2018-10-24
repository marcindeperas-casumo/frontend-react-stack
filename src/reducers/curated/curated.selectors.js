import { createSelector } from "reselect";
import { types } from "Reducers/curated";

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
      return gameData ? { ...fields, gameData } : { ...fields };
    }
  );
