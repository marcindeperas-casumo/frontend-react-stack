import { requestError } from "Models/fetch";
import { waitForSelector } from "Utils";
import {
  fetchGameProviders,
  areGameProvidersLoaded,
  types as gameProviderTypes,
} from "Models/gameProviders";
import { call, put } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";
import { fetchGamesByProviderSaga } from "./games.saga.fetchGamesByProvider";

describe("Models/Games/Sagas", () => {
  describe("fetchGamesByProvider()", () => {
    const provider = "netent";
    const page = 1;
    const pageSize = 50;
    let generator;

    beforeEach(() => {
      generator = cloneableGenerator(fetchGamesByProviderSaga)({
        provider,
        page,
        pageSize,
      });
    });

    test("should abort when provider is empty", () => {
      const areProvidersLoaded = false;
      generator.next();
      expect(generator.next(areProvidersLoaded).value).toEqual(
        put(fetchGameProviders())
      );
      expect(generator.next().value).toEqual(
        call(waitForSelector, areGameProvidersLoaded)
      );
      const emptyProvider = {};
      generator.next();

      expect(generator.next(emptyProvider).value).toEqual(
        put(
          requestError(
            gameProviderTypes.GET_GAME_PROVIDER_ERROR,
            "Provider error"
          )
        )
      );
    });
  });
});
