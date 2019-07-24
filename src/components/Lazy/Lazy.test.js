import React from "react";
import { mount } from "enzyme";
import Lazy from "Components/Lazy";

describe("<Lazy />", () => {
  const html = "<span>Foo bar.</span>";
  const component = "DangerousHtml";

  test("renders the lazy-loaded component", done => {
    const rendered = mount(
      <Lazy
        loader={() => import("Components/DangerousHtml")}
        props={{
          html,
        }}
        namedExport={component}
      />
    );

    setImmediate(() => {
      const renderedHtml = rendered.html();

      expect(renderedHtml).toMatch(html);
      done();
    });
  });

  test("renders the a fallback component", done => {
    const rendered = mount(
      <Lazy
        fallback={<span>Loading...</span>}
        loader={() => import("Components/UnknownComponent")} // eslint-disable-line import/no-unresolved
        props={{
          html,
        }}
        namedExport="UnknownComponent"
      />
    );

    setImmediate(() => {
      const renderedHtml = rendered.html();

      expect(renderedHtml).toMatch("<span>Loading...</span>");
      done();
    });
  });
});
