// @flow
import * as React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { waitAndUpdateWrapper, getCacheWithIntrospections } from "Utils";
import { HookWrapper } from "Utils/HookWrapper";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { usePlayerValuableList } from "./usePlayerValuableList";

describe("usePlayerValuableList", () => {
  test("should refetch when VALUABLES/ITEM_CREATED event is received", async () => {
    let refetched = false;
    const m = [
      mocks.mockedValuables[0],
      {
        request: mocks.mockedValuables[0].request,
        result: () => {
          refetched = true;
          return mocks.mockedValuables[0].result;
        },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={m} cache={getCacheWithIntrospections()}>
        <HookWrapper hook={usePlayerValuableList} args={[]} />
      </MockedProvider>
    );
    await waitAndUpdateWrapper(wrapper);
    expect(refetched).toBe(false);

    act(() => {
      bridge.emit(REACT_APP_EVENT_ON_CALLBACK, {
        event: KO_EVENTS.VALUABLES.ITEM_CREATED,
        data: {
          success: true,
        },
      });
    });
    await waitAndUpdateWrapper(wrapper);
    expect(refetched).toBe(true);
  });
});
