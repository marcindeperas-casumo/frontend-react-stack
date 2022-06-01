import * as React from "react";
import * as R from "ramda";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { playerIdSelector, currencySelector } from "Models/handshake";
import {
  TLimitGroupFormData,
  useGetPlayerStateByIdQuery,
  playOkaySettingsCmsSlug,
  TUpdateLimitArgs,
  TRevokeLimitArgs,
  TGetPlayerStateByIdResponse,
  TPeriod,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { TLimitGroupConfig } from "Models/playOkay/config/config.types";
import {
  isUpdatePayload,
  transformFormDataToRequestPayloads,
} from "./LimitsForm.utils";
import { LimitsFormLocalContainer } from "./LimitsFormLocalContainer";

type Props = {
  limitGroupConfig: TLimitGroupConfig;
  onLimitsSaved: (affectedPeriods: Array<TPeriod>) => void;
  updateLimit: (payload: TUpdateLimitArgs) => { unwrap: () => Promise<any> };
  revokeLimit: (payload: TRevokeLimitArgs) => { unwrap: () => Promise<any> };
  selectFromResult: (data: TGetPlayerStateByIdResponse) => TLimitGroupFormData;
};

export function LimitsFormContainer({
  onLimitsSaved,
  updateLimit,
  revokeLimit,
  selectFromResult,
  limitGroupConfig,
}: Props) {
  const currency = useSelector(currencySelector);
  const playerId = useSelector(playerIdSelector);
  const t = useTranslations<TPlayOkaySettingsTranslations>(
    playOkaySettingsCmsSlug
  );
  const selectFromResultMemoized = React.useMemo(() => {
    return createSelector<any, TLimitGroupFormData>(
      R.identity,
      selectFromResult
    );
  }, [selectFromResult]);
  const { currentLimits } = useGetPlayerStateByIdQuery(playerId, {
    selectFromResult: ({ data, ...rest }) => ({
      isLoading: rest.isLoading,
      currentLimits: selectFromResultMemoized(data),
    }),
  });
  const [ctaClicked, setCtaClicked] = React.useState(false);
  const [savingFailed, setSavingFailed] = React.useState(false);

  const onClickCta = async (formData: TLimitGroupFormData) => {
    setCtaClicked(true);
    setSavingFailed(false);

    try {
      await Promise.all(
        transformFormDataToRequestPayloads({
          formData,
          currency,
          limitGroup: limitGroupConfig.group,
        }).map(payload =>
          isUpdatePayload(payload)
            ? updateLimit(payload).unwrap()
            : revokeLimit(payload).unwrap()
        )
      );

      onLimitsSaved(
        formData.filter(item => item.hasChanged).map(item => item.period)
      );
    } catch (e) {
      setCtaClicked(false);
      setSavingFailed(true);
    }
  };

  return (
    <LimitsFormLocalContainer
      t={t}
      isFetching={ctaClicked}
      savingFailed={savingFailed}
      onClickCta={onClickCta}
      currency={currency}
      limitsInGroup={currentLimits}
      limitGroupConfig={limitGroupConfig}
    />
  );
}
