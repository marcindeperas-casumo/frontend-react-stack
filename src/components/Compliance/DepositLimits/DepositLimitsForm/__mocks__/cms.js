// @flow
import type { Translations } from "../DepositLimitsForm.types";

export default ({
  "daily_short": "Daily",
  "daily": "Daily limit",
  "weekly_short": "Weekly",
  "weekly": "Weekly limit",
  "monthly_short": "Monthly",
  "monthly": "Monthly limit",
  "remove_selected": "Remove Limit",
  "input_validation": {
    "lock": "lock",
    "lowest_limit": "lowest_limit",
    "highest_limit": "highest_limit",
    "cant_be_higher": "cant_be_higher",
    "cant_be_lower": "cant_be_lower",
    "has_to_be_lower_than_pending_adjustment": "has_to_be_lower_than_pending_adjustment",
    "has_to_be_lower_while_locked": "has_to_be_lower_while_locked",
    "has_to_be_lower_after_responsible_gambling_test_failed": "has_to_be_lower_after_responsible_gambling_test_failed",
    "has_to_be_lower_while_not_risk_safe": "has_to_be_lower_while_not_risk_safe"
  }
// @ts-expect-error ts-migrate(2693) FIXME: 'Translations' only refers to a type, but is being... Remove this comment to see the full error message
}: Translations);
