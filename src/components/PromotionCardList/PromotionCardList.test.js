import React from "react";
import { shallow } from "enzyme";
import PromotionCardList from "./PromotionCardList";

describe("PromotionCardList", () => {
  let startFetch;

  beforeEach(() => {
    startFetch = jest.fn();
  });

  test("should render a scrollable component", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.find("Scrollable").exists()).toBe(true);
  });

  test("should initiate the fetching if page is not available", () => {
    const startFetch = jest.fn();

    shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={false}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );
    expect(startFetch).toHaveBeenCalledTimes(1);
  });

  test("should not initiate a fetch if page is available", () => {
    const startFetch = jest.fn();

    shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );
    expect(startFetch).not.toHaveBeenCalledTimes(1);
  });

  test("should not render the scrollable component if promotionSlugs is empty", () => {
    const startFetch = jest.fn();

    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("Scrollable").exists()).toBe(false);
  });

  test("should set a background color if backgroundColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        backgroundColor="blue"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-background-blue")).toBe(true);
  });

  test("should not set a background color if backgroundColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-background-");
  });

  test("should set a font color if titleColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        titleColor="white"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-color-white")).toBe(true);
  });

  test("should not set a font color if titleColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionCardList
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-color-");
  });
});
