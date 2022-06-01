import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
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

    setTimeout(() => {
      act(() => {
        rendered.update();
      });
      const renderedHtml = rendered.html();

      expect(renderedHtml).toMatch(html);
      done();
    }, 50);
  });

  test("renders the a fallback component", done => {
    const rendered = mount(
      <Lazy
        fallback={<span>Loading...</span>}
        // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/UnknownComponent' o... Remove this comment to see the full error message
        // eslint-disable-next-line import/no-unresolved
        loader={() => import("Components/UnknownComponent")}
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
