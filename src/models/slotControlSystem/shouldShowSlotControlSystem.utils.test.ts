// @flow
import {
  isSlotGame,
  getSlugFromGamePage,
} from "./shouldShowSlotControlSystem.utils";

const { location } = window;
function setPathname(pathname) {
  // eslint-disable-next-line fp/no-delete
  delete window.location;

  // @ts-expect-error ts-migrate(2740) FIXME: Type '{ href: string; origin: string; pathname: an... Remove this comment to see the full error message
  window.location = {
    href: `https://mydomain.com${pathname}`,
    origin: "https://mydomain.com",
    pathname,
  };
}
describe("Models/slotControlSystem/shouldShowSlotControlSystem", () => {
  test("isSlotGame", () => {
    expect(isSlotGame("BINGO")).toBe(true);
    expect(isSlotGame("LIVE_CASINO")).toBe(false);
    expect(isSlotGame("OTHER")).toBe(false);
    expect(isSlotGame("SLOT_MACHINE")).toBe(true);
  });

  test("getSlugFromGamePage", () => {
    setPathname("/play/tiger-rush/launch");
    expect(getSlugFromGamePage()).toBe("tiger-rush");
    window.location = location;

    setPathname("/play/someOther-launch");
    expect(getSlugFromGamePage()).toBe(undefined);
    window.location = location;
  });
});
