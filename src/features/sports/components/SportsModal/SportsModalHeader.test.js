// @flow
import React from "react";
import { mount, shallow } from "enzyme";
import { SportsModalHeader, variants } from "./SportsModalHeader";

const defaultProps = {
  children: <span>Header Test</span>,
  onBack: jest.fn(),
  onClose: jest.fn(),
};

const render = (props = {}, renderMethod = shallow) =>
  renderMethod(<SportsModalHeader {...{ ...defaultProps, ...props }} />);

const findVariants = rendered => ({
  withoutDismissButtons: rendered.find(variants.WithoutDismissButtons),
  withBackButton: rendered.find(variants.WithBackButton),
  withCloseButton: rendered.find(variants.WithCloseButton),
});

describe("SportsModalHeader", () => {
  test("should render children in the header", () => {
    expect(render().contains(defaultProps.children)).toBe(true);
  });

  test("should render the variant without dismiss buttons by default", () => {
    const rendered = findVariants(render());

    expect(rendered.withoutDismissButtons).toHaveLength(1);
    expect(rendered.withBackButton).toHaveLength(0);
    expect(rendered.withCloseButton).toHaveLength(0);
  });

  describe("when the dismissType is 'none'", () => {
    test("should render the variant without dismiss buttons", () => {
      const rendered = findVariants(render({ dismissType: "none" }));

      expect(rendered.withoutDismissButtons).toHaveLength(1);
      expect(rendered.withBackButton).toHaveLength(0);
      expect(rendered.withCloseButton).toHaveLength(0);
    });
  });

  describe("when the dismissType is 'back'", () => {
    test("should render the variant with a back button", () => {
      const rendered = findVariants(render({ dismissType: "back" }));

      expect(rendered.withoutDismissButtons).toHaveLength(0);
      expect(rendered.withBackButton).toHaveLength(1);
      expect(rendered.withCloseButton).toHaveLength(0);
    });

    test("clicking the dismiss buttons fires the correct callbacks", () => {
      const onBack = jest.fn();
      const onClose = jest.fn();

      const rendered = render({ onBack, onClose, dismissType: "back" }, mount);

      rendered
        .find("[data-test='sports-modal-header-back-button']")
        .simulate("click");

      expect(onBack).toHaveBeenCalledTimes(1);

      rendered
        .find("[data-test='sports-modal-header-floating-close-button']")
        .simulate("click");

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the dismissType is 'close'", () => {
    test("should render the variant with a close button", () => {
      const rendered = findVariants(render({ dismissType: "close" }));

      expect(rendered.withoutDismissButtons).toHaveLength(0);
      expect(rendered.withBackButton).toHaveLength(0);
      expect(rendered.withCloseButton).toHaveLength(1);
    });

    test("clicking the dismiss buttons fires the correct callbacks", () => {
      const onClose = jest.fn();

      const rendered = render({ onClose, dismissType: "close" }, mount);

      rendered
        .find("[data-test='sports-modal-header-floating-close-button']")
        .simulate("click");

      expect(onClose).toHaveBeenCalledTimes(1);

      rendered
        .find("[data-test='sports-modal-header-close-button']")
        .simulate("click");

      expect(onClose).toHaveBeenCalledTimes(2);
    });
  });
});
