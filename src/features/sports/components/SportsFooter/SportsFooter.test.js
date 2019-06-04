// @flow
import React from "react";
import { shallow } from "enzyme";
import { SportsFooter } from "Features/sports/components/SportsFooter";

describe("SportsFooter", () => {
  test("renders a link to the terms and conditions", () => {
    const link = shallow(<SportsFooter />).find(
      '[data-test="sports-footer-terms-link"]'
    );

    expect(link.text()).toBe("Sports T&Cs");
  });

  test("renders a link to the glossary", () => {
    const link = shallow(<SportsFooter />).find(
      '[data-test="sports-footer-glossary-link"]'
    );

    expect(link.text()).toBe("Glossary");
  });
});
