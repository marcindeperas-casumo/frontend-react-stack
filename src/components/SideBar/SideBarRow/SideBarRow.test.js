// @flow
import React from "react";
import { shallow } from "enzyme";
import { IconProfile } from "../icons";
import { SideBarRow } from "./SideBarRow";

describe("SideBarRow", () => {
  test("should render link", () => {
    const rendered = shallow(<SideBarRow text="FAQ" link="/faq" />);
    expect(rendered.find({ "data-test-id": "sidebar-link" }).length).toBe(1);
  });

  test("should render icon", () => {
    const rendered = shallow(<SideBarRow text="FAQ" Icon={IconProfile} />);
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(1);
  });

  test("should not render icon", () => {
    const rendered = shallow(<SideBarRow text="FAQ" />);
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(0);
  });

  test("should render text", () => {
    const text = "FAQ";
    const rendered = shallow(<SideBarRow text={text} />);
    expect(rendered.find({ "data-test-id": "sidebar-text" }).text()).toBe(text);
  });

  test("should render label", () => {
    const text = "SuperRandomText";
    const rendered = shallow(<SideBarRow text="" label={text} />);
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).text()).toBe(
      text
    );
  });

  test("should render selected class", () => {
    const rendered = shallow(
      <SideBarRow text="" isWhiteRow={true} isSelected={true} />
    );
    expect(
      rendered
        .find({ "data-test-id": "sidebar-li" })
        .hasClass("t-background-turquoise")
    ).toBe(true);
  });

  test("should render white class", () => {
    const rendered = shallow(
      <SideBarRow text="" isWhiteRow={true} isSelected={false} />
    );
    expect(
      rendered
        .find({ "data-test-id": "sidebar-li" })
        .hasClass("t-background-white")
    ).toBe(true);
  });

  test("should render default", () => {
    const rendered = shallow(
      <SideBarRow text="" isWhiteRow={false} isSelected={false} />
    );
    expect(
      rendered
        .find({ "data-test-id": "sidebar-li" })
        .hasClass("t-background-plum")
    ).toBe(true);
  });

  test("should not render small text", () => {
    const rendered = shallow(<SideBarRow text="" />);
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).length).toBe(
      0
    );
  });

  test("action fires", () => {
    const action = jest.fn();
    const rendered = shallow(<SideBarRow text="" action={action} />);

    const a = rendered.find({ "data-test-id": "sidebar-link" });
    a.simulate("click");
    expect(action).toHaveBeenCalledTimes(1);
  });
});
