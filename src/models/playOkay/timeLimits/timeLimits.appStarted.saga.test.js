// @flow
import { put, select, call, take } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";
import { waitForSelector } from "Utils";
import { jurisdictionSelector, playerIdSelector } from "Models/handshake";
import { isFetchingStarted, isFetched } from "Models/fetch";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { types, getAllLimits, loginTimeLimitsSelector } from "Models/playOkay";
import { JURISDICTIONS, REACT_APP_MODAL } from "Src/constants";
import { appStartedSaga } from "./timeLimits.appStarted.saga";

describe("playOkay/timeLimts/appStartedSaga", () => {
  const playerId = "p123";
  const generator = cloneableGenerator(appStartedSaga)();

  test("it should wait for playerId and jurisdiction in Redux store", () => {
    expect(generator.next().value).toEqual(
      call(waitForSelector, playerIdSelector)
    );

    expect(generator.next().value).toEqual(
      call(waitForSelector, jurisdictionSelector)
    );

    expect(generator.next().value).toEqual(select(playerIdSelector));
    expect(generator.next(playerId).value).toEqual(
      select(jurisdictionSelector)
    );
  });

  test("it should exit early if jurisdiction is other than SGA", () => {
    const clonedGenerator = generator.clone();

    expect(clonedGenerator.next(JURISDICTIONS.MGA).done).toEqual(true);
  });

  test("it should proceed if jurisdiction is SGA", () => {
    const effect = generator.next(JURISDICTIONS.SGA);

    expect(effect.done).toEqual(false);

    expect(JSON.stringify(effect.value)).toEqual(
      JSON.stringify(
        select(isFetchingStarted(types.PLAYOK_FETCH_ALL_LIMITS_START))
      )
    );
  });

  describe("if fetch is unfinished or uninitialized", () => {
    let clonedGenerator;

    beforeAll(() => {
      clonedGenerator = generator.clone();
    });

    test("it should start fetching all limits if it's unfetched", () => {
      expect(clonedGenerator.next(false).value).toEqual(
        put(getAllLimits({ playerId }))
      );
    });

    test("it should wait till playOkay limits are fetched if not completed yet", () => {
      const effect = clonedGenerator.next(false);

      expect(JSON.stringify(effect.value)).toEqual(
        JSON.stringify(select(isFetched(types.PLAYOK_FETCH_ALL_LIMITS_START)))
      );

      expect(clonedGenerator.next().value).toEqual(
        take(types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED)
      );
    });
  });

  test("it should not start fetching if fetch is initialized", () => {
    expect(generator.next(true).value.SELECT).toBeInstanceOf(Object);
  });

  test.skip("it should select time limits Redux state if fetch has completed", () => {
    expect(generator.next(true).value).toEqual(select(loginTimeLimitsSelector));
  });

  test.skip("it should wait till any open modal is closed", () => {
    expect(generator.next([]).value).toEqual(
      call(waitForSelector, isModalHiddenSelector)
    );
  });

  test.skip("it should open up non-closable modal if there are no defined time limits", () => {
    expect(generator.next(null).value).toEqual(
      put(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM, { mustAccept: true }))
    );
  });
});
