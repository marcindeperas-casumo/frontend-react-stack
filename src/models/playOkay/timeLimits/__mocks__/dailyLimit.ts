import type { LoginTimeLimit } from "Models/playOkay";

const mock: LoginTimeLimit = {
  comingLimit: {
    activationTime: 1591480800000,
    automaticRevocation: true,
    waitingForConfirmation: false,
    limit: "PT75600S",
  },
  comingRevocation: null,
  consumedTime: "PT2054.863S",
  consumedTimeTimestamp: 1591097781863,
  limit: "PT72000S",
  period: "Daily",
  scheduledEndTime: 1591207200000,
}

export default mock;
