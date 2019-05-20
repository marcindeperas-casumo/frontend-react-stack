import React from "react";
import { shallow } from "enzyme";
import Checkbox from "Components/Controls/Checkbox";

describe("Checkbox", () => {
  test("should trigger callback with correct value", () => {
    const mockFn = jest.fn();
    const rendered = shallow(<Checkbox checked={false} onChange={mockFn} />);
    rendered.simulate("click");
    expect(mockFn).toBeCalledWith(true);
  });
});
