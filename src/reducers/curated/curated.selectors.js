import { createSelector } from "reselect";
import { CURATED_SLUG } from "Reducers/curated";

import {
  cmsEntitiesSelector,
  gameEntitiesSelector,
} from "Reducers/schema/selector";

export const curatedSelector = () =>
  createSelector(
    cmsEntitiesSelector,
    gameEntitiesSelector,
    (cmsEntities, gameEntities) => {
      const page = cmsEntities && cmsEntities[CURATED_SLUG];
      const gameData =
        page && gameEntities && gameEntities[page.fields.game[0]];
      const fields = (page && page.fields) || {};
      return gameData ? { ...fields, gameData } : { ...fields };
    }
  );
