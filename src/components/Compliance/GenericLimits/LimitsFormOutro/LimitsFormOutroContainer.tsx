import * as React from "react";
import { useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import {
  playOkaySettingsCmsSlug,
  useGetPlayerStateByIdQuery,
  selectLimitsInGroup,
  TPeriod,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { TLimitGroupConfig } from "Models/playOkay/config/config.types";
import { LimitsFormOutro } from "./LimitsFormOutro";

type TProps = {
  changedPeriods: Array<TPeriod>;
  limitGroupConfig: TLimitGroupConfig;
  initial: boolean;
  onClickCta: () => void;
};

export function LimitsFormOutroContainer({
  changedPeriods,
  limitGroupConfig,
  initial,
  onClickCta,
}: TProps) {
  const playerId = useSelector(playerIdSelector);
  const t = useTranslations<TPlayOkaySettingsTranslations>(
    playOkaySettingsCmsSlug
  );
  const { currentLimits } = useGetPlayerStateByIdQuery(playerId, {
    skip: !limitGroupConfig,
    selectFromResult: ({ data }) => ({
      currentLimits: selectLimitsInGroup({
        group: limitGroupConfig?.group ?? "",
        data,
      }),
    }),
  });

  return (
    <LimitsFormOutro
      t={t}
      initial={initial}
      onClickCta={onClickCta}
      currentLimits={currentLimits}
      changedPeriods={changedPeriods}
    />
  );
}
