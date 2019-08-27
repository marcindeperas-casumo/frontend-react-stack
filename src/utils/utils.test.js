// @flow
import * as React from "react";
import { mount } from "enzyme";
import { F } from "ramda";
import {
  bridgeFactory,
  generateColumns,
  makeProtocolAwareUrl,
  matchingGroups,
  renderBets,
  commaSeparated,
  createReducer,
  formatCurrency,
  getSymbolForCurrency,
  interpolate,
  interpolateWithJSX,
  isCmsEntryEmpty,
  findOr,
  convertHoursToDays,
} from "./utils";

describe("bridgeFactory()", () => {
  let bridge, mock, event, payload;
  beforeEach(() => {
    bridge = bridgeFactory();
    mock = jest.fn();
    event = "FOOBAR";
    payload = "content";
  });

  test("should return a bridge instance", () => {
    expect(bridge.on).toBeInstanceOf(Function);
    expect(bridge.emit).toBeInstanceOf(Function);
  });

  test("bridge instance should receive callback and call it when event is emitted", () => {
    bridge.on(event, mock);
    bridge.emit(event, payload);
    expect(mock).toBeCalledWith(payload);
  });

  test("bridge instance should unregister handler", () => {
    bridge.on(event, mock);
    bridge.emit(event, payload);
    bridge.off(event, mock);
    bridge.emit(event, payload);
    expect(mock).toBeCalledTimes(1);
  });

  test("bridge instance shouldn't unregister handler if it doesn't exist", () => {
    bridge.on(event, mock);
    bridge.emit(event, payload);
    bridge.off(event, () => {});
    bridge.emit(event, payload);
    expect(mock).toBeCalledTimes(2);
  });
});

describe("findOr()", () => {
  const defaultValue = { x: 64 };
  const items = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];

  test("should return the first item that satisfies the predicate", () => {
    const predicate = x => x.c === 3;
    const result1 = findOr(defaultValue, predicate, items);
    const result2 = findOr(defaultValue, predicate)(items);
    const result3 = findOr(defaultValue)(predicate)(items);

    [result1, result2, result3].forEach(result =>
      expect(result).toEqual({ c: 3 })
    );
  });

  test("should return the default item if no items satisfy the predicate", () => {
    const predicate = F;
    const result1 = findOr(defaultValue, predicate, items);
    const result2 = findOr(defaultValue, predicate)(items);
    const result3 = findOr(defaultValue)(predicate)(items);

    [result1, result2, result3].forEach(result =>
      expect(result).toEqual(defaultValue)
    );
  });
});

describe("matchingGroups()", () => {
  test("should return one unmatched if there are no matches", () => {
    const result = matchingGroups("foo", "bar");
    expect(result).toEqual([{ type: "unmatched", value: "foo" }]);
  });

  test("should return the first match occurrence", () => {
    const result = matchingGroups("foo foo", "foo");
    expect(result).toEqual([
      { type: "matched", value: "foo" },
      { type: "unmatched", value: " foo" },
    ]);
  });

  test("should return the first match occurrence at non 0", () => {
    const result = matchingGroups("bar foo foo", "foo");
    expect(result).toEqual([
      { type: "unmatched", value: "bar " },
      { type: "matched", value: "foo" },
      { type: "unmatched", value: " foo" },
    ]);
  });

  test("should return matching group at [0] if occurrence is at the beginning", () => {
    const result = matchingGroups("starburst", "star");
    expect(result).toEqual([
      { type: "matched", value: "star" },
      { type: "unmatched", value: "burst" },
    ]);
  });

  test("should return matching group at [1] if occurrence is in the middle", () => {
    const result = matchingGroups("bar bar foo sheep", "foo");
    expect(result).toEqual([
      { type: "unmatched", value: "bar bar " },
      { type: "matched", value: "foo" },
      { type: "unmatched", value: " sheep" },
    ]);
  });

  test("should return matching at the end if occurrence is at the end", () => {
    const result = matchingGroups("foo sheep", "sheep");
    expect(result).toEqual([
      { type: "unmatched", value: "foo " },
      { type: "matched", value: "sheep" },
    ]);
  });

  test("should match also special characters like backslash", () => {
    const result = matchingGroups("netent/\\ with special chars", "netent/\\");
    expect(result).toEqual([
      { type: "matched", value: "netent/\\" },
      { type: "unmatched", value: " with special chars" },
    ]);
  });
});

describe("makeProtocolAwareUrl()", () => {
  test("should add protocol if starts with //", () => {
    expect(makeProtocolAwareUrl("//foo.com/bar")).toBe("http://foo.com/bar");
  });

  test("should add protocol and hostname if starts with /", () => {
    expect(makeProtocolAwareUrl("/bar")).toBe("http://localhost/bar");
  });

  test("should not touch it otherwise", () => {
    expect(makeProtocolAwareUrl("http://casumo.com/cometd")).toBe(
      "http://casumo.com/cometd"
    );
  });
});

describe("generateColumns()", () => {
  test("should group items of an array into columns", async () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numberByColumn = 3;

    expect(generateColumns(list, numberByColumn).length).toBe(3);
    expect(generateColumns(list, numberByColumn)[0]).toEqual([1, 2, 3]);
    expect(generateColumns(list, numberByColumn)[1]).toEqual([4, 5, 6]);
    expect(generateColumns(list, numberByColumn)[2]).toEqual([7, 8, 9]);
  });

  test("should group items even if number of items is not dividable by column number", async () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8];
    const numberByColumn = 3;

    expect(generateColumns(list, numberByColumn).length).toBe(3);
    expect(generateColumns(list, numberByColumn)[0]).toEqual([1, 2, 3]);
    expect(generateColumns(list, numberByColumn)[1]).toEqual([4, 5, 6]);
    expect(generateColumns(list, numberByColumn)[2]).toEqual([7, 8]);
  });
});

