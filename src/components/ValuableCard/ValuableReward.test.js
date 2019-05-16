import React from "react";
import { shallow } from "enzyme";
import ValuableReward from "./ValuableReward";

describe("ValuableReward", () => {
  const RewardContent = () => <div>foo</div>;

  test("Should render component as content", () => {
    const rendered = shallow(<ValuableReward ValuableSymbol={RewardContent} />);

    expect(rendered.find("RewardContent")).toHaveLength(1);
  });
});
