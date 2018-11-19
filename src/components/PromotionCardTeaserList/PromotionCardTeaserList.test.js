import React from "react";
import { shallow } from "enzyme";
import PromotionCardTeaserList from "./PromotionCardTeaserList";

describe("PromotionCardTeaserList", () => {
  test("should initiate the fetching if page is not available", () => {
    const startFetch = jest.fn();

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
    const startFetch = jest.fn();

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
    const startFetch = jest.fn();

    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("connect(PromotionCardTeaser)").exists()).toBe(false);
  });
});
