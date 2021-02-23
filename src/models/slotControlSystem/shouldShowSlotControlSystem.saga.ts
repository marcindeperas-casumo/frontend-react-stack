// @flow
import { call, put, select } from "redux-saga/effects";
import { getGameCategory } from "Api/api.casinoPlayerGames";
import { slugToCategorySelector } from "./slotControlSystem.selectors";
import { updateSlugToCategoryMap } from "./slotControlSystem.actions";
import {
  isSlotGame,
  getSlugFromGamePage,
} from "./shouldShowSlotControlSystem.utils";

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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

  const categories = yield call(getGameCategory, slug);
  yield put(updateSlugToCategoryMap(slug, categories));

  return isSlotGame(categories);
}
