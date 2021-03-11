import { createSelector } from "reselect";
import * as R from "ramda";
import {
  applicationHandshakeSelector,
  APP_COMMON_KEYS,
} from "Models/handshake";

const ABTestsSelector = createSelector(
  applicationHandshakeSelector,
  R.prop(APP_COMMON_KEYS.AB_TESTING)
);

const ABFeatures = createSelector(ABTestsSelector, R.prop("features"));

export const testSubjectIDSelector = () =>
  createSelector(ABTestsSelector, R.prop("testSubjectId"));

export const featureSelector = (feature: string) =>
  createSelector(ABFeatures, x => {
    return R.find(R.propEq("name", feature), x) || {};
  });

export const flavourSelector = (feature: string) =>
  createSelector(featureSelector(feature), R.prop("flavour"));

export const flavourMatchSelector = (feature: string, flavour: string) =>
  createSelector(featureSelector(feature), R.propEq("flavour", flavour));
