import React from "react";
import { mount } from "enzyme";
import Html from "./Html";

describe("<Html />", () => {
  test("renders out a html", () => {
    const html = "Monkey&#8217;s Millions";
    const rendered = mount(<Html html={html} />);
    const expectedText = "Monkey’s Millions";

    expect(rendered.text()).toMatch(expectedText);
  });
});
