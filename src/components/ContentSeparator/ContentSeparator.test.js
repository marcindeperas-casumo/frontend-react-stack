import React from "react";
import { shallow } from "enzyme";
import { ContentSeparator } from "./ContentSeparator";

describe("<ContentSeparator />", () => {
  test("renders a <div />", () => {
    const rendered = shallow(<ContentSeparator />);

    expect(rendered.find("div")).toHaveLength(1);
  });
});
