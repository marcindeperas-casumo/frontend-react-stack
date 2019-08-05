// @flow
import React from "react";
import { shallow } from "enzyme";
import { PromotionCardListTitleRow } from "./PromotionCardListTitleRow";

const title = "whatever";
const seeMoreUrl = "foo";
const titleColor = "white";
const seeMoreText = "bar";

describe("<PromotionCardTitleListRow />", () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <PromotionCardListTitleRow
        title={title}
        seeMoreUrl={seeMoreUrl}
        titleColor={titleColor}
        seeMoreText={seeMoreText}
      />
    );
  });

  test("should render a ScrollableListTitle component", () => {
    expect(rendered.find("ScrollableListTitle")).toHaveLength(1);
  });
  test("should render a seeMoreUrl link", () => {
    expect(rendered.find("a").prop("href")).toBe(seeMoreUrl);
    expect(rendered.find("a").html()).toContain(seeMoreText);
  });

  test("should set a font color if titleColor is coming down as a prop", () => {
    rendered = shallow(
      <PromotionCardListTitleRow
        title={title}
        seeMoreUrl={seeMoreUrl}
        titleColor={titleColor}
        seeMoreText={seeMoreText}
      />
    );

    expect(rendered.find("Text").hasClass("t-color-white")).toBe(true);
  });

  test("should not set a font color if titleColor is not coming down as a prop", () => {
    rendered = shallow(
      <PromotionCardListTitleRow
        title={title}
        seeMoreUrl={seeMoreUrl}
        seeMoreText={seeMoreText}
      />
    );

    expect(rendered.find("Text").props().className).not.toMatch("t-color-");
  });
});
