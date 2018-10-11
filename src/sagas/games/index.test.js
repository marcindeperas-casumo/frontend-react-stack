import { call } from "redux-saga/effects";
import { launchGameSaga } from "Sagas/games";
import { launchGame } from "Services/LaunchGameService";

describe("Launch game saga", () => {
  test("calling launchGame service", () => {
    const slug = "foo-slug";
    const generator = launchGameSaga({
      slug,
    });

    expect(generator.next().value).toEqual(call(launchGame, { slug }));
  });
});
