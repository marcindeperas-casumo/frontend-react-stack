import React from "react";
import { shallow } from "enzyme";
import { Pill } from "./Pill";

describe("<Pill />", () => {
  test("renders out a pill with the correct contents", () => {
    const testContent = "Testing";
    const rendered = shallow(<Pill>{testContent}</Pill>);

    expect(rendered.html()).toContain(testContent);
  });

  test("calls onClick when the pill is clicked", () => {
    const onClick = jest.fn();
    const rendered = shallow(<Pill onClick={onClick}>test</Pill>);

    rendered.simulate("click");

    expect(onClick).toBeCalledTimes(1);
  });

  test("shows remove icon if onRemove is passed as prop", () => {
    const rendered = shallow(<Pill onRemove={() => {}}>test</Pill>);
    const renderedNoOnRemove = shallow(<Pill>test</Pill>);

    expect(rendered.find("CloseIcon")).toHaveLength(1);
    expect(renderedNoOnRemove.exists("CloseIcon")).toBe(false);
  });

  test("calls onRemove when the remove icon is clicked and stops event propagation", () => {
    const onRemove = jest.fn();
    const stopPropagation = jest.fn();
    const rendered = shallow(<Pill onRemove={onRemove}>test</Pill>);

    rendered.find("CloseIcon").simulate("click", { stopPropagation });

    expect(onRemove).toBeCalledTimes(1);
    expect(stopPropagation).toBeCalledTimes(1);
  });

  test("uses activeClassNames when Pill is active", () => {
    const activeClassName = "active-class";
    const inactiveClassName = "inactive-class";
    const rendered = shallow(
      <Pill
        isActive={true}
        activeClassNames={activeClassName}
        inactiveClassNames={inactiveClassName}
      >
        test
      </Pill>
    );

    expect(rendered.hasClass(activeClassName)).toBe(true);
    expect(rendered.hasClass(inactiveClassName)).toBe(false);
  });

  test("uses inactiveClassNames when Pill is not active", () => {
    const activeClassName = "active-class";
    const inactiveClassName = "inactive-class";
    const rendered = shallow(
      <Pill
        isActive={false}
        activeClassNames={activeClassName}
        inactiveClassNames={inactiveClassName}
      >
        test
      </Pill>
    );

    expect(rendered.hasClass(activeClassName)).toBe(false);
    expect(rendered.hasClass(inactiveClassName)).toBe(true);
  });
});
