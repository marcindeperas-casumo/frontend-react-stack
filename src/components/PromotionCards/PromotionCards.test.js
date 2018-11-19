import React from "react";
import { shallow } from "enzyme";
import PromotionCards from "./PromotionCards";

describe("PromotionCards", () => {
  test("should render a scrollable component", () => {
    const startFetch = jest.fn();
    const rendered = shallow(
      <PromotionCards
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
      <PromotionCards
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
      <PromotionCards
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
      <PromotionCards
        slug="foo"
        startFetch={startFetch}
        isFetched={true}
        promotionsSlugs={[]}
      />
    );

    expect(rendered.find("Scrollable").exists()).toBe(false);
  });
});
