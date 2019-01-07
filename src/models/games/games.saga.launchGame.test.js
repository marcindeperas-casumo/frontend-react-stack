import { call } from "redux-saga/effects";
import { launchGame } from "Services/LaunchGameService";
import { launchGameSaga } from "./games.saga.launchGame";

describe("Models/Games/Sagas", () => {
  describe("launchGameSaga()", () => {
    test("calling launchGame service", () => {
      const slug = "foo-slug";
      const generator = launchGameSaga({
        slug,
      });

      expect(generator.next().value).toEqual(call(launchGame, { slug }));
    });
  });
});
