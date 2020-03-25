// @flow
import { put, select } from "redux-saga/effects";
import { updateEntity, ENTITY_KEYS } from "Models/schema";
import { adventurerRawSelector } from "Models/adventure";
import { translateBeltNumberToColor } from "./adventure.utils";

export function* adventureUpdatesSaga(action: *): * {
  const { data } = action;
  const currentProgression = yield select(adventurerRawSelector);

  if (data.setPoints) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER]: {
          ...currentProgression,
          points: data.setPoints,
        },
      })
    );
  }

  if (data.leveledUp) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER]: {
          ...currentProgression,
          // Level is zero based
          level: data.leveledUp + 1,
        },
      })
    );
  }

  if (data.worldEntered) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER]: {
          ...currentProgression,
          points: 0,
        },
      })
    );
  }

  if (data.arrivedOnPlanet) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER]: {
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
        [ENTITY_KEYS.ADVENTURER]: {
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
        [ENTITY_KEYS.ADVENTURER]: {
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
        [ENTITY_KEYS.ADVENTURER]: {
          ...currentProgression,
          spaceCrystals: [],
        },
      })
    );
  }

  if (data.beltEarned) {
    yield put(
      updateEntity({
        [ENTITY_KEYS.ADVENTURER]: {
          ...currentProgression,
          belt: translateBeltNumberToColor(data.beltEarned),
        },
      })
    );
  }
}
