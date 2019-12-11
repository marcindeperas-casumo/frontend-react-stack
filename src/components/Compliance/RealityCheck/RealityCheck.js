// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import type { RealityCheckTypes } from "Models/player";
import { ROUTE_IDS } from "Src/constants";
import { interpolate, formatCurrency } from "Utils";
import { useCrossCodebaseNavigation } from "Utils/hooks";

type Props = {
  t: {
    reality_check_title: string,
    reality_check_message: string,
    reality_check_amount_lost_message: string,
    reality_check_game_round_history_button_text: string,
    reality_check_continue_button_text: string,
    reality_check_exit_game_button_text: string,
  },
  onClickContinue: () => void,
  casumoName: string,
  locale: string,
  currency: string,
  realityCheck: RealityCheckTypes,
};

export function RealityCheck(props: Props) {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const {
    t,
    locale,
    currency,
    casumoName,
    realityCheck,
    onClickContinue,
  } = props;

  const onClickCancel = () => navigateToKO(ROUTE_IDS.TOP_LISTS);
  const onClickViewHistoryBets = () =>
    navigateToKO(ROUTE_IDS.TRANSACTION_HISTORY_BETS);

  const formattedLostAmount = formatCurrency({
    locale,
    currency,
    value: Math.abs(
      realityCheck.totalWinAmount.amount - realityCheck.totalBetAmount.amount
    ),
  });
  const amountLostMessage =
    t.reality_check_amount_lost_message &&
    t.reality_check_amount_lost_message.replace(
      "{{ amount | € }}",
      formattedLostAmount
    );
  const hiTitle = interpolate(t.reality_check_title, {
    name: casumoName,
  });
  const timeDiff =
    DateTime.local() - DateTime.fromMillis(realityCheck.sessionStartedTime);
  const messageMinutesPlayed = interpolate(t.reality_check_message, {
    totalMinutesPlayed: DateTime.fromMillis(timeDiff).offset,
  });

  return (
    <Flex direction="vertical" align="center">
      <Text tag="div" className="u-padding u-text-align-center">
        {hiTitle} {messageMinutesPlayed}
      </Text>
      <Text tag="div" className="u-text-align-center">
        {amountLostMessage}
      </Text>
      <Text tag="div" className="u-margin-bottom--2xlg u-text-align-center">
        <a href="/" onClick={onClickViewHistoryBets}>
          {t.reality_check_game_round_history_button_text}
        </a>
      </Text>
      <Flex direction="horizontal" justify="center">
        <Button
          size="md"
          variant="primary"
          onClick={onClickContinue}
          className="o-flex--1"
        >
          {t.reality_check_continue_button_text}
        </Button>
        <Flex className="u-padding" />
        <Button
          size="md"
          variant="secondary"
          onClick={onClickCancel}
          className="o-flex--1"
        >
          {t.reality_check_exit_game_button_text}
        </Button>
      </Flex>
    </Flex>
  );
}
