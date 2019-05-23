import React from "react";
import { shallow } from "enzyme";
import { SettingsRow } from "./SettingsRow";

describe("SettingsRow", () => {
  test("should render text", () => {
    const text = "foo";
    const rendered = shallow(<SettingsRow text={text} />);
    expect(rendered.contains(text)).toBe(true);
  });

  test("should render text and child", () => {
    const text = "foo";
    const child = "bar";
    const rendered = shallow(<SettingsRow text={text}>{child}</SettingsRow>);
    expect(rendered.contains(text)).toBe(true);
    expect(rendered.contains(child)).toBe(true);
  });
});
