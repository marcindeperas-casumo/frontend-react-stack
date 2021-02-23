// @flow
// @ts-expect-error ts-migrate(2724) FIXME: '"../.."' has no exported member named 'type'. Did... Remove this comment to see the full error message
import { type LoginTimeLimit } from "Models/playOkay";

export default ({
  comingLimit: null,
  comingRevocation: null,
  consumedTime: "PT10054.863S",
  consumedTimeTimestamp: 1591097781863,
  limit: "PT472000S",
  period: "Monthly",
  scheduledEndTime: 1591207200000,
// @ts-expect-error ts-migrate(2693) FIXME: 'LoginTimeLimit' only refers to a type, but is bei... Remove this comment to see the full error message
}: LoginTimeLimit);