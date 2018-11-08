import React from "react";
import { mount } from "enzyme";
import WaitForHostElement from "Components/WaitForHostElement";

const HelloSampleComponent = () => "Hello";

jest.useFakeTimers();
let originalConsoleError;
describe("WaitForHostElement", () => {
  beforeEach(() => {
    originalConsoleError = console.error;
    // Since we do not have an injected logger we need to rely on the global
    // console.error.
    console.error = jest.fn();

    const div = document.createElement("div");
    div.setAttribute("id", "foo-id");
    window.domNode = div;
    document.body.appendChild(div);
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.clearAllTimers();
  });

  test("do not render anything if host element is not found", done => {
    mount(
      <WaitForHostElement hostElementId="not-found-id">
        <HelloSampleComponent />
      </WaitForHostElement>,
      {
        attachTo: window.domNode,
      }
    );

    jest.advanceTimersByTime(WaitForHostElement.waitTimeout);

    setImmediate(() => {
      expect(window.domNode.innerHTML).toBe("");
      done();
    });
  });

  test("set error if host element is not available", async done => {
    const rendered = mount(
      <WaitForHostElement hostElementId="not-found-id">
        <HelloSampleComponent />
      </WaitForHostElement>,
      {
        attachTo: window.domNode,
      }
    );

    jest.advanceTimersByTime(WaitForHostElement.waitTimeout);

    setImmediate(() => {
      expect(rendered.state().error).not.toBeNull();
      done();
    });
  });

  test("render component if host element is found", done => {
    mount(
      <WaitForHostElement hostElementId="foo-id">
        <HelloSampleComponent />
      </WaitForHostElement>,
      {
        attachTo: window.domNode,
      }
    );

    jest.advanceTimersByTime(WaitForHostElement.waitTimeout);

    setImmediate(() => {
      expect(window.domNode.innerHTML).toBe("Hello");
      done();
    });
  });

  test("show an error log when the host element is not found", done => {
    const rendered = mount(
      <WaitForHostElement hostElementId="not-found-id">
        <HelloSampleComponent />
      </WaitForHostElement>,
      {
        attachTo: window.domNode,
      }
    );

    jest.advanceTimersByTime(WaitForHostElement.waitTimeout);

    setImmediate(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        rendered.state().error.message
      );
      done();
    });
  });
});
