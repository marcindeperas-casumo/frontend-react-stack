import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { call, put } from "redux-saga/effects";
import { clearSearchResultsSaga } from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/gameSearch/clearSearchResultsSaga", () => {
  test("clearSearchResultsSaga clears games array gameList entity with id GameSearch", () => {
    const entities = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: [],
      },
    };
    const generator = clearSearchResultsSaga();

    expect(generator.next().value).toEqual(call(normalizeData, entities));

    expect(generator.next({ entities }).value).toEqual(
      put(updateEntity(entities))
    );

    expect(generator.next().done).toBe(true);
  });
});
