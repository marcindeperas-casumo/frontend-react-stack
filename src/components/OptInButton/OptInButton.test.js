// @flow
import React from "react";
import { shallow } from "enzyme";
import OptInButton from "./OptInButton";

const props = {
  fetchPage: () => {},
  active: {
    label: "Opt-In",
    eventName: "foo",
    data: {
      foo: "bar",
    },
  },
  disabled: {
    label: "Opted-In",
    eventName: "bar",
    data: {
      bar: "foo",
    },
  },
  className: "",
  isOptedIn: false,
};

describe("OptInButton", () => {
  describe("Without button callback", () => {
    const rendered = shallow(<OptInButton {...props} />);

    test(`should show "${props.active.label}" button`, () => {
      expect(rendered.contains(props.active.label)).toBe(true);
    });

    test(`should show "${props.disabled.label}" button if user opted in`, () => {
      rendered.setProps({ isOptedIn: true });
      expect(rendered.contains(props.disabled.label)).toBe(true);
    });
  });

  test("should call optIn callback", () => {
    const spy = jest.fn();

    const customProps = Object.assign({}, props, {
      active: {
        ...props.active,
        onClick: spy,
      },
    });

    const rendered = shallow(<OptInButton {...customProps} />);

    expect(spy).toHaveBeenCalledTimes(0);
    rendered.find("Button").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
