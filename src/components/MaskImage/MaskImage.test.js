import React from "react";
import { shallow } from "enzyme";
import MaskImage from "./MaskImage";

describe("MaskImage", () => {
  const id = "123";
  const imageUrl = "foo/bar.png";
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <MaskImage className="c-foo" id={id} imageUrl={imageUrl} />
    );
  });

  test("should apply a given clip-path to an image", () => {
    const expectedMaskId = `__mask-image-${id}`;
    const image = rendered.find("image");
    const clipPath = rendered.find("clipPath");

    expect(image.prop("clipPath")).toBe(`url(#${expectedMaskId})`);
    expect(clipPath.prop("id")).toBe(expectedMaskId);
  });

  test("should render an image", () => {
    expect(rendered.find("image").length).toBe(1);
  });
});
