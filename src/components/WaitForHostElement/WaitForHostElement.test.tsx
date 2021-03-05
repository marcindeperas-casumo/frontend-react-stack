import React from "react";
import { mount } from "enzyme";
import { WaitForHostElement } from "Components/WaitForHostElement";

const HelloSampleComponent = () => "Hello";

describe("WaitForHostElement", () => {
  beforeEach(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "foo-id");
    (window as any).domNode = div;
    document.body.appendChild(div);
  });
  test("do not render anything if host element is not found", done => {
    mount(
      <WaitForHostElement hostElementId="not-found-id">
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'HelloSampleComponent' cannot be used as a JSX com... Remove this comment to see the full error message */}
        <HelloSampleComponent />
      </WaitForHostElement>,
      {
        attachTo: (window as any).domNode,
      }
    );
    setImmediate(() => {
      expect((window as any).domNode.innerHTML).toBe("");
      done();
    });
  });
  test("render component if host element is found", done => {
    mount(
      <WaitForHostElement hostElementId="foo-id">
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'HelloSampleComponent' cannot be used as a JSX com... Remove this comment to see the full error message */}
        <HelloSampleComponent />
      </WaitForHostElement>,
      {
        attachTo: (window as any).domNode,
      }
    );
    setImmediate(() => {
      expect((window as any).domNode.innerHTML).toBe("Hello");
      done();
    });
  });
});