describe("renderBets()", () => {
  test("should not render anything if bets dont exist", async () => {
    const bets = null;

    expect(renderBets(bets)).toEqual(null);
  });

  test("should render formatted bets", async () => {
    const bets = {
      symbol: "£",
      min: 1,
      max: 10000,
    };

    expect(renderBets(bets)).toEqual("£1 - £10000");
  });

  describe("createReducer()", () => {
    test("creates a reducer from a map of handlers", () => {
      const state = { foo: "bar" };
      const handlers = {
        ACTION_1: jest.fn().mockReturnValue("ACTION_1"),
        ACTION_2: jest.fn().mockReturnValue("ACTION_2"),
      };
      const action = { type: "ACTION_1" };
      const reducer = createReducer(state, handlers);

      expect(reducer(state, action)).toBe("ACTION_1");
    });

    test("passes down the state to the individual handlers", () => {
      const state = { foo: "bar" };
      const handlers = {
        ACTION_1: jest.fn().mockReturnValue("ACTION_1"),
        ACTION_2: jest.fn().mockReturnValue("ACTION_2"),
      };
      const action = { type: "ACTION_1" };
      const reducer = createReducer(state, handlers);

      reducer(state, action);

      expect(handlers.ACTION_1).toBeCalledTimes(1);
      expect(handlers.ACTION_1).toBeCalledWith(state, action);
    });

    test("returns with the state if there are no matching handlers found", () => {
      const state = { foo: "bar" };
      const handlers = {
        ACTION_1: jest.fn().mockReturnValue("ACTION_1"),
        ACTION_2: jest.fn().mockReturnValue("ACTION_2"),
      };
      const unknownAction = { type: "UNKNOWN" };
      const reducer = createReducer(state, handlers);

      expect(reducer(state, unknownAction)).toEqual(state);
    });
  });
});

describe("commaSeparated()", () => {
  test("should return a string with the input joined by commas", () => {
    const input = ["foo", "bar", "baz"];
    const expected = "foo,bar,baz";
    expect(commaSeparated(input)).toBe(expected);
  });

  test("should return a single item", () => {
    const input = [undefined, "foo", undefined];
    const expected = "foo";
    expect(commaSeparated(input)).toBe(expected);
  });

  test("should return empty string", () => {
    const input = [undefined, undefined, undefined];
    const expected = "";
    expect(commaSeparated(input)).toBe(expected);
  });
});

describe("formatCurrency()", () => {
  test("should render with two zeros precision if fraction given", () => {
    expect(
      formatCurrency({
        currency: "EUR",
        locale: "de-DE",
        value: 3.14,
      })
    ).toBe("€3.14");
    expect(
      formatCurrency({
        currency: "EUR",
        locale: "de-DE",
        value: 3.1,
      })
    ).toBe("€3.10");
  });

  test("should render without fractions instead of 00", () => {
    expect(
      formatCurrency({
        currency: "EUR",
        locale: "de-DE",
        value: 3,
      })
    ).toBe("€3");
    expect(
      formatCurrency({
        currency: "EUR",
        locale: "de-DE",
        value: 66.0,
      })
    ).toBe("€66");
  });
});

describe("getSymbolForCurrency()", () => {
  test("should return proper symbol?", () => {
    expect(
      getSymbolForCurrency({
        currency: "EUR",
        locale: "en-GB",
      })
    ).toBe("€");
    expect(
      getSymbolForCurrency({
        currency: "JPY",
        locale: "en-GB",
      })
    ).toBe("¥");
    expect(
      getSymbolForCurrency({
        currency: "USD",
        locale: "en-GB",
      })
    ).toBe("$");
  });
});

describe("interpolate()", () => {
  test("should replace dynamic strings", () => {
    const input = "I am a {{  var  }} to be replaced with {{{something}}}";
    const output = "I am a variable to be replaced with a value";
    expect(interpolate(input, { var: "variable", something: "a value" })).toBe(
      output
    );
  });

  test("should not replace when param is not defined", () => {
    const input = "I am a {{var}}";
    expect(interpolate(input, { foo: "bar" })).toBe(input);
  });
});

describe("interpolateWithJSX()", () => {
  test("should replace with components", () => {
    const input = "i hope it works for {{foo }}";
    const output = "i hope it works for react components";
    const Component = () => "react components";
    expect(
      mount(
        <div>{interpolateWithJSX({ foo: <Component /> }, input)}</div>
      ).text()
    ).toBe(output);
  });
});

describe("isCmsEntryEmpty()", () => {
  test("should return true for values that should be handled as empty", () => {
    ["empty", "EmPtY", "", null, undefined].map(value =>
      expect(isCmsEntryEmpty(value)).toBe(true)
    );
  });

  test("should return false for non-empty values", () => {
    ["not-empty", "!empty", " "].map(value =>
      expect(isCmsEntryEmpty(value)).toBe(false)
    );
  });
});

describe("convertHoursToDays()", () => {
  test("should convert hours to days", () => {
    const hours = 26;
    const expectedValue = 1;

    expect(convertHoursToDays(hours)).toEqual(expectedValue);
  });
});
