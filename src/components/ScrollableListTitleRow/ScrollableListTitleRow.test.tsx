import Text from "@casumo/cmp-text";
import React from "react";
import { shallow } from "enzyme";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";

describe("ScrollableListTitleRow", () => {
  const seeMore = {
    text: "foo",
    url: "bar",
  };
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ScrollableListTitleRow title="Whatever" seeMore={seeMore} />
    );
  });

  test("render seeMore.text and an seeMore.url on an <a> tag if seeMore is set", () => {
    expect(rendered.find(Text).dive().text()).toMatch(seeMore.text);

    expect(rendered.find("Link").prop("to")).toEqual(seeMore.url);
  });

  test("not render seeMore text and url on an <a> tag if seeMore is not set", () => {
    rendered = shallow(<ScrollableListTitleRow title="Whatever" />);

    expect(rendered.find(Text)).toHaveLength(0);
    expect(rendered.find("Link")).toHaveLength(0);
  });
});
