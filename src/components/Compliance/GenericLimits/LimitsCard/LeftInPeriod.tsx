import * as React from "react";
import Text from "@casumo/cmp-text";
import { interpolateWithJSX } from "Utils";
import type { TLimitInternalFormat } from "Models/playOkay";
import { LimitsCardAmount } from "./LimitsCardAmount";
import { TProps } from "./LimitsCard";

type TLeftInPeriodProps = {
  limit: TLimitInternalFormat;
} & Pick<TProps, "t" | "group" | "currency" | "locale">;

export function LeftInPeriod({
  t,
  limit,
  group,
  currency,
  locale,
}: TLeftInPeriodProps) {
  if (!("consumedAmount" in limit)) {
    return null;
  }

  const leftInPeriod = limit.value - limit.consumedAmount;

  return (
    <Text size="sm" className="text-grey-50">
      {interpolateWithJSX(
        {
          amount: (
            <LimitsCardAmount
              value={leftInPeriod}
              group={group}
              locale={locale}
              currency={currency}
            />
          ),
        },
        t?.[`available_amount_${limit.period.toLowerCase()}`]
      )}
    </Text>
  );
}
