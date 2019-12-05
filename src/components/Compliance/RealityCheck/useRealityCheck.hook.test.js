// @flow
import * as React from "react";
import { mount } from "enzyme";
import * as ReactReduxHooks from "react-redux";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import { useRealityCheck } from "./useRealityCheck.hook";

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

describe("useRealityCheck", () => {
  describe("happy path", () => {
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useRealityCheck} args={[]} />
      </MockStore>
    );

    test("fetch page is called only once", () => {
      wrapper.update();
      expect(mockDispatch).toBeCalledWith({
        config: undefined,
        modalId: "REALITY_CHECK_MODAL",
        type: "MODAL/SHOW",
      });
    });
  });
});
