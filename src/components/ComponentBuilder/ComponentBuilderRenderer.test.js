import React from "react";
import { shallow } from "enzyme";
import { ComponentBuilderRenderer } from "./ComponentBuilderRenderer";

const componentDefinitions = [
  { acf_fc_layout: "GAMES_LIST", listId: "foo" },
  { acf_fc_layout: "HTML_CONTENT", html: "<div>Foo bar.</div>" },
];

describe("ComponentBuilderRenderer", () => {
  test("renders components based on component definitions", () => {
    const rendered = shallow(
      <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
    );

    expect(rendered.find("GameListHorizontalCMS")).toHaveLength(1);
    expect(rendered.find("ContentHtml")).toHaveLength(1);
  });

  test("renders nothing if the component definitions is empty", () => {
    const rendered = shallow(
      <ComponentBuilderRenderer componentDefinitions={[]} />
    );

    expect(rendered.html()).toBeNull();
  });
});
