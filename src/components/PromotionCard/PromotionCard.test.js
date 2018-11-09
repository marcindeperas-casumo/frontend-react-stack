import React from "react";
import { shallow } from "enzyme";
import PromotionCard from "Components/PromotionCard/PromotionCard";

describe("PromotionCard", () => {
  test("should render the PromotionCardWrapper component", () => {
    const rendered = shallow(
      <PromotionCard promotionSlug="boosted-reelraces" isFetched={true} />
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
