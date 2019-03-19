// @flow
import { select, take } from "redux-saga/effects";

export function* waitForSelector(selector: string): any {
  if (yield select(selector)) {
    return;
  }

  // eslint-disable-next-line fp/no-loops
  while (true) {
    yield take("*");
    if (yield select(selector)) {
      return;
    }
  }
}
