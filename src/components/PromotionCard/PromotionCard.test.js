import React from "react";
import { shallow } from "enzyme";
import PromotionCard from "Components/PromotionCard/PromotionCard";

const promotionsInfo = {
  image: "i-am-an-image",
  badge: "i-am-a-badge",
  title: "i-am-title",
  dates: "i-am-dates",
};

describe("PromotionCard", () => {
  test("should render the PromotionCardWrapper component", () => {
    const rendered = shallow(
      <PromotionCard
        isFetched={true}
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
      />
    );

    expect(rendered.find("PromotionCardWrapper").exists()).toBe(true);
    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(false);

    const renderedPromotionCardWrapperProps = rendered
      .find("PromotionCardWrapper")
      .props();

    expect(renderedPromotionCardWrapperProps.image).toBe(promotionsInfo.image);

    expect(renderedPromotionCardWrapperProps.badge).toBe(promotionsInfo.badge);

    expect(renderedPromotionCardWrapperProps.title).toBe(promotionsInfo.title);

    expect(renderedPromotionCardWrapperProps.dates).toBe(promotionsInfo.dates);
  });

  test("should render PromotionCardHeader component", () => {
    const rendered = shallow(
      <PromotionCard
        isFetched={true}
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
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

    expect(renderedPromotionCardHeaderProps.badge).toBe(promotionsInfo.badge);
  });

  test("should render PromotionCardContent component", () => {
    const rendered = shallow(
      <PromotionCard
        isFetched={true}
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
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
        isFetched={true}
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
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

    expect(renderedPromotionCardImageProps.image).toBe(promotionsInfo.image);
  });

  test("should render the skeleton if CMS is not fetched yet", () => {
    const rendered = shallow(
      <PromotionCard
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
        isFetched={false}
        startFetch={() => {}}
      />
    );

    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(true);
  });
});
