import React from "react";
import { shallow } from "enzyme";
import PromotionTeaserList from "./PromotionTeaserList";

describe("PromotionTeaserList", () => {
  let fetchCampaign;
  let fetchPromotions;

  beforeEach(() => {
    fetchCampaign = jest.fn();
    fetchPromotions = jest.fn();
  });

  test("should initiate the fetching if page is not available", () => {
    shallow(
      <PromotionTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(fetchCampaign).toHaveBeenCalledTimes(1);
  });

  test("should not render any PromotionTeaserRow component if promotionSlugs is empty", () => {
    const rendered = shallow(
      <PromotionTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("PromotionTeaserRow").exists()).toBe(false);
  });
});
