import React from "react";
import { shallow } from "enzyme";
import PromotionCardTeaserList from "./PromotionCardTeaserList";

describe("PromotionCardTeaserList", () => {
  let fetchCampaign;
  let fetchPromotions;

  beforeEach(() => {
    fetchCampaign = jest.fn();
    fetchPromotions = jest.fn();
  });

  test("should initiate the fetching if page is not available", () => {
    shallow(
      <PromotionCardTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(fetchCampaign).toHaveBeenCalledTimes(1);
  });

  test("should not render any PromotionCardTeaser component if promotionSlugs is empty", () => {
    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("PromotionCardTeaser").exists()).toBe(false);
  });

  test("should set a background color if backgroundColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        backgroundColor="blue-50"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-background-blue-50")).toBe(true);
  });

  test("should not set a background color if backgroundColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardTeaserList
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-background-");
  });
});
