import React from "react";
import { shallow } from "enzyme";
import PillSelector from "./PillSelector";
import options from "./__mocks__/options.json";

const findFirstPill = rendered => {
  return rendered.find(".c-input-pill").first();
};

describe("PillSelector", () => {
  test("should trigger callback with correct value", () => {
    const mockFn = jest.fn();
    const rendered = shallow(
      <PillSelector options={options} onChange={mockFn} />
    );

    findFirstPill(rendered).simulate("click");

    expect(mockFn).toBeCalledWith(options[0].value);
  });
  test("should not trigger callback if disabled", () => {
    const mockFn = jest.fn();
    const rendered = shallow(
      <PillSelector options={options} onChange={mockFn} disabled={true} />
    );

    findFirstPill(rendered).simulate("click");

    expect(mockFn).not.toBeCalledWith(options[0].value);
  });
});
