// @low
import React from "react";
import { F } from "ramda";
import { shallow } from "enzyme";

import SportsMainNav from "./SportsMainNav";
import SportsNavTab from "./SportsNavTab";
import SportsSingleNavTab from "./SportsSingleNavTab";

import navItems from "./__mocks__/navItems";

describe("<SportsMainNav />", () => {
  test("renders the correct number of tabs in list if list is more than 1 long", () => {
    const rendered = shallow(
      <SportsMainNav navItems={navItems} isSelected={F} />
    );

    expect(rendered.find(SportsNavTab)).toHaveLength(navItems.length);
    expect(rendered.find(SportsSingleNavTab)).toHaveLength(0);
  });

  test("renders the single nav tab if only 1 nav item provided", () => {
    const rendered = shallow(
      <SportsMainNav navItems={[navItems[0]]} isSelected={F} />
    );

    expect(rendered.find(SportsNavTab)).toHaveLength(0);
    expect(rendered.find(SportsSingleNavTab)).toHaveLength(1);
  });

  test("when canEdit is true, it renders an edit button and calls the onEdit when clicked", () => {
    const onEdit = jest.fn();
    const rendered = shallow(
      <SportsMainNav
        navItems={navItems}
        isSelected={F}
        canEdit={true}
        onEdit={onEdit}
      />
    );
    const renderedWithoutEdit = shallow(
      <SportsMainNav
        navItems={navItems}
        isSelected={F}
        canEdit={false}
        onEdit={() => {}}
      />
    );

    expect(renderedWithoutEdit.find("EditPillsButton")).toHaveLength(0);
    expect(rendered.find("EditPillsButton")).toHaveLength(1);

    rendered.find("EditPillsButton").simulate("click");

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("calls onSelected with correct navItem when NavTab is clicked", () => {
    const onSelected = jest.fn();
    const rendered = shallow(
      <SportsMainNav
        navItems={navItems}
        isSelected={F}
        onSelected={onSelected}
      />
    );

    const navTabs = rendered.find(SportsNavTab);

    navTabs.at(1).simulate("click");
    expect(onSelected).toHaveBeenCalledWith(navItems[1]);

    navTabs.at(2).simulate("click");
    expect(onSelected).toHaveBeenCalledWith(navItems[2]);

    expect(onSelected).toHaveBeenCalledTimes(2);
  });

  test("isSelected is called with each navItem to determine if selected", () => {
    const isSelected = jest.fn();
    shallow(<SportsMainNav navItems={navItems} isSelected={isSelected} />);

    expect(isSelected).toHaveBeenCalledTimes(navItems.length);
    expect(isSelected).toHaveBeenNthCalledWith(2, navItems[1]);
    expect(isSelected).toHaveBeenNthCalledWith(1, navItems[0]);
  });
});
