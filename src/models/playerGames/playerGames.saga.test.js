import { cloneableGenerator } from "redux-saga/utils";
import { all, call, select } from "redux-saga/effects";
import {
  fetchPlayerGamesSaga,
  fetchPlayerGamesPageSaga,
  playerGamesPagesLoaded,
} from "Models/playerGames";

describe("Models/PlayerGames/Saga", () => {
  test("fetchPlayerGamesSaga()", () => {
    const page = 0;
    const pageSize = 100;
    const pageLoaded = true;
    const gen = cloneableGenerator(fetchPlayerGamesSaga)({
      startIndex: 0,
      pageSize,
    });

    const pageLoadedGen = gen.clone();

    pageLoadedGen.next();
    expect(pageLoadedGen.next(pageLoaded).done).toBe(true);

    gen.next();

    expect(gen.next().value).toEqual(
      call(fetchPlayerGamesPageSaga, { page, pageSize })
    );

    expect(gen.next().value).toEqual(select(playerGamesPagesLoaded));

    const pagesLoaded = [0, 1];
    const previousPagesLoaded = [false, true];

    gen.next(pagesLoaded);

    expect(gen.next(previousPagesLoaded).value).toEqual(
      all(
        previousPagesLoaded.map(
          (v, i) => !v && call(fetchPlayerGamesPageSaga, { page: i, pageSize })
        )
      )
    );
  });
});
