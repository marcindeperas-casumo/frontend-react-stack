// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import {
  ROUTE_IDS,
  redirectToTranslateUrl,
  redirectTo,
} from "Components/Router";
import { interpolate, formatCurrency } from "Utils";

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
  language: string,
  currency: string,
  realityCheck: {
    totalWinAmount: {
      amount: number,
    },
    totalBetAmount: {
      amount: number,
    },
  },
};

export function RealityCheck(props: Props) {
  const { t } = props;

  const formattedLostAmount = formatCurrency({
    locale: props.locale,
    currency: props.currency,
    value: Math.abs(
      props.realityCheck.totalWinAmount.amount -
        props.realityCheck.totalBetAmount.amount
    ),
  });

  const onClickCancel = () =>
    redirectToTranslateUrl(props.language, ROUTE_IDS.TOP_LISTS);
  const onClickViewHistoryBets = () => redirectTo("cash/history/bets");

  return (
    <Flex direction="vertical" align="center">
      <Text tag="div" className="u-padding u-text-align-center">
        {interpolate(t.reality_check_title, {
          name: props.casumoName,
        })}{" "}
        {interpolate(t.reality_check_message, {
          totalMinutesPlayed: "7",
        })}
      </Text>
      <Text tag="div" className="u-text-align-center">
        {t.reality_check_amount_lost_message &&
          t.reality_check_amount_lost_message.replace(
            "{{ amount | € }}",
            formattedLostAmount
          )}
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
          onClick={props.onClickContinue}
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
