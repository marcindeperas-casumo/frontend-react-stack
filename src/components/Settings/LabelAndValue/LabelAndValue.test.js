import React from "react";
import { shallow } from "enzyme";
import LabelAndValue from "Components/Settings/LabelAndValue";

describe("LabelAndValue", () => {
  test("should render label and value", () => {
    const rendered = shallow(
      <LabelAndValue label="foo" value={<div>bar</div>} />
    );
    expect(rendered.find("Text").length).toBe(2);
    expect(
      rendered
        .find("Text")
        .first()
        .children()
        .text()
    ).toBe("foo");
    expect(
      rendered
        .find("Text")
        .at(1)
        .children()
        .text()
    ).toBe("bar");
  });
});
