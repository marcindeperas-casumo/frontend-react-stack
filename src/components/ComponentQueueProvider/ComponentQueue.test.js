// @flow
import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useComponentQueueState } from "./ComponentQueue.hooks";

jest.useFakeTimers();

const mockedConfig = {
  mapping: {
    component1: {
      component: () => <div data-test-id="component1">This is Component 1</div>,
      settings: {
        priority: 2,
      },
    },
    component2: {
      component: () => <div data-test-id="component2">This is Component 2</div>,
      settings: {
        priority: 1,
      },
    },
  },
};

describe("useComponentQueueState Hook", () => {
  test("queue add and remove", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig.mapping })
    );

    act(() => result.current.show("component1"));

    act(() => jest.runAllTimers());

    expect(result.current.queue.length).toBe(1);

    act(() => result.current.close());

    act(() => jest.runAllTimers());

    expect(result.current.queue.length).toBe(0);
  });

  test("queue with priority", () => {});
  test("queue with priority and additional config", () => {});
  test("stack add and remove", () => {});
  test("stack add and remove", () => {});
});
