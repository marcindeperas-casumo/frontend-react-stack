import React from "react";
import { shallow } from "enzyme";
import Flex from "@casumo/cmp-flex";
import Modal, { DismissButton } from "Components/Modal";

const requiredProps = {
  header: "A modal headesr",
  children: (
    <div>
      <span>some content</span>
    </div>
  ),
  onClose: () => {},
};

describe("<DismissButton />", () => {
  test("should render as hidden, when isVisible is false", () => {
    const component = shallow(<DismissButton isVisible={false} />);

    expect(component.prop("style").visibility).toBe("hidden");
  });

  test("should render as visible, when isVisible is true", () => {
    const component = shallow(<DismissButton isVisible={true} />);

    expect(component.prop("style").visibility).toBe("visible");
  });
});

describe("<Modal />", () => {
  test("should render the title provided in the header", () => {
    const component = shallow(<Modal {...requiredProps} />);

    expect(
      component
        .find(".c-modal__header")
        .children()
        .first()
        .text()
    ).toBe(requiredProps.header);
  });

  test("should render any children passed in as props", () => {
    const component = shallow(<Modal {...requiredProps} />);

    expect(
      component
        .find(".c-modal__content")
        .children()
        .first()
        .equals(requiredProps.children)
    ).toBe(true);
  });

  test("should render any classNames passed in as props", () => {
    const className = "u-example-class-1";
    const props = { ...requiredProps, className };
    const component = shallow(<Modal {...props} />);

    expect(
      component
        .find(Flex)
        .first()
        .hasClass(className)
    ).toBe(true);
  });

  test("should render a custom header, if provided", () => {
    const header = <div>CUSTOM Header</div>;
    const props = { ...requiredProps, header };
    const component = shallow(<Modal {...props} />);

    expect(
      component
        .find(".c-modal__header")
        .children()
        .first()
        .equals(header)
    ).toBe(true);
  });

  test("should render a custom footer, if provided", () => {
    const footer = <div>CUSTOM Footer</div>;
    const props = { ...requiredProps, footer };
    const component = shallow(<Modal {...props} />);

    expect(
      component
        .find(".c-modal__footer")
        .children()
        .first()
        .equals(footer)
    ).toBe(true);
  });

  test("should render the close button in the header, by default", () => {
    const component = shallow(<Modal {...requiredProps} />);

    const [backButton, closeButton] = component.find(DismissButton);

    expect(backButton.props.isVisible).toBe(false);
    expect(closeButton.props.isVisible).toBe(true);
    expect(closeButton.props.onClick).toBe(requiredProps.onClose);
  });

  test("should render hidden buttons in the header, if the dismiss type is none", () => {
    const props = { ...requiredProps, dismissType: "none" };
    const component = shallow(<Modal {...props} />);

    const [backButton, closeButton] = component.find(DismissButton);

    expect(backButton.props.isVisible).toBe(false);
    expect(closeButton.props.isVisible).toBe(false);
  });

  test("should render a visible close button in the header, if the dismiss type is close", () => {
    const props = { ...requiredProps, dismissType: "close" };
    const component = shallow(<Modal {...props} />);

    const [backButton, closeButton] = component.find(DismissButton);

    expect(backButton.props.isVisible).toBe(false);
    expect(closeButton.props.isVisible).toBe(true);
    expect(closeButton.props.onClick).toBe(requiredProps.onClose);
  });

  test("should render a visible back button in the header, if the dismiss type is back", () => {
    const props = { ...requiredProps, dismissType: "back" };
    const component = shallow(<Modal {...props} />);

    const [backButton, closeButton] = component.find(DismissButton);

    expect(backButton.props.isVisible).toBe(true);
    expect(backButton.props.onClick).toBe(requiredProps.onClose);
    expect(closeButton.props.isVisible).toBe(false);
  });
});
