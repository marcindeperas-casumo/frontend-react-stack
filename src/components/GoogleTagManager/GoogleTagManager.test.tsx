// @flow
import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useGoogleTagManager, GTMHookProvider } from "./useGoogleTagManager";
import type { GTMScriptParams } from "./GoogleTagManager.types";

jest.useFakeTimers();

const mockedParams: GTMScriptParams = {
  containerId: "GTM-1234",
  dataLayer: {
    someDataLayerVariable: "passedFromContext",
  },
};

const wrapper = ({ children }) => (
  <GTMHookProvider state={mockedParams}>{children}</GTMHookProvider>
);

describe("useGoogleTagManager Hook", () => {
  test("should initialize GTM with the container ID passed and default dataLayer name", () => {
    const params: GTMScriptParams = { containerId: "GTM-1234" };
    const { result } = renderHook(() => useGoogleTagManager());

    act(() => result.current.init({ ...params }));

    act(() => jest.runAllTimers());

    expect(window["dataLayer"]).not.toBeUndefined();
  });

  test("should initialize GTM with initial values", () => {
    const params: GTMScriptParams = {
      dataLayer: {
        myFlagProp: true,
      },
      containerId: "GTM-1234",
    };
    const { result } = renderHook(() => useGoogleTagManager());

    act(() => result.current.init({ ...params }));

    act(() => jest.runAllTimers());

    expect(window["dataLayer"]).not.toBeUndefined();
    expect(window["dataLayer"]).toContainEqual({
      myFlagProp: true,
    });
  });

  test("should track event on GTM", () => {
    const params: GTMScriptParams = { containerId: "GTM-1234" };
    const { result } = renderHook(() => useGoogleTagManager());

    act(() => result.current.init({ ...params }));
    act(() => result.current.trackEvent({ event: "userDeposit" }));

    act(() => jest.runAllTimers());

    expect(window["dataLayer"]).toContainEqual({ event: "userDeposit" });
  });

  test("should track event on GTM with a datalayer variable from context", () => {
    const { result } = renderHook(() => useGoogleTagManager(), { wrapper });

    act(() => result.current.init(mockedParams));
    act(() => result.current.trackEvent({ event: "userDeposit" }));

    act(() => jest.runAllTimers());

    expect(window["dataLayer"]).toContainEqual({ event: "userDeposit" });
    expect(window["dataLayer"]).toContainEqual({
      someDataLayerVariable: "passedFromContext",
    });
  });
});
