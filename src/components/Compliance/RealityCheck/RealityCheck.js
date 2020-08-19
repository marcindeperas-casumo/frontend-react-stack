// @flow
import * as React from "react";
import { DateTime } from "luxon";
import { pathOr } from "ramda";
import { useDispatch } from "react-redux";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import type { RealityCheckType } from "Models/player";
import { ROUTE_IDS } from "Src/constants";
import { interpolate, formatCurrency, isCmsEntryEmpty } from "Utils";
import { useCrossCodebaseNavigation, useJurisdiction } from "Utils/hooks";
import { appManualLogoutInit } from "Models/app";

type RealityCheckProps = {
  t: {
    reality_check_title: string,
    reality_check_message: string,
    reality_check_amount_lost_message: string,
    reality_check_game_round_history_button_text: string,
    reality_check_continue_button_text: string,
    reality_check_exit_game_button_text: string,
    reality_check_logout_label: string,
  },
  onClickContinue: () => void,
  casumoName: string,
  locale: string,
  currency: string,
  realityCheck: RealityCheckType,
};

type CancelButtonProps = {
  logoutLabel: string,
  cancelLabel: string,
  onClickCancel: () => void,
  onClickLogout: () => void,
};

const CancelButton = ({
  logoutLabel,
  cancelLabel,
  onClickCancel,
  onClickLogout,
}: CancelButtonProps) => {
  const { isMGA } = useJurisdiction();
  const onClick = isMGA ? onClickLogout : onClickCancel;
  const label = isMGA ? logoutLabel : cancelLabel;

  return (
    <ButtonSecondary size="md" onClick={onClick} className="o-flex--1">
      {label}
    </ButtonSecondary>
  );
};

export function RealityCheck(props: RealityCheckProps) {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const dispatch = useDispatch();
  const {
    t,
    locale,
    currency,
    casumoName,
    realityCheck,
    onClickContinue,
  } = props;

  const logout = () => dispatch(appManualLogoutInit());
  const onClickCancel = () => navigateToKO(ROUTE_IDS.TOP_LISTS);
  const onClickViewHistoryBets = () =>
    navigateToKO(ROUTE_IDS.TRANSACTION_HISTORY_BETS);

  const formattedLostAmount = formatCurrency({
    locale,
    currency,
    value: Math.abs(
      pathOr(0, ["totalWinAmount", "amount"], realityCheck) -
        pathOr(0, ["totalBetAmount", "amount"], realityCheck)
    ),
  });
  const amountLostMessage = interpolate(t.reality_check_amount_lost_message, {
    amount: formattedLostAmount,
  });
  const hiTitle = interpolate(t.reality_check_title, {
    name: casumoName,
  });
  const timeDiff = DateTime.fromMillis(realityCheck.sessionStartedTime)
    .diffNow("minutes")
    .negate();
  const timeDiffInMins = timeDiff.toFormat("m");
  const messageMinutesPlayed = interpolate(t.reality_check_message, {
    totalMinutesPlayed: timeDiffInMins,
    currentSessionDuration: timeDiffInMins,
    netLosses: formattedLostAmount,
  });

  return (
    <Flex direction="vertical" align="center">
      <Text tag="div" className="u-padding u-text-align-center">
        {hiTitle} {messageMinutesPlayed}
      </Text>
      <Text tag="div" className="u-text-align-center">
        {!isCmsEntryEmpty(amountLostMessage) && amountLostMessage}
      </Text>
      <Text tag="div" className="u-margin-bottom--2xlg u-text-align-center">
        <a href="/" onClick={onClickViewHistoryBets}>
          {t.reality_check_game_round_history_button_text}
        </a>
      </Text>
      <Flex direction="horizontal" justify="center">
        <ButtonPrimary
          size="md"
          onClick={onClickContinue}
          className="o-flex--1"
        >
          {t.reality_check_continue_button_text}
        </ButtonPrimary>
        <Flex className="u-padding" />
        <CancelButton
          onClickCancel={onClickCancel}
          onClickLogout={logout}
          logoutLabel={t.reality_check_logout_label}
          cancelLabel={t.reality_check_exit_game_button_text}
        />
      </Flex>
    </Flex>
  );
}
