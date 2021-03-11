import * as R from "ramda";
import type {
  AllLimits,
  LimitsDiff,
  DepositKinds,
  DepositLimitPreadjustRules,
} from "Models/playOkay/depositLimits";
import { getSpecificKinds } from "Models/playOkay/depositLimits";
import type { ConfirmationPage } from "../DepositLimitsConfirmations";
import type { Navigate } from "./DepositLimitsView";

export type TAdjustLimitsAndNavigateProps = {
  limitsDiff: LimitsDiff;
  decreases: Array<DepositKinds>;
  rules: Array<DepositLimitPreadjustRules>;
  navigate: Navigate;
  newLimits: AllLimits;
  limitAdjust: (allLimits: AllLimits) => void;
};

export const adjustLimitsAndNavigate = ({
  limitsDiff,
  decreases,
  rules,
  navigate,
  newLimits,
  limitAdjust,
}: TAdjustLimitsAndNavigateProps) => {
  const hasRemovedOrIncreased = !R.isEmpty([
    ...getSpecificKinds("increase", limitsDiff),
    ...getSpecificKinds("removed", limitsDiff),
  ]);
  const hasDecreased = !R.isEmpty(decreases);

  if (hasRemovedOrIncreased) {
    navigate({
      route: "confirmations",

      pages: [hasDecreased && "SAVED_RIGHT_AWAY", "RG_REQUIRED"].filter(
        Boolean
      ) as ConfirmationPage[],
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
