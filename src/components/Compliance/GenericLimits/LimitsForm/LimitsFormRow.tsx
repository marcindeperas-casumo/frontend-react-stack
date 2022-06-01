import * as R from "ramda";
import cx from "classnames";
import InputField from "@casumo/cmp-input-field";
import SelectField from "@casumo/cmp-select";
import * as React from "react";
import { TLimitGroupFormDataItem, TPeriod } from "Models/playOkay";
import {
  TLimitGroup,
  TLimitPeriodFieldConfig,
} from "Models/playOkay/config/config.types";
import { TCurrencyCode } from "Src/constants";
import { getSymbolForCurrency } from "Utils/utils";
import { textInputOnChange, ifNanNull } from "./LimitsForm.utils";
import { TLimitsFormProps } from "./LimitsForm.types";
import { helperText } from "./LimitsFormRow.utils";

type TProps = {
  limit?: TLimitGroupFormDataItem;
  limitGroup: TLimitGroup;
  period: TPeriod;
  currency: TCurrencyCode;
  setter: (n: number) => void;
  min: number;
  max: number;
  editable?: boolean;
  field?: TLimitPeriodFieldConfig;
  errorMessage: string;
} & Pick<TLimitsFormProps, "t">;

export function LimitsFormRow({
  limit,
  limitGroup,
  period,
  editable,
  currency,
  setter,
  min,
  max,
  field,
  errorMessage,
  t,
}: TProps) {
  const isMoneyLimitGroup = limitGroup.startsWith("money/");
  const variant = R.cond([
    [() => Boolean(errorMessage), R.always("invalid")],
    [() => limit?.hasChanged, R.always("valid")],
    [R.T, R.always("default")],
  ])();

  return (
    <div
      className={cx("flex flex-row gap-md items-baseline", {
        "filter grayscale": !editable,
      })}
    >
      <div className="w-full ">
        {field?.type === "select" ? (
          <SelectField
            disabled={!editable}
            onChange={R.pipe(parseInt, ifNanNull, setter)}
            variant={variant}
            helperText={helperText({
              period,
              errorMessage,
              limitGroup,
              t,
            })}
            defaultValue={limit?.value}
            mandatory
          >
            <option value=""></option>
            {field.choices.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectField>
        ) : (
          <InputField
            disabled={!editable}
            prefix={isMoneyLimitGroup ? getSymbolForCurrency({ currency }) : ""}
            type="number"
            inputMode="numeric"
            placeholder={t?.form_input_placeholder || ""}
            value={limit?.value ?? ""}
            min={min}
            max={max}
            variant={variant}
            helperText={helperText({
              period,
              errorMessage,
              limitGroup,
              t,
            })}
            inputClassName="text-left"
            onChange={textInputOnChange(setter)}
          />
        )}
      </div>
    </div>
  );
}
