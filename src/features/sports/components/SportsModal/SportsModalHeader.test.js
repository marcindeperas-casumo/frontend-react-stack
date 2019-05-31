// @flow
import React from "react";
import { shallow } from "enzyme";
import { SportsModalHeader, variants } from "./SportsModalHeader";

const defaultProps = {
  children: <span>Header Test</span>,
  onBack: jest.fn(),
  onClose: jest.fn(),
};

const render = (props = {}) =>
  shallow(<SportsModalHeader {...{ ...defaultProps, ...props }} />);

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

  test("should render the variant without dismiss buttons when the dismissType is 'none'", () => {
    const rendered = findVariants(render({ dismissType: "none" }));

    expect(rendered.withoutDismissButtons).toHaveLength(1);
    expect(rendered.withBackButton).toHaveLength(0);
    expect(rendered.withCloseButton).toHaveLength(0);
  });

  test("should render the variant with a back button when the dismissType is 'back'", () => {
    const rendered = findVariants(render({ dismissType: "back" }));

    expect(rendered.withoutDismissButtons).toHaveLength(0);
    expect(rendered.withBackButton).toHaveLength(1);
    expect(rendered.withCloseButton).toHaveLength(0);
  });

  test("should render the variant with a close button when the dismissType is 'close'", () => {
    const rendered = findVariants(render({ dismissType: "close" }));

    expect(rendered.withoutDismissButtons).toHaveLength(0);
    expect(rendered.withBackButton).toHaveLength(0);
    expect(rendered.withCloseButton).toHaveLength(1);
  });
});
