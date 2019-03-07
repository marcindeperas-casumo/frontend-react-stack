import { createSelector } from "reselect";
import { prop, pipe, find, equals } from "ramda";
import {
  applicationHandshakeSelector,
  APP_COMMON_KEYS,
} from "Models/handshake";

const ABTestsSelector = createSelector(
  applicationHandshakeSelector,
  prop(APP_COMMON_KEYS.AB_TESTING)
);

export const featureSelector = feature =>
  createSelector(
    ABTestsSelector,
    pipe(
      prop("features"),
      find(f => equals(f.name, feature))
    )
  );

export const flavourSelector = feature =>
  createSelector(
    featureSelector(feature),
    prop("flavour")
  );

export const flavourMatchSelector = (feature, flavour) =>
  createSelector(
    flavourSelector(feature),
    f => equals(f, flavour)
  );
