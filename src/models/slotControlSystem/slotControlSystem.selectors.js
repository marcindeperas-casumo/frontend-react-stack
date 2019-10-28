// @flow
import { createSelector } from "reselect";
import { propOr, pipe, pick, path, identity } from "ramda";
import { getPage } from "Models/cms";
import { getFetch } from "Models/fetch";
import { CMS_SLUGS, ACTION_TYPES } from "Models/slotControlSystem";
import type {
  ActiveSessionType,
  EndedSessionType,
} from "./slotControlSystem.types";

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

export const isFetchingActiveSessionSelector = createSelector<boolean>(
  getFetch(ACTION_TYPES.FETCH_SESSION_INIT),
  fetchData => fetchData?.isFetching
);

export const isCreatingSessionSelector = createSelector<boolean>(
  getFetch(ACTION_TYPES.CREATE_SESSION_INIT),
  fetchData => fetchData?.isFetching
);

export const activeSessionSelector = createSelector<ActiveSessionType | null>(
  isFetchingActiveSessionSelector,
  path(["slotControlSystem", "activeSession"]),
  (isFetching, activeSession) => {
    if (isFetching) {
      return null;
    }
    return activeSession;
  }
);

export const endedSessionSelector = createSelector<EndedSessionType | null>(
  path(["slotControlSystem", "endedSession"]),
  identity
);
