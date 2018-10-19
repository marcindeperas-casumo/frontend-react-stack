import React from "react";
import { mount } from "enzyme";
import PromotionCard from "./PromotionCard";

describe("PromotionCard", () => {
  test("should render component", () => {
    const component = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={true} />
    );

    expect(component.find("PromotionCard").exists()).toBe(true);
    expect(component.find("PromotionCardSkeleton").exists()).toBe(false);
  });

  test("should render ImageLazy img", () => {
    const component = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={true} />
    );

    expect(component.find("ImageLazy").exists()).toBe(true);
  });

  test("should render Card", () => {
    const component = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={true} />
    );
    expect(component.find("Card").exists()).toBe(true);
  });

  test("should render the skeleton if CMS is not fetched yet", () => {
    const component = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={false} />
    );

    expect(component.find("PromotionCardSkeleton").exists()).toBe(true);
  });
});
