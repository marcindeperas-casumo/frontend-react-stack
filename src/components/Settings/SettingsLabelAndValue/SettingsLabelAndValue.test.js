import React from "react";
import { shallow } from "enzyme";
import { SettingsLabelAndValue } from "Components/Settings/SettingsLabelAndValue/SettingsLabelAndValue";

describe("SettingsLabelAndValue", () => {
  test("should render label and value", () => {
    const label = "foo";
    const value = "bar";
    const rendered = shallow(
      <SettingsLabelAndValue label={label} value={value} />
    );
    expect(rendered.contains(label)).toBe(true);
    expect(rendered.contains(value)).toBe(true);
  });
});
