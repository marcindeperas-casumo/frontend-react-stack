import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { TextInput } from "Components/Compliance/TextInput";
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
    <Flex.Item>
      <Flex align="center" spacing="md">
        <Flex.Item className="u-width--1/2">
          <TextInput
            currencySign=""
            type="number"
            placeholder={t.form_placeholder_enter_amount || ""}
            value={value}
            min={min}
            max={max}
            fontClassName="u-font"
            colorClassName="t-color-green-30"
            inputClassName="u-text-align-right u-padding-bottom--sm"
            onChange={textInputOnChange(setter)}
          />
        </Flex.Item>
        <Flex.Item className="u-padding-bottom--sm">
          <Text tag="span" className="u-text-nowrap">
            {t.hrs_per_period}
          </Text>
        </Flex.Item>
      </Flex>
      {errorMessage && (
        <Text size="sm" className="t-color-red-30">
          {errorMessage}
        </Text>
      )}
    </Flex.Item>
  );
}
