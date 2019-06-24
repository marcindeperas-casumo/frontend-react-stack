import path from "path";
import { Pact } from "@pact-foundation/pact";
import { like } from "@pact-foundation/pact/dsl/matchers";
import { getCasinoPlayerGamesCount } from "../src/api/api.casinoPlayerGames.js";
import { MOCK_SERVER_PORT } from "./config";

const provider = new Pact({
  port: MOCK_SERVER_PORT,
  loglevel: "debug",
  dir: path.resolve(process.cwd(), "pact", "pacts"),
  log: path.resolve(process.cwd(), "pact", "logs", "pact.log"),
  pactfileWriteMode: "overwrite",
  consumer: "frontend-react-stack",
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
  const countBody = 100;

  beforeAll(() => {
    return provider.addInteraction({
      state: "games exist",
      uponReceiving: "a GET request to Casino Player Games Count",
      withRequest: {
        method: "GET",
        path: "/casino-player/casino-games/api/v1/games/count",
      },
      willRespondWith: {
        status: 200,
        body: like(countBody),
      },
    });
  });

  describe("casino-games", () => {
    it("getCasinoPlayerGamesCount()", async () => {
      expect(await getCasinoPlayerGamesCount("xToken")).toBe(countBody);
    });
  });
});
