import React from "react";
import { shallow } from "enzyme";
import List from "Components/List";

describe("List", () => {
  test("should render a list item for every item in items array", () => {
    const rendered = shallow(
      <List
        items={["Tom", "Dick", "Harry"]}
        render={item => <div>{item}</div>}
      />
    );
    expect(rendered.find("li").length).toBe(3);
  });
});
