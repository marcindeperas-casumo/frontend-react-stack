import React from "react";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { PromotionCardList } from "./PromotionCardList";

const promotions = [
  { id: "page-1", slug: "page-1", title: "Promotion 1" },
  { id: "page-2", slug: "page-2", title: "Promotion 2" },
];

describe("<PromotionCardList /> - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(<PromotionCardList slug="foo" promotions={promotions} />);
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(0);
  });

  test("should render a ScrollableList component", () => {
    expect(rendered.find("ScrollableList")).toHaveLength(1);
  });
});

describe("<PromotionCardList /> - Desktop", () => {
  let rendered;

  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(<PromotionCardList slug="foo" promotions={promotions} />);
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(1);
  });

  test("should render a ScrollableList component", () => {
    expect(rendered.find("ScrollableList")).toHaveLength(0);
  });
});
