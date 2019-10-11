// @flow
import { createSelector } from "reselect";
import { propOr } from "ramda";
import { getPage } from "Models/cms";
import { CMS_SLUGS } from "./slotControlSystem.constants";

export const configurationFormContentSelector = createSelector(
  getPage(CMS_SLUGS.CONFIGURATION_SCREEN),
  getPage(CMS_SLUGS.UNITS),
  (configurationFormContent, unitsContent) => ({
    ...propOr({}, "fields", configurationFormContent),
    ...propOr({}, "fields", unitsContent),
  })
);
