import React from "react";
import { shallow } from "enzyme";
import { PromotionTeaserList } from "./PromotionTeaserList";

describe("PromotionTeaserList", () => {
  test("should fetch campaigns and promotions", () => {
    const fetchCampaign = jest.fn();
    const fetchPromotions = jest.fn();
    const rendered = shallow(
      <PromotionTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.find("Connect(PromotionTeaserRow)").length).toBe(2);
    expect(fetchCampaign).toHaveBeenCalledTimes(1);
    expect(fetchPromotions).toHaveBeenCalledTimes(1);
  });

  test("should not render any PromotionTeaserRow component if promotionSlugs is empty", () => {
    const rendered = shallow(
      <PromotionTeaserList
        slug="foo"
        fetchCampaign={() => {}}
        fetchPromotions={() => {}}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("Connect(PromotionTeaserRow)").length).toBe(0);
  });
});
