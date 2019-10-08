import { types, getFetchGamesBySlugsCompleteType } from "Models/games";

describe("Models/GameSearch/Utils", () => {
  test("getFetchGamesBySlugsCompleteType", () => {
    const slugs = ["foo", "bar"];

    expect(getFetchGamesBySlugsCompleteType(slugs)).toEqual(
      `${types.FETCH_GAMES_BY_SLUGS_COMPLETE}_${slugs.join("_")}`
    );
  });
});
