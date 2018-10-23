import { createSelector } from "reselect";
import { curatedEntitiesSelector } from "Reducers/schema/selector";
import { defaultTo } from "ramda";

export const curatedSelector = () =>
  createSelector(curatedEntitiesSelector, defaultTo({}));
