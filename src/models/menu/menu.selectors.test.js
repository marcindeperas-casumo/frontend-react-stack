import { isMenuOpen } from "./menu.selectors";

describe("menu selectors", () => {
  describe("isMenuOpen", () => {
    test("menu is not open", () => {
      expect(
        isMenuOpen({
          menu: {
            open: false,
          },
        })
      ).toEqual(false);
    });

    test("menu is open", () => {
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
