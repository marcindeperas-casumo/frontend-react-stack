import React from "react";
import { shallow } from "enzyme";
import { SettingsHeadline } from "./SettingsHeadline";

describe("SettingsHeadline", () => {
  test("should render title and description", () => {
    const title = "foo";
    const description = "bar";

    const rendered = shallow(
      <SettingsHeadline title={title} description={description} />
    );
    expect(rendered.contains(title)).toBe(true);
    expect(rendered.contains(description)).toBe(true);
  });
});
