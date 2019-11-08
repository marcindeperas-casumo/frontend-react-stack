import { put } from "redux-saga/effects";
import { gameSearchScrollPositionReset } from "Models/gameSearch";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

export function* resetGameSearchScrollPositionSaga(action) {
  const scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);

  if (scrollElement && scrollElement.scrollTop) {
    // This would reset the root scroll element's initial position otherwise
    // when typing in the search bar we will end up at the bottom of the scroll element
    // eslint-disable-next-line fp/no-mutation
    scrollElement.scrollTop = 0;
    yield put(gameSearchScrollPositionReset());
  }
}
