import { recordSaga } from "Utils";
import { getGameCategory } from "Api/api.casinoPlayerGames";
import { shouldShowSlotControlSystemSaga } from "./shouldShowSlotControlSystem.saga";

const gameCategory = "SLOT_MACHINE";
const slug = "tiger-rush";

// jest.mock("Lib/cometd"); // For some reason, this file executes and breaks tests here 🐛
jest.mock("Api/api.casinoPlayerGames", () => ({
  getGameCategory: jest.fn(),
}));

(getGameCategory as jest.Mock).mockResolvedValue(gameCategory);
describe("Models/slotControlSystem/shouldShowSlotControlSystemSaga()", () => {
  beforeEach(() => {
    (getGameCategory as jest.Mock).mockClear();
  });

  test("fetch data if nothing is saved in store", async () => {
    const state = {
      playing: {
        isPlaying: true,
        gameId: slug,
      },
    };
    const { result } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
      state,
    });

    expect(getGameCategory).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  test("gets data from store if possible", async () => {
    const state = {
      playing: {
        isPlaying: true,
        gameId: slug,
      },
      slotControlSystem: {
        slugToCategoryMap: {
          [slug]: gameCategory,
        },
      },
    };
    const { result } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
      state,
    });

    expect(getGameCategory).toHaveBeenCalledTimes(0);
    expect(result).toBe(true);
  });

  test("returns false right away if not on game page", async () => {
    const state = {
      playing: {
        isPlaying: false,
        gameId: null,
      },
    };
    const { result, effects } = await recordSaga({
      saga: shouldShowSlotControlSystemSaga,
      state,
    });

    expect(effects).toMatchObject({
      select: [
        {
          result: state.playing,
        },
      ],
    });
    expect(result).toBe(false);
  });
});
