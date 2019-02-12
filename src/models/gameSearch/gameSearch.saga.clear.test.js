import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { call, put } from "redux-saga/effects";
import { clearSearchSaga } from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/Saga", () => {
  test("clearSearchSaga()", () => {
    const expected = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: GAME_LIST_IDS.GAME_SEARCH,
        games: [],
      },
    };
    const generator = clearSearchSaga();

    expect(generator.next().value).toEqual(call(normalizeData, expected));

    const entities = { someEntity: { id: 1 } };

    expect(generator.next({ entities }).value).toEqual(
      put(updateEntity(entities))
    );

    expect(generator.next().done).toBe(true);
  });
});
