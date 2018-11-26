import React from "react";
import { shallow } from "enzyme";
import ComponentBuilderCMS from "Components/ComponentBuilder/ComponentBuilderCMS";

const componentDefinitions = [
  { acf_fc_layout: "GAMES_LIST", listId: "foo" },
  { acf_fc_layout: "HTML_CONTENT", html: "<div>Foo bar.</div>" },
];

describe("ComponentBuilderCMS", () => {
  test("tries to fetch the CMS page on mount", () => {
    const fetch = jest.fn();

    shallow(
      <ComponentBuilderCMS
        componentDefinitions={componentDefinitions}
        fetch={fetch}
      />
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
