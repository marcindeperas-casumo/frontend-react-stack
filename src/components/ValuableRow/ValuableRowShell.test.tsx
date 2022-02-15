import React from "react";
import { shallow } from "enzyme";
import { ValuableRowShell } from "./ValuableRowShell";

describe("PlayerValuableListHorizontal", () => {
  test("should call onclick function onclick of row", () => {
    const props = {
      text: "someText",
      onClick: jest.fn(),
    };

    const rendered = shallow(<ValuableRowShell {...props} />);

    rendered.find({ "data-test": "valuable-row-shell" }).simulate("click");

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
