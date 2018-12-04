import { select, take } from "redux-saga/effects";

export function* waitForSelector(selector) {
  if (yield select(selector)) {
    return;
  }
  while (true) {
    yield take("*");
    if (yield select(selector)) {
      return;
    }
  }
}
