import { createSelector } from "reselect";
import { compose, not, isNil, pathOr, prop, propOr, identity } from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import { getPage } from "Models/cms";
import { CMS_CONTENT_SLUG } from "./adventure.constants";
import type {
  Adventurer,
  AdventurerRaw,
  AdventureContent,
} from "./adventure.types";
import { getProgression } from "./adventure.utils";

export const adventurerSelector = createSelector(
  pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER]),
  (adventurer: AdventurerRaw) => {
    const {
      belt,
      inTravelMode = false,
      level,
      levels,
      name,
      points,
      pointsRequiredForNextSpaceCrystal,
      spaceCrystals,
    } = adventurer;

    if (!name) {
      return {};
    }

    const progression = getProgression(
      inTravelMode,
      points,
      pointsRequiredForNextSpaceCrystal,
      spaceCrystals,
      levels
    );

    return {
      belt,
      inBonusMode: inTravelMode,
      level: inTravelMode ? level - 1 : level,
      name,
      points: progression.points,
      pointsRequiredForNextLevel: progression.pointsRequiredForNextLevel,
    };
  }
);

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, {}, (res: {}) => {}>' is... Remove this comment to see the full error message
export const adventurerRawSelector: (state: any) => AdventurerRaw = createSelector(
  pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER]),
  identity
);

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<unknown, unknown, (res: unkno... Remove this comment to see the full error message
export const adventureContentSelector: (state: any) => AdventureContent = createSelector(
  getPage(CMS_CONTENT_SLUG),
  propOr({}, "fields")
);

export const isAdventurerFetchedSelector = createSelector(
  adventurerRawSelector,
  compose(
    not,
    isNil,
    prop("name")
  )
);
