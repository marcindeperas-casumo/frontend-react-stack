import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { EditIcon } from "@casumo/cmp-icons";
import type {
  TLimitInternalFormat,
  TPeriod,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { TLimitGroupConfig } from "Models/playOkay/config/config.types";
import { TCurrencyCode, TLocale } from "Src/constants";
import { PeriodRow } from "./PeriodRow";

export type TProps = {
  t?: TPlayOkaySettingsTranslations;
  isLoadingError?: boolean;
  currency: TCurrencyCode;
  locale: TLocale;
  limitsInGroup: Array<TLimitInternalFormat>;
  limitsGroupConfig: TLimitGroupConfig;
  onClick: () => void;
  cancelComingLimit: (period: TPeriod) => Promise<any>;
};

export function LimitsCard({
  t,
  isLoadingError,
  currency,
  locale,
  limitsInGroup,
  limitsGroupConfig,
  onClick,
  cancelComingLimit,
}: TProps) {
  const isEditable =
    !isLoadingError &&
    limitsGroupConfig.available.some(
      availableLimit => availableLimit.permissions.update
    );

  return (
    <div className={cx("flex flex-col gap", "p-lg", "rounded-lg bg-white")}>
      <div className="flex flex-row justify-between gap items-center">
        <div>
          <Text className="font-bold text-purple-60">
            {
              t?.[
                `title_${limitsGroupConfig.group.split("/")[1].toLowerCase()}`
              ]
            }
          </Text>
          <Text size="sm" className="text-grey-50">
            {
              t?.[
                `subtitle_${limitsGroupConfig.group
                  .split("/")[1]
                  .toLowerCase()}`
              ]
            }
          </Text>
          {isLoadingError && (
            <Text size="sm" className="text-orange-30">
              {t?.data_not_loaded_error}
            </Text>
          )}
        </div>
        {isEditable && (
          <ButtonSecondary
            size="sm"
            onClick={onClick}
            icon={<EditIcon />}
          ></ButtonSecondary>
        )}
      </div>
      {limitsInGroup?.length > 0 && (
        <div
          className={cx(
            "flex flex-col gap",
            "divide-y divide-grey-5 border border-grey-5 rounded-lg",
            "p-md mt-md"
          )}
        >
          {limitsInGroup?.map(limit => (
            <PeriodRow
              key={limit.period}
              group={limitsGroupConfig.group}
              currency={currency}
              locale={locale}
              limit={limit}
              className="pt first:pt-none"
              cancelComingLimit={cancelComingLimit}
              periodConfig={limitsGroupConfig?.available.find(
                availableLimit => availableLimit.period === limit.period
              )}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}
