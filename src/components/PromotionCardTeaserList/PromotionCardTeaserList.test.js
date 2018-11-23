import React from "react";
import { shallow } from "enzyme";
import PromotionCardTeaserList from "./PromotionCardTeaserList";

describe("PromotionCardTeaserList", () => {
  let startFetch;

  beforeEach(() => {
    startFetch = jest.fn();
  });

  test("should initiate the fetching if page is not available", () => {
    shallow(
      <PromotionCardTeaserList
        slug="foo"
        startFetch={startFetch}
        isFetched={false}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(startFetch).toHaveBeenCalledTimes(1);
  });

  test("should not initiate a fetch if page is available", () => {
    shallow(
      <PromotionCardTeaserList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(startFetch).not.toHaveBeenCalled();
  });

  test("should not render any PromotionCardTeaser component if promotionSlugs is empty", () => {
    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("PromotionCardTeaser").exists()).toBe(false);
  });

  test("should set a background color if backgroundColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        backgroundColor="blue"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-background-blue")).toBe(true);
  });

  test("should not set a background color if backgroundColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-background-");
  });
});
