import React from "react";
import { shallow } from "enzyme";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import { SportsMainNav } from "Features/sports/components/SportsNav";
import { SportsNavTab } from "Features/sports/components/SportsNav/SportsNavTab/SportsNavTab";
import { navItems } from "../__mocks__/navItems";

const props = {
  navItems,
  canEdit: true,
  onEdit: jest.fn(),
  isSelected: jest.fn(),
  onSelected: jest.fn(),
  editLabel: "edit",
};

const render = overrideProps =>
  shallow(<SportsMainNav {...props} {...overrideProps} />);

describe("<SportsMainNav />", () => {
  test("passes the correct props to the ScrollablePaginated when a multiple nav items exist", () => {
    const rendered = render();
    const sp = rendered.find(ScrollablePaginated);

    expect(sp).toHaveLength(1);
    expect(sp.props()).toMatchObject({
      columnCount: 5,
      cellRenderer: rendered.instance().renderTabList,
      height: 106,
    });
  });

  describe("renderTabList", () => {
    test("returns a SportsNavTab and no EditButton when rendering a non-last item", () => {
      const instance = render().instance();
      const renderedFirst = shallow(instance.renderTabList({ columnIndex: 0 }));

      expect(renderedFirst.find(SportsNavTab)).toHaveLength(1);
      expect(renderedFirst.find(EditPillsButton)).toHaveLength(0);

      const renderedThird = shallow(instance.renderTabList({ columnIndex: 2 }));
      expect(renderedThird.find(SportsNavTab)).toHaveLength(1);
      expect(renderedThird.find(EditPillsButton)).toHaveLength(0);
    });

    test("returns an EditPillsButton and no SportsNavTab when rendering the last item", () => {
      const instance = render().instance();
      const rendered = shallow(instance.renderTabList({ columnIndex: 5 }));

      expect(rendered.find(SportsNavTab)).toHaveLength(0);
      expect(rendered.find(EditPillsButton)).toHaveLength(1);
    });
  });

  describe("renderEditButton", () => {
    test("renders a button when canEdit is true", () => {
      const instance = render({ canEdit: true }).instance();
      const rendered = shallow(instance.renderEditButton());

      expect(rendered.find(EditPillsButton)).toHaveLength(1);
    });

    test("returns null when canEdit is false", () => {
      const instance = render({ canEdit: false }).instance();
      const rendered = shallow(instance.renderEditButton());

      expect(rendered.find(EditPillsButton)).toHaveLength(0);
    });
  });
});
