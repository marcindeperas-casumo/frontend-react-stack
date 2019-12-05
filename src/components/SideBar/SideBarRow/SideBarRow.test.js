import React from "react";
import { shallow, mount } from "enzyme";
import { IconProfile } from "../icons";
import { SideBarRow } from "./SideBarRow";

describe("SideBarRow", () => {
  test("should render link", () => {
    const rendered = mount(
      <SideBarRow text="FAQ" isWhiteRow={true} link="/faq" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-link" }).length).toBe(1);
  });

  test("should render icon", () => {
    const rendered = shallow(
      <SideBarRow text="FAQ" Icon={IconProfile} isWhiteRow={true} />
    );
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(1);
  });

  test("should not render icon", () => {
    const rendered = shallow(<SideBarRow text="FAQ" isWhiteRow={true} />);
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(0);
  });

  test("should render text", () => {
    const text = "FAQ";
    const rendered = shallow(<SideBarRow text={text} isWhiteRow={true} />);
    expect(rendered.find({ "data-test-id": "sidebar-text" }).text()).toBe(text);
  });

  test("should render label", () => {
    const text = "SuperRandomText";
    const rendered = shallow(
      <SideBarRow text="" label={text} isWhiteRow={true} />
    );
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).text()).toBe(
      text
    );
  });

  test("should not render small text", () => {
    const rendered = shallow(<SideBarRow text="" isWhiteRow={true} />);
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).length).toBe(
      0
    );
  });

  test("action fires", () => {
    const action = jest.fn();
    const rendered = shallow(
      <SideBarRow text="" label="" Icon="" link="" action={action} />
    );

    const a = rendered.find({ "data-test-id": "sidebar-link" });
    a.simulate("click");
    expect(action).toHaveBeenCalledTimes(1);
  });
});
