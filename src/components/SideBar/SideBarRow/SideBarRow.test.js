import React from "react";
import { shallow, mount } from "enzyme";
import { IconProfile } from "../icons";
import { SideBarRow } from "./SideBarRow";

describe("SideBarRow", () => {
  test("should render link", () => {
    const rendered = mount(
      <SideBarRow text="FAQ" Icon="" cssClasses={[`white`]} link="/faq" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-link" }).length).toBe(1);
  });

  test("should not render link", () => {
    const rendered = mount(
      <SideBarRow text="FAQ" Icon="" cssClasses={[`white`]} link="" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-link" }).length).toBe(0);
  });

  test("should render icon", () => {
    const rendered = shallow(
      <SideBarRow
        text="FAQ"
        Icon={IconProfile}
        cssClasses={[`white`]}
        link=""
      />
    );
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(1);
  });

  test("should not render icon", () => {
    const rendered = shallow(
      <SideBarRow text="FAQ" Icon="" cssClasses={[`white`]} link="" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-icon" }).length).toBe(0);
  });

  test("should render text", () => {
    const text = "FAQ";
    const rendered = shallow(
      <SideBarRow text={text} Icon="" cssClasses={[`white`]} link="" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-text" }).text()).toBe(text);
  });

  test("should render small text", () => {
    const text = "SuperRandomText";
    const rendered = shallow(
      <SideBarRow text="" label={text} Icon="" cssClasses={[`white`]} link="" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).text()).toBe(
      text
    );
  });

  test("should not render small text", () => {
    const rendered = shallow(
      <SideBarRow text="" label="" Icon="" cssClasses={[`white`]} link="" />
    );
    expect(rendered.find({ "data-test-id": "sidebar-text-small" }).length).toBe(
      0
    );
  });

  test("action fires", () => {
    const action = jest.fn();
    const rendered = shallow(
      <SideBarRow
        text=""
        label=""
        Icon=""
        cssClasses={[`white`]}
        link=""
        action={action}
      />
    );

    const li = rendered.find({ "data-test-id": "sidebar-li" });
    li.simulate("click");
    expect(action).toHaveBeenCalledTimes(1);
  });
});
