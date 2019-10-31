import { put } from "redux-saga/effects";
import {
  resetGameSearchScrollPositionSaga,
  gameSearchScrollPositionReset,
} from "Models/gameSearch";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

describe("Models/gameSearch/resetGameSearchScrollPositionSaga", () => {
  beforeAll(() => {
    const div = document.createElement("div");
    div.id = ROOT_SCROLL_ELEMENT_ID;
    div.scrollTop = 1;
    document.body.appendChild(div);
  });

  test("resetGameSearchScrollPositionSaga resets the root scroll element position", () => {
    const query = "test";
    const generator = resetGameSearchScrollPositionSaga({ query });

    expect(generator.next().value).toEqual(
      put(gameSearchScrollPositionReset())
    );

    expect(generator.next().done).toBe(true);
  });
});
