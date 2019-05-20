import React from "react";
import { shallow } from "enzyme";
import Link from "Components/Settings/Link";

describe("Link", () => {
  test("should render a regular link", () => {
    const label = "foo";
    const target = "http://www.casumo.com";
    const rendered = shallow(<Link label={label} target={target} />);
    expect(rendered.find("a").length).toBe(1);
    expect(rendered.text()).toBe(label);
    expect(rendered.prop("href")).toBe(target);
  });

  test("should render a triggerable function", () => {
    const label = "foo";
    const launcher = jest.fn();
    const target = { foo: "bar" };
    const rendered = shallow(
      <Link label={label} launcher={launcher} target={target} />
    );
    expect(rendered.text()).toBe(label);
    rendered.simulate("click");
    expect(launcher).toHaveBeenCalledWith(target);
  });
});
