import React from "react";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import {
  toNavItem,
  activeIndicator,
} from "Features/sports/components/SportsNav/sportsNavUtils";
import { userNavigationData } from "Features/sports/components/SportsNav/__mocks__/userNavigationData";

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
              <div className="u-width--lg u-height--md">
                <RegionFlag className="u-margin-right" regionCode="ES" />
              </div>
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
              <div className="u-width--lg u-height--md">
                <RegionFlag className="u-margin-right" regionCode="PL" />
              </div>
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
              <div className="u-width--lg u-height--md">
                <RegionFlag className="u-margin-right" regionCode="EU" />
              </div>
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
              <div className="u-width--lg u-height--md">
                <RegionFlag className="u-margin-right" regionCode="ES" />
              </div>
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
              <div className="u-width--lg u-height--md">
                <RegionFlag className="u-margin-right" regionCode="PL" />
              </div>
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
              <div className="u-width--lg u-height--md">
                <RegionFlag className="u-margin-right" regionCode="EU" />
              </div>
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
