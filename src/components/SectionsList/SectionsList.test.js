import React from "react";
import { shallow } from "enzyme";
import SectionsList, {
  sortGamesByName,
  createSectionsList,
  getSectionForGame,
} from "Components/SectionsList";

describe("SectionsList", () => {
  let items;

  beforeEach(() => {
    items = ["mega-fortune-dreams", "mega-fortune", "hall-of-gods"];
  });

  test("should render a List component for every different first game name letter", () => {
    const rendered = shallow(<SectionsList items={items} />);

    expect(rendered.find("List").length).toBe(2);
  });

  test("should not render any List component if games array is empty", () => {
    items = [];

    const rendered = shallow(<SectionsList items={items} />);

    expect(rendered.find("List").length).toBe(0);
  });

  test("should render a p element with first letter of a game name", () => {
    items = ["mega-fortune"];

    const rendered = shallow(<SectionsList items={items} />);

    expect(rendered.find("p").text()).toBe("M");
  });

  test("should render a p element with #0-9 if game name starts with a number", () => {
    items = ["12mega-fortune"];

    const rendered = shallow(<SectionsList items={items} />);

    expect(rendered.find("p").text()).toBe("#0-9");
  });
});

describe("sortGamesByName", () => {
  test("should sort a list of strings alphabetically", () => {
    const notOrderedList = ["a", "c", "b"];

    expect(sortGamesByName(notOrderedList)).toEqual(["a", "b", "c"]);
  });
});

describe("createSectionsList", () => {
  test("should create a SectionsList array from an array of strings", () => {
    const items = ["a", "b", "c"];

    expect(createSectionsList(items)).toEqual([
      { section: "A", games: ["a"] },
      { section: "B", games: ["b"] },
      { section: "C", games: ["c"] },
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
