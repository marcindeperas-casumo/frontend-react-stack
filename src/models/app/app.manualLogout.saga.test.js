// @flow
import { cloneableGenerator } from "redux-saga/utils";
import { REACT_APP_MODAL } from "Src/constants";
import { setPlayerLogoutStarted } from "Models/player";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { waitForSelector, navigateToRootWithReload } from "Utils";
import { appManualLogoutSaga, logout } from "Models/app";

describe("appManualLogoutSaga()", () => {
  const clonedGenerator = cloneableGenerator(appManualLogoutSaga)();
  const delayTest = () => {
    const effect = clonedGenerator.next();

    expect(effect.value).toBeInstanceOf(Promise);
  };

  test("it sets flag that logout has started", () => {
    const effect = clonedGenerator.next();
    const expectedAction = setPlayerLogoutStarted();

    expect(effect.value.PUT.action).toEqual(expectedAction);
  });

  test("it triggers showing Slot System Modal", () => {
    const expectedAction = showModal(
      REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT,
      {
        mustAccept: true,
      }
    );
    const action = clonedGenerator.next().value.PUT.action;

    expect(action).toEqual(expectedAction);
  });

  test("next it triggers delay", delayTest);

  test("next it waits till the modal, if any, has been closed", () => {
    const effect = clonedGenerator.next();

    expect(effect.value.CALL.fn).toEqual(waitForSelector);
    expect(effect.value.CALL.args).toEqual([isModalHiddenSelector]);
  });

  test("next it dispatches logout store action", () => {
    const effect = clonedGenerator.next();

    expect(effect.value.PUT.action).toEqual(logout());
  });

  test("next it triggers delay", delayTest);

  test("next it calls a function to navigate browser to root", () => {
    const effect = clonedGenerator.next();

    expect(effect.value.CALL.fn).toEqual(navigateToRootWithReload);
  });

  test("next it's done", () => {
    const effect = clonedGenerator.next();

    expect(effect.done).toEqual(true);
  });
});
