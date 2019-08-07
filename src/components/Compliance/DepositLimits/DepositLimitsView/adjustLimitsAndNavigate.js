// @flow
import * as R from "ramda";
import type {
  AllLimits,
  DepositKinds,
  DepositLimitPreadjustRules,
} from "Models/playOkay/depositLimits";
import type { LimitsDiff } from "Components/Compliance/DepositLimits/DepositLimitsSummary/utils";
import { getSpecificKinds } from "Components/Compliance/DepositLimits/DepositLimitsSummary/utils";
import { hasRule } from "Models/playOkay/depositLimits";
import type { Navigate } from "./DepositLimitsView";

export const adjustLimitsAndNavigate = ({
  limitsDiff,
  decreases,
  rules,
  navigate,
  newLimits,
  limitAdjust,
}: {
  limitsDiff: LimitsDiff,
  decreases: Array<DepositKinds>,
  rules: Array<DepositLimitPreadjustRules>,
  navigate: Navigate,
  newLimits: AllLimits,
  limitAdjust: AllLimits => void,
}) => {
  const hasRemovedOrIncreased = !R.isEmpty([
    ...getSpecificKinds("increase", limitsDiff),
    ...getSpecificKinds("removed", limitsDiff),
  ]);
  const hasDecreased = !R.isEmpty(decreases);

  if (hasRemovedOrIncreased) {
    if (hasRule("RESPONSIBLE_GAMBLING_TEST_REQUIRED", rules)) {
      navigate({
        route: "confirmations",
        pages: ["RG_REQUIRED"],
      });
    } else if (hasRule("APPROVAL_REQUIRED_FOR_INCREASE", rules)) {
      limitAdjust(newLimits);
      navigate({
        route: "confirmations",
        pages: [hasDecreased && "SAVED_RIGHT_AWAY", "BEING_REVIEWED"].filter(
          Boolean
        ),
      });
    }
  } else if (hasDecreased) {
    limitAdjust(newLimits);
    navigate({
      route: "confirmations",
      pages: ["SAVED_RIGHT_AWAY"],
    });
  } else {
    // nothing changed
    navigate({ route: "overview" });
    return;
  }
};
