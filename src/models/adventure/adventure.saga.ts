import { put, select, take, all } from "redux-saga/effects";
import { ENTITY_KEYS, updateEntity } from "Models/schema";
import { playerIdSelector, adventureLevelsSelector } from "Models/handshake";
import {
  fetchAdventurerDetails,
  fetchAdventurerProgression,
} from "./adventure.actions";
import { actionTypes } from "./adventure.constants";
import { translateBeltNumberToColor } from "./adventure.utils";

export function* fetchAdventurerSaga() {
  const playerId = yield select(playerIdSelector);
  const levels = yield select(adventureLevelsSelector);

  yield all([
    put(fetchAdventurerProgression({ playerId })),
    put(fetchAdventurerDetails({ playerId })),
  ]);

  const [details, progression] = yield all([
    take(actionTypes.ADVENTURER_DETAILS_FETCH_COMPLETED),
    take(actionTypes.ADVENTURER_PROGRESSION_FETCH_COMPLETED),
  ]);

  const {
    response: { currentBelt, casumoName },
  } = details;

  const {
    response: {
      inTravelMode,
      level,
      points,
      pointsRequiredForNextSpaceCrystal,
      pointsVersion,
      spaceCrystals,
    },
  } = progression;

  yield put(
    updateEntity({
      [ENTITY_KEYS.ADVENTURER]: {
        belt: translateBeltNumberToColor(currentBelt),
        inTravelMode,
        // Level is zero based
        level: level + 1,
        levels: levels[pointsVersion] || [],
        name: casumoName,
        points,
        pointsRequiredForNextSpaceCrystal,
        pointsVersion,
        spaceCrystals,
      },
    })
  );
}
