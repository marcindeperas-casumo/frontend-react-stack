import React from "react";
import { mount } from "enzyme";
import PromotionCard from "./PromotionCard";

describe("PromotionCard", () => {
  test("should render component", () => {
    const rendered = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={true} />
    );

    expect(rendered.find("PromotionCard").exists()).toBe(true);
    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(false);
  });

  test("should render ImageLazy img", () => {
    const rendered = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={true} />
    );

    expect(rendered.find("ImageLazy").exists()).toBe(true);
  });

  test("should render Card", () => {
    const rendered = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={true} />
    );
    expect(rendered.find("Card").exists()).toBe(true);
  });

  test("should render the skeleton if CMS is not fetched yet", () => {
    const rendered = mount(
      <PromotionCard slug="I-am-a-slug" isFetched={false} />
    );

    expect(rendered.find("PromotionCardSkeleton").exists()).toBe(true);
  });
});
