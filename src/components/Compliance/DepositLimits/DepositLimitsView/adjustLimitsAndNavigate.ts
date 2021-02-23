// @flow
import * as R from "ramda";
import {
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type AllLimits,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type LimitsDiff,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type DepositKinds,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
  type DepositLimitPreadjustRules,
  getSpecificKinds,
  hasRule,
} from "Models/playOkay/depositLimits";
import type { Navigate } from "./DepositLimitsView";

export const adjustLimitsAndNavigate = ({
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'limitsDiff'. Did you mean 'Limit... Remove this comment to see the full error message
  limitsDiff,
  // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
  decreases,
  // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
  rules,
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'navigate'. Did you mean 'Navigat... Remove this comment to see the full error message
  navigate,
  // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
  newLimits,
  // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
  limitAdjust,
}: {
  // @ts-expect-error ts-migrate(2395) FIXME: Individual declarations in merged declaration 'Lim... Remove this comment to see the full error message
  limitsDiff: LimitsDiff,
  decreases: Array<DepositKinds>,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rules'.
  rules: Array<DepositLimitPreadjustRules>,
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'navigate'. Did you mean 'Navigat... Remove this comment to see the full error message
  navigate: Navigate,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'newLimits'.
  newLimits: AllLimits,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'limitAdjust'.
  limitAdjust: AllLimits => void,
}) => {
  const hasRemovedOrIncreased = !R.isEmpty([
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'limitsDiff'.
    ...getSpecificKinds("increase", limitsDiff),
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'limitsDiff'.
    ...getSpecificKinds("removed", limitsDiff),
  ]);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'decreases'.
  const hasDecreased = !R.isEmpty(decreases);

  if (hasRemovedOrIncreased) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rules'.
    if (hasRule("RESPONSIBLE_GAMBLING_TEST_REQUIRED", rules)) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
      navigate({
        route: "confirmations",
        pages: ["RG_REQUIRED"],
      });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'rules'.
    } else if (hasRule("APPROVAL_REQUIRED_FOR_INCREASE", rules)) {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'limitAdjust'.
      limitAdjust(newLimits);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
      navigate({
        route: "confirmations",
        pages: [hasDecreased && "SAVED_RIGHT_AWAY", "BEING_REVIEWED"].filter(
          Boolean
        ),
      });
    }
  } else if (hasDecreased) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'limitAdjust'.
    limitAdjust(newLimits);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
    navigate({
      route: "confirmations",
      pages: ["SAVED_RIGHT_AWAY"],
    });
  } else {
    // nothing changed
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'navigate'.
    navigate({ route: "overview" });
    return;
  }
};
