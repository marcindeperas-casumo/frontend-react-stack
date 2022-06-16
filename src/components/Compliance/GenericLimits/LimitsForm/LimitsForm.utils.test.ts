import { TLimitGroup, TLimitGroupFormData, TPeriod } from "Models/playOkay";
import { TCurrencyCode } from "Src/constants";
import {
  nullWhenNotNumber,
  getTranslationForValidatorResponse,
  prepareRequestPayload,
  transformFormDataToRequestPayloads,
  localStateReducer,
} from "./LimitsForm.utils";

describe("Compliance/GenericLimits/LimitsForm", () => {
  describe("nullWhenNotNumber()", () => {
    it("returns input when input is a number", () => {
      expect(nullWhenNotNumber(45)).toEqual(45);
    });

    it("returns null when input is a NaN", () => {
      expect(nullWhenNotNumber(NaN)).toEqual(null);
    });

    it("returns null when input is a letter", () => {
      expect(nullWhenNotNumber("er")).toEqual(null);
    });
  });

  describe("getTranslationForValidatorResponse()", () => {
    it("returns a period-specific translation label when validator response contains such", () => {
      expect(
        getTranslationForValidatorResponse({
          validatorResponse: ["daily_required"],
          period: "Daily",
        })
      ).toEqual("form_validator_period_required");
    });

    it("returns a general translation label when validator response does not contain period specific ones", () => {
      expect(
        getTranslationForValidatorResponse({
          validatorResponse: "anyone_required",
          period: "Daily",
        })
      ).toEqual("form_validator_anyone_required");
    });
  });

  describe("prepareRequestPayload()", () => {
    it("returns null if nothing changed", () => {
      expect(
        prepareRequestPayload({
          limitGroup: "money/WagerLimit",
          currency: "CAD",
          period: "Daily",
          value: 33,
        })
      ).toEqual(null);
    });

    it("returns correct cancel payload for money or time limits", () => {
      const limitGroup: TLimitGroup = "money/LossLimit";
      const period: TPeriod = "Daily";

      expect(
        prepareRequestPayload({
          limitGroup,
          currency: "EUR",
          period,
          value: null,
          hasChanged: true,
        })
      ).toEqual({
        limitGroup,
        periodSetting: period,
      });
    });

    it("returns correct update payload for money limits", () => {
      const limitGroup: TLimitGroup = "money/SpendingBudget";
      const period: TPeriod = "Weekly";
      const value = 345;
      const currency: TCurrencyCode = "EUR";

      expect(
        prepareRequestPayload({
          limitGroup,
          currency,
          period,
          value,
          hasChanged: true,
        })
      ).toEqual({
        limitGroup,
        periodSetting: period,
        limit: {
          amount: value,
          iso4217CurrencyCode: currency,
        },
      });
    });

    it("returns correct update payload for time limits", () => {
      const limitGroup: TLimitGroup = "time/LoginTimeLimit";
      const period: TPeriod = "Monthly";
      const value = 111;
      const currency: TCurrencyCode = "EUR";

      expect(
        prepareRequestPayload({
          limitGroup,
          currency,
          period,
          value,
          hasChanged: true,
        })
      ).toEqual({
        limitGroup,
        periodSetting: period,
        limitInMinutes: value * 60,
      });
    });

    it("returns correct cancel payload for time blocks", () => {
      const limitGroup: TLimitGroup = "time/LoginTimeBlock";
      const period: TPeriod = "LoginBlockStart";
      const value = null;
      const currency: TCurrencyCode = "EUR";

      expect(
        prepareRequestPayload({
          limitGroup,
          currency,
          period,
          value,
          hasChanged: true,
        })
      ).toEqual({
        limitGroup,
        periodSetting: period,
      });
    });

    it("returns correct update payload for time blocks", () => {
      const limitGroup: TLimitGroup = "time/LoginTimeBlock";
      const period: TPeriod = "LoginBlockStart";
      const value = 13;
      const currency: TCurrencyCode = "EUR";

      expect(
        prepareRequestPayload({
          limitGroup,
          currency,
          period,
          value,
          hasChanged: true,
        })
      ).toEqual({
        limitGroup,
        periodSetting: period,
        limit: `${value}:00`,
      });
    });
  });

  describe("transformFormDataToRequestPayloads()", () => {
    it("transforms login time block form data correctly", () => {
      const limitGroup: TLimitGroup = "time/LoginTimeBlock";
      const start = 1;
      const end = 2;

      expect(
        transformFormDataToRequestPayloads({
          currency: "GBP",
          limitGroup,
          formData: [
            { period: "LoginBlockStart", value: start, hasChanged: true },
            { period: "LoginBlockEnd", value: end, hasChanged: true },
          ],
        })
      ).toEqual([{ start: `0${start}:00`, end: `0${end}:00`, limitGroup }]);
    });

    it("transforms login time limits form data correctly", () => {
      const limitGroup: TLimitGroup = "time/LoginTimeLimit";
      const daily = 10;
      const weekly = 200;

      expect(
        transformFormDataToRequestPayloads({
          currency: "GBP",
          limitGroup,
          formData: [
            { period: "Daily", value: daily, hasChanged: true },
            { period: "Weekly", value: weekly, hasChanged: true },
          ],
        })
      ).toEqual([
        { limitGroup, limitInMinutes: daily * 60, periodSetting: "Daily" },
        { limitGroup, limitInMinutes: weekly * 60, periodSetting: "Weekly" },
      ]);
    });

    it("transforms money limits form data correctly", () => {
      const limitGroup: TLimitGroup = "money/DepositLimit";
      const daily = 10;
      const weekly = 200;
      const iso4217CurrencyCode: TCurrencyCode = "GBP";

      expect(
        transformFormDataToRequestPayloads({
          currency: iso4217CurrencyCode,
          limitGroup,
          formData: [
            { period: "Daily", value: daily, hasChanged: true },
            { period: "Weekly", value: weekly, hasChanged: true },
          ],
        })
      ).toEqual([
        {
          limitGroup,
          limit: { amount: daily, iso4217CurrencyCode },
          periodSetting: "Daily",
        },
        {
          limitGroup,
          limit: { amount: weekly, iso4217CurrencyCode },
          periodSetting: "Weekly",
        },
      ]);
    });
  });

  describe("localStateReducer()", () => {
    it("correctly reduces state after 'update' action", () => {
      const state: TLimitGroupFormData = [
        { period: "Daily", value: 10, hasChanged: false },
        { period: "Monthly", value: 1010, hasChanged: true },
      ];

      expect(
        localStateReducer(state, {
          type: "update",
          payload: [{ period: "Daily", currentValue: 10, value: 21 }],
        })
      ).toEqual([
        { period: "Monthly", value: 1010, hasChanged: true },
        { period: "Daily", value: 21, hasChanged: true },
      ]);
    });
  });
});
