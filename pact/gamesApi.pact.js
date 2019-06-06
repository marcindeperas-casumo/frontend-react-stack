import path from "path";
import { Pact } from "@pact-foundation/pact";
import { getCasinoPlayerGamesCount } from "../src/api/api.casinoPlayerGames.js";

const provider = new Pact({
  port: 7777,
  loglevel: "debug",
  dir: path.resolve(process.cwd(), "pact", "pacts"),
  log: path.resolve(process.cwd(), "pact", "logs", "pact.log"),
  pactfileWriteMode: "overwrite",
  consumer: "mobile-react-stack",
  provider: "casino-games",
  cors: true,
});

beforeAll(done => {
  provider.setup().then(() => done());
});

afterAll(done => {
  provider.finalize().then(() => done());
});

describe("casino-games", () => {
  const countBody = 123;

  beforeAll(() => {
    return provider.addInteraction({
      state: "games exist",
      uponReceiving: "a GET request to Casino Player Games Count",
      withRequest: {
        method: "GET",
        path: "/casino-games/api/v1/games/count",
      },
      willRespondWith: {
        status: 200,
        body: countBody,
      },
    });
  });

  describe("casino-games", () => {
    it("getCasinoPlayerGamesCount()", async () => {
      expect(await getCasinoPlayerGamesCount("xToken")).toBe(countBody);
    });
  });
});
