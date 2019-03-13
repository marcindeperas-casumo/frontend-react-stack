import { flavourSelector, flavourMatchSelector } from "Models/ABTesting";

const state = {
  handshake: {
    app: {
      "common/ABTesting": {
        testSubjectId: "79e686cc-8e51-41e4-991f-dc0da0b526ad",
        features: [
          {
            name: "foo",
            flavour: "default",
          },
        ],
      },
    },
  },
};

describe("abTesting", () => {
  test("should return the flavour of a given feature", () => {
    const flavour = flavourSelector("foo")(state);

    expect(flavour).toEqual("default");
  });

  test("should return whether the a feature matches a given flavour", () => {
    const isMatch = flavourMatchSelector("foo", "default")(state);

    expect(isMatch).toBeTruthy();
  });
});
