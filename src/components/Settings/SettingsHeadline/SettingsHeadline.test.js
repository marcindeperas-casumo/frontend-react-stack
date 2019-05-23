import React from "react";
import { shallow } from "enzyme";
import { SettingsHeadline } from "./SettingsHeadline";

describe("SettingsHeadline", () => {
  test("should render title and description", () => {
    const rendered = shallow(
      <SettingsHeadline title="foo" description="bar" />
    );
    expect(rendered.find("Text").length).toBe(2);
    const title = rendered
      .find("div")
      .find("Text")
      .first()
      .children();
    const description = rendered
      .find("div")
      .find("Text")
      .at(1)
      .children();
    expect(title.text()).toBe("foo");
    expect(description.text()).toBe("bar");
  });
});
