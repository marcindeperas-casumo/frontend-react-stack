import { put, select } from "redux-saga/effects";
import { updateEntity } from "Models/schema";
import { reelRacesByIdSelector } from "./reelRaces.selectors";

export function* reelRacesUpdatesSaga(action) {
  const { data } = action;
  const doesTournamentExist = Boolean(
    yield select(reelRacesByIdSelector(data.tournamentId))
  );

  if (doesTournamentExist) {
    const reelRaces = {
      [data.tournamentId]: { opted: true },
    };

    yield put(updateEntity({ reelRaces }));
  }
}
