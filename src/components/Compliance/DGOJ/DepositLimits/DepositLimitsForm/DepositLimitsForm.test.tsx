import React from "react";
import { DateTime } from "luxon";
import { shallow } from "enzyme";
import { DepositLimitsForm } from "./DepositLimitsForm";
import type { FormPropsWithTranslations } from "./DepositLimitsForm.types";
import t from "./__mocks__/cms";

const limitsDefault = {
  currency: "EUR",
};
const props: FormPropsWithTranslations = {
  t,
  currency: "EUR",
  locale: "en-GB",
  limits: {
    ...limitsDefault,
    daily: 10,
    weekly: 30,
    monthly: 100,
  },
  pendingLimitChanges: undefined,
  responsibleGamblingTestCanBeTaken: false,
  lock: undefined,
  initiallyVisible: "daily",
  applyLimitsChanges: () => {},
  fetchTranslations: () => {},
};

function setUpDepositLimitsForm(override = {}) {
  return shallow(<DepositLimitsForm {...props} {...override} />)
    .find({ "data-test-id": "inputValidation" })
    .prop("children"); // for some unknown reason .text() or .children() didn't work
}

describe("DepositLimitsForm", () => {
  describe("validation", () => {
    test("is empty if valid", () => {
      const validation = setUpDepositLimitsForm();
      expect(validation).toBe(null);
    });

    test("warns if can't be higher", () => {
      // daily limit can't be higher than weekly limit, weekly limit can't be higher than monthly limit
      const dailyTooHigh = setUpDepositLimitsForm({
        t,
        limits: {
          ...limitsDefault,
          daily: 23,
          weekly: 20,
          monthly: 30,
        },
        initiallyVisible: "daily",
      });
      const weeklyTooHigh = setUpDepositLimitsForm({
        limits: {
          ...limitsDefault,
          daily: 23,
          weekly: 31,
          monthly: 30,
        },
        initiallyVisible: "weekly",
      });
      expect(dailyTooHigh).toBe("cant_be_higher");
      expect(weeklyTooHigh).toBe("cant_be_higher");
    });

    test("warns if can't be lower", () => {
      // weekly limit can't be lower than daily limit, monthly limit can't be lower than weekly limit
      const weeklyTooLow = setUpDepositLimitsForm({
        limits: {
          ...limitsDefault,
          daily: 23,
          weekly: 20,
          monthly: 30,
        },
        initiallyVisible: "weekly",
      });
      const monthlyTooLow = setUpDepositLimitsForm({
        limits: {
          ...limitsDefault,
          daily: 23,
          weekly: 31,
          monthly: 30,
        },
        initiallyVisible: "monthly",
      });
      expect(weeklyTooLow).toBe("cant_be_lower");
      expect(monthlyTooLow).toBe("cant_be_lower");
    });

    test("warns if can't be lower than 10", () => {
      const underMinimum = setUpDepositLimitsForm({
        limits: {
          ...limitsDefault,
          daily: 9,
          weekly: 20,
          monthly: 30,
        },
        initiallyVisible: "daily",
      });
      expect(underMinimum).toBe("lowest_limit");
    });

    test("warns if can't be higher than 20.000", () => {
      const aboveMaximum = setUpDepositLimitsForm({
        limits: {
          ...limitsDefault,
          daily: 10,
          weekly: 20,
          monthly: 20001,
        },
        initiallyVisible: "monthly",
      });
      expect(aboveMaximum).toBe("highest_limit");
    });

    test("warns if user tries to increase limit during lock", () => {
      const aboveMaximum = setUpDepositLimitsForm({
        limits: {
          ...limitsDefault,
          daily: 10,
          weekly: 20,
          monthly: 30,
        },
        limitChanges: {
          daily: 11,
        },
        initiallyVisible: "daily",
        lock: { expiresOn: DateTime.utc().toISO() },
      });
      expect(aboveMaximum).toBe("has_to_be_lower_while_locked");
    });
  });

  test("warns if user tries to increase limit while being not risk safe", () => {
    const validation = setUpDepositLimitsForm({
      limits: {
        ...limitsDefault,
        daily: 10,
        weekly: 20,
        monthly: 30,
      },
      limitChanges: {
        daily: 11,
      },
      initiallyVisible: "daily",
      increasesOrRevocationsBlocked: true,
    });
    expect(validation).toBe("has_to_be_lower_while_not_risk_safe");
  });

  test("does not warn if user wants to create new limits", () => {
    const validation = setUpDepositLimitsForm({
      limits: {
        ...limitsDefault,
        daily: null,
        weekly: null,
        monthly: null,
      },
      limitChanges: {
        daily: 10,
        weekly: 100,
        monthly: 1000,
      },
      initiallyVisible: "daily",
    });
    expect(validation).toBeNull();
  });

  test("warns if user wants to increase a limit while there is some pending adjustment", () => {
    const validation = setUpDepositLimitsForm({
      limits: {
        ...limitsDefault,
        daily: 10,
        weekly: 30,
        monthly: 100,
      },
      limitChanges: {
        weekly: 40,
      },
      pendingLimitChanges: {
        value: {
          daily: 20,
        },
      },
      initiallyVisible: "weekly",
      responsibleGamblingTestCanBeTaken: true,
    });
    expect(validation).toEqual(
      "cant_be_higher_while_any_adjustment_is_pending"
    );
  });
});
