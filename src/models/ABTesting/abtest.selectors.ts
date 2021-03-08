import { createSelector } from "reselect";
import { prop, pipe, find, propEq, equals, defaultTo } from "ramda";
import {
  applicationHandshakeSelector,
  APP_COMMON_KEYS,
} from "Models/handshake";

const ABTestsSelector = createSelector(
  applicationHandshakeSelector,
  prop(APP_COMMON_KEYS.AB_TESTING)
);

export const testSubjectIDSelector = () =>
  createSelector(ABTestsSelector, prop("testSubjectId"));

export const featureSelector = feature =>
  createSelector(
    ABTestsSelector,
    pipe(
      prop("features"),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'unknown'.
      find(f => equals(f.name, feature)),
      defaultTo({})
    )
  );

export const flavourSelector = feature =>
  createSelector(featureSelector(feature), prop("flavour"));

export const flavourMatchSelector = (feature, flavour) =>
  createSelector(featureSelector(feature), propEq("flavour", flavour));
