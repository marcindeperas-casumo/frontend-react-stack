import {
  navItemUtils,
  makeAllSportsNavItem,
} from "Features/sports/components/SportsNav/sportsNavUtils";
import {
  liveNavItem,
  navItems,
} from "Features/sports/components/SportsNav/__mocks__/navItems";

const { isNavItemSelected } = navItemUtils;

describe("isNavItemSelected()", () => {
  test("should check if navItem's path matches the current location", () => {
    expect(isNavItemSelected(`#${navItems[0].path}`)(navItems[0])).toBe(true);
    expect(isNavItemSelected(`#${navItems[0].path}`)(navItems[1])).toBe(false);
  });

  test("should handle when the 'All Sports' tab is enabled in the live main nav", () => {
    const navItem = makeAllSportsNavItem("All Sports");

    expect(isNavItemSelected(`#filter/all/all/all/all/in-play`)(navItem)).toBe(
      true
    );
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
