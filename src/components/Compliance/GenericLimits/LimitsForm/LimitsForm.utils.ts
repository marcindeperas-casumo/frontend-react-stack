import * as R from "ramda";
import {
  TLimitGroupFormData,
  TPeriod,
  TRevokeLimitArgs,
  TUpdateLimitArgs,
  integerToLoginBlockTime,
} from "Models/playOkay";
import {
  TLimitsFormReducerAction,
  TGetTranslationForValidatorResponseArgs,
  TTransformFormDataToRequestPayloadsArgs,
  TPrepareRequestPayloadArgs,
} from "./LimitsForm.types";

export function getTranslationForValidatorResponse({
  validatorResponse,
  period,
}: TGetTranslationForValidatorResponseArgs): string {
  if (period && Array.isArray(validatorResponse)) {
    const periodSpecificMessage = (validatorResponse as Array<string>).find(
      message => message.startsWith(period.toLowerCase())
    );

    if (periodSpecificMessage) {
      return `form_validator_period${periodSpecificMessage.replace(
        period.toLowerCase(),
        ""
      )}`;
    }

    return "";
  }

  return `form_validator_${validatorResponse}`;
}

export function textInputOnChange(setter: (n: number) => void) {
  return (e: React.ChangeEvent<HTMLInputElement>) =>
    setter(ifNanNull(parseInt(e.currentTarget.value)));
}

export function isUpdatePayload(payload: TUpdateLimitArgs | TRevokeLimitArgs) {
  return (
    "limit" in payload || "limitInMinutes" in payload || "start" in payload
  );
}

export function transformFormDataToRequestPayloads({
  formData,
  currency,
  limitGroup,
}: TTransformFormDataToRequestPayloadsArgs) {
  const payloads = formData
    .map(limitData =>
      prepareRequestPayload({
        ...limitData,
        currency,
        limitGroup,
      })
    )
    .filter(Boolean);

  if (limitGroup === "time/LoginTimeBlock" && payloads.length > 0) {
    return [
      payloads.reduce(
        (accu, payload) => {
          if (!("limit" in payload)) {
            return accu;
          }

          const { periodSetting } = payload;

          return {
            ...accu,
            periodSetting,
            ...(periodSetting === "LoginBlockStart"
              ? { start: payload.limit }
              : null),
            ...(periodSetting === "LoginBlockEnd"
              ? { end: payload.limit }
              : null),
          };
        },
        { limitGroup }
      ),
    ];
  }

  return payloads;
}

export const ifNanNull: (n: number) => number = R.when(isNaN, R.always(null));

function prepareRequestPayload({
  limitGroup,
  currency,
  period,
  value,
  hasChanged,
}: TPrepareRequestPayloadArgs): TUpdateLimitArgs | TRevokeLimitArgs | null {
  if (limitGroup === "time/LoginTimeBlock") {
    return prepareLoginTimeBlockRequestPayload({
      limitGroup,
      currency,
      period,
      value,
      hasChanged,
    });
  }

  if (!hasChanged) {
    return null;
  }

  if (value === null) {
    return {
      limitGroup,
      periodSetting: period,
    };
  }

  if (limitGroup.startsWith("money/")) {
    return {
      periodSetting: period,
      limitGroup,
      limit: {
        amount: value,
        iso4217CurrencyCode: currency,
      },
    };
  }

  return {
    periodSetting: period,
    limitGroup,
    limitInMinutes: value * 60,
  };
}

function prepareLoginTimeBlockRequestPayload({
  limitGroup,
  period,
  value,
}: TPrepareRequestPayloadArgs) {
  const base = {
    limitGroup,
    periodSetting: period,
  };

  if (value === null) {
    return base;
  }

  return {
    ...base,
    limit: integerToLoginBlockTime(value),
  };
}

export function localStateReducer(
  state: TLimitGroupFormData,
  action: TLimitsFormReducerAction
): TLimitGroupFormData {
  if (action.type === "update") {
    const affectedPeriods = R.pluck("period", action.payload);
    const notAffectedLimits = state?.filter(
      limit => !affectedPeriods.includes(limit.period)
    );

    return [
      ...notAffectedLimits,
      ...action.payload.reduce((accu, { period, value, currentValue }) => {
        return [
          ...accu,
          {
            period,
            value,
            hasChanged:
              nullWhenNotNumber(value) !== nullWhenNotNumber(currentValue),
          },
        ];
      }, []),
    ];
  }

  return state;
}

export function pickLimitFromLocalState(
  period: TPeriod,
  state: TLimitGroupFormData
) {
  return state?.find(limitInGroup => limitInGroup.period === period);
}

const nullWhenNotNumber: (arg: any) => number | null = R.unless(
  R.is(Number),
  R.always(null)
);
