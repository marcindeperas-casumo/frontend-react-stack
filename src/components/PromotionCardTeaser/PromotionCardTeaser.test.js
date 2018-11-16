import React from "react";
import { shallow } from "enzyme";
import PromotionCardTeaser from "Components/PromotionCardTeaser/PromotionCardTeaser";

const promotion = {
  id: "87088",
  slug: "promotions.boosted-reelraces",
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

describe("PromotionCardTeaser", () => {
  test("should render a date", () => {
    const rendered = shallow(
      <PromotionCardTeaser
        slug="promotions.boosted-reelraces"
        isFetched={true}
        badge={promotion.fields.badge}
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(
      rendered
        .find("Text")
        .first()
        .children()
        .text()
    ).toBe(promotion.fields.dates);
  });

  test("should render a title", () => {
    const rendered = shallow(
      <PromotionCardTeaser
        slug="promotions.boosted-reelraces"
        isFetched={true}
        badge={promotion.fields.badge}
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(
      rendered
        .find("Text")
        .last()
        .children()
        .text()
    ).toBe(promotion.fields.title);
  });

  test("should render an image", () => {
    const rendered = shallow(
      <PromotionCardTeaser
        slug="promotions.boosted-reelraces"
        isFetched={true}
        badge={promotion.fields.badge}
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(rendered.find("ImageLazy").length).toBe(1);
    expect(rendered.find("ImageLazy").prop("src")).toBe(promotion.fields.badge);
  });
});
