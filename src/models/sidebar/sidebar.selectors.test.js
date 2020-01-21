import { isSidebarOpen } from "./sidebar.selectors";

describe("menu selectors", () => {
  describe("isMenuOpen", () => {
    test("returns FALSE if the menu is not open", () => {
      expect(
        isSidebarOpen({
          menu: {
            open: false,
          },
        })
      ).toEqual(false);
    });

    test("returns TRUE if the menu is open", () => {
      expect(
        isSidebarOpen({
          menu: {
            open: true,
          },
        })
      ).toEqual(true);
    });
  });
});
