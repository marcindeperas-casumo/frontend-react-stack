import cx from "classnames";
import { ButtonPrimary } from "@casumo/cmp-button";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { LimitsFormRow } from "./LimitsFormRow";
import {
  getTranslationForValidatorResponse,
  pickLimitFromLocalState,
} from "./LimitsForm.utils";
import { TLimitsFormProps } from "./LimitsForm.types";

export function LimitsForm({
  t,
  onClickCta,
  isSaving,
  isValid,
  savingFailed,
  savingDisabled,
  currency,
  limitsInGroup,
  newLimitsInGroup,
  limitGroupConfig,
  allowMultiplePeriods,
  hasPeriodSpecificErrors,
  validatorResponse,
  dispatch,
}: TLimitsFormProps) {
  return (
    <div
      className={cx("flex flex-col gap-md items-stretch", "p-md tablet:p-lg")}
    >
      {!allowMultiplePeriods && (
        <Text size="sm">{t?.form_allow_single_period_copy}</Text>
      )}
      {savingFailed && (
        <Text size="sm" className="text-red-30">
          {t?.form_error_request_failed}
        </Text>
      )}
      {!isValid && !hasPeriodSpecificErrors && (
        <Text size="sm" className="text-red-30">
          {t?.[getTranslationForValidatorResponse({ validatorResponse })]}
        </Text>
      )}
      {limitGroupConfig.available.map(availableLimit => {
        const newLimit = pickLimitFromLocalState(
          availableLimit.period,
          newLimitsInGroup
        );
        const currentLimit = pickLimitFromLocalState(
          availableLimit.period,
          limitsInGroup
        );
        const isDisabled =
          !allowMultiplePeriods &&
          Boolean(
            newLimitsInGroup
              .filter(item => item.period !== availableLimit.period)
              .find(item => item.hasChanged)
          );

        return (
          <LimitsFormRow
            t={t}
            key={availableLimit.period}
            period={availableLimit.period}
            limit={newLimit}
            limitGroup={limitGroupConfig.group}
            editable={availableLimit.permissions.update && !isDisabled}
            currency={currency}
            min={availableLimit.min}
            max={availableLimit.max}
            field={availableLimit.field}
            setter={newValue =>
              dispatch({
                type: "update",
                payload: [
                  {
                    period: availableLimit.period,
                    value: newValue,
                    currentValue: currentLimit?.value,
                  },
                ],
              })
            }
            errorMessage={
              isValid
                ? ""
                : hasPeriodSpecificErrors &&
                  t?.[
                    getTranslationForValidatorResponse({
                      validatorResponse,
                      period: availableLimit.period,
                    })
                  ]
            }
          />
        );
      })}
      <ButtonPrimary
        icon={<ArrowRightIcon />}
        isLoading={isSaving}
        isDisabled={savingDisabled}
        className="!w-full mt-md desktop:mt-3xlg"
        size="md"
        onClick={onClickCta}
      ></ButtonPrimary>
    </div>
  );
}
