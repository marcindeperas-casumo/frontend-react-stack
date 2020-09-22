// @flow
import React from "react";
import { shallow } from "enzyme";
import SportsIcon from "Features/sports/components/SportsIcon";

const src = "some-active-icon.svg";
const srcWhenActive = "some-active-icon.svg";
const props = { src, srcWhenActive };

const findElements = container => ({
  icon: container.find("[data-test='sports-icon-icon']"),
  activeIndicator: container.find("[data-test='sports-icon-active-indicator']"),
});

describe("SportsIcon", () => {
  test("renders the icon but no active indicator by default", () => {
    const rendered = shallow(<SportsIcon {...props} />);
    const { icon, activeIndicator } = findElements(rendered);

    expect(icon.length).toEqual(1);
    expect(activeIndicator.length).toEqual(0);
  });

  test("renders the icon but no active indicator when `isActive` is false", () => {
    const rendered = shallow(<SportsIcon {...props} isActive={false} />);
    const { icon, activeIndicator } = findElements(rendered);

    expect(icon.length).toEqual(1);
    expect(activeIndicator.length).toEqual(0);
  });
});
