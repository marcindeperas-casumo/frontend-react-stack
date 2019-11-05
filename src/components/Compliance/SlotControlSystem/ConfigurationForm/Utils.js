// @flow
import { type NewSessionRequestType } from "Models/slotControlSystem";
import { type ConfigurationFormData } from "./ConfigurationForm";

export function isBudgetTooLow({ budget }: { budget: number }) {
  return budget < 0.1;
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
  return {
    durationInSecs: formData.time,
    reminderFrequencyInSecs: formData.alertsEvery,
    postSessionExclusionInMinutes: formData.breakAfter,
    limit: {
      amount: formData.budget,
      currency: formData.currency,
    },
  };
}
