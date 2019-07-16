import React from "react";
import { shallow } from "enzyme";
import { ScrollableListTopBar } from "Components/ScrollableListTopBar";

describe("ScrollableListTopBar", () => {
  const seeMore = {
    text: "foo",
    url: "bar",
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ScrollableListTopBar title="Whatever" seeMore={seeMore} />
    );
  });

  test("render seeMore.text and an seeMore.url on an <a> tag if seeMore is set", () => {
    expect(
      rendered
        .find("Text")
        .dive()
        .text()
    ).toMatch(seeMore.text);

    expect(rendered.find("a").prop("href")).toEqual(seeMore.url);
  });

  test("not render seeMore text and url on an <a> tag if seeMore is not set", () => {
    rendered = shallow(<ScrollableListTopBar title="Whatever" />);

    expect(rendered.find("Text")).toHaveLength(0);
    expect(rendered.find("a")).toHaveLength(0);
  });
});
