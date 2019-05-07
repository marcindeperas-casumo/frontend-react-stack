import React from "react";
import { shallow } from "enzyme";
import ValuableReward from "./ValuableReward";

describe("ValuableReward", () => {
  const rewardContent = jest.fn();

  test("Should render component as content", () => {
    shallow(<ValuableReward valuableSymbol={rewardContent} />);

    expect(rewardContent).toHaveBeenCalled();
  });
});
