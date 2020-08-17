import React from "react";
import * as R from "ramda";
import { shallow } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
// import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import {
  SportsMainNav,
  // renderTabList,
  renderEditButton,
  renderAllSportsTab,
  renderLiveButton,
} from "Features/sports/components/SportsNav";
// import {
//   SportTab,
//   LiveTab,
// } from "Features/sports/components/SportsNav/SportsNavTab";
import { navItems } from "../__mocks__/navItems";

const liveState = {
  active: [true, () => {}],
  inactive: [false, () => {}],
};

const props = {
  navItems,
  canEdit: true,
  onEdit: jest.fn(),
  isSelected: jest.fn(),
  onSelected: jest.fn(),
  cacheBuster: "hey brother",
  liveState: liveState.inactive,
  labels: {
    all: "all",
    live: "live",
    edit: "edit",
  },
};

describe("<SportsMainNav />", () => {
  test("passes the correct props to the ScrollablePaginated when multiple nav items exist", () => {
    const rendered = shallow(<SportsMainNav {...props} />);
    const sp = rendered.find(ScrollablePaginated);

    expect(sp).toHaveLength(1);
    expect(sp.props()).toMatchObject({
      columnCount: 8,
      height: 106,
    });
  });

  describe("renderAllSportsTab", () => {
    test("returns with nothing - when live mode is disabled", () => {
      const isSelected = false;
      const onSelected = jest.fn();
      const isLiveActive = false;
      const result = renderAllSportsTab({ isSelected, onSelected }, [
        isLiveActive,
      ]);

      expect(result).toBeFalsy();
    });

    test("renders a DictionaryTerm - when live mode is enabled", () => {
      const isSelected = false;
      const onSelected = jest.fn();
      const isLiveActive = true;
      const rendered = shallow(
        <MockedProvider mocks={[]}>
          {renderAllSportsTab({ isSelected, onSelected }, [isLiveActive])}
        </MockedProvider>
      );

      expect(rendered.find("DictionaryTerm")).toHaveLength(1);
    });
  });

  describe("renderLiveButton", () => {
    test("returns a <LiveTab> component and passes the necessary props", () => {
      const buttonProps = {
        navItems: "...",
        labels: { live: "..." },
        canEdit: "...",
        onEdit: "...",
      };
      const sportCount = 1;
      const isLiveActive = false;
      const setIsLiveActive = () => {};
      const rendered = shallow(
        <div>
          {renderLiveButton(
            buttonProps,
            [isLiveActive, setIsLiveActive],
            sportCount
          )}
        </div>
      );
      const renderedProps = rendered.find("SportsNavLiveTab").props();

      expect(renderedProps.count).toBe(sportCount);
      expect(renderedProps.label).toBe(buttonProps.labels.live);
      expect(renderedProps.isActive).toBe(isLiveActive);
      expect(renderedProps.onClick).toBeDefined();
    });
  });

  describe("renderTabList", () => {
    // test("renders a live button for the 1st position", () => {
    //   const rendered = shallow(
    //     renderTabList(navItems, props)({ columnIndex: 0 })
    //   );
    //   expect(rendered.find(LiveTab)).toHaveLength(1);
    // });
    //
    // test("renders no sports tab for the 2nd position - when live mode is disabled", () => {
    //   const rendered = shallow(
    //     renderTabList(navItems, props)({ columnIndex: 1 })
    //   );
    //
    //   expect(rendered.find(DictionaryTerm)).toHaveLength(0);
    //   expect(rendered.find(SportTab)).toHaveLength(0);
    // });
    //
    // test("renders an all sports tab for the 2nd position - when live mode is enabled", () => {
    //   const liveProps = { ...props, liveState: liveState.active };
    //   const rendered = shallow(
    //     renderTabList(navItems, liveProps)({ columnIndex: 1 })
    //   );
    //
    //   expect(rendered.find(DictionaryTerm)).toHaveLength(1);
    // });
    //
    // test("renders an sports tab for the 3rd position", () => {
    //   const rendered = shallow(
    //     renderTabList(navItems, props)({ columnIndex: 2 })
    //   );
    //   expect(rendered.find(SportTab)).toHaveLength(1);
    // });
    //
    // test("renders an sports tab for 2nd-to-last position", () => {
    //   const rendered = shallow(
    //     renderTabList(navItems, props)({ columnIndex: navItems.length })
    //   );
    //
    //   expect(rendered.find(SportTab)).toHaveLength(1);
    // });
    //
    // test("returns an EditPillsButton when rendering the last item", () => {
    //   const rendered = shallow(
    //     renderTabList(navItems, props)({ columnIndex: navItems.length + 2 })
    //   );
    //
    //   expect(rendered.find(EditPillsButton)).toHaveLength(1);
    // });
  });

  describe("renderEditButton", () => {
    const editButtonProps = R.pick(
      ["navItems", "labels", "canEdit", "onEdit"],
      props
    );

    test("renders a button when canEdit is true and isLiveActive is false", () => {
      const rendered = shallow(
        renderEditButton(editButtonProps, liveState.inactive)
      );

      expect(rendered.find(EditPillsButton)).toHaveLength(1);
    });

    test("returns null when isLiveActive is true", () => {
      const rendered = shallow(
        renderEditButton(editButtonProps, liveState.active)
      );

      expect(rendered.find(EditPillsButton)).toHaveLength(0);
    });

    test("returns null when canEdit is false", () => {
      const rendered = shallow(
        renderEditButton({ ...props, canEdit: false }, liveState.inactive)
      );

      expect(rendered.find(EditPillsButton)).toHaveLength(0);
    });
  });
});
