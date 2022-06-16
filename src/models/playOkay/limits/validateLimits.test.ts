import { TLimitGroupConfig } from "../config";
import {
  validateMandatory,
  validateTimeLoginBlock,
  validateMinMax,
} from "./validateLimits";

describe("validateLimits", () => {
  const permissions = { update: true, cancel: true, revoke: true };

  describe("validateMandatory()", () => {
    describe("no mandatory limits", () => {
      it("returns 'valid' when there are no mandatory limits", () => {
        const config: TLimitGroupConfig = {
          group: "money/WagerLimit",
          mandatory: "none",
          allowMany: false,
          available: [{ period: "Daily", permissions }],
        };

        expect(
          validateMandatory({
            config,
            currentLimits: [],
            newLimits: [],
          })
        ).toEqual("valid");
      });
    });

    describe("one mandatory limit", () => {
      it("returns 'valid' when there is one limit provided", () => {
        const config: TLimitGroupConfig = {
          group: "money/WagerLimit",
          mandatory: "anyone",
          allowMany: false,
          available: [{ period: "Daily", permissions }],
        };

        expect(
          validateMandatory({
            config,
            currentLimits: [],
            newLimits: [{ period: "Daily", value: 34 }],
          })
        ).toEqual("valid");
      });

      it("returns 'anyone_required' when there are no limits defined", () => {
        const config: TLimitGroupConfig = {
          group: "money/WagerLimit",
          mandatory: "anyone",
          allowMany: false,
          available: [{ period: "Daily", permissions }],
        };

        expect(
          validateMandatory({
            config,
            currentLimits: [],
            newLimits: [],
          })
        ).toEqual("anyone_required");
      });
    });

    describe("all mandatory limits", () => {
      it("returns 'valid' when there are all limits provided", () => {
        const config: TLimitGroupConfig = {
          group: "money/WagerLimit",
          mandatory: "all",
          allowMany: false,
          available: [
            { period: "Daily", permissions },
            { period: "Weekly", permissions },
          ],
        };

        expect(
          validateMandatory({
            config,
            currentLimits: [{ period: "Weekly", value: 100 }],
            newLimits: [
              { period: "Daily", value: 34 },
              { period: "Weekly", value: 100 },
            ],
          })
        ).toEqual("valid");
      });

      it("returns 'all_required' when there aren't all limits defined", () => {
        const config: TLimitGroupConfig = {
          group: "money/WagerLimit",
          mandatory: "all",
          allowMany: true,
          available: [
            { period: "Daily", permissions },
            { period: "Weekly", permissions },
            { period: "Monthly", permissions },
          ],
        };

        expect(
          validateMandatory({
            config,
            currentLimits: [],
            newLimits: [
              { period: "Daily", value: 34 },
              { period: "Weekly", value: 100 },
            ],
          })
        ).toEqual("all_required");
      });
    });
  });

  describe("validateTimeLoginBlock()", () => {
    const config: TLimitGroupConfig = {
      group: "time/LoginTimeBlock",
      mandatory: "all",
      allowMany: true,
      available: [
        { period: "LoginBlockStart", permissions },
        { period: "LoginBlockEnd", permissions },
      ],
    };

    it("returns empty array when values for start and stop are present", () => {
      expect(
        validateTimeLoginBlock({
          config,
          currentLimits: [],
          newLimits: [
            { period: "LoginBlockStart", value: 1 },
            { period: "LoginBlockEnd", value: 2 },
          ],
        })
      ).toEqual([]);
    });

    it("returns array with loginblockstart_required when start is absent", () => {
      expect(
        validateTimeLoginBlock({
          config,
          currentLimits: [],
          newLimits: [{ period: "LoginBlockEnd", value: 2 }],
        })
      ).toEqual(["loginblockstart_required"]);
    });
  });

  describe("validateMinMax()", () => {
    const config: TLimitGroupConfig = {
      group: "money/LossLimit",
      mandatory: "all",
      allowMany: true,
      available: [
        { period: "Daily", permissions },
        { period: "Weekly", permissions },
        { period: "Monthly", permissions },
      ],
    };

    it("returns empty array when all limits have proper values", () => {
      expect(
        validateMinMax({
          config,
          currentLimits: [],
          newLimits: [
            { period: "Daily", value: 10 },
            { period: "Weekly", value: 20 },
            { period: "Monthly", value: 30 },
          ],
        })
      ).toEqual([]);
    });

    it("takes into account current limits' values", () => {
      expect(
        validateMinMax({
          config,
          currentLimits: [{ period: "Daily", value: 5 }],
          newLimits: [
            { period: "Daily", value: 3 },
            { period: "Weekly", value: 4 },
            { period: "Monthly", value: 30 },
          ],
        })
      ).toEqual(["weekly_too_low"]);
    });

    it("returns errors when new limits have wrong relation to each other", () => {
      expect(
        validateMinMax({
          config,
          currentLimits: [],
          newLimits: [
            { period: "Daily", value: 25 },
            { period: "Weekly", value: 20 },
            { period: "Monthly", value: 30 },
          ],
        })
      ).toEqual(["daily_too_high", "weekly_too_low"]);
    });

    it("takes into account min/max coming from the config", () => {
      expect(
        validateMinMax({
          config: {
            ...config,
            available: [
              { period: "Daily", permissions, min: 10 },
              { period: "Weekly", permissions },
              { period: "Monthly", permissions, max: 300 },
            ],
          },
          currentLimits: [],
          newLimits: [
            { period: "Daily", value: 5 },
            { period: "Weekly", value: 20 },
            { period: "Monthly", value: 400 },
          ],
        })
      ).toEqual(["daily_too_low", "monthly_too_high"]);
    });
  });
});
