import { set, remove, get, clearAll } from "./storage";

describe("Lib/storage", () => {
  beforeEach(() => {
    clearAll();
  });

  test("saves something to the client side storage", () => {
    set("foo", "bar");
    expect(get("foo")).toBe("bar");
  });

  test("removes a value from the client side storage", () => {
    set("foo", "bar");
    remove("foo");
    expect(get("foo")).toBeUndefined();
  });

  test("can clear all the values from the client side storage", () => {
    set("foo", "123");
    set("bar", "456");

    expect(get("foo")).toBe("123");
    expect(get("bar")).toBe("456");

    clearAll();

    expect(get("foo")).toBeUndefined();
    expect(get("bar")).toBeUndefined();
  });

  test("uses the localStorage under the hood", () => {
    set("foo", "123");

    expect(JSON.parse(window.localStorage.getItem("foo"))).toBe("123");
  });
});
