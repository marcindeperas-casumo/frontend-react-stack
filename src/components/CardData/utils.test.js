import {
  getRouletteColor,
  getDreamCatcherColor,
  rouletteNumbers,
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

describe("getRouletteColor()", () => {
  test("should return `red` for red numbers", () => {
    expect(rouletteRed).toEqual(rouletteNumbers["red"]);
    rouletteRed.forEach(n => expect(getRouletteColor(n)).toBe("red"));
  });

  test("should return `grey-dark-2` for black numbers", () => {
    expect(rouletteBlack).toEqual(rouletteNumbers["grey-dark-2"]);
    rouletteBlack.forEach(n => expect(getRouletteColor(n)).toBe("grey-dark-2"));
  });

  test("should return `green-light-1` for 0 and 00", () => {
    expect(rouletteGreen).toEqual(rouletteNumbers["green-light-1"]);
    rouletteGreen.forEach(n =>
      expect(getRouletteColor(n)).toBe("green-light-1")
    );
  });
});

describe("getDreamCatcherColor()", () => {
  test("should return `yellow` colour for `01`", () =>
    expect(getDreamCatcherColor("01")).toBe("yellow"));

  test("should return `blue-light-1` colour for `02`", () =>
    expect(getDreamCatcherColor("02")).toBe("blue-light-1"));

  test("should return `purple` colour for `05`", () =>
    expect(getDreamCatcherColor("05")).toBe("purple"));

  test("should return `green-light-1` colour for `10`", () =>
    expect(getDreamCatcherColor("10")).toBe("green-light-1"));

  test("should return `orange` colour for `20`", () =>
    expect(getDreamCatcherColor("20")).toBe("orange"));

  test("should return `red` colour for `40`", () =>
    expect(getDreamCatcherColor("40")).toBe("red"));

  test("should return `grey-dark-2` colour for multipliers X2 and X7", () => {
    expect(getDreamCatcherColor("X2")).toBe("grey-dark-2");
    expect(getDreamCatcherColor("X7")).toBe("grey-dark-2");
  });
});
