import { MockedProvider } from "@apollo/client/testing";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import {
  waitAndUpdateWrapper,
  getCacheWithIntrospections,
} from "Utils/apolloTestUtils";
import { HookWrapper } from "Utils/HookWrapper";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import bridge from "Src/DurandalReactBridge";
import { REACT_APP_EVENT_ON_CALLBACK, KO_EVENTS } from "Src/constants";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { usePlayerValuableList } from "./usePlayerValuableList";

describe("usePlayerValuableList", () => {
  xtest("should refetch when VALUABLES/ITEM_CREATED event is received", async () => {
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
      <MockStore state={defaultState}>
        <MockedProvider mocks={m} cache={getCacheWithIntrospections()}>
          <HookWrapper hook={usePlayerValuableList} args={[]} />
        </MockedProvider>
      </MockStore>
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
