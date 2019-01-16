import store from "store";
import { set, remove, get } from "./storage";

describe("Lib/storage", () => {
  beforeEach(() => {
    store.clearAll();
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

  test("uses the localStorage under the hood", () => {
    set("foo", "123");

    expect(JSON.parse(window.localStorage.getItem("foo"))).toBe("123");
  });

  test("accepts a default value for get()", () => {
    set("first", "bar");
    expect(get("first")).toBe("bar");
    expect(get("second", 0)).toBe(0);
    expect(get("third", "default")).toBe("default");
    expect(get("fourth")).toBeUndefined();
  });

  test("supports namespaces for .get() and .set()", () => {
    set("key-1", "value-1");
    set("key-2", "value-2", "namespace-1");
    set("key-3", "value-3", "namespace-1");
    set("key-4", "value-4", "namespace-2");

    // In the "global" namespace
    expect(get("key-1")).toBe("value-1");
    expect(get("key-2")).toBeUndefined();

    expect(get("key-3")).toBeUndefined();
    expect(get("key-4")).toBeUndefined();

    expect(get("key-2", null, "namespace-1")).toBe("value-2");
    expect(get("key-3", null, "namespace-1")).toBe("value-3");
    expect(get("key-4", null, "namespace-1")).toBeNull();

    expect(get("key-4", null, "namespace-2")).toBe("value-4");
  });

  test("supports namespaces for .remove()", () => {
    set("key-1", "value-1");
    set("key-2", "value-2");
    set("key-1", "value-1", "namespace-1");
    set("key-2", "value-2", "namespace-1");

    remove("key-1");
    remove("key-2", "namespace-1");

    expect(get("key-1")).toBeUndefined();
    expect(get("key-1", null, "namespace-1")).toBe("value-1");

    expect(get("key-2")).toBe("value-2");
    expect(get("key-2", null, "namespace-1")).toBeNull();
  });
});
