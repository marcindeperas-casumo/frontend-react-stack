import { cloneableGenerator } from "redux-saga/utils";
import { select, put } from "redux-saga/effects";
import { sessionIdSelector } from "Models/handshake";
import {
  gameSearchCountSaga,
  clearSearch,
  fetchGameSearchCount,
  initFetchGameSearchPage,
} from "Models/gameSearch";

describe("Models/GameSearch/gameSearchCountSaga", () => {
  test("gameSearchCountSaga no query", () => {
    const action = { query: "" };
    const gen = gameSearchCountSaga(action);

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchCountSaga query just spaces", () => {
    const action = { query: "    " };
    const gen = gameSearchCountSaga(action);

    expect(gen.next().value).toEqual(put(clearSearch()));
    expect(gen.next().done).toBe(true);
  });

  test("gameSearchSaga", () => {
    const sessionId = "123";
    const action = { query: "startburst" };
    const gen = cloneableGenerator(gameSearchCountSaga)(action);

    expect(gen.next().value).toEqual(select(sessionIdSelector));

    expect(gen.next(sessionId).value).toEqual(
      put(
        fetchGameSearchCount({
          sessionId,
          query: action.query,
        })
      )
    );

    expect(gen.next().value).toEqual(
      put(
        initFetchGameSearchPage({
          startIndex: 0,
          pageSize: 40,
          query: action.query,
        })
      )
    );
  });
});
