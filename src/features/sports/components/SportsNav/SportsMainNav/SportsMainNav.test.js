import React from "react";
import { shallow } from "enzyme";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  SportsMainNav,
  renderTabList,
  renderEditButton,
} from "Features/sports/components/SportsNav";
import { SportTab } from "Features/sports/components/SportsNav/SportsNavTab";
import { navItems } from "../__mocks__/navItems";

const props = {
  navItems,
  canEdit: true,
  onEdit: jest.fn(),
  isSelected: jest.fn(),
  onSelected: jest.fn(),
  editLabel: "edit",
};

describe("<SportsMainNav />", () => {
  test("passes the correct props to the ScrollablePaginated when a multiple nav items exist", () => {
    const rendered = shallow(<SportsMainNav {...props} />);
    const sp = rendered.find(ScrollablePaginated);

    expect(sp).toHaveLength(1);
    expect(sp.props()).toMatchObject({
      columnCount: 5,
      // TODO(cpoliver): match fn but not instance
      // cellRenderer: renderTabList(props),
      height: 106,
    });
  });

  describe("renderTabList", () => {
    test("returns a SportTab and no EditButton when rendering a non-last item", () => {
      const renderedFirst = shallow(renderTabList(props)({ columnIndex: 0 }));

      expect(renderedFirst.find(SportTab)).toHaveLength(1);
      expect(renderedFirst.find(EditPillsButton)).toHaveLength(0);

      const renderedThird = shallow(renderTabList(props)({ columnIndex: 2 }));
      expect(renderedThird.find(SportTab)).toHaveLength(1);
      expect(renderedThird.find(EditPillsButton)).toHaveLength(0);
    });

    test("returns an EditPillsButton and no SportTab when rendering the last item", () => {
      const rendered = shallow(renderTabList(props)({ columnIndex: 5 }));

      expect(rendered.find(SportTab)).toHaveLength(0);
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
