import cx from "classnames";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { CheckIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import * as React from "react";
import type {
  TLimitInternalFormat,
  TPeriod,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { interpolate } from "Utils";

type Props = {
  t?: TPlayOkaySettingsTranslations;
  initial?: boolean;
  onClickCta: () => void;
  currentLimits: Array<TLimitInternalFormat> | null;
  changedPeriods: Array<TPeriod>;
};

export function LimitsFormOutro({ t, onClickCta, ...rest }: Props) {
  return (
    <div className={cx("flex flex-col gap-md", "p-md tablet:p-lg")}>
      <CheckIcon size="lg" className="place-self-center text-green-30" />
      <Copy t={t} {...rest} />
      <ButtonPrimary onClick={onClickCta} size="md" className="w-full mt-5xlg">
        {t?.form_outro_cta || ""}
      </ButtonPrimary>
    </div>
  );
}

type CopyProps = Pick<
  Props,
  "t" | "initial" | "changedPeriods" | "currentLimits"
>;

function Copy({ t, initial, currentLimits, changedPeriods }: CopyProps) {
  if (initial) {
    return (
      <Text className="text-center mb-5xlg">{t?.form_outro_copy_initial}</Text>
    );
  }

  return (
    <div className="mb-5xlg">
      {changedPeriods.map(changedPeriod => (
        <LimitCopy
          key={changedPeriod}
          t={t}
          limit={currentLimits?.find(
            currentLimit =>
              currentLimit.period === changedPeriod ||
              currentLimit.comingChange?.period === changedPeriod
          )}
        />
      ))}
    </div>
  );
}

type LimitCopyProps = {
  limit: TLimitInternalFormat | null;
} & Pick<Props, "t">;

function LimitCopy({ limit, t }: LimitCopyProps) {
  if (!limit) {
    return null;
  }

  if (limit.comingChange) {
    return (
      <Text className="text-center">
        {interpolate(t?.form_outro_copy_increasing || "", {
          period: t?.[`period_${limit.comingChange.period.toLowerCase()}`],
          date: DateTime.fromMillis(limit.comingChange.activationTime).toFormat(
            "DD"
          ),
        })}
      </Text>
    );
  }

  if (limit.comingRevocation) {
    return (
      <Text className="text-center">
        {interpolate(t?.form_outro_copy_revoking, {
          period: t?.[`period_${limit.period.toLowerCase()}`],
          date: DateTime.fromMillis(
            limit.comingRevocation.revocationTime
          ).toFormat("DD"),
        })}
      </Text>
    );
  }

  return (
    <Text className="text-center">
      {interpolate(t?.form_outro_copy_decreasing || "", {
        period: t?.[`period_${limit.period.toLowerCase()}`],
      })}
    </Text>
  );
}
