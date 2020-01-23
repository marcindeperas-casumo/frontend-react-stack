import { isSidebarOpen } from "./sidebar.selectors";

describe("sidebar selectors", () => {
  describe("isSidebarOpen", () => {
    test("returns FALSE if sidebar is not open", () => {
      expect(
        isSidebarOpen({
          sidebar: {
            open: false,
          },
        })
      ).toEqual(false);
    });

    test("returns TRUE if sidebar is open", () => {
      expect(
        isSidebarOpen({
          sidebar: {
            open: true,
          },
        })
      ).toEqual(true);
    });
  });
});
