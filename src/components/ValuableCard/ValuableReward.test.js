import React from "react";
import { shallow, mount } from "enzyme";
import ValuableReward from "./ValuableReward";

describe("ValuableReward", () => {
  const RewardContent = () => <div>foo</div>;

  test("Should render component as content", () => {
    const rendered = mount(<ValuableReward ValuableSymbol={RewardContent} />);

    expect(rendered.find("RewardContent")).toHaveLength(1);
    expect(rendered.find("RewardContent").text()).toEqual("foo");
  });
});
