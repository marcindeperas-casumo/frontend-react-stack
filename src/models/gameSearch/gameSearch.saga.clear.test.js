import { ENTITY_KEYS, updateEntity, normalizeData } from "Models/schema";
import { call, all, put } from "redux-saga/effects";
import {
  clearSearchResultsSaga,
  getgameSearchListIdByPage,
} from "Models/gameSearch";

describe("Models/gameSearch/clearSearchResultsSaga", () => {
  test("clearSearchResultsSaga clears games array gameList entity with id GameSearch", () => {
    const generator = clearSearchResultsSaga();

    const pagesLoaded = [0];
    const entitiesList = all(
      pagesLoaded.map(page =>
        call(normalizeData, {
          [ENTITY_KEYS.GAME_LIST]: {
            id: getgameSearchListIdByPage(page),
            games: [],
          },
        })
      )
    );

    const entitiesListYieled = [
      {
        entities: {
          gameList: {
            gameSearchPage0: {
              id: "gameSearchPage0",
              games: [],
            },
          },
        },
      },
    ];

    generator.next(pagesLoaded);

    expect(generator.next(pagesLoaded).value).toEqual(entitiesList);

    expect(generator.next(entitiesListYieled).value).toEqual(
      all(entitiesListYieled.map(({ entities }) => put(updateEntity(entities))))
    );

    expect(generator.next().done).toBe(true);
  });
});
