import {
  getBadgeColor,
  getBadgeBorderColor,
  rouletteResults,
  getResultsDisplay,
} from "./utils";

const rouletteRed = [
  "1",
  "3",
  "5",
  "7",
  "9",
  "12",
  "14",
  "16",
  "18",
  "19",
  "21",
  "23",
  "25",
  "27",
  "30",
  "32",
  "34",
  "36",
];

const rouletteBlack = [
  "2",
  "4",
  "6",
  "8",
  "10",
  "11",
  "13",
  "15",
  "17",
  "20",
  "22",
  "24",
  "26",
  "28",
  "29",
  "31",
  "33",
  "35",
];

const rouletteGreen = ["0", "00"];

describe("getBadgeColor() for `Roulette`", () => {
  const type = "Roulette";
  test("should return `red` for red numbers", () => {
    expect(rouletteRed).toEqual(rouletteResults["red-5"]);
    rouletteRed.forEach(n => expect(getBadgeColor(type, n)).toBe("red-5"));
  });

  test("should return `grey-dark-2` for black numbers", () => {
    expect(rouletteBlack).toEqual(rouletteResults["chrome-dark-2"]);
    rouletteBlack.forEach(n =>
      expect(getBadgeColor(type, n)).toBe("chrome-dark-2")
    );
  });

  test("should return `green-light-1` for 0 and 00", () => {
    expect(rouletteGreen).toEqual(rouletteResults["green"]);
    rouletteGreen.forEach(n => expect(getBadgeColor(type, n)).toBe("green"));
  });
});

describe("getBadgeColor() for `MoneyWheel`", () => {
  const type = "MoneyWheel";
  test("should return `yellow` colour for `01`", () =>
    expect(getBadgeColor(type, "01")).toBe("caution"));

  test("should return `blue-light-1` colour for `02`", () =>
    expect(getBadgeColor(type, "02")).toBe("info"));

  test("should return `purple` colour for `05`", () =>
    expect(getBadgeColor(type, "05")).toBe("purple-5"));

  test("should return `green-light-1` colour for `10`", () =>
    expect(getBadgeColor(type, "10")).toBe("green"));

  test("should return `orange` colour for `20`", () =>
    expect(getBadgeColor(type, "20")).toBe("warning"));

  test("should return `red` colour for `40`", () =>
    expect(getBadgeColor(type, "40")).toBe("red-5"));

  test("should return `grey-dark-2` colour for multipliers X2, X7 and by default", () => {
    expect(getBadgeColor(type, "X2")).toBe("chrome-dark-2");
    expect(getBadgeColor(type, "X7")).toBe("chrome-dark-2");
    expect(getBadgeColor(type, "XX")).toBe("chrome-dark-2");
  });
});

describe("getBadgeColor() for `TopCard`", () => {
  const type = "TopCard";
  test("should return `red` colour for `L`", () =>
    expect(getBadgeColor(type, "L")).toBe("red-5"));

  test("should return `yellow` colour for `S`", () =>
    expect(getBadgeColor(type, "S")).toBe("caution"));

  test("should return `red` colour for `R`", () =>
    expect(getBadgeColor(type, "R")).toBe("info"));

  test("should return `grey-dark-2` colour by default", () =>
    expect(getBadgeColor(type, "W")).toBe("chrome-dark-2"));
});

describe("getResultsDisplay() for `TopCard`", () => {
  const type = "TopCard";
  test("should return correct display for `L`", () =>
    expect(getResultsDisplay(type, "L")).toBe("H"));

  test("should return correct display for `S`", () =>
    expect(getResultsDisplay(type, "S")).toBe("D"));

  test("should return correct display for `R`", () =>
    expect(getResultsDisplay(type, "R")).toBe("A"));

  test("should return correct display for `2`", () =>
    expect(getResultsDisplay(type, "2")).toBe("2"));
});

describe("getBadgeColor() for `Monopoly`", () => {
  const type = "Monopoly";
  test("should return `grey-light-1` colour for `1`", () =>
    expect(getBadgeColor(type, "1")).toBe("grey-light-1"));

  test("should return `green-light-1` colour for `2`", () =>
    expect(getBadgeColor(type, "2")).toBe("green"));

  test("should return `red` colour for `5`", () =>
    expect(getBadgeColor(type, "5")).toBe("red-5"));

  test("should return `blue-light-1` for `10`", () =>
    expect(getBadgeColor(type, "10")).toBe("info"));

  test("should return `grey-dark-2` for `2r`", () =>
    expect(getBadgeColor(type, "2r")).toBe("chrome-dark-2"));

  test("should return `grey-dark-2` for `4r`", () =>
    expect(getBadgeColor(type, "4r")).toBe("chrome-dark-2"));

  test("should return `orange` for `ch`", () =>
    expect(getBadgeColor(type, "ch")).toBe("warning"));

  test("should return `grey-dark-2` colour by default", () =>
    expect(getBadgeColor(type, "W")).toBe("chrome-dark-2"));
});

describe("getBadgeBorderColor() for `Monopoly`", () => {
  const type = "Monopoly";
  test("should return `grey-light-3` colour for `2r`", () =>
    expect(getBadgeBorderColor(type, "2r")).toBe("grey-light-1"));

  test("should return `yellow` colour for `4r`", () =>
    expect(getBadgeBorderColor(type, "4r")).toBe("caution"));
});

describe("getResultsDisplay() for `Monopoly`", () => {
  const type = "Monopoly";
  test("should return correct display for `2r`", () =>
    expect(getResultsDisplay(type, "2r")).toBe("2"));

  test("should return correct display for `4r`", () =>
    expect(getResultsDisplay(type, "4r")).toBe("4"));

  test("should return correct display for `ch`", () =>
    expect(getResultsDisplay(type, "ch")).toBe("?"));

  test("should return correct display for `2`", () =>
    expect(getResultsDisplay(type, "2")).toBe("2"));
});

describe("getBadgeColor() for `Baccarat`", () => {
  const type = "Baccarat";
  test("should return `blue` colour for `P`", () =>
    expect(getBadgeColor(type, "P")).toBe("info"));

  test("should return `green` colour for `T`", () =>
    expect(getBadgeColor(type, "T")).toBe("green"));

  test("should return `red` colour for `B`", () =>
    expect(getBadgeColor(type, "B")).toBe("red-5"));
});
