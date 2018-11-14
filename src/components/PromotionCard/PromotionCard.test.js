import React from "react";
import { shallow } from "enzyme";
import PromotionCard from "Components/PromotionCard/PromotionCard";

const promotionsInfo = {
  promotionSlug: "boosted-reelraces",
  promotionImage: "i-am-an-image",
  promotionBadge: "i-am-a-badge",
};

describe("PromotionCard", () => {
  test("should render the PromotionCardWrapper component", () => {
    const rendered = shallow(
      <PromotionCard
        promotionSlug={promotionsInfo.promotionSlug}
        isFetched={true}
        promotionImage={promotionsInfo.promotionImage}
        promotionBadge={promotionsInfo.promotionBadge}
      />
    );

    expect(rendered.find("PromotionCardWrapper").exists()).toBe(true);
    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(false);

    const renderedPromotionCardWrapperProps = rendered
      .find("PromotionCardWrapper")
      .props();

    expect(renderedPromotionCardWrapperProps.promotionSlug).toBe(
      promotionsInfo.promotionSlug
    );

    expect(renderedPromotionCardWrapperProps.promotionImage).toBe(
      promotionsInfo.promotionImage
    );

    expect(renderedPromotionCardWrapperProps.promotionBadge).toBe(
      promotionsInfo.promotionBadge
    );
  });

  test("should render PromotionCardHeader component", () => {
    const rendered = shallow(
      <PromotionCard
        promotionSlug={promotionsInfo.promotionSlug}
        isFetched={true}
        promotionImage={promotionsInfo.promotionImage}
        promotionBadge={promotionsInfo.promotionBadge}
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

    const renderedPromotionCardHeaderProps = rendered
      .dive()
      .find("Card")
      .dive()
      .find("PromotionCardHeader")
      .props();

    expect(renderedPromotionCardHeaderProps.promotionBadge).toBe(
      promotionsInfo.promotionBadge
    );
  });

  test("should render PromotionCardContent component", () => {
    const rendered = shallow(
      <PromotionCard
        promotionSlug={promotionsInfo.promotionSlug}
        isFetched={true}
        promotionImage={promotionsInfo.promotionImage}
        promotionBadge={promotionsInfo.promotionBadge}
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
        promotionSlug={promotionsInfo.promotionSlug}
        isFetched={true}
        promotionImage={promotionsInfo.promotionImage}
        promotionBadge={promotionsInfo.promotionBadge}
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

    const renderedPromotionCardImageProps = rendered
      .dive()
      .find("Card")
      .dive()
      .find("PromotionCardImage")
      .props();

    expect(renderedPromotionCardImageProps.promotionImage).toBe(
      promotionsInfo.promotionImage
    );
  });

  test("should render the skeleton if CMS is not fetched yet", () => {
    const rendered = shallow(
      <PromotionCard
        promotionSlug={promotionsInfo.promotionSlug}
        promotionImage={promotionsInfo.promotionImage}
        promotionBadge={promotionsInfo.promotionBadge}
        isFetched={false}
        startFetch={() => {}}
      />
    );

    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(true);
  });
});
