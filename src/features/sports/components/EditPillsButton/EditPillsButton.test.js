// @flow

import React from "react";
import { shallow } from "enzyme";
import EditPillsButton, { defaultClasses } from "./EditPillsButton";

describe("<EditPillsButton />", () => {
  test("renders correctly", () => {
    const rendered = shallow(<EditPillsButton onClick={() => {}} />);

    expect(rendered.find("CrossIcon")).toHaveLength(1);
  });

  test("when clicked triggers onClick", () => {
    const onClick = jest.fn();
    const rendered = shallow(<EditPillsButton onClick={onClick} />);

    rendered.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("uses className overrides, when supplied", () => {
    const newClassNames = "test-class-1 test-class-2";
    const rendered = shallow(
      <EditPillsButton onClick={() => {}} className={newClassNames} />
    ).find(".c-edit-pills-button");

    expect(rendered.hasClass(newClassNames)).toBe(true);
    expect(rendered.hasClass(defaultClasses)).toBe(false);
  });
});
