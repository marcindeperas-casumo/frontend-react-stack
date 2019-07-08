import React from "react";
import { shallow } from "enzyme";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  SportsMainNav,
  renderTabList,
  renderEditButton,
} from "Features/sports/components/SportsNav";
import {
  SportTab,
  LiveTab,
} from "Features/sports/components/SportsNav/SportsNavTab";
import { navItems } from "../__mocks__/navItems";

const props = {
  navItems,
  canEdit: true,
  onEdit: jest.fn(),
  isSelected: jest.fn(),
  onSelected: jest.fn(),
  cacheBuster: "hey brother",
  liveState: [false, () => {}],
  labels: {
    all: "all",
    live: "live",
    edit: "edit",
  },
};

describe("<SportsMainNav />", () => {
  test("passes the correct props to the ScrollablePaginated when a multiple nav items exist", () => {
    const rendered = shallow(<SportsMainNav {...props} />);
    const sp = rendered.find(ScrollablePaginated);

    expect(sp).toHaveLength(1);
    expect(sp.props()).toMatchObject({
      columnCount: 5,
      height: 106,
    });
  });

  describe("renderTabList", () => {
    test("renders a live button for the 1st position", () => {
      const rendered = shallow(
        renderTabList(navItems, props)({ columnIndex: 0 })
      );
      expect(rendered.find(LiveTab)).toHaveLength(1);
    });

    test("renders an sports tab for the 2nd position", () => {
      const rendered = shallow(
        renderTabList(navItems, props)({ columnIndex: 1 })
      );
      expect(rendered.find(SportTab)).toHaveLength(1);
    });

    test("renders an sports tab for 2nd-to-last position", () => {
      const rendered = shallow(
        renderTabList(navItems, props)({ columnIndex: navItems.length - 1 })
      );

      expect(rendered.find(SportTab)).toHaveLength(1);
    });

    test("returns an EditPillsButton when rendering the last item", () => {
      const rendered = shallow(
        renderTabList(navItems, props)({ columnIndex: navItems.length })
      );

      expect(rendered.find(EditPillsButton)).toHaveLength(1);
    });
  });

  describe("renderEditButton", () => {
    test("renders a button when canEdit is true", () => {
      const rendered = shallow(renderEditButton(props));

      expect(rendered.find(EditPillsButton)).toHaveLength(1);
    });

    test("returns null when canEdit is false", () => {
      const rendered = shallow(renderEditButton({ ...props, canEdit: false }));

      expect(rendered.find(EditPillsButton)).toHaveLength(0);
    });
  });
});
