import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "Models/modal";
import {
  playOkaySettingsCmsSlug,
  useGetPlayerStateByIdQuery,
  selectMoneyLimitsInGroup,
  selectTimeLimitsInGroup,
  useCancelComingLimitMutation,
  TPeriod,
  useGetPlayerConfigQuery,
  TPlayOkaySettingsTranslations,
} from "Models/playOkay";
import { REACT_APP_MODAL } from "Src/constants";
import { useLocale, useTranslations } from "Utils/hooks";
import { currencySelector, playerIdSelector } from "Models/handshake";
import { TLimitGroup } from "Models/playOkay/config/config.types";
import { LimitsCard } from "./LimitsCard";

type TProps = {
  group: TLimitGroup | null;
};

export function LimitsCardContainer({ group }: TProps) {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const locale = useLocale();
  const playerId = useSelector(playerIdSelector);
  const isMoneyGroup = group?.startsWith("money/");
  const [cancelComingLimit] = useCancelComingLimitMutation();
  const { data: playOkayConfig } = useGetPlayerConfigQuery();
  const limitsGroupConfig = playOkayConfig?.limits.find(
    groupConfig => groupConfig.group === group
  );
  const limitsSelector = isMoneyGroup
    ? selectMoneyLimitsInGroup
    : selectTimeLimitsInGroup;
  const { isLoading, isError, limitsInGroup } = useGetPlayerStateByIdQuery(
    playerId,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        limitsInGroup: limitsSelector({
          data,
          group,
        }),
      }),
    }
  );
  const t = useTranslations<TPlayOkaySettingsTranslations>(
    playOkaySettingsCmsSlug
  );
  const onClick = () =>
    dispatch(
      showModal(REACT_APP_MODAL.ID.PLAY_OKAY_LIMIT_GROUP_FORM, {
        input: {
          limitGroup: group,
        },
      })
    );

  if (isLoading || !group) {
    return null;
  }

  return (
    <LimitsCard
      t={t}
      isLoadingError={isError}
      currency={currency}
      locale={locale}
      limitsInGroup={limitsGroupConfig?.available.reduce(
        (accu, availableLimit) =>
          [
            ...accu,
            limitsInGroup?.find(
              limitInGroup => limitInGroup.period === availableLimit.period
            ),
          ].filter(Boolean),
        []
      )}
      limitsGroupConfig={limitsGroupConfig}
      cancelComingLimit={(periodSetting: TPeriod) =>
        cancelComingLimit({
          periodSetting,
          limitGroup: group,
        })
      }
      onClick={onClick}
    />
  );
}
