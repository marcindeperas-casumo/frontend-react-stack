import React from "react";
import { mount } from "enzyme";
import { WaitForHostElement } from "Components/WaitForHostElement";

const HelloSampleComponent = () => "Hello";

describe("WaitForHostElement", () => {
  beforeEach(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "foo-id");
    window.domNode = div;
    document.body.appendChild(div);
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

    setImmediate(() => {
      expect(window.domNode.innerHTML).toBe("");
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

    setImmediate(() => {
      expect(window.domNode.innerHTML).toBe("Hello");
      done();
    });
  });
});
