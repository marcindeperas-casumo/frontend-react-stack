import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { TLimitInternalFormat, TLimitGroup } from "Models/playOkay";
import { TLimitPeriodConfig } from "Models/playOkay/config/config.types";
import { TProps } from "./LimitsCard";
import { LimitsCardAmount } from "./LimitsCardAmount";
import { ComingChangeNote } from "./ComingChangeNote";
import { LeftInPeriod } from "./LeftInPeriod";

type TPeriodRowProps = {
  limit: TLimitInternalFormat | null;
  className: string;
  periodConfig: TLimitPeriodConfig;
  group: TLimitGroup;
} & Pick<TProps, "t" | "currency" | "locale" | "cancelComingLimit">;

export function PeriodRow({
  t,
  limit,
  group,
  currency,
  locale,
  cancelComingLimit,
  className,
  periodConfig,
}: TPeriodRowProps) {
  if (!limit) {
    return null;
  }

  return (
    <div className={cx(className, "flex flex-col gap")}>
      <Text tag="span" className="text-grey-70">
        <LimitsCardAmount
          value={limit.value}
          group={group}
          locale={locale}
          currency={currency}
          className="font-bold text-purple-60"
        />
        {" / "}
        {t?.[`period_${limit.period.toLowerCase()}`]}
      </Text>
      <LeftInPeriod
        t={t}
        limit={limit}
        group={group}
        currency={currency}
        locale={locale}
      />
      <ComingChangeNote
        t={t}
        limit={limit}
        locale={locale}
        currency={currency}
        group={group}
        cancelComingLimit={cancelComingLimit}
        isCancellable={periodConfig.permissions.cancel}
      />
      <ComingChangeNote
        renderComingRevocation
        t={t}
        limit={limit}
        locale={locale}
        currency={currency}
        group={group}
        cancelComingLimit={cancelComingLimit}
        isCancellable={periodConfig.permissions.cancel}
      />
    </div>
  );
}
