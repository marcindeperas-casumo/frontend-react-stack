import React from "react";
import { shallow, mount } from "enzyme";
import { SearchNotFound } from "./SearchNotFound";

describe("SearchNotFound", () => {
  let notFoundCMS;

  beforeEach(() => {
    notFoundCMS = {
      image:
        "https://cms.casumo.com/wp-content/uploads/2019/01/search_not_found.png",
      title: "No results found 🤷🏻‍♂️",
      content: "Find another game or continue playing your last played",
    };
  });

  test("should render a Media component", () => {
    const rendered = shallow(
      <SearchNotFound
        image={notFoundCMS.image}
        title={notFoundCMS.title}
        content={notFoundCMS.content}
      />
    );

    expect(rendered.find("Media").length).toBe(1);
  });

  test("should render an image with the source passed as a prop", () => {
    const rendered = mount(
      <SearchNotFound
        image={notFoundCMS.image}
        title={notFoundCMS.title}
        content={notFoundCMS.content}
      />
    );

    expect(rendered.find("img").prop("src")).toBe(notFoundCMS.image);
  });

  test("should render the title with the string passed as a prop", () => {
    const rendered = mount(
      <SearchNotFound
        image={notFoundCMS.image}
        title={notFoundCMS.title}
        content={notFoundCMS.content}
      />
    );

    expect(
      rendered
        .find("Text")
        .first()
        .find("span")
        .text()
    ).toBe(notFoundCMS.title);
  });

  test("should render the content with the string passed as a prop", () => {
    const rendered = mount(
      <SearchNotFound
        image={notFoundCMS.image}
        title={notFoundCMS.title}
        content={notFoundCMS.content}
      />
    );

    expect(
      rendered
        .find("Text")
        .at(1)
        .find("span")
        .text()
    ).toBe(notFoundCMS.content);
  });
});
