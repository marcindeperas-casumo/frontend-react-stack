import * as React from "react";
import { formatCurrency, formatTime } from "Utils";
import { TCurrencyCode } from "Src/constants";
import { Row } from "./Row";
import { Header } from "./Header";

type Props = {
  t:
    | {
        session_details_header: string;
        money_wagered: string;
        money_won: string;
        money_left: string;
        play_started: string;
        play_ended: string;
      }
    | undefined;
  locale: string;
  currency: TCurrencyCode;
  moneyWagered: number;
  moneyWon: number;
  moneyLeft: number;
  playStartedTime: number;
  playEndedTime: number;
};

export function SessionDetailsBody(props: Props) {
  const {
    locale,
    currency,
    moneyWon,
    moneyWagered,
    moneyLeft,
    playStartedTime,
    playEndedTime,
    t,
  } = props;
  const formatCurrencyBound = (value: number) =>
    formatCurrency({
      value,
      currency,
      locale,
    });
  return (
    <>
      <Header>{t?.session_details_header}</Header>
      <Row label={t?.money_wagered} value={formatCurrencyBound(moneyWagered)} />
      <Row label={t?.money_won} value={formatCurrencyBound(moneyWon)} />
      <Row label={t?.money_left} value={formatCurrencyBound(moneyLeft)} />
      <Row label={t?.play_started} value={formatTime(playStartedTime)} />
      <Row label={t?.play_ended} value={formatTime(playEndedTime)} />
    </>
  );
}
