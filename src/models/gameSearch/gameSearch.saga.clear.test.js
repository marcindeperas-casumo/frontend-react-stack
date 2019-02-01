import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { call, put } from "redux-saga/effects";
import { listTypes, clearSearchSaga } from "Models/gameSearch";

describe("Models/GameSearch/Saga", () => {
  test("clearSearchSaga()", () => {
    const expected = {
      [ENTITY_KEYS.GAME_LIST]: {
        id: listTypes.GAME_SEARCH,
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
