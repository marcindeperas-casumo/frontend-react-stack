import React from "react";
import { shallow } from "enzyme";
import TopLists from "Components/TopLists/TopLists";

describe("TopLists", () => {
  test("renders a ComponentBuilder under the hood", () => {
    const rendered = shallow(
      <TopLists language="en" fetchTopLists={() => {}} />
    );

    const componentBuilder = rendered.find("ComponentBuilderContainer");

    expect(componentBuilder).toHaveLength(1);
    expect(componentBuilder.props().slug).toBeDefined();
  });
});
