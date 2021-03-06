import { call, put, select } from "redux-saga/effects";
import { getGameCategory } from "Api/api.casinoPlayerGames";
import { playingSelector } from "Models/playing";
import { slugToCategorySelector } from "./slotControlSystem.selectors";
import { updateSlugToCategoryMap } from "./slotControlSystem.actions";
import { isSlotGame } from "./shouldShowSlotControlSystem.utils";

export function* shouldShowSlotControlSystemSaga() {
  const playing = yield select(playingSelector);
  const slug = playing?.gameId;

  if (!slug) {
    // if nothing was matched we're not on game page, abort
    return false;
  }

  const categoriesFromStore = yield select(slugToCategorySelector(slug));
  if (categoriesFromStore) {
    return isSlotGame(categoriesFromStore);
  }

  const categories = yield call(getGameCategory, slug);
  yield put(updateSlugToCategoryMap(slug, categories));

  return isSlotGame(categories);
}
