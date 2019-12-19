// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { formatCurrency, formatTime } from "Utils";
import { Row } from "./Row";
import { Header } from "./Header";

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
    limits_reached_button_label: string,
    logout_button_label: string,
    logout_text: string,
  },
  isLogout: boolean,
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
  const { currency, locale, isLogout, onClickButton } = props;
  const t = props.t || {};
  const formatCurrencyBound = (value: number) =>
    formatCurrency({
      value,
      currency,
      locale,
    });

  return (
    <Flex direction="vertical">
      {isLogout && (
        <>
          <div className="u-padding--sm t-background-grey-light-2" />
          <Text className="t-color-grey-dark-1 u-padding--md u-padding-bottom--lg">
            {t?.logout_text}
          </Text>
        </>
      )}
      <Header>{t.session_details_header}</Header>
      <Row label={t.balance} value={formatCurrencyBound(props.balance)} />
      <Row
        label={t.money_wagered}
        value={formatCurrencyBound(props.moneyWagered)}
      />
      <Row label={t.money_won} value={formatCurrencyBound(props.moneyWon)} />
      <Row label={t.money_left} value={formatCurrencyBound(props.moneyLeft)} />
      <Row label={t.play_started} value={formatTime(props.playStarted)} />
      <Row label={t.play_ended} value={formatTime(props.playEnded)} />
      <Row
        label={t.last_status_alert}
        value={formatTime(props.lastStatusAlert)}
      />
      <Button
        variant="primary"
        className="u-margin--md"
        onClick={onClickButton}
      >
        {(isLogout ? t.logout_button_label : t.limits_reached_button_label) ||
          null}
      </Button>
    </Flex>
  );
}
