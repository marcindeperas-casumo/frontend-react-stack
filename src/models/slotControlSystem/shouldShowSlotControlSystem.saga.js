// @flow
import { call, put, select } from "redux-saga/effects";
import { getGameCategories } from "Api/api.casinoPlayerGames";
import { slugToCategorySelector } from "./slotControlSystem.selectors";
import { updateSlugToCategoryMap } from "./slotControlSystem.actions";
import {
  isSlotGame,
  getSlugFromGamePage,
} from "./shouldShowSlotControlSystem.utils";

export function* shouldShowSlotControlSystemSaga(): * {
  const slug = getSlugFromGamePage();

  if (!slug) {
    // if nothing was matched we're not on game page, abort
    return false;
  }

  const categoriesFromStore = yield select(slugToCategorySelector(slug));
  if (categoriesFromStore) {
    return isSlotGame(categoriesFromStore);
  }

  const categories = yield call(getGameCategories, slug);
  yield put(updateSlugToCategoryMap(slug, categories));

  return isSlotGame(categories);
}
