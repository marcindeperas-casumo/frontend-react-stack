// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import { getPage } from "Models/cms";
import { slug } from "./reelRaces.constants";
import type { ReelRacesTranslations, ReelRace } from "./reelRaces.types";

export const reelRacesTranslationsSelector: ({}) => ReelRacesTranslations = createSelector(
  getPage(slug),
  R.propOr({}, "fields")
);

export const reelRacesSelector: any => Array<ReelRace> = createSelector(
  R.pathOr({}, ["schema", "reelRaces"]),
  R.identity
);

export const reelRacesByIdSelector: string => ({}) => ?ReelRace = id =>
  createSelector(
    reelRacesSelector,
    R.prop(id)
  );

export const reelRacesIdsSelector: ({}) => Array<string> = createSelector(
  reelRacesSelector,
  reelRaces => {
    /**
     * TODO(mm): it should get smarter but I'm not sure how.
     * When reel race disappears from list we should re-run that and return new
     * stuff. Selector would have to be smarter as well (if it works properly,
     * it would be returning the same memoized stuff). Kind of feels like this
     * problem is out of scope and it should be good enough for 1st iteration.
     */
    const isScheduledInFuture = R.propSatisfies(R.lt(Date.now()), "startTime");
    const playerOptedIn = R.propEq("opted", true);
    const canPlayerParticipate = R.anyPass([
      isScheduledInFuture,
      playerOptedIn,
    ]);

    const sorted = R.pipe(
      R.values,
      R.sortBy(R.prop("startTime")),
      R.filter(canPlayerParticipate)
    )(reelRaces);

    const promoted = R.pipe(
      R.find(R.propEq("promoted", true)),
      R.prop("tournamentId")
    )(sorted);

    const three = R.pipe(
      R.filter(R.propEq("promoted", false)),
      R.slice(0, 3),
      R.pluck("tournamentId")
    )(sorted);

    return [promoted, ...three].filter(Boolean);
  }
);
