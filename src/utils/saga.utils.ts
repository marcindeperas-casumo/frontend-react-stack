// @flow
import { select, take } from "redux-saga/effects";

export function* waitForSelector(selector: string): any {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
  if (yield select(selector)) {
    return;
  }

  // eslint-disable-next-line fp/no-loops
  while (true) {
    yield take("*");
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    if (yield select(selector)) {
      return;
    }
  }
}
