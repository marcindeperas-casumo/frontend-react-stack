import { createSelector } from "reselect";
import { prop, compose, defaultTo } from "ramda";
import { getField } from "Models/cms";
import { isNotFetched, isFetched } from "Models/fetch/selectors";
import { TYPES } from "./jackpotsMustDrop.constants";

export const getJackpotsMustDrop = compose(
  defaultTo({}),
  prop("jackpotMustDrop"),
  prop("schema")
);

export const shouldFetchJackpotsMustDrop = isNotFetched(TYPES.FETCH);

export const isFetchedJackpotsMustDrop = isFetched(TYPES.FETCH);

export const mergeJackpotsMustDropSelectorFactory = slug =>
  createSelector(
    getJackpotsMustDrop,
    getField({ slug, field: "jackpots", defaultValue: [] }),
    (jackpots, cmsField) => {
      if (!jackpots) {
        return [];
      }

      return cmsField
        .filter(({ id }) => jackpots[id])
        .map(cmsJackpotContent => ({
          ...cmsJackpotContent,
          ...jackpots[cmsJackpotContent.id],
        }));
    }
  );
