// @flow
import type { DepositLimitPreadjust } from "Models/playOkay/depositLimits";

export default ({
  "schema": "MONETARY_AMOUNT_PERIODS_AND_INCREASED",
  "increaseEffectiveAfter": "P7D",
  "increaseProhibitedAfterwardsFor": "P3M",
  "responsibleGamblingTestCanBeTaken": true,
  "increasesOrRevocationsBlocked": true,
  "kind": "DGOJ_DEPOSIT_LIMIT",
  "playerId": "123",
  "rules": [
    "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
    "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
    "DECREASE_EFFECTIVE_IMMEDIATELY",
    "REVOCATION_ALLOWED"
  ]
}: DepositLimitPreadjust);
