// @flow
import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { shallow, mount } from "enzyme";
import { useComponentQueueState } from "../useComponentQueueState.js";

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
  component3: {
    component: () => <div data-test-id="component3">This is Component 3</div>,
    settings: {
      closeCurrent: true,
    },
  },
};

describe("useComponentQueueState Hook", () => {
  test("queue add and remove", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig })
    );

    act(() => result.current.show("component1"));
    expect(result.current.queue.length).toBe(1);

    act(() => result.current.close());
    expect(result.current.queue.length).toBe(0);
  });

  test("queue with priority", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig })
    );
    const { queue, show } = result.current;

    expect(queue.length).toBe(0);
    act(() => show("component1"));
    act(() => show("component2"));
    expect(result.current.queue.length).toBe(2);

    const CurrentComponent = result.current.queue[0].component;
    const rendered = shallow(<CurrentComponent />);
    expect(rendered.props()["data-test-id"]).toBe("component1");
  });

  test("queue with priority and additional config", () => {});
  test("queue add and forced replace current component", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig })
    );

    act(() => result.current.show("component1"));
    expect(result.current.queue.length).toBe(1);

    let CurrentComponent = result.current.queue[0].component;
    const rendered = shallow(<CurrentComponent />);

    expect(rendered.props()["data-test-id"]).toBe("component1");

    // component3 should replace current one (closeCurrent: true)
    act(() => result.current.show("component3"));
    CurrentComponent = result.current.queue[0].component;
    const rendered2 = shallow(<CurrentComponent />);
    expect(rendered2.props()["data-test-id"]).toBe("component3");
  });

  test("adding new component which wont be rendered, should not cause rerender", () => {
    const { result } = renderHook(() =>
      useComponentQueueState({ config: mockedConfig })
    );

    act(() => result.current.show("component1"));

    const CurrentComponent = result.current.queue[0].component;
    const wrapper = mount(<CurrentComponent />);
    const initInstance = wrapper.getDOMNode();

    act(() => result.current.show("component2"));
    wrapper.update();

    expect(initInstance).toBe(wrapper.getDOMNode());
  });
});
