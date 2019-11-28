import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HookWrapper } from "Utils/HookWrapper";
import MockStore from "Components/MockStore";
import { waitAndUpdateWrapper } from "Utils";
import { useValuableDetails } from "./useValuableDetails";
import mockValuables from "./__mocks__/Valuables.json";

describe("useValuableDetails", () => {
  const translations = {};
  const onConsumeValuable = jest.fn();
  const mockValuable = mockValuables[0];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MockStore state={{}}>
        <HookWrapper
          hook={useValuableDetails}
          args={[translations, onConsumeValuable]}
        />
      </MockStore>
    );
  });

  test("should return details component if show details is not called", async () => {
    const { showValuableDetails } = wrapper.find("div").props().hook;

    act(() => {
      showValuableDetails(mockValuable);
    });
    await waitAndUpdateWrapper(wrapper);

    expect(wrapper.find("div").props().hook.detailsComponent).not.toBeNull();
  });

  test("should return details component if show details is not called", () => {
    const { showValuableDetails } = wrapper.find("div").props().hook;

    expect(showValuableDetails).not.toBeNull();
  });
});
