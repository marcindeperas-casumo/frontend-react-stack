import React from "react";
import { shallow } from "enzyme";
import PromotionGalleryCard from "Components/PromotionGalleryCard/PromotionGalleryCard";

const promotionsInfo = {
  image: "i-am-an-image",
  badge: "i-am-a-badge",
  title: "i-am-title",
  dates: "i-am-dates",
};

describe("PromotionGalleryCard", () => {
  test("should render the PromotionGalleryCardWrapper component", () => {
    const rendered = shallow(
      <PromotionGalleryCard
        isFetched={true}
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
      />
    );

    expect(rendered.find("PromotionGalleryCardWrapper").exists()).toBe(true);
    expect(rendered.find("PromotionGalleryCardSkeleton").exists()).toBe(false);

    const renderedPromotionGalleryCardWrapperProps = rendered
      .find("PromotionGalleryCardWrapper")
      .props();

    expect(renderedPromotionGalleryCardWrapperProps.image).toBe(
      promotionsInfo.image
    );

    expect(renderedPromotionGalleryCardWrapperProps.badge).toBe(
      promotionsInfo.badge
    );

    expect(renderedPromotionGalleryCardWrapperProps.title).toBe(
      promotionsInfo.title
    );

    expect(renderedPromotionGalleryCardWrapperProps.dates).toBe(
      promotionsInfo.dates
    );
  });

  test("should render PromotionGalleryCardHeader component", () => {
    const rendered = shallow(
      <PromotionGalleryCard
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
        .find("PromotionGalleryCardHeader")
        .exists()
    ).toBe(true);

    const renderedPromotionGalleryCardHeaderProps = rendered
      .dive()
      .find("Card")
      .dive()
      .find("PromotionGalleryCardHeader")
      .props();

    expect(renderedPromotionGalleryCardHeaderProps.badge).toBe(
      promotionsInfo.badge
    );
  });

  test("should render PromotionGalleryCardContent component", () => {
    const rendered = shallow(
      <PromotionGalleryCard
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
        .find("PromotionGalleryCardContent")
        .exists()
    ).toBe(true);
  });

  test("should render PromotionGalleryCardImage component", () => {
    const rendered = shallow(
      <PromotionGalleryCard
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
        .find("PromotionGalleryCardImage")
        .exists()
    ).toBe(true);

    const renderedPromotionGalleryCardImageProps = rendered
      .dive()
      .find("Card")
      .dive()
      .find("PromotionGalleryCardImage")
      .props();

    expect(renderedPromotionGalleryCardImageProps.image).toBe(
      promotionsInfo.image
    );
  });

  test("should render the skeleton if CMS is not fetched yet", () => {
    const rendered = shallow(
      <PromotionGalleryCard
        image={promotionsInfo.image}
        badge={promotionsInfo.badge}
        title={promotionsInfo.title}
        dates={promotionsInfo.dates}
        isFetched={false}
      />
    );

    expect(rendered.find("PromotionGalleryCardSkeleton").exists()).toBe(true);
  });
});
