import * as R from "ramda";
import type {
  AllLimits,
  LimitsDiff,
  DepositKinds,
  DepositLimitPreadjustRules,
} from "Models/playOkay/depositLimits";
import { getSpecificKinds } from "Models/playOkay/depositLimits";
import type { Navigate } from "./DepositLimitsView";

export const adjustLimitsAndNavigate = ({
  limitsDiff,
  decreases,
  rules,
  navigate,
  newLimits,
  limitAdjust,
}: {
  limitsDiff: LimitsDiff;
  decreases: Array<DepositKinds>;
  rules: Array<DepositLimitPreadjustRules>;
  navigate: Navigate;
  newLimits: AllLimits;
  limitAdjust: (allLimits: AllLimits) => void;
}) => {
  const hasRemovedOrIncreased = !R.isEmpty([
    ...getSpecificKinds("increase", limitsDiff),
    ...getSpecificKinds("removed", limitsDiff),
  ]);
  const hasDecreased = !R.isEmpty(decreases);

  if (hasRemovedOrIncreased) {
    navigate({
      route: "confirmations",
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'Confirm... Remove this comment to see the full error message
      pages: [hasDecreased && "SAVED_RIGHT_AWAY", "RG_REQUIRED"].filter(
        Boolean
      ),
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
