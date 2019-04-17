// @flow
import React from "react";
import { shallow } from "enzyme";
import PromotionOptInButton from "Components/PromotionOptInButton";

describe("PromotionOptInButton", () => {
  test("should OptInButtonContainer with active and disabled props", () => {
    const rendered = shallow(
      <PromotionOptInButton
        slug="the_page_we_need"
        optInField="foo"
        optOutField="bar"
      />
    );

    expect(rendered.find("OptInButtonContainer")).toHaveLength(1);
    expect(rendered.find("OptInButtonContainer").prop("active")).toBeDefined();
    expect(
      rendered.find("OptInButtonContainer").prop("disabled")
    ).toBeDefined();
  });
});
