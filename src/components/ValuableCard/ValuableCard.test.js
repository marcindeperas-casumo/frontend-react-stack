import React from "react";
import { shallow } from "enzyme";
import ValuableCard from "Components/ValuableCard";

describe("ValuableCard", () => {
  test("should do something", () => {
    const rendered = shallow(<ValuableCard msg="hi" />);

    expect(rendered.find("ValuableCard")).not.toBeNull();
  });
});
