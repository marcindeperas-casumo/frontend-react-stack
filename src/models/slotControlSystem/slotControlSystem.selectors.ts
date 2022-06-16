import { createSelector } from "reselect";
import { propOr, pipe, pick, path, pathOr, identity } from "ramda";
import { getPage } from "Models/cms";
import { getFetch } from "Models/fetch";
import { CMS_SLUGS, ACTION_TYPES } from "./slotControlSystem.constants";
import type {
  ActiveSessionType,
  EndedSessionType,
  ExclusionType,
} from "./slotControlSystem.types";
export const configurationFormContentSelector = createSelector(
  getPage(CMS_SLUGS.BEFORE_PLAYING),
  getPage(CMS_SLUGS.UNITS),
  (configurationFormContent, unitsContent) => ({
    //  apply fix if you know the context (there is no need to add TEE "Ts-Expect-Error" in this case)
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
export const isFetchingActiveSessionSelector: (s: Object) => boolean =
  createSelector(
    getFetch(ACTION_TYPES.FETCH_SESSION_INIT),
    fetchData => (fetchData as any)?.isFetching
  );
export const isCreatingSessionSelector: (s: Object) => boolean = createSelector(
  getFetch(ACTION_TYPES.CREATE_SESSION_INIT),
  fetchData => (fetchData as any)?.isFetching
);
// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, unknown, (res: unknown) ... Remove this comment to see the full error message
export const activeSessionSelector: (
  s: Object
) => ActiveSessionType | undefined = createSelector(
  path(["slotControlSystem", "activeSession"]),
  identity
);
// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, unknown, (res: unknown) ... Remove this comment to see the full error message
export const endedSessionSelector: (s: Object) => EndedSessionType | undefined =
  createSelector(path(["slotControlSystem", "lastEndedSession"]), identity);
// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, unknown, (res: unknown) ... Remove this comment to see the full error message
export const activeExclusionSelector: (s: Object) => ExclusionType | undefined =
  createSelector(path(["slotControlSystem", "activeExclusion"]), identity);
// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, unknown, (res: unknown) ... Remove this comment to see the full error message
export const lastUpdateTimeSelector: (s: Object) => number = createSelector(
  path(["slotControlSystem", "lastUpdateTime"]),
  identity
);
export const slugToCategorySelector = (
  slug: string | undefined
): ((s: Object) => string | null) =>
  // @ts-expect-error: apply fix if you know the context
  createSelector(
    pathOr(null, ["slotControlSystem", "slugToCategoryMap", slug]),
    identity
  );
