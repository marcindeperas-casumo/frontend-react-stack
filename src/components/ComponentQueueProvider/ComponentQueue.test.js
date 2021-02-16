// @flow
import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { shallow } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import { useComponentQueueState } from "./ComponentQueue.hooks";

jest.useFakeTimers();

const mockedConfig = {
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
};

describe("useComponentQueueState Hook", () => {
  test("queue add and remove", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig })
    );

    act(() => result.current.show("component1"));

    wait().then(() => {
      expect(result.current.queue.length).toBe(1);
    });

    act(() => result.current.close());

    wait().then(() => {
      expect(result.current.queue.length).toBe(0);
    });
  });

  test("queue with priority", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig })
    );
    const { queue, show } = result.current;

    expect(queue.length).toBe(0);

    wait().then(() => {
      act(() => show("component1"));
      act(() => show("component2"));
      expect(result.current.queue.length).toBe(2);

      const CurrentComponent = result.current.queue[0].component;
      const rendered = shallow(<CurrentComponent />);
      expect(rendered.find({ "data-test-id": "component2" }).length).toBe(1);
    });
  });

  test("queue with priority and additional config", () => {});
  test("stack add and remove", () => {});
});
