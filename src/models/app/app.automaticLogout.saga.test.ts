// @flow
import { cloneableGenerator } from "redux-saga/utils";
import { REACT_APP_MODAL } from "Src/constants";
import { showModal, isModalHiddenSelector } from "Models/modal";
import {
  setPlayerLogoutStarted,
  playerLogoutStartedSelector,
} from "Models/player";
import { waitForSelector, navigateToRootWithReload } from "Utils";
import { appAutomaticLogoutSaga } from "Models/app";

describe("appAutomaticLogoutSaga()", () => {
  const generator = cloneableGenerator(appAutomaticLogoutSaga)();
  const delayTest = () => {
    const effect = generator.next();

    expect(effect.value).toBeInstanceOf(Promise);
  };

  test("it selects logoutStarted flag", () => {
    const effect = generator.next();

    expect(effect.value.SELECT.selector).toEqual(playerLogoutStartedSelector);
  });

  test("if logout has already started, it returns", () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '[true]' is not assignable to par... Remove this comment to see the full error message
    const effect = generator.clone().next(true);

    expect(effect.done).toEqual(true);
  });

  test("it sets flag that logout has started", () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '[false]' is not assignable to pa... Remove this comment to see the full error message
    const effect = generator.next(false);
    const expectedAction = setPlayerLogoutStarted();

    expect(effect.value.PUT.action).toEqual(expectedAction);
  });

  test("it triggers showing Slot System Modal", () => {
    const expectedAction = showModal(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT,
      {
        mustAccept: true,
      }
    );
    const action = generator.next().value.PUT.action;

    expect(action).toEqual(expectedAction);
  });

  test("next it triggers delay", delayTest);

  test("next it waits till the modal, if any, has been closed", () => {
    const effect = generator.next();

    expect(effect.value.CALL.fn).toEqual(waitForSelector);
    expect(effect.value.CALL.args).toEqual([isModalHiddenSelector]);
  });

  test("next it calls a function to navigate browser to root", () => {
    const effect = generator.next();

    expect(effect.value.CALL.fn).toEqual(navigateToRootWithReload);
  });

  test("next it's done", () => {
    const effect = generator.next();

    expect(effect.done).toEqual(true);
  });
});
