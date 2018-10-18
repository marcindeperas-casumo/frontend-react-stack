import React from "react";
import { mount } from "enzyme";
import DangerousHtml from "./DangerousHtml";

describe("<DangerousHtml />", () => {
  test("renders out a html", () => {
    const html = "Monkey&#8217;s Millions";
    const rendered = mount(<DangerousHtml html={html} />);
    const expectedText = "Monkey’s Millions";

    expect(rendered.text()).toMatch(expectedText);
  });

  test("renders with a <span> by default", () => {
    const html = "Monkey&#8217;s Millions";
    const rendered = mount(<DangerousHtml html={html} />);

    expect(rendered.html()).toMatch("span");
  });

  test("renders with the element passed in", () => {
    const html = "Monkey&#8217;s Millions";
    const rendered = mount(<DangerousHtml html={html} element="span" />);

    expect(rendered.html()).toMatch("span");
  });
});
