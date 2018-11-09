import React from "react";
import { shallow } from "enzyme";
import PromotionCard from "Components/PromotionCard/PromotionCard";

const promotionPage = {
  id: "87088",
  slug: "boosted-reelraces",
  title: "Boosted Reel Races",
  content: "",
  attachments: [
    {
      url:
        "https://cms.casumo.com/wp-content/uploads/2018/10/promotion-boostedreelraces.png",
      title: "promotion-boostedreelraces",
    },
    {
      url:
        "https://cms.casumo.com/wp-content/uploads/2018/10/promobadge-boostedreelraces.png",
      title: "promobadge-boostedreelraces",
    },
  ],
  custom_fields: {},
  fields: {
    critical_for_compliance: false,
    dates: "30 Nov 2018 - 6 Jan 2019",
    "": false,
    title: "Boosted Reel Races",
    image:
      "https://cms.casumo.com/wp-content/uploads/2018/10/promotion-boostedreelraces.png",
    teaser_text:
      "Compete against other players for the top spot in our fast-paced tournaments.",
    content_builder: false,
    badge:
      "https://cms.casumo.com/wp-content/uploads/2018/10/promobadge-boostedreelraces.png",
    campaign_badge:
      "https://cms.casumo.com/wp-content/uploads/2018/10/badge-wintergames.png",
    cta_text: "Tell me more",
    terms_and_conditions: "",
  },
  children: [],
  childSlugs: [],
};

describe("PromotionCard", () => {
  test("should render the PromotionCardWrapper component", () => {
    const rendered = shallow(
      <PromotionCard
        promotionPage={promotionPage}
        promotionSlug="boosted-reelraces"
        isFetched={true}
      />
    );

    expect(rendered.find("PromotionCardWrapper").exists()).toBe(true);
    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(false);
  });

  test("should render PromotionCardHeader component", () => {
    const rendered = shallow(
      <PromotionCard
        slug="I-am-a-slug"
        isFetched={true}
        startFetch={() => {}}
      />
    );

    expect(
      rendered
        .dive()
        .find("Card")
        .dive()
        .find("PromotionCardHeader")
        .exists()
    ).toBe(true);
  });

  test("should render PromotionCardContent component", () => {
    const rendered = shallow(
      <PromotionCard
        slug="I-am-a-slug"
        isFetched={true}
        startFetch={() => {}}
      />
    );

    expect(
      rendered
        .dive()
        .find("Card")
        .dive()
        .find("PromotionCardContent")
        .exists()
    ).toBe(true);
  });

  test("should render PromotionCardImage component", () => {
    const rendered = shallow(
      <PromotionCard
        slug="I-am-a-slug"
        isFetched={true}
        startFetch={() => {}}
      />
    );

    expect(
      rendered
        .dive()
        .find("Card")
        .dive()
        .find("PromotionCardImage")
        .exists()
    ).toBe(true);
  });

  test("should render the skeleton if CMS is not fetched yet", () => {
    const rendered = shallow(
      <PromotionCard
        slug="I-am-a-slug"
        isFetched={false}
        startFetch={() => {}}
      />
    );

    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(true);
  });
});
