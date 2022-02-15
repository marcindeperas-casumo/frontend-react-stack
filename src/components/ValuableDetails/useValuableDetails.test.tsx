import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import * as ReactRedux from "react-redux";
import { HookWrapper, getHookValue } from "Utils/HookWrapper";
import MockStore from "Components/MockStore";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { useValuableDetails } from "./useValuableDetails";
import mockValuables from "./__mocks__/Valuables.json";

describe.skip("useValuableDetails", () => {
  const translations = { foo: "bar" };
  const onConsumeValuable = jest.fn();
  const mockValuable = mockValuables[0];
  const useDispatchMock = jest.spyOn(ReactRedux, "useDispatch");

  beforeEach(() => {
    useDispatchMock.mockClear();
  });

  test("should call showModal on change of valuable", async () => {
    const wrapper = mount(
      <MockStore>
        <HookWrapper
          hook={useValuableDetails}
          args={[translations, onConsumeValuable]}
        />
      </MockStore>
    );

    await waitAndUpdateWrapper(wrapper);

    const setSelectedValuable = getHookValue(wrapper);

    act(() => {
      setSelectedValuable(mockValuable);
    });

    await waitAndUpdateWrapper(wrapper);

    expect(useDispatchMock).toHaveBeenCalledTimes(1);
  });

  test("should not call showModal when valuable is not selected", async () => {
    const wrapper = mount(
      <MockStore>
        <HookWrapper
          hook={useValuableDetails}
          args={[translations, onConsumeValuable]}
        />
      </MockStore>
    );

    await waitAndUpdateWrapper(wrapper);

    const setSelectedValuable = getHookValue(wrapper);

    act(() => {
      setSelectedValuable(null);
    });

    await waitAndUpdateWrapper(wrapper);

    expect(useDispatchMock).not.toHaveBeenCalled();
  });
});
