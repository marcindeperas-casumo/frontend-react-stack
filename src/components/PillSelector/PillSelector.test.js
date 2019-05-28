import React from "react";
import { shallow } from "enzyme";
import { PillSelector } from "./PillSelector";
import options from "./__mocks__/options.json";

const findNthPill = (rendered, index) =>
  rendered.find(".c-input-pill").at(index);

describe("PillSelector", () => {
  let rendered;
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
    rendered = shallow(<PillSelector options={options} onChange={mockFn} />);
  });

  test("should trigger callback with correct value", () => {
    const optionIndex = 0;

    findNthPill(rendered, optionIndex).simulate("click");

    expect(mockFn).toBeCalledWith(options[optionIndex].value);
  });
  test("should trigger callback with correct value - alternate", () => {
    const optionIndex = 1;

    findNthPill(rendered, optionIndex).simulate("click");

    expect(mockFn).toBeCalledWith(options[optionIndex].value);
  });
  test("should not trigger callback if disabled", () => {
    const optionIndex = 0;

    rendered = shallow(
      <PillSelector options={options} onChange={mockFn} disabled={true} />
    );

    findNthPill(rendered, optionIndex).simulate("click");

    expect(mockFn.mock.calls.length).toBe(0);
  });
});
