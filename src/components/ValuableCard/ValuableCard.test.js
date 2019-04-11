import React from "react";
import { shallow } from "enzyme";
import ValuableCard from "Components/ValuableCard";

describe("ValuableCard", () => {
  test("should render component", () => {
    const rendered = shallow(<ValuableCard />);

    expect(rendered.find("ValuableCard")).not.toBeNull();
  });
});
