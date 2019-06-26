import React from "react";
import { shallow } from "enzyme";
import { AbstractModal } from "Components/AbstractModal";

describe("AbstractModal", () => {
  test("should render close button", () => {
    const rendered = shallow(
      <AbstractModal isOpen={true}>
        <div>hello</div>
      </AbstractModal>
    );
    expect(rendered.find("CloseButton").length).toBe(1);
  });

  test("should trigger callback on close", () => {
    const cb = jest.fn();
    const rendered = shallow(
      <AbstractModal isOpen={true} hideModal={cb}>
        <div>hello</div>
      </AbstractModal>
    );

    rendered.find("CloseButton").simulate("click");
    expect(cb).toBeCalled();
  });

  test("should render with default classes", () => {
    const classes =
      "c-abstract-modal t-background-white c-abstract-modal--default";
    const rendered = shallow(
      <AbstractModal isOpen={true}>
        <div>hello</div>
      </AbstractModal>
    );

    expect(rendered.hasClass(classes)).toBe(true);
  });
});
