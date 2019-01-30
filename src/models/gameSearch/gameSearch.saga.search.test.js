import { cloneableGenerator } from "redux-saga/utils";
import { normalizeData, updateEntity } from "Models/schema";
import { select, put, take, call } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import {
  types,
  gameSearchEntities,
  fetchQuerySearch,
  fetchQuerySaga,
  clearSearchSaga,
  fetchLatestPlayedSaga,
} from "Models/gameSearch";

describe("Models/GameSearch/Saga", () => {
  const country = "gb";
  const platform = "mobile";

  test("fetchQuerySaga no query", () => {
    const action = { q: "" };
    const gen = fetchQuerySaga(action);

    const entities = gameSearchEntities({ loading: true });

    expect(gen.next().value).toEqual(select(countrySelector));
    expect(gen.next(country).value).toEqual(call(normalizeData, entities));
    expect(gen.next({ entities }).value).toEqual(put(updateEntity(entities)));
    expect(gen.next().value).toEqual(call(clearSearchSaga));
    expect(gen.next().done).toBe(true);
  });

  test("fetchQuerySaga", () => {
    const action = { q: "startburst" };
    const gen = cloneableGenerator(fetchQuerySaga)(action);

    const entities = gameSearchEntities({ loading: true });

    expect(gen.next().value).toEqual(select(countrySelector));
    expect(gen.next(country).value).toEqual(call(normalizeData, entities));
    expect(gen.next({ entities }).value).toEqual(put(updateEntity(entities)));

    expect(gen.next({ entities }).value).toEqual(
      put(
        fetchQuerySearch({
          platform,
          country,
          q: action.q,
        })
      )
    );

    expect(gen.next().value).toEqual(take(types.GAME_SEARCH_FETCH_COMPLETE));

    // clone generator for noMatch scenario
    const noMatchGen = gen.clone();
    const entitiesNoMatch = gameSearchEntities({ noMatch: true });

    expect(noMatchGen.next({ response: { games: [] } }).value).toEqual(
      call(normalizeData, entitiesNoMatch)
    );
    expect(noMatchGen.next({ entities: entitiesNoMatch }).value).toEqual(
      put(updateEntity(entitiesNoMatch))
    );
    expect(noMatchGen.next().value).toEqual(call(fetchLatestPlayedSaga));
    expect(noMatchGen.next().done).toBe(true);

    // clone genrator for direct hit scenario
    const directHitGen = gen.clone();
    const games = ["fooo"];
    const entityResults = gameSearchEntities({ games, query: action.q });

    expect(directHitGen.next({ response: { games } }).value).toEqual(
      call(normalizeData, entityResults)
    );

    expect(directHitGen.next({ entities: entityResults }).value).toEqual(
      put(updateEntity(entityResults))
    );
    expect(directHitGen.next().value).toEqual(call(fetchLatestPlayedSaga));
    expect(directHitGen.next().done).toBe(true);

    // otherwise finish saga
    const entitiesResults = gameSearchEntities({
      games: ["foo", "bar"],
      query: action.q,
    });

    expect(gen.next({ response: { games: ["foo", "bar"] } }).value).toEqual(
      call(normalizeData, entitiesResults)
    );
    expect(gen.next({ entities: entitiesResults }).value).toEqual(
      put(updateEntity(entitiesResults))
    );
    expect(noMatchGen.next().done).toBe(true);
  });
});
