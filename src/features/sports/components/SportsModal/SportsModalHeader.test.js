// @flow
import React from "react";
import { shallow } from "enzyme";
import { SportsModalHeader, components } from "./SportsModalHeader";

const children = <span>Header Test</span>;

const render = (props = {}) =>
  shallow(<SportsModalHeader {...{ children, ...props }} />);

const findButtons = rendered => ({
  back: rendered.find(components.BackButton),
  close: rendered.find(components.CloseButton),
  floatingClose: rendered.find(components.FloatingCloseButton),
});

/* eslint-disable no-unused-expressions */
describe("SportsModalHeader", () => {
  test("should render children in the header", () => {
    expect(render().contains(children)).toBe(true);
  });

  test("should render no buttons by default", () => {
    const buttons = findButtons(render());

    expect(buttons.back).not.toBeVisible;
    expect(buttons.close).not.toBeVisible;
    expect(buttons.floatingClose).not.toBeVisible;
  });

  test("should render a back button when the onBack prop is passed", () => {
    const onBack = jest.fn();
    const buttons = findButtons(render({ onBack }));

    expect(buttons.back).toBeVisible;
    expect(buttons.close).not.toBeVisible;
    expect(buttons.floatingClose).not.toBeVisible;

    buttons.back.simulate("click");
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  test("should render close buttons when the onClose prop is passed", () => {
    const onClose = jest.fn();
    const buttons = findButtons(render({ onClose }));

    expect(buttons.back).not.toBeVisible;
    expect(buttons.close).toBeVisible;
    expect(buttons.floatingClose).toBeVisible;

    buttons.close.simulate("click");
    expect(onClose).toHaveBeenCalledTimes(1);

    buttons.floatingClose.simulate("click");
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
/* eslint-enable no-unused-expressions */
