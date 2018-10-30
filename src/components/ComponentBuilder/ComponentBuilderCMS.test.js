import React from "react";
import { shallow } from "enzyme";
import ComponentBuilderCMS from "Components/ComponentBuilder/ComponentBuilderCMS";

const componentDefinitions = [
  { acf_fc_layout: "GAMES_LIST", listId: "foo" },
  { acf_fc_layout: "HTML_CONTENT", html: "<div>Foo bar.</div>" },
];

describe("ComponentBuilderCMS", () => {
  test("fetches the CMS page if it is not in the store", () => {
    const fetch = jest.fn();

    shallow(
      <ComponentBuilderCMS
        componentDefinitions={componentDefinitions}
        shouldFetch={true}
        fetch={fetch}
      />
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("does not start fetching the CMS page if it is already in the store", () => {
    const fetch = jest.fn();

    shallow(
      <ComponentBuilderCMS
        componentDefinitions={componentDefinitions}
        shouldFetch={false}
        fetch={fetch}
      />
    );

    expect(fetch).not.toHaveBeenCalled();
  });
});
