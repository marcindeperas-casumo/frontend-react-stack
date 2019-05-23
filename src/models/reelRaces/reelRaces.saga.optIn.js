import { put, select } from "redux-saga/effects";
import { mergeEntity } from "Models/schema";
import { reelRacesByIdSelector } from "./reelRaces.selectors";

export function* reelRacesUpdatesSaga(action) {
  const { data } = action;
  const doesReelRaceExist = Boolean(
    yield select(reelRacesByIdSelector(data.tournamentId))
  );

  if (doesReelRaceExist) {
    const reelRaces = {
      [data.tournamentId]: { opted: true },
    };

    yield put(mergeEntity({ reelRaces }));
  }
}
