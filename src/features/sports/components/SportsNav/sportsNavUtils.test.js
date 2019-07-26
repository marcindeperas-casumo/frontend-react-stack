import React from "react";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import {
  ALL_SPORTS_PATH,
  isNavItemSelected,
  toNavItem,
  makeAllSportsNavItem,
  activeIndicator,
} from "Features/sports/components/SportsNav/sportsNavUtils";
import {
  liveNavItem,
  navItems,
} from "Features/sports/components/SportsNav/__mocks__/navItems";
import { userNavigationData } from "Features/sports/components/SportsNav/__mocks__/userNavigationData";

describe("isNavItemSelected()", () => {
  test("should check if navItem's path matches the current location", () => {
    expect(isNavItemSelected(`#${navItems[0].path}`)(navItems[0])).toBe(true);
    expect(isNavItemSelected(`#${navItems[0].path}`)(navItems[1])).toBe(false);
  });

  test("should handle when the 'All Sports' tab is enabled in the live main nav", () => {
    const navItem = makeAllSportsNavItem("All Sports");

    expect(isNavItemSelected(`#${ALL_SPORTS_PATH}`)(navItem)).toBe(true);
    expect(isNavItemSelected("#filter/football")(navItem)).toBe(false);
  });

  test("should handle when the 'All' filter is enabled in the subnav", () => {
    expect(isNavItemSelected(`#filter/football`)(navItems[0])).toBe(true);
    expect(
      isNavItemSelected("#filter/football/norway/eliteserien")(navItems[0])
    ).toBe(true);
  });

  test("should check if a live nav item is selected", () => {
    expect(
      isNavItemSelected("#filter/football/all/all/all/in-play")(liveNavItem)
    ).toBe(true);

    expect(
      isNavItemSelected("#filter/football/australia/state_cups/all/in-play")(
        liveNavItem
      )
    ).toBe(true);
  });

  test("should check if a live subnav item is selected", () => {
    expect(
      isNavItemSelected("#filter/football/all/all/all/in-play")(
        liveNavItem.subNav[0]
      )
    ).toBe(false);

    expect(
      isNavItemSelected("#filter/football/australia/state_cups/all/in-play")(
        liveNavItem.subNav[0]
      )
    ).toBe(true);
  });

  test("should check if the navItem is a parent of the current location", () => {
    expect(
      isNavItemSelected(`#${navItems[0].subNav[0].path}`)(navItems[0])
    ).toBe(true);

    expect(
      isNavItemSelected(`#${navItems[1].subNav[2].path}`)(navItems[1])
    ).toBe(true);

    expect(
      isNavItemSelected(`#${navItems[1].subNav[2].path}`)(navItems[0])
    ).toBe(false);
  });

  test("should test against the drill-down version of the path", () => {
    expect(
      isNavItemSelected(`#drill-down/football/test`)({
        path: "filter/football/test",
      })
    ).toBe(true);

    expect(
      isNavItemSelected(`#drill-down/uk/test`)({
        path: "racing/uk/test",
      })
    ).toBe(true);

    expect(
      isNavItemSelected(`#drill-down/uk/test`)({
        path: "racing/football/test",
      })
    ).toBe(false);
  });
});

describe("onNavItemSelected()", () => {
  test("should call navigateClient mutation when an item is selected with correct path and location", () => {
    // TODO: Strategy for Testing Mutations and Apollo Components - https://github.com/casumo/Home/issues/30372
  });

  test("should navigate to parent path, if navItem path is current location, if the navItem has a parentPath", () => {
    // TODO: Strategy for Testing Mutations and Apollo Components - https://github.com/casumo/Home/issues/30372
  });
});

describe("toNavItem()", () => {
  test("should convert a sports nav item type - with the appropriate paths for live mode", () => {
    const isLiveActive = true;
    const actual = toNavItem(isLiveActive)(userNavigationData[1]);

    expect(actual).toMatchObject({
      text: "Basketball",
      path: "filter/basketball/in-play",
      key: "basketball",
      iconProps: {
        iconSrc:
          "https://cms.casumo.com/wp-content/uploads/2019/02/basketball1.svg",
        activeIndicator,
        alt: "Basketball",
      },
      canEdit: false,
      subNav: [
        {
          text: (
            <React.Fragment>
              <RegionFlag className="u-margin-right" regionCode="ES" />
              Liga ACB
            </React.Fragment>
          ),
          path: "filter/basketball/spain/liga_acb/in-play",
          parentPath: "filter/basketball/in-play",
          key: "basketball",
          canEdit: false,
        },
        {
          path: "filter/basketball/ncaam/in-play",
          parentPath: "filter/basketball/in-play",
          key: "basketball",
          canEdit: false,
        },
        {
          path: "filter/basketball/nba/in-play",
          parentPath: "filter/basketball/in-play",
          key: "basketball",
          canEdit: false,
        },
        {
          text: (
            <React.Fragment>
              <RegionFlag className="u-margin-right" regionCode="PL" />
              Energa Basket Liga
            </React.Fragment>
          ),
          path: "filter/basketball/poland/energa_basket_liga/in-play",
          parentPath: "filter/basketball/in-play",
          key: "basketball",
          canEdit: false,
        },
        {
          text: (
            <React.Fragment>
              <RegionFlag className="u-margin-right" regionCode="EU" />
              Euroleague
            </React.Fragment>
          ),
          path: "filter/basketball/euroleague/in-play",
          parentPath: "filter/basketball/in-play",
          key: "basketball",
          canEdit: false,
        },
      ],
    });
  });

  test("should convert a sports nav item type - with the appropriate paths for non-live mode", () => {
    const isLiveActive = false;
    const actual = toNavItem(isLiveActive)(userNavigationData[1]);

    expect(actual).toMatchObject({
      text: "Basketball",
      path: "filter/basketball",
      key: "basketball",
      iconProps: {
        iconSrc:
          "https://cms.casumo.com/wp-content/uploads/2019/02/basketball1.svg",
        activeIndicator,
        alt: "Basketball",
      },
      canEdit: false,
      subNav: [
        {
          text: (
            <React.Fragment>
              <RegionFlag className="u-margin-right" regionCode="ES" />
              Liga ACB
            </React.Fragment>
          ),
          path: "filter/basketball/spain/liga_acb",
          parentPath: "filter/basketball",
          key: "basketball",
          canEdit: false,
        },
        {
          path: "filter/basketball/ncaam",
          parentPath: "filter/basketball",
          key: "basketball",
          canEdit: false,
        },
        {
          path: "filter/basketball/nba",
          parentPath: "filter/basketball",
          key: "basketball",
          canEdit: false,
        },
        {
          text: (
            <React.Fragment>
              <RegionFlag className="u-margin-right" regionCode="PL" />
              Energa Basket Liga
            </React.Fragment>
          ),
          path: "filter/basketball/poland/energa_basket_liga",
          parentPath: "filter/basketball",
          key: "basketball",
          canEdit: false,
        },
        {
          text: (
            <React.Fragment>
              <RegionFlag className="u-margin-right" regionCode="EU" />
              Euroleague
            </React.Fragment>
          ),
          path: "filter/basketball/euroleague",
          parentPath: "filter/basketball",
          key: "basketball",
          canEdit: false,
        },
      ],
    });
  });
});
