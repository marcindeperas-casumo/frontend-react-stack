import React from "react";
import { shallow } from "enzyme";
import PromotionCards from "./PromotionCards";

describe("PromotionCards", () => {
  test("should render a scrollable component", () => {
    const component = shallow(<PromotionCards />);

    expect(component.find("Scrollable").exists()).toBe(true);
  });
});
