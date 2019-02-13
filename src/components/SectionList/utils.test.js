import {
  getSectionForGame,
  sortAlphabetically,
  getAlphabeticalSections,
} from "Components/SectionList/utils";

describe("sortAlphabetically", () => {
  test("should sort a list of strings alphabetically", () => {
    const notOrderedList = ["a", "c", "b"];

    expect(sortAlphabetically(notOrderedList)).toEqual(["a", "b", "c"]);
  });
});

describe("getAlphabeticalSections", () => {
  test("should create a SectionsList array from an array of strings", () => {
    const items = ["a", "b", "c"];

    expect(getAlphabeticalSections(items)).toEqual([
      { title: "A", data: ["a"] },
      { title: "B", data: ["b"] },
      { title: "C", data: ["c"] },
    ]);
  });
});

describe("getSectionForGame", () => {
  test("should return a section given a game name starting with a letter", () => {
    const game = "mega-fortune";

    expect(getSectionForGame(game)).toEqual("M");
  });

  test("should return the numbers section (#0-9) given a game name starting with a number", () => {
    const game = "01mega-fortune";

    expect(getSectionForGame(game)).toEqual("#0-9");
  });
});
