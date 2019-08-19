import React from "react";
import { mount } from "enzyme";
import Scrollable from "@casumo/cmp-scrollable";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import PromotionCardList from "./PromotionCardList";

const fetchCampaign = jest.fn();
const fetchPromotions = jest.fn();
const promotionSlugs = ["page-1", "page-2"];

describe("<PromotionCardList /> - Mobile", () => {
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

  test("should render a scrollable component", () => {
    expect(rendered.find("Scrollable").exists()).toBe(true);
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

    expect(rendered.find("Scrollable").exists()).toBe(false);
  });

  test("should set a background color if backgroundColor is coming down as a prop", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <PromotionCardList
          slug="foo"
          fetchCampaign={fetchCampaign}
          fetchPromotions={fetchPromotions}
          backgroundColor="blue"
          promotionsSlugs={promotionSlugs}
        />
      </MockStore>
    );

    expect(
      rendered
        .find(Scrollable)
        .parent()
        .hasClass("t-background-blue")
    ).toBe(true);
  });

  test("should not set a background color if backgroundColor is not coming down as a prop", () => {
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

    expect(
      rendered
        .find("PromotionCardList")
        .childAt(0)
        .props().className
    ).not.toMatch("t-background-");
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
