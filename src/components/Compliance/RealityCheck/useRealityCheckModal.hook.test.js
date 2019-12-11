// @flow
import * as React from "react";
import { mount } from "enzyme";
import * as ReactReduxHooks from "react-redux";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import { waitAndUpdateWrapper } from "Utils";
import { type } from "Models/modal";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_MODAL_HIDDEN } from "Src/constants";
import { useRealityCheckModal } from "./useRealityCheckModal.hook";

const state = {
  player: {
    realityCheck: {
      notEmpty: "something",
    },
  },
};

let mockDispatch;

jest
  .spyOn(ReactReduxHooks, "useDispatch")
  .mockImplementation(() => (mockDispatch = jest.fn()));

describe("useRealityCheckModal", () => {
  const pauseGame = jest.fn(() => Promise.resolve());
  const resumeGame = jest.fn();
  const wrapper = mount(
    <MockStore state={state}>
      <HookWrapper
        hook={useRealityCheckModal}
        args={[{ pauseGame, resumeGame }]}
      />
    </MockStore>
  );

  const data = {
    modalId: "REALITY_CHECK_MODAL",
    result: class {},
    returnCode: "ACCEPTED",
    ev: "KO_APP_EVENT/modalHidden",
  };
  bridge.emit(KO_APP_EVENT_MODAL_HIDDEN, { data });

  it(`calls dispatch action type ${type.show} with config`, async () => {
    await waitAndUpdateWrapper(wrapper);
    expect(mockDispatch).toBeCalledWith({
      config: {
        mustAccept: true,
      },
      modalId: "REALITY_CHECK_MODAL",
      type: type.show,
    });
  });

  it("calls pauseGame function promise", () => {
    expect(pauseGame).toBeCalledTimes(1);
  });

  it("calls resumeGame", () => {
    expect(resumeGame).toBeCalledTimes(1);
  });
});
