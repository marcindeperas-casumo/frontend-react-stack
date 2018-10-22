import { actions as gamesActions, types } from "Reducers/games";
import { fetchGamesHandshake } from "Reducers/handshake";
import {
  gamesHandshakeSelector,
  isGamesHandshakeLoaded,
} from "Reducers/handshake/selectors";
import { actions as schemaActions } from "Reducers/schema";
import { normalizeData } from "Reducers/schema/schema";
import { call, put, select, take } from "redux-saga/effects";
import { fetchGameListSaga, launchGameSaga } from "Sagas/games";
import { waitForSelector } from "Sagas/utils";
import { launchGame } from "Services/LaunchGameService";

describe("Launch game saga", () => {
  test("calling launchGame service", () => {
    const slug = "foo-slug";
    const generator = launchGameSaga({
      slug,
    });

    expect(generator.next().value).toEqual(call(launchGame, { slug }));
  });
});

describe("Fetch game list saga", () => {
  test("success flow", () => {
    const generator = fetchGameListSaga();

    const platform = "mobile";
    const country = "mt";
    const currency = "EUR";
    const market = "ROW";
    const playerId = "playerId-1";
    const handshake = { foo: "bar" };

    generator.next();
    generator.next(country);
    generator.next(currency);
    generator.next(market);

    expect(generator.next(playerId).value).toEqual(
      put(fetchGamesHandshake({ country }))
    );

    expect(generator.next().value).toEqual(
      call(waitForSelector, isGamesHandshakeLoaded)
    );

    expect(generator.next().value).toEqual(select(gamesHandshakeSelector));
    expect(generator.next(handshake).value).toEqual(
      put(
        gamesActions.fetchTopLists({
          handshake,
          country,
          platform,
          currency,
          market,
          playerId,
        })
      )
    );

    expect(generator.next().value).toEqual(
      take(types.FETCH_TOP_LISTS_COMPLETE)
    );

    const response = { foo: "response" };
    expect(generator.next({ response }).value).toEqual(
      call(normalizeData, response)
    );

    const entities = { someEntity: { id: 1 } };
    expect(generator.next({ entities }).value).toEqual(
      put(schemaActions.updateEntity(entities))
    );
  });
});
