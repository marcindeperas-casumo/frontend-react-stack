import React from "react";
import { mount } from "enzyme";
import LazyPortal from "Components/LazyPortal/LazyPortal";

describe("<LazyPortal />", () => {
  const hostElementId = "foo";
  const html = "<span>Foo bar.</span>";

  beforeEach(() => {
    addElement(hostElementId);
  });

  afterEach(() => {
    removeElement(hostElementId);
  });

  test("renders the lazy-loaded component to the DOM element", done => {
    const rendered = mount(
      <LazyPortal
        hostElementId={hostElementId}
        loader={() => import("Components/DangerousHtml")}
        props={{
          html,
        }}
      />
    );

    setImmediate(() => {
      const renderedHtml = rendered.html();
      const domHtml = document.getElementById(hostElementId).innerHTML;

      expect(domHtml).toMatch(html);
      expect(renderedHtml).toMatch(html);
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
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
