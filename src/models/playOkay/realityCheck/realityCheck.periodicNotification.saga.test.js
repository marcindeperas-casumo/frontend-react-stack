// @flow
import { cloneableGenerator } from "redux-saga/utils";
import { waitForSelector } from "Utils";
import { showModal } from "Models/modal";
import { jurisdictionSelector } from "Models/handshake";
import { REACT_APP_MODAL, JURISDICTIONS } from "Src/constants";
import { periodicNotificationSaga } from "./realityCheck.periodicNotification.saga";

describe("realityCheck/periodicNotificationSaga", () => {
  let generator;

  beforeAll(() => {
    generator = cloneableGenerator(periodicNotificationSaga)();
  });

  test("it waits till when jurisdictionSelector returns non-empty value", () => {
    const effect = generator.next();

    expect(effect.value.CALL).toMatchObject({
      fn: waitForSelector,
      args: [jurisdictionSelector],
    });
  });

  test("it selects jurisdiction from the store", () => {
    const effect = generator.next();

    expect(effect.value.SELECT.selector).toEqual(jurisdictionSelector);
  });

  test("it returns early if jurisdiction is other than SGA", () => {
    const clonedGen = generator.clone();
    const effect = clonedGen.next(JURISDICTIONS.MGA);

    expect(effect.done).toEqual(true);
  });

  test("it launches modal if player is in SGA jurisdiction", () => {
    const effect = generator.next(JURISDICTIONS.SGA);

    expect(effect.value.PUT.action).toEqual(
      showModal(REACT_APP_MODAL.ID.REALITY_CHECK)
    );
  });

  test("then saga ends", () => {
    expect(generator.next().done).toEqual(true);
  });
});
