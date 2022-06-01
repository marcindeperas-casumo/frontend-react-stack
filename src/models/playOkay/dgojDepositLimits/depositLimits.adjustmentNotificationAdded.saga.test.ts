import { delay } from "redux-saga";
import { adjustmentNotificationAddedSaga } from "./depositLimits.adjustmentNotificationAdded.saga";
import * as actions from "./depositLimits.actions";
import type { TAction } from "./depositLimits.adjustmentNotificationAdded.saga";

jest.mock("redux-saga");

describe("playOkay/depositLimits/adjustmentNotificationAddedSaga", () => {
  describe("saga is given notificationAdded event of another type", () => {
    const action: TAction = {
      data: {
        notificationAdded: {
          type: "SOME_OTHER_TYPE",
        },
      },
    };
    const generator = adjustmentNotificationAddedSaga(action);

    test("it should exit early", () => {
      expect(generator.next().done).toEqual(true);
    });
  });

  describe("saga is given notificationAdded event of DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_APPROVED or DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_REJECTED type", () => {
    const prepareTestSuite = (type: string) => () => {
      const action: TAction = {
        data: {
          notificationAdded: {
            type,
          },
        },
      };
      const generator = adjustmentNotificationAddedSaga(action);

      test("it should wait 5s", () => {
        expect(generator.next().value).toEqual(delay(5000));
      });

      test("then it should dispatch getAllLimits action", () => {
        expect(generator.next().value).toMatchObject({
          PUT: {
            action: {
              ...actions.getAllLimits,
            },
          },
        });
      });

      test("then it should dispatch limitPreadjust action", () => {
        expect(generator.next().value).toMatchObject({
          PUT: {
            action: {
              ...actions.limitPreadjust,
            },
          },
        });
      });

      test("then it should dispatch getRemainingLimits action", () => {
        expect(generator.next().value).toMatchObject({
          PUT: {
            action: {
              ...actions.getRemainingLimits,
            },
          },
        });
      });

      test("then it should dispatch getLimitsHistory action", () => {
        expect(generator.next().value).toMatchObject({
          PUT: {
            action: {
              ...actions.getLimitsHistory(),
            },
          },
        });
      });

      test("then it should finish", () => {
        expect(generator.next().done).toEqual(true);
      });
    };

    describe(
      "run with DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_APPROVED type",
      prepareTestSuite("DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_APPROVED")
    );

    describe(
      "run with DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_REJECTED type",
      prepareTestSuite("DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_REJECTED")
    );
  });
});
