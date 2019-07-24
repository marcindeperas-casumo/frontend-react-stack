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

beforeAll(async () => await provider.setup());
afterAll(async () => await provider.finalize());

describe("casino-games", () => {
  const countBody = 100;
  const sessionId = "my-session-id";

  beforeAll(() => {
    return provider.addInteraction({
      state: "games exist",
      uponReceiving: "a GET request to Casino Player Games Count",
      withRequest: {
        method: "GET",
        path: "/casino-player/casino-games/api/v1/games/count",
        headers: {
          "X-Token": like(sessionId),
        },
      },
      willRespondWith: {
        status: 200,
        body: like(countBody),
      },
    });
  });

  describe("getCasinoPlayerGamesCount()", () => {
    it("Should return the number of games", async () => {
      expect(await getCasinoPlayerGamesCount({ sessionId })).toBe(countBody);
    });
  });
});
