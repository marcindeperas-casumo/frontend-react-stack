import React from "react";
import { shallow } from "enzyme";

import ErrorMessage from "Features/sports/components/ErrorMessage";

describe("ErrorMessage", () => {
  test("should render", () => {
    const rendered = shallow(<ErrorMessage />);

    // TODO: add actual tests that aren't utter horeshit
    expect(rendered).to(false);
  });
});
