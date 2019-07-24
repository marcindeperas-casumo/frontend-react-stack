import { navItemUtils } from "Features/sports/components/SportsNav/sportsNavUtils";
import { navItems } from "Features/sports/components/SportsNav/__mocks__/navItems";

const { isNavItemSelected } = navItemUtils;

describe("isNavItemSelected()", () => {
  test("should check if navItem's path matches the current location", () => {
    expect(isNavItemSelected(`#${navItems[0].path}`)(navItems[0])).toBe(true);

    expect(isNavItemSelected(`#${navItems[0].path}`)(navItems[1])).toBe(false);
  });

  test("should handle when the 'All' filter is enabled in the subnav", () => {
    const allNavItem = {
      text: "All",
      path: "filter/football",
      parentPath: "filter/football",
      key: "all",
      canEdit: false,
    };

    expect(isNavItemSelected(`#filter/football`)(allNavItem)).toBe(true);
    expect(
      isNavItemSelected(`#filter/football/norway/eliteserien`)(allNavItem)
    ).toBe(false);
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
