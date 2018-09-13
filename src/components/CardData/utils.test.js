import {
  getRouletteColor,
  getMoneyWheelColor,
  getTopCardColor,
  rouletteResults,
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
    expect(rouletteRed).toEqual(rouletteResults["red"]);
    rouletteRed.forEach(n => expect(getRouletteColor(n)).toBe("red"));
  });

  test("should return `grey-dark-2` for black numbers", () => {
    expect(rouletteBlack).toEqual(rouletteResults["grey-dark-2"]);
    rouletteBlack.forEach(n => expect(getRouletteColor(n)).toBe("grey-dark-2"));
  });

  test("should return `green-light-1` for 0 and 00", () => {
    expect(rouletteGreen).toEqual(rouletteResults["green-light-1"]);
    rouletteGreen.forEach(n =>
      expect(getRouletteColor(n)).toBe("green-light-1")
    );
  });
});

describe("getMoneyWheelColor()", () => {
  test("should return `yellow` colour for `01`", () =>
    expect(getMoneyWheelColor("01")).toBe("yellow"));

  test("should return `blue-light-1` colour for `02`", () =>
    expect(getMoneyWheelColor("02")).toBe("blue-light-1"));

  test("should return `purple` colour for `05`", () =>
    expect(getMoneyWheelColor("05")).toBe("purple"));

  test("should return `green-light-1` colour for `10`", () =>
    expect(getMoneyWheelColor("10")).toBe("green-light-1"));

  test("should return `orange` colour for `20`", () =>
    expect(getMoneyWheelColor("20")).toBe("orange"));

  test("should return `red` colour for `40`", () =>
    expect(getMoneyWheelColor("40")).toBe("red"));

  test("should return `grey-dark-2` colour for multipliers X2, X7 and by default", () => {
    expect(getMoneyWheelColor("X2")).toBe("grey-dark-2");
    expect(getMoneyWheelColor("X7")).toBe("grey-dark-2");
    expect(getMoneyWheelColor("XX")).toBe("grey-dark-2");
  });
});

describe("getTopCardColor()", () => {
  test("should return `red` colour for `L`", () =>
    expect(getTopCardColor("L")).toBe("red"));

  test("should return `grey-dark-2` colour for `T`", () =>
    expect(getTopCardColor("T")).toBe("grey-dark-2"));

  test("should return `red` colour for `R`", () =>
    expect(getTopCardColor("R")).toBe("blue-light-1"));

  test("should return `grey-dark-2` colour by default", () =>
    expect(getTopCardColor("W")).toBe("grey-dark-2"));
});
