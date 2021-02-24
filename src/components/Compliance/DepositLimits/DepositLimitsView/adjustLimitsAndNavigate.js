// @flow
import * as R from "ramda";
import {
  type AllLimits,
  type LimitsDiff,
  type DepositKinds,
  type DepositLimitPreadjustRules,
  getSpecificKinds,
} from "Models/playOkay/depositLimits";
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
    navigate({
      route: "confirmations",
      pages: ["RG_REQUIRED"],
    });
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
