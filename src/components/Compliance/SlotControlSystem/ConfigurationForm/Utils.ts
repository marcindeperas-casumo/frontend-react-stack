// @flow
import { reject, isNil } from "ramda";
import { NewSessionRequestType } from "Models/slotControlSystem";
import { ConfigurationFormData } from "./ConfigurationForm";

export function isBudgetTooLow({ budget }: { budget: number }) {
  return budget < 0;
}

export function isBudgetTooHigh({
  budget,
  balance,
}: {
  budget: number,
  balance: number,
}) {
  return budget > balance;
}

export function isBudgetInvalid(props: { budget: number, balance: number }) {
  return isNaN(props.budget) || isBudgetTooLow(props) || isBudgetTooHigh(props);
}

export function transformFormDataToRequestPayload(
  formData: ConfigurationFormData
): NewSessionRequestType {
  // @ts-expect-error ts-migrate(2739) FIXME: Type 'Dictionary<any>' is missing the following pr... Remove this comment to see the full error message
  return reject(isNil, {
    durationInSecs: formData.time,
    reminderFrequencyInSecs: formData.alertsEvery,
    postSessionExclusionInMinutes:
      formData.breakAfter && formData.breakAfter / 60,
    limit: {
      amount: formData.budget,
      currency: formData.currency,
    },
  });
}
