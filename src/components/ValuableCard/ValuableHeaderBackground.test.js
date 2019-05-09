import React from "react";
import { shallow, mount } from "enzyme";
import ValuableHeaderBackground from "./ValuableHeaderBackground";

describe("ValubaleHeaderBackground", () => {
  const imageOverlayIdentifier = "img.c-valuable-header__image-overlay";
  const gradientOverlayIdentifier = ".c-valuable-header__gradient-overlay";
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ValuableHeaderBackground id="123">
        <div className="foo-bar">Foo</div>
      </ValuableHeaderBackground>
    );
  });

  test("should render content inside valuable header", () => {
    expect(rendered.find(".foo-bar")).toHaveLength(1);
  });

  test("should render a gradient overlay if image url is left empty", () => {
    rendered = mount(
      <ValuableHeaderBackground id="123">
        <div>foo</div>
      </ValuableHeaderBackground>
    );

    expect(rendered.find(imageOverlayIdentifier)).toHaveLength(0);
    expect(rendered.find(gradientOverlayIdentifier)).toHaveLength(1);
  });

  test("should render an image as background if image url is not empty", () => {
    rendered = mount(
      <ValuableHeaderBackground id="123" imageUrl="foo/bar">
        <div>foo</div>
      </ValuableHeaderBackground>
    );

    expect(rendered.find(imageOverlayIdentifier)).toHaveLength(1);
    expect(rendered.find(gradientOverlayIdentifier)).toHaveLength(0);
  });
});
