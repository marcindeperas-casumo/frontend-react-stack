import React from "react";
import { shallow } from "enzyme";
import PromotionGallery from "./PromotionGallery";

describe("PromotionGallery", () => {
  let fetchCampaign;
  let fetchPromotions;

  beforeEach(() => {
    fetchCampaign = jest.fn();
    fetchPromotions = jest.fn();
  });

  test("should fetch the page on component mount", () => {
    shallow(
      <PromotionGallery
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(fetchCampaign).toHaveBeenCalledTimes(1);
  });

  test("should set a background color if backgroundColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionGallery
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        backgroundColor="blue"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-background-blue")).toBe(true);
  });

  test("should not set a background color if backgroundColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionGallery
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-background-");
  });

  test("should set a font color if titleColor is coming down as a prop", () => {
    const rendered = shallow(
      <PromotionGallery
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        titleColor="white"
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().hasClass("t-color-white")).toBe(true);
  });

  test("should not set a font color if titleColor is not coming down as a prop", () => {
    const rendered = shallow(
      <PromotionGallery
        slug="foo"
        fetchCampaign={fetchCampaign}
        fetchPromotions={fetchPromotions}
        promotionsSlugs={["page-1", "page-2"]}
      />
    );

    expect(rendered.first().props().className).not.toMatch("t-color-");
  });

  // test("should render a see more link", () => {
  //   const rendered = shallow(
  //     <PromotionGallery
  //       slug="foo"
  //       fetchCampaign={fetchCampaign}
  //       fetchPromotions={fetchPromotions}
  //       promotionsSlugs={["page-1", "page-2"]}
  //       seeMore="👀"
  //     />
  //   );

  //   expect(rendered.find("a").prop("href")).toBe("/promotions");
  //   expect(rendered.find("a").html()).toContain("👀");
  // });
});
