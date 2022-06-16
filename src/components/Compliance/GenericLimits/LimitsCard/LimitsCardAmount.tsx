import * as React from "react";
import * as R from "ramda";
import { Duration } from "Components/Duration";
import { formatCurrency } from "Utils/utils";
import { integerToLoginBlockTime, TLimitGroup } from "Models/playOkay";
import { TProps as TLimitsCardProps } from "./LimitsCard";

type TProps = {
  value: number;
  className?: string;
  group: TLimitGroup;
} & Pick<TLimitsCardProps, "locale" | "currency">;

export function LimitsCardAmount({
  value,
  group,
  locale,
  currency,
  className,
}: TProps) {
  const isMoneyLimit = group.startsWith("money/");

  return (
    <span className={className}>
      {R.cond<any[], React.ReactNode>([
        [() => isMoneyLimit, () => formatCurrency({ locale, currency, value })],
        [
          () => group === "time/LoginTimeBlock",
          () => integerToLoginBlockTime(value),
        ],
        [
          R.T,
          () => (
            <Duration
              preferAbbreviated
              duration={{
                hours: Math.ceil(value),
              }}
            />
          ),
        ],
      ])()}
    </span>
  );
}
