import {
  getBadgeColor,
  getBadgeBorderColor,
  rouletteResults,
  getResultsDisplay,
} from "./utils";
import { COLORS } from "./constants";

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
    expect(rouletteRed).toEqual(rouletteResults[COLORS.RED]);
    rouletteRed.forEach(n => expect(getBadgeColor(type, n)).toBe(COLORS.RED));
  });

  test("should return `black` for black numbers", () => {
    expect(rouletteBlack).toEqual(rouletteResults[COLORS.BLACK]);
    rouletteBlack.forEach(n =>
      expect(getBadgeColor(type, n)).toBe(COLORS.BLACK)
    );
  });

  test("should return `green` for 0 and 00", () => {
    expect(rouletteGreen).toEqual(rouletteResults[COLORS.GREEN]);
    rouletteGreen.forEach(n =>
      expect(getBadgeColor(type, n)).toBe(COLORS.GREEN)
    );
  });
});

describe("getBadgeColor() for `MoneyWheel`", () => {
  const type = "MoneyWheel";
  test("should return `yellow` colour for `01`", () =>
    expect(getBadgeColor(type, "01")).toBe(COLORS.YELLOW));

  test("should return `blue` colour for `02`", () =>
    expect(getBadgeColor(type, "02")).toBe(COLORS.BLUE));

  test("should return `purple` colour for `05`", () =>
    expect(getBadgeColor(type, "05")).toBe(COLORS.PURPLE));

  test("should return `green` colour for `10`", () =>
    expect(getBadgeColor(type, "10")).toBe(COLORS.GREEN));

  test("should return `orange` colour for `20`", () =>
    expect(getBadgeColor(type, "20")).toBe(COLORS.ORANGE));

  test("should return `red` colour for `40`", () =>
    expect(getBadgeColor(type, "40")).toBe(COLORS.RED));

  test("should return `grey` colour for multipliers X2, X7 and by default", () => {
    expect(getBadgeColor(type, "X2")).toBe(COLORS.BLACK);
    expect(getBadgeColor(type, "X7")).toBe(COLORS.BLACK);
    expect(getBadgeColor(type, "XX")).toBe(COLORS.BLACK);
  });
});

describe("getBadgeColor() for `TopCard`", () => {
  const type = "TopCard";
  test("should return `red` colour for `L`", () =>
    expect(getBadgeColor(type, "L")).toBe(COLORS.RED));

  test("should return `yellow` colour for `S`", () =>
    expect(getBadgeColor(type, "S")).toBe(COLORS.YELLOW));

  test("should return `blue` colour for `R`", () =>
    expect(getBadgeColor(type, "R")).toBe(COLORS.BLUE));

  test("should return `black` colour by default", () =>
    expect(getBadgeColor(type, "W")).toBe(COLORS.BLACK));
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
  test("should return `grey` colour for `1`", () =>
    expect(getBadgeColor(type, "1")).toBe(COLORS.GREY));

  test("should return `green` colour for `2`", () =>
    expect(getBadgeColor(type, "2")).toBe(COLORS.GREEN));

  test("should return `red` colour for `5`", () =>
    expect(getBadgeColor(type, "5")).toBe(COLORS.RED));

  test("should return `blue` for `10`", () =>
    expect(getBadgeColor(type, "10")).toBe(COLORS.BLUE));

  test("should return `black` for `2r`", () =>
    expect(getBadgeColor(type, "2r")).toBe(COLORS.BLACK));

  test("should return `black` for `4r`", () =>
    expect(getBadgeColor(type, "4r")).toBe(COLORS.BLACK));

  test("should return `orange` for `ch`", () =>
    expect(getBadgeColor(type, "ch")).toBe(COLORS.ORANGE));

  test("should return `black` colour by default", () =>
    expect(getBadgeColor(type, "W")).toBe(COLORS.BLACK));
});

describe("getBadgeBorderColor() for `Monopoly`", () => {
  const type = "Monopoly";
  test("should return `grey` colour for `2r`", () =>
    expect(getBadgeBorderColor(type, "2r")).toBe(COLORS.GREY));

  test("should return `yellow` colour for `4r`", () =>
    expect(getBadgeBorderColor(type, "4r")).toBe(COLORS.YELLOW));
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
    expect(getBadgeColor(type, "P")).toBe(COLORS.BLUE));

  test("should return `green` colour for `T`", () =>
    expect(getBadgeColor(type, "T")).toBe(COLORS.GREEN));

  test("should return `red` colour for `B`", () =>
    expect(getBadgeColor(type, "B")).toBe(COLORS.RED));
});
