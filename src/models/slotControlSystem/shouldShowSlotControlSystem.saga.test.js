// @flow
import { recordSaga } from "Utils";
import { getGameCategories } from "Api/api.casinoPlayerGames";
import { shouldShowSlotControlSystemSaga } from "./shouldShowSlotControlSystem.saga";

const gameCategories = ["SLOT_MACHINE"];
const slug = "tiger-rush";
const state = {
  slotControlSystem: {
    slugToCategoryMap: {
      [slug]: gameCategories,
    },
  },
};
const { location } = window;
function setPathname(pathname) {
  // eslint-disable-next-line fp/no-delete
  delete window.location;

  window.location = {
    href: `https://mydomain.com${pathname}`,
    origin: "https://mydomain.com",
    pathname,
  };
}

// jest.mock("Lib/cometd"); // For some reason, this file executes and breaks tests here 🐛
jest.mock("Api/api.casinoPlayerGames", () => ({
  getGameCategories: jest.fn(),
}));

// $FlowIgnore
getGameCategories.mockResolvedValue(gameCategories);
// $FlowIgnore
describe("Models/slotControlSystem/shouldShowSlotControlSystemSaga()", () => {
  beforeEach(() => {
    // $FlowIgnore
    getGameCategories.mockClear();
    window.location = location;
  });

  test("fetch data if nothing is saved in store", async () => {
    setPathname("/play/tiger-rush/launch");
    const { result } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
    });

    expect(getGameCategories).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  test("gets data from store if possible", async () => {
    setPathname("/play/tiger-rush/launch");
    const { result } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
      state,
    });

    expect(getGameCategories).toHaveBeenCalledTimes(0);
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
