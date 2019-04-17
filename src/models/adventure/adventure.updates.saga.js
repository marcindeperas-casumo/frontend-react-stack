import { put, select } from "redux-saga/effects";
import { updateEntity, ENTITY_KEYS } from "Models/schema";
import {
  adventurerProgressionSelector,
  adventurerProgressionRawSelector,
} from "Models/adventure";

export function* adventureUpdatesSaga(action) {
  const { data } = action;
  const currentProgression = yield select(adventurerProgressionRawSelector);

  if (data.setPoints) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          points: data.setPoints,
        },
      })
    );
  }

  if (data.leveledUp) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          level: data.leveledUp,
        },
      })
    );
  }

  if (data.worldEntered) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          points: 0,
        },
      })
    );
  }

  if (data.arrivedOnPlanet) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          inTravelMode: false,
          points: 0,
        },
      })
    );
  }

  if (data.limboEntered) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          inTravelMode: true,
          points: 0,
        },
      })
    );
  }

  if (data.limboGemReceived) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          spaceCrystals: currentProgression.spaceCrystals.concat([
            data.limboGemReceived.type,
          ]),
          pointsRequiredForNextLimboGem:
            data.limboGemReceived.pointsRequiredForNextLimboGem,
          points: 0,
        },
      })
    );
  }

  if (data.limboGemsConverted) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER_PROGRESSION]: {
          ...currentProgression,
          spaceCrystals: [],
        },
      })
    );
  }

  if (data.beltEarned) {
    // change belt
  }
}
