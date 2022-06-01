import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import { ButtonInverted } from "@casumo/cmp-button";
import {
  TLimitInternalFormat,
  TPeriod,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { interpolateWithJSX } from "Utils";
import { TLimitGroup } from "Models/playOkay/config/config.types";
import { TCurrencyCode, TLocale } from "Src/constants";
import { LimitsCardAmount } from "./LimitsCardAmount";

type Props = {
  t?: TPlayOkaySettingsTranslations;
  renderComingRevocation?: boolean;
  locale: TLocale;
  currency: TCurrencyCode;
  group: TLimitGroup;
  limit: TLimitInternalFormat;
  isCancellable: boolean;
  cancelComingLimit: (period: TPeriod) => Promise<any>;
};

export function ComingChangeNote({
  t,
  limit,
  group,
  locale,
  currency,
  cancelComingLimit,
  renderComingRevocation,
  isCancellable,
}: Props) {
  const exitIfNoComingChange =
    !renderComingRevocation &&
    (!limit.comingChange || limit.comingChange.value === limit.value);
  const exitIfNoComingRevocation =
    renderComingRevocation && !limit.comingRevocation;
  const [isCancelling, setIsCancelling] = React.useState(false);
  const onClickCancel = async () => {
    setIsCancelling(true);
    await cancelComingLimit(limit.period);

    setTimeout(() => setIsCancelling(false), 600);
  };

  if (exitIfNoComingChange) {
    return null;
  }

  if (exitIfNoComingRevocation) {
    return null;
  }

  const changeDate = DateTime.fromMillis(
    renderComingRevocation
      ? limit.comingRevocation?.revocationTime
      : limit.comingChange?.activationTime
  );

  return (
    <div className="flex flex-row items-center gap-sm">
      <Text tag="div" size="sm" className="text-green-30">
        {renderComingRevocation
          ? interpolateWithJSX(
              {
                date: changeDate.toFormat("ff"),
              },
              t?.coming_revocation_note
            )
          : interpolateWithJSX(
              {
                amount: (
                  <LimitsCardAmount
                    value={limit.comingChange.value}
                    group={group}
                    locale={locale}
                    currency={currency}
                  />
                ),
                date: changeDate.toFormat("ff"),
                period:
                  t?.[`period_${limit.comingChange.period.toLowerCase()}`],
              },
              t?.coming_limit_note
            )}
      </Text>
      {isCancellable && (
        <ButtonInverted
          size="xs"
          isLoading={isCancelling}
          onClick={onClickCancel}
        >
          {t?.cancel_coming_change}
        </ButtonInverted>
      )}
    </div>
  );
}
