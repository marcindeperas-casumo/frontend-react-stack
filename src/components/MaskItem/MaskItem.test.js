import React from "react";
import { shallow } from "enzyme";
import MaskItem from "./MaskItem";

describe("MakItem", () => {
  const mockMask = jest.fn();
  const id = "123";
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <MaskItem className="c-foo" shapeMask={mockMask} id={id}>
        <div className="foo-bar" />
      </MaskItem>
    );
  });

  test("should load content inside the mask item component wrapped inside a given className", () => {
    expect(rendered.find(".c-foo .foo-bar")).toHaveLength(1);
    expect(mockMask).toHaveBeenCalledTimes(1);
  });

  test("should apply a given clip-path to the content wrapped by the MaskItem component", () => {
    const expectedValue = `url(#__mask-item-${id})`;
    const content = rendered.find(".o-mask-overlay");

    expect(content.prop("style")).toEqual({ clipPath: expectedValue });
  });
});
