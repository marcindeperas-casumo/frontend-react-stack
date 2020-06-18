// @flow
import { insertIntoArray } from "./GameListPage";

describe("GameListPage/insertIntoArray", () => {
  test("should inject array starting from given index", () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(insertIntoArray([3, 4, 5], 2)(new Array(10))).toEqual([
      ,
      ,
      3,
      4,
      5,
      ,
      ,
      ,
      ,
      ,
    ]);
    expect(
      insertIntoArray(["x", "y", "z"], 4)(["a", "b", "c", "d", "e", "f", "g"])
    ).toEqual(["a", "b", "c", "d", "x", "y", "z"]);
  });
});
