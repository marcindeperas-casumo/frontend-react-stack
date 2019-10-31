// @flow
import * as React from "react";
import { shallow, mount, type ReactWrapper } from "enzyme";
import { SportsModalHeader, components } from "./SportsModalHeader";

export const selectors = {
  isBackButtonHidden: (x: ReactWrapper<any>) =>
    x
      .find({ "data-test-id": "sports-modal-back-button" })
      .last()
      .hasClass("u-visibility--hidden"),
  isCloseButtonHidden: (x: ReactWrapper<any>) =>
    x
      .find({ "data-test-id": "sports-modal-close-button" })
      .last()
      .hasClass("u-visibility--hidden"),
  isFixedCloseButtonHidden: (x: ReactWrapper<any>) =>
    x
      .find({ "data-test-id": "sports-modal-fixed-close-button" })
      .last()
      .hasClass("u-visibility--hidden"),
};
const children = <span>Header Test</span>;

const render = (props = {}) =>
  mount(<SportsModalHeader {...{ children, ...props }} />);

const findButtons = rendered => ({
  back: rendered.find(components.BackButton),
  close: rendered.find(components.CloseButton),
  fixedClose: rendered.find(components.FixedCloseButton),
});

describe("SportsModalHeader", () => {
  test("should render children in the header", () => {
    expect(render().contains(children)).toBe(true);
  });

  test("should render no buttons by default", () => {
    const buttons = findButtons(render());

    expect(selectors.isBackButtonHidden(buttons.back)).toBe(true);
    expect(selectors.isCloseButtonHidden(buttons.close)).toBe(true);
    expect(selectors.isFixedCloseButtonHidden(buttons.fixedClose)).toBe(true);
  });

  test("should render a back button when the onBack prop is passed", () => {
    const onBack = jest.fn();
    const buttons = findButtons(render({ onBack }));

    expect(selectors.isBackButtonHidden(buttons.back)).toBe(false);
    expect(selectors.isCloseButtonHidden(buttons.close)).toBe(true);
    expect(selectors.isFixedCloseButtonHidden(buttons.fixedClose)).toBe(true);

    buttons.back.simulate("click");
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  test("should render close buttons when the onClose prop is passed", () => {
    const onClose = jest.fn();
    const buttons = findButtons(render({ onClose }));

    expect(selectors.isBackButtonHidden(buttons.back)).toBe(true);
    expect(selectors.isCloseButtonHidden(buttons.close)).toBe(false);
    expect(selectors.isFixedCloseButtonHidden(buttons.fixedClose)).toBe(false);

    buttons.close.simulate("click");
    expect(onClose).toHaveBeenCalledTimes(1);

    buttons.fixedClose.simulate("click");
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
