import React from "react";
import { shallow } from "enzyme";
import PromotionCardList from "./PromotionCardList";

describe("PromotionCardList", () => {
  let fetch;

  beforeEach(() => {
    fetch = jest.fn();
  });

  test("should render a scrollable component", () => {
    const fetch = jest.fn();
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        fetch={fetch}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.find("Scrollable").exists()).toBe(true);
  });

  test("should fetch the page on component mount", () => {
    const fetch = jest.fn();

    shallow(
      <PromotionCardList
        slug="foo"
        fetch={fetch}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should not render the scrollable component if promotionSlugs is empty", () => {
    const fetch = jest.fn();

    const rendered = shallow(
      <PromotionCardList slug="foo" fetch={fetch} promotionsSlugs={[]} />
    );

    expect(rendered.find("Scrollable").exists()).toBe(false);
  });

  test("should set a background color if backgroundColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        fetch={fetch}
        backgroundColor="blue"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-background-blue")).toBe(true);
  });

  test("should not set a background color if backgroundColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        fetch={fetch}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-background-");
  });

  test("should set a font color if titleColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        fetch={fetch}
        titleColor="white"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-color-white")).toBe(true);
  });

  test("should not set a font color if titleColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        fetch={fetch}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-color-");
  });
});
