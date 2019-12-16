// @flow
import React from "react";
import { shallow } from "enzyme";
import { IconProfile } from "../icons";
import { SidebarRow } from "./SidebarRow";

describe("SidebarRow", () => {
  test("should render link", () => {
    const rendered = shallow(<SidebarRow text="FAQ" link="/faq" />);
    expect(rendered.find({ "data-test-id": "sidebar-link" }).length).toBe(1);
  });

  test("should render icon", () => {
    const rendered = shallow(<SidebarRow text="FAQ" Icon={IconProfile} />);
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(1);
  });

  test("should not render icon", () => {
    const rendered = shallow(<SidebarRow text="FAQ" />);
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(0);
  });

  test("should render text", () => {
    const text = "FAQ";
    const rendered = shallow(<SidebarRow text={text} />);
    expect(
      rendered
        .find({ "data-test-id": "sidebar-text" })
        .dive()
        .text()
    ).toBe(text);
  });

  test("should render label", () => {
    const text = "SuperRandomText";
    const rendered = shallow(<SidebarRow label={text} />);
    expect(
      rendered
        .find({ "data-test-id": "sidebar-text-small" })
        .dive()
        .text()
    ).toBe(text);
  });

  test("should render selected class", () => {
    const rendered = shallow(<SidebarRow secondary selected />);
    expect(
      rendered
        .find({ "data-test-id": "sidebar-li" })
        .hasClass("t-background-turquoise")
    ).toBe(true);
  });

  test("should render white class", () => {
    const rendered = shallow(<SidebarRow secondary />);
    expect(
      rendered
        .find({ "data-test-id": "sidebar-li" })
        .hasClass("t-background-white")
    ).toBe(true);
  });

  test("should render default", () => {
    const rendered = shallow(<SidebarRow />);
    expect(
      rendered
        .find({ "data-test-id": "sidebar-li" })
        .hasClass("t-background-plum")
    ).toBe(true);
  });

  test("should not render small text", () => {
    const rendered = shallow(<SidebarRow />);
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).length).toBe(
      0
    );
  });

  test("action fires", () => {
    const action = jest.fn();
    const rendered = shallow(<SidebarRow action={action} />);

    const a = rendered.find({ "data-test-id": "sidebar-link" });
    a.simulate("click");
    expect(action).toHaveBeenCalledTimes(1);
  });
});
