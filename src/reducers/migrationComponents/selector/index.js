import { createSelector } from "reselect";

export const migrationComponentsSelector = state => state.migrationComponents;

export const activeComponents = createSelector(
  migrationComponentsSelector,
  migrationComponents => migrationComponents.activeComponents
);
