// @flow
import {
  checkIfConditionsApply,
  diffLimits,
  getSpecificKinds,
} from "./depositLimits.utils";

describe("checkIfConditionsApply", () => {
  test("returns true if at least 1 increase or removal was found", () => {
    expect(
      checkIfConditionsApply({
        daily: "increase",
        weekly: "unchanged",
        monthly: "decrease",
      })
    ).toBe(true);
    expect(
      checkIfConditionsApply({
        daily: "increase",
        weekly: "increase",
        monthly: "increase",
      })
    ).toBe(true);
    expect(
      checkIfConditionsApply({
        daily: "removed",
        weekly: "increase",
        monthly: "increase",
      })
    ).toBe(true);
    expect(
      checkIfConditionsApply({
        daily: "unchanged",
        weekly: "unchanged",
        monthly: "removed",
      })
    ).toBe(true);
  });

  test("returns false if there was no increase or removal", () => {
    expect(
      checkIfConditionsApply({
        daily: "unchanged",
        weekly: "unchanged",
        monthly: "decrease",
      })
    ).toBe(false);
    expect(
      checkIfConditionsApply({
        daily: "decrease",
        weekly: "decrease",
        monthly: "decrease",
      })
    ).toBe(false);
    expect(
      checkIfConditionsApply({
        daily: "unchanged",
        weekly: "unchanged",
        monthly: "unchanged",
      })
    ).toBe(false);
  });
});

describe("diffLimits", () => {
  test("unchanged", () => {
    expect(
      diffLimits({
        before: {
          daily: 600,
          weekly: 1500,
          monthly: 3000,
        },
        after: {
          daily: 600,
          weekly: 1500,
          monthly: 3000,
        },
      })
    ).toMatchObject({
      daily: "unchanged",
      weekly: "unchanged",
      monthly: "unchanged",
    });
    expect(
      diffLimits({
        before: {
          daily: null,
          weekly: null,
          monthly: null,
        },
        after: {
          daily: null,
          weekly: null,
          monthly: null,
        },
      })
    ).toMatchObject({
      daily: "unchanged",
      weekly: "unchanged",
      monthly: "unchanged",
    });
    expect(
      diffLimits({
        before: {
          daily: null,
          weekly: 123,
          monthly: 999,
        },
        after: {
          daily: null,
          weekly: 234,
          monthly: 666,
        },
      })
    ).toHaveProperty("daily", "unchanged");
  });

  test("removed", () => {
    expect(
      diffLimits({
        before: {
          daily: 600,
          weekly: 1500,
          monthly: 3000,
        },
        after: {
          daily: null,
          weekly: null,
          monthly: null,
        },
      })
    ).toMatchObject({
      daily: "removed",
      weekly: "removed",
      monthly: "removed",
    });
    expect(
      diffLimits({
        before: {
          daily: 600,
          weekly: 1500,
          monthly: 3000,
        },
        after: {
          daily: null,
          weekly: 1500,
          monthly: 3000,
        },
      })
    ).toHaveProperty("daily", "removed");
  });

  test("increase", () => {
    expect(
      diffLimits({
        before: {
          daily: 600,
          weekly: 1500,
          monthly: 3000,
        },
        after: {
          daily: 601,
          weekly: 1501,
          monthly: 3001,
        },
      })
    ).toMatchObject({
      daily: "increase",
      weekly: "increase",
      monthly: "increase",
    });
    expect(
      diffLimits({
        before: {
          daily: null,
          weekly: 123,
          monthly: 999,
        },
        after: {
          daily: null,
          weekly: 234,
          monthly: 666,
        },
      })
    ).toHaveProperty("daily", "unchanged");
  });

  test("decrease", () => {
    expect(
      diffLimits({
        before: {
          daily: 600,
          weekly: 1500,
          monthly: 3000,
        },
        after: {
          daily: 1,
          weekly: 100,
          monthly: 666,
        },
      })
    ).toMatchObject({
      daily: "decrease",
      weekly: "decrease",
      monthly: "decrease",
    });
    expect(
      diffLimits({
        before: {
          daily: null,
          weekly: null,
          monthly: null,
        },
        after: {
          daily: 1,
          weekly: 1,
          monthly: 1,
        },
      })
    ).toMatchObject({
      daily: "decrease",
      weekly: "decrease",
      monthly: "decrease",
    });
  });
});

describe("getSpecificKinds", () => {
  test("unchanged", () => {
    const getUnchanged = getSpecificKinds("unchanged");
    expect(
      getUnchanged({
        daily: "unchanged",
        weekly: "increase",
        monthly: "decrease",
      })
    ).toMatchObject(["daily"]);
    expect(
      getUnchanged({
        daily: "unchanged",
        weekly: "increase",
        monthly: "unchanged",
      })
    ).toMatchObject(["daily", "monthly"]);
  });

  test("increase", () => {
    const getIncreased = getSpecificKinds("increase");
    expect(
      getIncreased({
        daily: "removed",
        weekly: "removed",
        monthly: "increase",
      })
    ).toMatchObject(["monthly"]);
    expect(
      getIncreased({
        daily: "increase",
        weekly: "increase",
        monthly: "unchanged",
      })
    ).toMatchObject(["daily", "weekly"]);
  });

  test("decrease", () => {
    const getDecreased = getSpecificKinds("decrease");
    expect(
      getDecreased({
        daily: "removed",
        weekly: "decrease",
        monthly: "increase",
      })
    ).toMatchObject(["weekly"]);
    expect(
      getDecreased({
        daily: "increase",
        weekly: "decrease",
        monthly: "decrease",
      })
    ).toMatchObject(["weekly", "monthly"]);
  });

  test("removed", () => {
    const getRemoved = getSpecificKinds("removed");
    expect(
      getRemoved({
        daily: "removed",
        weekly: "decrease",
        monthly: "increase",
      })
    ).toMatchObject(["daily"]);
    expect(
      getRemoved({
        daily: "removed",
        weekly: "removed",
        monthly: "removed",
      })
    ).toMatchObject(["daily", "weekly", "monthly"]);
  });
});
