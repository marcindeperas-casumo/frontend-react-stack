import React from "react";
import { shallow } from "enzyme";
import { CloseButton } from "./CloseButton";

describe("CloseButton", () => {
  test("should trigger callback on click", () => {
    const cb = jest.fn();
    const rendered = shallow(<CloseButton onClick={cb} />);
    rendered.simulate("click");
    expect(cb).toBeCalled();
  });
});
