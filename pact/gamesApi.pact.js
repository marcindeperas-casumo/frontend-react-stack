import { Pact, Matchers } from "@pact-foundation/pact";
import { getCasinoPlayerGamesCount } from "../src/api/api.casinoPlayerGames.js";

const provider = new Pact({
  port: 7777,
  loglevel: "debug",
  pactfileWriteMode: "overwrite",
  consumer: "mobile-react-stack-poc",
  provider: "games-api",
});

beforeAll(done => {
  provider.setup().then(() => done());
});

afterAll(done => {
  provider.finalize().then(() => done());
});

describe("games-api", () => {
  beforeAll(() => {
    return provider.addInteraction({
      state: "games exist",
      uponReceiving: "a GET request to Casino Player Games Count",
      withRequest: {
        method: "GET",
        path: "/casino-player/casino-games/api/v1/games/count",
        headers: {
          Accept: "application/json",
        },
      },
      willRespondWith: {
        status: 200,
        body: 123,
      },
    });
  });

  describe("games-api", () => {
    it("getCasinoPlayerGamesCount()", async () => {
      await setTimeout(() => {}, 500000);

      expect(await getCasinoPlayerGamesCount("1234")).toBe(123);
    });
  });
});
