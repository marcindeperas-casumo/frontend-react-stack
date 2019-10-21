// @flow
import { createSelector } from "reselect";
import { propOr, pipe, pick } from "ramda";
import { getPage } from "Models/cms";
import { CMS_SLUGS } from "./slotControlSystem.constants";

export const configurationFormContentSelector = createSelector(
  getPage(CMS_SLUGS.CONFIGURATION_SCREEN),
  getPage(CMS_SLUGS.UNITS),
  (configurationFormContent, unitsContent) => ({
    ...propOr({}, "fields", configurationFormContent),
    ...pipe(
      propOr({}, "fields"),
      pick(["minutes_abbreviated", "hours_abbreviated", "days_abbreviated"])
    )(unitsContent),
  })
);
