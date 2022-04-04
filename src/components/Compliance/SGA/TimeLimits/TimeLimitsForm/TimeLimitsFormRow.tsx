import Text from "@casumo/cmp-text";
import TextInput from "@casumo/cmp-text-input";
import * as React from "react";
import { textInputOnChange } from "./TimeLimitsForm.utils";

type Props = {
  value?: number;
  setter: (n: number) => void;
  min: number;
  max: number;
  errorMessage: string;
  t: {
    form_placeholder_enter_amount: string | undefined;
    hrs_per_period: string | undefined;
  };
};

export function TimeLimitsFormRow({
  value,
  setter,
  min,
  max,
  errorMessage,
  t,
}: Props) {
  return (
    <div className="flex flex-row gap-md items-baseline">
      <div className="w-1/2 ">
        <TextInput
          currencySign=""
          type="number"
          placeholder={t.form_placeholder_enter_amount || ""}
          value={value ?? ""}
          min={min}
          max={max}
          variant={errorMessage ? "invalid" : "valid"}
          helperText={errorMessage}
          inputClassName="text-right"
          onChange={textInputOnChange(setter)}
        />
      </div>
      <Text tag="span" className="whitespace-nowrap pb-sm">
        {t.hrs_per_period}
      </Text>
    </div>
  );
}
