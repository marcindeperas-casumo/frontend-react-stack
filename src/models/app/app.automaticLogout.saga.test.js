// @flow
import { cloneableGenerator } from "redux-saga/utils";
import { REACT_APP_MODAL } from "Src/constants";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { waitForSelector, navigateToRootWithReload } from "Utils";
import { appAutomaticLogoutSaga } from "Models/app";

describe("appAutomaticLogoutSaga()", () => {
  const clonedGenerator = cloneableGenerator(appAutomaticLogoutSaga)();
  const delayTest = () => {
    const effect = clonedGenerator.next();

    expect(effect.value).toBeInstanceOf(Promise);
  };

  test("it triggers showing Slot System Modal first", () => {
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

  test("next it calls a function to navigate browser to root", () => {
    const effect = clonedGenerator.next();

    expect(effect.value.CALL.fn).toEqual(navigateToRootWithReload);
  });

  test("next it's done", () => {
    const effect = clonedGenerator.next();

    expect(effect.done).toEqual(true);
  });
});
