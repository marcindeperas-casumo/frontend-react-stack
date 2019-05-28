import React from "react";
import { shallow } from "enzyme";
import { Checkbox } from "Components/Checkbox/Checkbox";

describe("Checkbox", () => {
  test("should trigger callback with true", () => {
    const mockFn = jest.fn();
    const rendered = shallow(<Checkbox checked={false} onChange={mockFn} />);
    rendered.simulate("click");
    expect(mockFn).toBeCalledWith(true);
  });

  test("should trigger callback with false", () => {
    const mockFn = jest.fn();
    const rendered = shallow(<Checkbox checked={true} onChange={mockFn} />);
    rendered.simulate("click");
    expect(mockFn).toBeCalledWith(false);
  });
});
