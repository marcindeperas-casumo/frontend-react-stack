import { handshakeToGameJackpotSlugMapper } from "./jackpots.reducer";
import { handshakeResponseMock } from "./blueRibbonHandshake.mock";

describe("Blue ribbon jackpots reducer", () => {
  test("reduce function should return properly mapped game-to-jackpot object", () => {
    expect(
      handshakeToGameJackpotSlugMapper(handshakeResponseMock.jackpots)
    ).toEqual({
      "kambi-sports": "sports-jackpot",
      "legacy-of-dead": "jackpot-blizzard",
      "9-masks-of-fire": "casumo-jackpots",
      "big-bad-wolf": "casumo-jackpots",
      "big-bass-bonanza": "casumo-jackpots",
      "blazing-bells": "casumo-jackpots",
    });
  });
});
