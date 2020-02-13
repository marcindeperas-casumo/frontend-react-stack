import React from "react";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import { PromotionCardList } from "./PromotionCardList";

const fetchCampaign = jest.fn();
const fetchPromotions = jest.fn();
const promotionSlugs = ["page-1", "page-2"];

describe("<PromotionCardList /> - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <PromotionCardList
          slug="foo"
          fetchCampaign={fetchCampaign}
          fetchPromotions={fetchPromotions}
          promotionsSlugs={promotionSlugs}
        />
      </MockStore>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(0);
  });

  test("should render a ScrollableList component", () => {
    expect(rendered.find("ScrollableList").exists()).toBe(true);
  });

  test("should fetch the page on component mount", () => {
    expect(fetchCampaign).toHaveBeenCalled();
  });

  test("should not render the scrollable component if promotionSlugs is empty", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <PromotionCardList
          slug="foo"
          fetchCampaign={fetchCampaign}
          fetchPromotions={fetchPromotions}
          promotionsSlugs={[]}
        />
      </MockStore>
    );

    expect(rendered.find("ScrollableList").exists()).toBe(false);
  });
});

describe("<PromotionCardList /> - Desktop", () => {
  let rendered;

  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <PromotionCardList
          slug="foo"
          fetchCampaign={fetchCampaign}
          fetchPromotions={fetchPromotions}
          promotionsSlugs={promotionSlugs}
        />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(1);
  });

  test("should fetch the page on component mount", () => {
    expect(fetchCampaign).toHaveBeenCalled();
  });
});
