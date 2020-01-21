import { isMenuOpen } from "./menu.selectors";

describe("menu selectors", () => {
  describe("isMenuOpen", () => {
    test("returns FALSE if the menu is not open", () => {
      expect(
        isMenuOpen({
          menu: {
            open: false,
          },
        })
      ).toEqual(false);
    });

    test("returns TRUE if the menu is open", () => {
      expect(
        isMenuOpen({
          menu: {
            open: true,
          },
        })
      ).toEqual(true);
    });
  });
});
