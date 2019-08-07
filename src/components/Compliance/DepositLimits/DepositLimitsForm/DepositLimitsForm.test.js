// @flow
import React from "react";
import { shallow } from "enzyme";
import { DepositLimitsForm } from "./DepositLimitsForm";
import t from "./__mocks__/cms.json";

const limitsDefault = {
  currency: "EUR",
};
const props = {
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
  applyLimitsChanges: () => {},
  responsibleGamblingTest: {
    responsibleGamblingQuestionnaireStatus: "SUCCESS",
    responsibleGamblingQuestionnaireLastAttempt: null,
    responsibleGamblingQuestionnaireAttemptAllowed: false,
  },
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
        lock: true,
      });
      expect(aboveMaximum).toBe("has_to_be_lower_while_locked");
    });
  });
});
