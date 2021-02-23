// @flow
import { recordSaga } from "Utils";
import { getGameCategory } from "Api/api.casinoPlayerGames";
import { shouldShowSlotControlSystemSaga } from "./shouldShowSlotControlSystem.saga";

const gameCategory = "SLOT_MACHINE";
const slug = "tiger-rush";
const state = {
  slotControlSystem: {
    slugToCategoryMap: {
      [slug]: gameCategory,
    },
  },
};
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

// jest.mock("Lib/cometd"); // For some reason, this file executes and breaks tests here 🐛
jest.mock("Api/api.casinoPlayerGames", () => ({
  getGameCategory: jest.fn(),
}));

// $FlowIgnore
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mockResolvedValue' does not exist on typ... Remove this comment to see the full error message
getGameCategory.mockResolvedValue(gameCategory);
// $FlowIgnore
describe("Models/slotControlSystem/shouldShowSlotControlSystemSaga()", () => {
  beforeEach(() => {
    // $FlowIgnore
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockClear' does not exist on type '(slug... Remove this comment to see the full error message
    getGameCategory.mockClear();
    window.location = location;
  });

  test("fetch data if nothing is saved in store", async () => {
    setPathname("/play/tiger-rush/launch");
    const { result } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
    });

    expect(getGameCategory).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  test("gets data from store if possible", async () => {
    setPathname("/play/tiger-rush/launch");
    const { result } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
      state,
    });

    expect(getGameCategory).toHaveBeenCalledTimes(0);
    expect(result).toBe(true);
  });

  test("returns false right away if not on game page", async () => {
    setPathname("/not-game-page");
    const { result, effects } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
      state,
    });

    expect(effects).toStrictEqual({});
    expect(result).toBe(false);
  });
});
