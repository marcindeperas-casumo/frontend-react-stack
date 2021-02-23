// @flow
import { KO_APP_EVENT_DEPOSIT_BONUS_SELECTED } from "Src/constants";
import bridge from "../DurandalReactBridge";
import { depositBonusSelected } from "./DepositBonusSelectedService";

jest.mock("../DurandalReactBridge");

describe("DepositBonusSelected", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("calls emit on the bridge with the deposit selected and badgeId", () => {
    const badgeId = "foo-123";

    depositBonusSelected({ badgeId });

    expect(bridge.emit).toHaveBeenCalledTimes(1);
    expect(bridge.emit).toHaveBeenCalledWith(
      KO_APP_EVENT_DEPOSIT_BONUS_SELECTED,
      badgeId
    );
  });
});
