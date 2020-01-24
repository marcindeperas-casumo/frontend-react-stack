// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useIsSidebarOpen } from "./useIsSidebarOpen";

describe("useIsSidebarOpen", () => {
  test("returns FALSE if sidebar is not open", () => {
    const wrapper = mount(
      <MockStore
        state={{
          sidebar: {
            open: false,
          },
        }}
      >
        <HookWrapper hook={useIsSidebarOpen} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toBeFalsy();
  });

  test("returns TRUE if sidebar is open", () => {
    const wrapper = mount(
      <MockStore
        state={{
          sidebar: {
            open: true,
          },
        }}
      >
        <HookWrapper hook={useIsSidebarOpen} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toBeTruthy();
  });
});
