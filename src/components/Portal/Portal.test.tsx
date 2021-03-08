import React from "react";
import { mount } from "enzyme";
import Portal from "./Portal";

describe("Portal", () => {
  const hostElementId = "foo";
  const SampleComponent = () => <div>CONTENT</div>;

  beforeEach(() => {
    addElement(hostElementId);
  });

  afterEach(() => {
    removeElement(hostElementId);
  });

  test("renders the children to the target host element", done => {
    const rendered = mount(
      <Portal hostElementId={hostElementId}>
        <SampleComponent />
      </Portal>
    );

    setImmediate(() => {
      const renderedHtml = rendered.html();
      const domHtml = document.getElementById(hostElementId).innerHTML;

      expect(renderedHtml).toMatch("<div>CONTENT</div>");
      expect(domHtml).toMatch("<div>CONTENT</div>");
      done();
    });
  });

  test("removes the element after unmounting", done => {
    const rendered = mount(
      <Portal hostElementId={hostElementId}>
        <SampleComponent />
      </Portal>
    );

    setImmediate(() => {
      const hostElement = document.getElementById(hostElementId);

      rendered.unmount();
      expect(hostElement.hasChildNodes()).toBeFalsy();
      done();
    });
  });

  test("clears the host element before by default", done => {
    mount(
      <Portal hostElementId={hostElementId}>
        <SampleComponent />
      </Portal>
    );

    setImmediate(() => {
      const html = document.getElementById(hostElementId).innerHTML;

      expect(html).not.toMatch("<div>DEFAULT_CONTENT</div>");
      done();
    });
  });

  test("does not clear the host element if specified", done => {
    mount(
      <Portal clearElement={false} hostElementId={hostElementId}>
        <SampleComponent />
      </Portal>
    );

    setImmediate(() => {
      const html = document.getElementById(hostElementId).innerHTML;

      expect(html).toMatch("<div>DEFAULT_CONTENT</div>");
      done();
    });
  });

  test("shows a fallback if specified", done => {
    const Fallback = () => <div>FALLBACK</div>;
    const rendered = mount(
      <Portal
        hostElementId={hostElementId}
        fallback={<Fallback />}
        showFallback={true}
      >
        <SampleComponent />
      </Portal>
    );

    setImmediate(() => {
      expect(rendered.html()).toMatch("<div>FALLBACK</div>");
      expect(rendered.html()).not.toMatch("<div>CONTENT</div>");
      done();
    });
  });

  test("does not show the fallback if it is specified not to", done => {
    const Fallback = () => <div>FALLBACK</div>;
    const rendered = mount(
      <Portal
        hostElementId={hostElementId}
        fallback={<Fallback />}
        showFallback={false}
      >
        <SampleComponent />
      </Portal>
    );

    setImmediate(() => {
      expect(rendered.html()).not.toMatch("<div>FALLBACK</div>");
      expect(rendered.html()).toMatch("<div>CONTENT</div>");
      done();
    });
  });
});

function addElement(id) {
  const div = document.createElement("div");

  div.setAttribute("id", id);
  div.innerHTML = "<div>DEFAULT_CONTENT</div>";
  document.body.appendChild(div);
}

function removeElement(id) {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
