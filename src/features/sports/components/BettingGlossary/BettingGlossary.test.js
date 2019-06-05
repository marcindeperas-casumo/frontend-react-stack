// @flow
import React from "react";
import { shallow } from "enzyme";
import { BettingGlossary } from "./BettingGlossary";

describe("<BettingGlossary />", () => {
  test("renders correctly", () => {
    const rendered = shallow(<BettingGlossary onClose={jest.fn()} />);

    expect(rendered.find(BettingGlossary)).toHaveLength(0);
  });
});
