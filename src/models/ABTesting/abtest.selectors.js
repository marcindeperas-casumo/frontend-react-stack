import { createSelector } from "reselect";
import { prop, pipe, find, equals, propEq, any } from "ramda";
import {
  applicationHandshakeSelector,
  APP_COMMON_KEYS,
} from "Models/handshake";

const ABTestsSelector = createSelector(
  applicationHandshakeSelector,
  prop(APP_COMMON_KEYS.AB_TESTING)
);

export const flavourSelector = feature =>
  createSelector(
    ABTestsSelector,
    pipe(
      prop("features"),
      find(f => equals(f.name, feature)),
      prop("flavour")
    )
  );

export const flavourMatchSelector = (feature, flavour) =>
  createSelector(
    flavourSelector(feature),
    any(propEq(flavour))
  );
