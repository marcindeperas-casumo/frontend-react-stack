// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { formatCurrency } from "Utils";
import { Row } from "./Row";
import { Header } from "./Header";

export const TYPES = Object.freeze({
  LIMITS_REACHED: "LIMITS_REACHED",
  LOGOUT: "LOGOUT",
});

type Props = {
  t: ?{
    session_details_header: string,
    balance: string,
    money_wagered: string,
    money_won: string,
    money_left: string,
    play_started: string,
    play_ended: string,
    last_status_alert: string,
    limits_reached_cta: string,
    logout_cta: string,
    logout_text: string,
  },
  type: $Values<typeof TYPES>,
  balance: number,
  currency: string,
  locale: string,
  moneyWagered: number,
  moneyWon: number,
  moneyLeft: number,
  /** Unix time in millis */
  playStarted: number,
  /** Unix time in millis */
  playEnded: number,
  /** Unix time in millis */
  lastStatusAlert: number,
  onClickButton: () => void,
};

export function SessionDetails(props: Props) {
  const { t, currency, locale, type, onClickButton } = props;
  const formatTime = (millis: number) =>
    DateTime.fromMillis(millis).toFormat("TT");
  const formatCurrencyBound = (value: number) =>
    formatCurrency({
      value,
      currency,
      locale,
    });

  return (
    <Flex direction="vertical">
      {type === TYPES.LOGOUT && (
        <>
          <div className="u-padding--sm t-background-grey-light-2" />
          <Text className="t-color-grey-dark-1 u-padding--md u-padding-bottom--lg">
            {t?.logout_text}
          </Text>
        </>
      )}
      <Header>{t?.session_details_header}</Header>
      <Row label={t?.balance} value={formatCurrencyBound(props.balance)} />
      <Row
        label={t?.money_wagered}
        value={formatCurrencyBound(props.moneyWagered)}
      />
      <Row label={t?.money_won} value={formatCurrencyBound(props.moneyWon)} />
      <Row label={t?.money_left} value={formatCurrencyBound(props.moneyLeft)} />
      <Row label={t?.play_started} value={formatTime(props.playStarted)} />
      <Row label={t?.play_ended} value={formatTime(props.playEnded)} />
      <Row
        label={t?.last_status_alert}
        value={formatTime(props.lastStatusAlert)}
      />
      <Button
        variant="primary"
        className="u-margin--md"
        onClick={onClickButton}
      >
        {(type === TYPES.LOGOUT ? t?.logout_cta : t?.limits_reached_cta) ||
          null}
      </Button>
    </Flex>
  );
}
