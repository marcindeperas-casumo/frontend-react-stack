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

    expect(rendered.exists("CrossIcon")).toBe(true);
  });

  test("calls onRemove when the remove icon is clicked and stops event propagation", () => {
    const onRemove = jest.fn();
    const stopPropagation = jest.fn();
    const rendered = shallow(<Pill onRemove={onRemove}>test</Pill>);

    rendered.find("CrossIcon").simulate("click", { stopPropagation });

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

  //   test("passes down onRemove to Pill", () => {
  //     const onRemove = jest.fn();
  //     const rendered = shallow(
  //       <GroupPill onRemove={onRemove} group={testGroup} />
  //     );

  //     expect(rendered.find(Pill).props().onRemove).toEqual(onRemove);
  //   });

  //   test("passes down onClick to Pill", () => {
  //     const onClick = jest.fn();
  //     const rendered = shallow(<GroupPill onClick={onClick} group={testGroup} />);

  //     expect(rendered.find(Pill).props().onClick).toEqual(onClick);
  //   });

  //   test("passes down onClick to Pill", () => {
  //     const isActive = true;
  //     const rendered = shallow(
  //       <GroupPill isActive={isActive} group={testGroup} />
  //     );

  //     expect(rendered.find(Pill).props().isActive).toEqual(isActive);
  //   });
});
