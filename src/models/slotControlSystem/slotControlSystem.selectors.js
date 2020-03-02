// @flow
import { createSelector } from "reselect";
import { propOr, pipe, pick, path, pathOr, identity } from "ramda";
import { getPage } from "Models/cms";
import { getFetch } from "Models/fetch";
import { CMS_SLUGS, ACTION_TYPES } from "Models/slotControlSystem";
import type { GameCategory } from "Api/api.casinoPlayerGames";
import type {
  ActiveSessionType,
  EndedSessionType,
  ExclusionType,
} from "./slotControlSystem.types";

export const configurationFormContentSelector = createSelector(
  getPage(CMS_SLUGS.BEFORE_PLAYING),
  getPage(CMS_SLUGS.UNITS),
  (configurationFormContent, unitsContent) => ({
    ...propOr({}, "fields", configurationFormContent),
    ...pipe(
      propOr({}, "fields"),
      pick([
        "hours",
        "minutes",
        "seconds",
        "minutes_abbreviated",
        "hours_abbreviated",
        "days_abbreviated",
      ])
    )(unitsContent),
  })
);

export const isFetchingActiveSessionSelector: (
  s: Object
) => boolean = createSelector(
  getFetch(ACTION_TYPES.FETCH_SESSION_INIT),
  fetchData => fetchData?.isFetching
);

export const isCreatingSessionSelector: (s: Object) => boolean = createSelector(
  getFetch(ACTION_TYPES.CREATE_SESSION_INIT),
  fetchData => fetchData?.isFetching
);

export const activeSessionSelector: (
  s: Object
) => ?ActiveSessionType = createSelector(
  isFetchingActiveSessionSelector,
  path(["slotControlSystem", "activeSession"]),
  (isFetching, activeSession) => {
    if (isFetching) {
      return null;
    }
    return activeSession;
  }
);

export const endedSessionSelector: (
  s: Object
) => ?EndedSessionType = createSelector(
  path(["slotControlSystem", "lastEndedSession"]),
  identity
);

export const activeExclusionSelector: (
  s: Object
) => ?ExclusionType = createSelector(
  path(["slotControlSystem", "activeExclusion"]),
  identity
);

export const lastUpdateTimeSelector: (s: Object) => number = createSelector(
  path(["slotControlSystem", "lastUpdateTime"]),
  identity
);

export const slugToCategorySelector = (
  slug: ?string
): ((s: Object) => GameCategory | null) =>
  createSelector(
    pathOr(null, ["slotControlSystem", "slugToCategoryMap", slug]),
    identity
  );
