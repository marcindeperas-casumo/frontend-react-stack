import React from "react";
import { shallow } from "enzyme";
import MaskImage from "./MaskImage";

describe("MaskImage", () => {
  const mockMask = jest.fn();
  const id = "123";
  const imageUrl = "foo/bar.png";
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <MaskImage
        className="c-foo"
        shapeMask={mockMask}
        id={id}
        imageUrl={imageUrl}
      />
    );
  });

  test("should apply a given clip-path to an image", () => {
    const expectedValue = `url(#__mask-image-${id})`;
    const image = rendered.find("image");

    expect(image.prop("clipPath")).toEqual(expectedValue);
  });

  test("should render an image with a given url", () => {
    const image = rendered.find("image");

    expect(image.prop("href")).toEqual(imageUrl);
  });
});
